// errorActions.js
export const errorOccurred = (errorData) => ({
    type: 'ERROR_OCCURRED',
    payload: errorData
  });
  
  export const resetError = () => ({
    type: 'RESET_ERROR'
  });
  
  export const startRecovery = () => ({
    type: 'START_RECOVERY'
  });
  
  export const recoveryComplete = () => ({
    type: 'RECOVERY_COMPLETE'
  });
  
  // Optional: Action to reset specific parts of state
  export const resetBrokenState = () => (dispatch, getState) => {
    // Add any specific state cleanup logic here
    // Example: dispatch(resetAuthState());
    // Example: dispatch(clearCriticalData());
  };