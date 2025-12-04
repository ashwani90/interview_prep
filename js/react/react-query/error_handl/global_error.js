// src/components/UserProfile.jsx
import { useQuery } from '@tanstack/react-query';

const fetchUser = async () => {
  const response = await fetch('/api/user');
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const UserProfile = () => {
  // No need for individual error handling - it's handled globally
  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>Email: {data.email}</p>
    </div>
  );
};

export default UserProfile;