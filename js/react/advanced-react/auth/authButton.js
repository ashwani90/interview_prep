import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import './OAuthButton.css';

const providerConfig = {
  google: {
    name: 'Google',
    icon: 'G',
    color: '#4285F4'
  },
  github: {
    name: 'GitHub',
    icon: 'G',
    color: '#333'
  }
};

const OAuthButton = ({ provider, method = 'popup' }) => {
  const { login, loading } = useAuth();
  const config = providerConfig[provider];

  const handleLogin = async () => {
    try {
      await login(provider, method);
    } catch (error) {
      console.error(`${provider} login failed:`, error);
    }
  };

  return (
    <button
      className="oauth-button"
      style={{ backgroundColor: config.color }}
      onClick={handleLogin}
      disabled={loading}
    >
      <span className="oauth-icon">{config.icon}</span>
      Continue with {config.name}
    </button>
  );
};

export default OAuthButton;