// src/UserProfile.jsx
import { useQuery } from '@tanstack/react-query';

const fetchUser = async () => {
  const response = await fetch('https://api.example.com/user');
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const UserProfile = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {data.name}</p>
      <p>Email: {data.email}</p>
      <p>Try refreshing the page - data will load instantly from cache!</p>
    </div>
  );
};

export default UserProfile;