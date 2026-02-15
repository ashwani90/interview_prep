// logoutAction.js
export const logoutUser = (preservePreferences = false) => {
    return {
      type: 'USER_LOGOUT',
      preservePreferences
    };
  };
  
  // Optional: Add this to your auth actions file if you have one