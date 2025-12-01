import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const fetchData = async ({ signal }) => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts', {
    signal, // Pass the signal to axios for cancellation
  });
  return data;
};

const CancellableQuery = () => {
  const [showComponent, setShowComponent] = useState(true);
  
  return (
    <div>
      <button onClick={() => setShowComponent(!showComponent)}>
        {showComponent ? 'Unmount Component' : 'Mount Component'}
      </button>
      
      {showComponent && <QueryComponent />}
    </div>
  );
};

const QueryComponent = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchData,
    retry: false,
  });

  return (
    <div>
      <h2>Posts Data</h2>
      {isLoading ? (
        <div>Loading... (Check network tab to see cancellation)</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <ul>
          {data?.slice(0, 5).map(post => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CancellableQuery;