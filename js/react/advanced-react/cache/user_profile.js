import React, { useState } from 'react';
import useApi from '../hooks/useApi';

const UserProfile = ({ userId }) => {
  const [forceRefresh, setForceRefresh] = useState(false);
  const endpoint = `https://api.example.com/users/${userId}`;
  
  const {
    data: user,
    loading,
    error,
    refetch,
    retry,
    cancel
  } = useApi(endpoint, {
    initialData: {},
    useCache: !forceRefresh
  });

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      
      <div className="controls">
        <button onClick={refetch} disabled={loading}>
          Refresh
        </button>
        <button onClick={() => retry(1000)} disabled={!error || loading}>
          Retry (1s delay)
        </button>
        <button onClick={cancel} disabled={!loading}>
          Cancel
        </button>
        <label>
          <input
            type="checkbox"
            checked={forceRefresh}
            onChange={(e) => setForceRefresh(e.target.checked)}
          />
          Bypass Cache
        </label>
      </div>

      {loading && <div>Loading user data...</div>}
      {error && <div className="error">Error: {error}</div>}
      
      {!loading && !error && (
        <div className="user-details">
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
          <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;