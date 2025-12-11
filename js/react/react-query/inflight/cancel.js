import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const DataComponent = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['visibility-sensitive-data'],
    queryFn: fetchData,
    // Cancel when window loses visibility
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // React Query will automatically cancel in-flight requests
        // when refetchOnWindowFocus is false and tab becomes inactive
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // ... rest of component
};