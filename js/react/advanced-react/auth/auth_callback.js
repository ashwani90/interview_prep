import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthCallback = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        await login('callback');
        navigate('/dashboard');
      } catch (error) {
        console.error('Authentication failed:', error);
        navigate('/login', { state: { error: error.message } });
      }
    };

    handleCallback();
  }, [login, navigate]);

  return <div>Completing authentication...</div>;
};

export default AuthCallback;