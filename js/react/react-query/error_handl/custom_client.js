// src/lib/queryClient.js
import { QueryClient } from '@tanstack/react-query';
import { logout } from './auth'; // Your auth utility

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: (error) => handleGlobalError(error),
      retry: (failureCount, error) => {
        // Don't retry on 401s
        if (error.response?.status === 401) return false;
        // Retry others up to 3 times
        return failureCount < 3;
      },
    },
    mutations: {
      onError: (error) => handleGlobalError(error),
    },
  },
});

function handleGlobalError(error) {
  const status = error.response?.status;
  
  // Handle 401 Unauthorized
  if (status === 401) {
    logout();
    window.location.href = '/login?session_expired=true';
    return;
  }

  // Handle other errors
  console.error('Global query error:', error);
  
  // You could also integrate with a notification system here
  // showNotification('error', getErrorMessage(error));
}