import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../features/auth/authSlice';
import { selectCurrentUser, selectAuthLoading } from '../features/auth/authSelectors';

const LoginButton = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const isLoading = useSelector(selectAuthLoading);

  const handleLogin = () => {
    dispatch(login({ email: 'user@example.com', password: 'password' }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (isLoading) return <div>Loading...</div>;

  return user ? (
    <button onClick={handleLogout}>Logout</button>
  ) : (
    <button onClick={handleLogin}>Login</button>
  );
};

export default LoginButton;