import { useAuth } from '../contexts/AuthContext';

export const useApiClient = () => {
  const { getAccessToken, logout } = useAuth();

  const request = async (endpoint, options = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    try {
      const token = await getAccessToken();
      headers.Authorization = `Bearer ${token}`;
    } catch (error) {
      if (options.requireAuth !== false) {
        throw error;
      }
    }

    const response = await fetch(endpoint, {
      ...options,
      headers
    });

    if (response.status === 401) {
      logout();
      throw new Error('Session expired');
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

  return { request };
};