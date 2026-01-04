// errorReducer.js
const initialState = {
    error: null,
    errorInfo: null,
    componentStack: null,
    recoveryInProgress: false
  };
  
  export default function errorReducer(state = initialState, action) {
    switch (action.type) {
      case 'ERROR_OCCURRED':
        return {
          ...state,
          error: action.payload.error,
          errorInfo: action.payload.errorInfo,
          componentStack: action.payload.componentStack
        };
  
      case 'RESET_ERROR':
        return {
          ...initialState
        };
  
      case 'START_RECOVERY':
        return {
          ...state,
          recoveryInProgress: true
        };
  
      case 'RECOVERY_COMPLETE':
        return {
          ...initialState,
          recoveryInProgress: false
        };
  
      default:
        return state;
    }
  }