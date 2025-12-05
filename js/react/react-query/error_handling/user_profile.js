import { useQuery } from '@tanstack/react-query';
import { ErrorMessage } from './ErrorMessage'; // Your custom error component
import { LoadingSpinner } from './LoadingSpinner'; // Your loading component

// fetch user data function
const fetchUserData = async (userId) => {
  const response = await fetch(`/api/users/${userId}`);
  if (!response.ok) {
    // Try to parse error message from API response
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const UserProfile = ({ userId }) => {
    // query function
  const { 
    data: user, 
    isLoading, 
    isError, 
    error, 
    refetch, 
    isRefetching 
  } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUserData(userId),
    retry: 2, // Will retry failed requests 2 times before showing error
    retryDelay: 1000, // Wait 1 second between retries
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

//   Error handling and refetch logic
  if (isError) {
    return (
      <div className="error-container">
        <ErrorMessage 
          title="Failed to load user data"
          message={error.message}
        />
        <button 
          onClick={() => refetch()}
          disabled={isRefetching}
          className="retry-button"
        >
          {isRefetching ? 'Retrying...' : 'Retry'}
        </button>
      </div>
    );
  }

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Member since: {new Date(user.joinDate).toLocaleDateString()}</p>
    </div>
  );
};

// Example ErrorMessage component (would be in a separate file)
const ErrorMessage = ({ title, message }) => {
  return (
    <div className="error-message">
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
};

// Example LoadingSpinner component
const LoadingSpinner = () => {
  return <div className="loading-spinner">Loading...</div>;
};