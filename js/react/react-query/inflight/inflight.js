import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

// API function with cancellation support
const fetchData = async ({ signal }) => {
  const response = await fetch('https://api.example.com/large-dataset', {
    signal, // Pass the AbortSignal to the fetch request
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const LargeDataComponent = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['large-dataset'],
    queryFn: fetchData, // Automatically receives signal property
    retry: false,
  });

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // React Query automatically cancels queries on unmount by default
    };
  }, []);

  if (isLoading) return <div>Loading large dataset...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Large Dataset</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};