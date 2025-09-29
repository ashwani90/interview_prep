import React from 'react';
import OAuthButton from '../components/OAuthButton';
import { useLocation } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const location = useLocation();
  const error = location.state?.error;

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Welcome</h1>
        {error && <div className="error-message">{error}</div>}
        
        <div className="oauth-buttons">
          <OAuthButton provider="google" />
          <OAuthButton provider="github" />
        </div>
        
        <div className="divider">or</div>
        
        <button 
          className="redirect-button"
          onClick={() => navigate('/auth/google?redirect=true')}
        >
          Continue with Google (Redirect)
        </button>
      </div>
    </div>
  );
};

export default LoginPage;