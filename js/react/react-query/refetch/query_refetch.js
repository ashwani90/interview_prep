import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

// Mock API function
const fetchUserData = async () => {
  const response = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'John Doe',
        email: 'john@example.com',
        lastUpdated: new Date().toLocaleTimeString(),
      });
    }, 500); // Simulate network delay
  });
  return response;
};

const UserProfileWithRefresh = () => {
  const [forceRefreshCount, setForceRefreshCount] = useState(0);
  
  const {
    data: user,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ['userData', forceRefreshCount], // Include refresh count in query key
    queryFn: fetchUserData,
    refetchOnWindowFocus: false, // Disable automatic refetch on window focus
    staleTime: 5 * 60 * 1000, // 5 minutes until data becomes stale
  });

  const handleRefresh = () => {
    // Option 1: Simple refetch (keeps same cache entry)
    refetch();
    
    // Option 2: Force new cache entry by incrementing refresh count
    // setForceRefreshCount(prev => prev + 1);
  };

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      
      <div className="profile-actions">
        <button 
          onClick={handleRefresh}
          disabled={isRefetching}
        >
          {isRefetching ? 'Refreshing...' : 'Refresh Data'}
        </button>
        <span className="status">
          {isRefetching ? 'Updating...' : ''}
        </span>
      </div>

      {isLoading ? (
        <p>Loading initial data...</p>
      ) : isError ? (
        <p className="error">Error: {error.message}</p>
      ) : (
        <div className="profile-data">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Last Updated:</strong> {user.lastUpdated}</p>
        </div>
      )}
    </div>
  );
};

export default UserProfileWithRefresh;