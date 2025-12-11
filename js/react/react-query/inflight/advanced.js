import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const fetchDataWithCancel = async ({ signal }) => {
  // Create a new AbortController for this specific request
  const controller = new AbortController();
  const abortSignal = controller.signal;

  // Combine with React Query's signal
  if (signal) {
    signal.addEventListener('abort', () => controller.abort());
  }

  try {
    const response = await fetch('https://api.example.com/large-dataset', {
      signal: abortSignal,
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  } finally {
    // Cleanup
    if (signal) {
      signal.removeEventListener('abort', () => controller.abort());
    }
  }
};

const DataFetchingComponent = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['dataset-with-cancel'],
    queryFn: fetchDataWithCancel,
  });

  // ... rest of component
};