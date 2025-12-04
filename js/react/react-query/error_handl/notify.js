// Extend the handleGlobalError function
function handleGlobalError(error) {
    const status = error.response?.status;
    
    if (status === 401) {
      logout();
      window.location.href = '/login?session_expired=true';
      return;
    }
  
    // Show user-friendly messages
    let message = 'An error occurred';
    if (status === 403) message = 'You don\'t have permission';
    if (status === 404) message = 'Resource not found';
    if (status >= 500) message = 'Server error';
  
    // Use your notification system
    showToast(message, { variant: 'error' });
  }