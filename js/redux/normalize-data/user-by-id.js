import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserById } from '../store/selectors/usersSelectors';

const UserProfile = ({ userId }) => {
  const user = useSelector(selectUserById(userId));

  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Company: {user.company?.name}</p>
    </div>
  );
};

export default UserProfile;