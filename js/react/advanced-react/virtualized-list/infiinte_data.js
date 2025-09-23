// src/hooks/useInfiniteData.js
import { useState, useEffect, useCallback } from 'react';

export const useInfiniteData = (fetchData) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    try {
      const newItems = await fetchData(page);
      setItems(prev => [...prev, ...newItems]);
      setHasMore(newItems.length > 0);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [page, isLoading, hasMore, fetchData]);

  useEffect(() => {
    loadMore();
  }, []); // Initial load

  return { items, isLoading, hasMore, loadMore };
};