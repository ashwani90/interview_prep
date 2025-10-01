import { useState, useEffect, useCallback, useRef } from 'react';
import apiClient from '../services/apiClient';
import { apiCache } from '../services/apiCache';

const useApi = (endpoint, options = {}) => {
  const { initialData = null, manual = false, useCache = true } = options;
  const [state, setState] = useState({
    data: initialData,
    loading: !manual,
    error: null,
    retryCount: 0
  });

  const abortControllerRef = useRef(null);
  const retryTimerRef = useRef(null);

  const fetchData = useCallback(async (retryAttempt = 0) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    try {
      setState(prev => ({
        ...prev,
        loading: true,
        error: null,
        retryCount: retryAttempt
      }));

      const data = await apiClient.request(endpoint, {
        ...options,
        signal: abortControllerRef.current.signal,
        useCache
      });

      setState({
        data,
        loading: false,
        error: null,
        retryCount: 0
      });

      return data;
    } catch (error) {
      if (error.name === 'AbortError') {
        return;
      }

      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message
      }));

      throw error;
    } finally {
      abortControllerRef.current = null;
    }
  }, [endpoint, options, useCache]);

  const refetch = useCallback(async () => {
    // Clear cache before refetching
    apiCache.clear(`${options.method || 'GET'}:${endpoint}`);
    return fetchData();
  }, [endpoint, fetchData, options.method]);

  const retry = useCallback(async (delay = 0) => {
    if (retryTimerRef.current) {
      clearTimeout(retryTimerRef.current);
    }

    if (delay > 0) {
      return new Promise(resolve => {
        retryTimerRef.current = setTimeout(() => {
          fetchData(state.retryCount + 1).then(resolve);
        }, delay);
      });
    }

    return fetchData(state.retryCount + 1);
  }, [fetchData, state.retryCount]);

  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    if (retryTimerRef.current) {
      clearTimeout(retryTimerRef.current);
    }
    apiClient.cancelRequest(endpoint, options.method);
  }, [endpoint, options.method]);

  // Auto-fetch when endpoint changes (unless manual)
  useEffect(() => {
    if (!manual) {
      fetchData();
    }

    return () => {
      cancel();
    };
  }, [endpoint, manual, fetchData, cancel]);

  return {
    ...state,
    fetch: fetchData,
    refetch,
    retry,
    cancel,
    setData: (data) => setState(prev => ({ ...prev, data }))
  };
};

export default useApi;