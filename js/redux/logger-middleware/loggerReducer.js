const initialState = {
    isLoggingEnabled: true
  };
  
  const loggerReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGGER/ENABLE':
        return { ...state, isLoggingEnabled: true };
      case 'LOGGER/DISABLE':
        return { ...state, isLoggingEnabled: false };
      case 'LOGGER/TOGGLE':
        return { ...state, isLoggingEnabled: !state.isLoggingEnabled };
      default:
        return state;
    }
  };
  
  export default loggerReducer;