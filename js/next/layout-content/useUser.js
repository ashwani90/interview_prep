// hooks/useUser.js
import { useApp } from '../contexts/AppContext';

export function useUser() {
  const { user, setUser, isLoading } = useApp();
  
  const login = async (credentials) => {
    try {
      // Simulate API call
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return userData;
      }
      throw new Error('Login failed');
    } catch (error) {
      throw error;
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  
  return {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  };
}