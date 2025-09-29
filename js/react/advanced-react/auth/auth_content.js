import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const isValid = await authService.init();
        if (isValid) {
          const tokens = authService.getTokens();
          setUser(jwtDecode(tokens.access_token));
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        authService.clear();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Handle OAuth login
  const login = async (provider, method = 'popup') => {
    try {
      setLoading(true);
      let tokens;
      
      if (method === 'popup') {
        tokens = await authService.startOAuthPopup(provider);
      } else {
        authService.startOAuthRedirect(provider);
        return;
      }

      setUser(jwtDecode(tokens.access_token));
      return tokens;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const logout = () => {
    authService.clear();
    setUser(null);
    window.location.href = '/';
  };

  // Get access token (with auto-refresh)
  const getAccessToken = async () => {
    let tokens = authService.getTokens();
    if (!tokens) throw new Error('Not authenticated');

    if (!authService.validateToken(tokens.access_token)) {
      tokens = await authService.refreshToken();
    }

    return tokens.access_token;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        getAccessToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);