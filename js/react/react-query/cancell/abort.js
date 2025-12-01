import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchWithAbort = async ({ queryKey, signal }) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/${queryKey[0]}`, {
    signal,
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const QueryDemo = () => {
  const [resource, setResource] = useState('posts');
  const [showQuery, setShowQuery] = useState(true);

  return (
    <div>
      <h1>Query Cancellation Demo</h1>
      <div>
        <button onClick={() => setResource('posts')}>Fetch Posts</button>
        <button onClick={() => setResource('comments')}>Fetch Comments</button>
        <button onClick={() => setResource('todos')}>Fetch Todos</button>
      </div>
      <button onClick={() => setShowQuery(!showQuery)}>
        {showQuery ? 'Unmount Query' : 'Mount Query'}
      </button>

      {showQuery && <ResourceQuery resource={resource} />}
    </div>
  );
};

const ResourceQuery = ({ resource }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [resource],
    queryFn: fetchWithAbort,
    retry: false,
  });

  // Verify cancellation in useEffect cleanup
  useEffect(() => {
    return () => {
      console.log('Component unmounted - query should be cancelled');
    };
  }, []);

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Current Resource: {resource}</h2>
      {isLoading ? (
        <div>
          Loading {resource}... (Try unmounting during fetch to see cancellation)
          <div>Check network tab for cancelled requests</div>
        </div>
      ) : isError ? (
        <div style={{ color: 'red' }}>
          Error: {error.message} {error.name === 'AbortError' && '(Request was aborted)'}
        </div>
      ) : (
        <pre>{JSON.stringify(data?.slice(0, 3), null, 2)}</pre>
      )}
    </div>
  );
};

export default QueryDemo;