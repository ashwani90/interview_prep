// Default configuration
const defaultConfig = {
    isEnabled: true,
    collapsed: true,
    logState: true
  };
  
  const createLoggerMiddleware = (config = {}) => {
    // Merge default config with user config
    const loggerConfig = { ...defaultConfig, ...config };
    
    // Store the enabled state
    let isEnabled = loggerConfig.isEnabled;
  
    // Function to toggle logging
    const toggleLogging = (enabled) => {
      isEnabled = enabled;
      console.log(`Redux logging ${enabled ? 'enabled' : 'disabled'}`);
    };
  
    // The actual middleware
    return store => next => action => {
      if (!isEnabled) {
        return next(action);
      }
  
      // Log group styling
      const groupStyle = `
        color: #764ABC;
        font-weight: bold;
        font-size: 1.1em;
      `;
      const actionStyle = 'color: #03A9F4; font-weight: bold;';
      const payloadStyle = 'color: #4CAF50;';
      const stateStyle = 'color: #9E9E9E;';
  
      try {
        if (loggerConfig.collapsed) {
          console.groupCollapsed(`%cRedux Action: %c${action.type}`, groupStyle, actionStyle);
        } else {
          console.group(`%cRedux Action: %c${action.type}`, groupStyle, actionStyle);
        }
  
        // Log action payload
        console.log('%cPayload:', payloadStyle, action.payload);
  
        // Log current state before dispatch
        console.log('%cState before:', stateStyle, store.getState());
  
        // Dispatch the action
        const result = next(action);
  
        // Log state after dispatch if configured
        if (loggerConfig.logState) {
          console.log('%cState after:', stateStyle, store.getState());
        }
  
        console.groupEnd();
        return result;
      } catch (err) {
        console.error('Error in logger middleware:', err);
        return next(action);
      }
    };
  };
  
  // Export both the creator and the toggle function
  export const loggerMiddleware = createLoggerMiddleware();
  export const toggleLogger = createLoggerMiddleware().toggleLogging;