import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

// Mock API function that returns current timestamp
const fetchData = async () => {
  const response = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: `Server data (fetched at: ${new Date().toLocaleTimeString()})`,
      });
    }, 500); // Simulate network delay
  });
  return response;
};

const QueryConfigExplorer = () => {
  const [staleTime, setStaleTime] = useState(3000); // 3 seconds default
  const [cacheTime, setCacheTime] = useState(5000); // 5 seconds default
  const [queryKey, setQueryKey] = useState('demo-query');

  const { data, status, isFetching, dataUpdatedAt } = useQuery({
    queryKey: [queryKey],
    queryFn: fetchData,
    staleTime,
    cacheTime,
  });

  // Force remount to reset query
  const resetQuery = () => setQueryKey(`demo-query-${Date.now()}`);

  return (
    <div className="query-explorer">
      <h2>React Query StaleTime vs CacheTime Explorer</h2>
      
      <div className="controls">
        <div className="control-group">
          <label>
            staleTime (ms):
            <input
              type="number"
              value={staleTime}
              onChange={(e) => setStaleTime(Number(e.target.value))}
              min="0"
              step="1000"
            />
          </label>
          <small>
            How long until data becomes stale (triggers background refetch)
          </small>
        </div>

        <div className="control-group">
          <label>
            cacheTime (ms):
            <input
              type="number"
              value={cacheTime}
              onChange={(e) => setCacheTime(Number(e.target.value))}
              min="0"
              step="1000"
            />
          </label>
          <small>
            How long inactive data stays in cache before garbage collection
          </small>
        </div>

        <button onClick={resetQuery}>Reset Query</button>
      </div>

      <div className="query-status">
        <h3>Query Status</h3>
        <p>Status: <strong>{status}</strong></p>
        <p>Fetching: <strong>{isFetching ? 'Yes' : 'No'}</strong></p>
        <p>Last updated: <strong>{new Date(dataUpdatedAt).toLocaleTimeString()}</strong></p>
        <div className="data-display">
          <h4>Data:</h4>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      </div>

      <div className="explanation">
        <h3>How to test:</h3>
        <ol>
          <li>Adjust the staleTime and observe when background refetches occur</li>
          <li>Set cacheTime shorter than staleTime to see data disappear</li>
          <li>Switch tabs and return to test cache persistence</li>
          <li>Click "Reset Query" to create a fresh query instance</li>
        </ol>

        <h3>Key Observations:</h3>
        <ul>
          <li><strong>staleTime</strong>: Data becomes stale after this duration (triggers background refetch when component remounts or window refocuses)</li>
          <li><strong>cacheTime</strong>: Data is completely removed from cache after this duration of inactivity</li>
          <li>Data will refetch when stale, but only if the component is mounted</li>
          <li>If cacheTime expires, you'll get a hard loading state on next mount</li>
        </ul>
      </div>
    </div>
  );
};

export default QueryConfigExplorer;