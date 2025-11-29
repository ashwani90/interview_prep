import { useQuery } from '@tanstack/react-query';
import { getAuthToken, fetchUserInfo } from './api';

const UserProfile = () => {
  // Get the auth token (from context, localStorage, etc.)
  const token = getAuthToken();

  // Dependent query - only runs when token is available
  // This query fetches user profile information based on the token
  const { data: user, isLoading, isError, error } = useQuery({
    queryKey: ['user', token], // Token as part of query key
    queryFn: () => fetchUserInfo(token),
    enabled: !!token, // Only enable when token exists
    retry: false, // Don't retry if unauthorized
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });

  if (!token) {
    return <div>Please log in to view your profile</div>;
  }

  if (isLoading) {
    return <div>Loading user profile...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="profile">
      <h2>Welcome, {user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Member since: {new Date(user.joinDate).toLocaleDateString()}</p>
    </div>
  );
};

// API functions (example)
export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const fetchUserInfo = async (token) => {
  const response = await fetch('/api/user/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch user info');
  }
  return response.json();
};


// interface UserData {
//   id: string;
//   name: string;
//   email: string;
//   joinDate: string;
// }

// Use query with the use Query hook
const { data: user } = useQuery<UserData>({
  queryKey: ['user', token],
  queryFn: () => fetchUserInfo(token),
  enabled: !!token,
});


const UserDashboard = () => {
  const token = getAuthToken();
  
  // First query - user profile
  const { data: user } = useQuery({
    queryKey: ['user', token],
    queryFn: () => fetchUserInfo(token),
    enabled: !!token,
  });

  // Second query - depends on user data
  const { data: projects } = useQuery({
    queryKey: ['projects', user?.id],
    queryFn: () => fetchUserProjects(user.id),
    enabled: !!user?.id, // Only fetch when user ID is available
  });

  // Render logic...
};