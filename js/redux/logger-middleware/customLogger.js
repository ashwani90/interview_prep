// Create middleware with custom config
const customLogger = createLoggerMiddleware({
    isEnabled: false, // Start disabled
    collapsed: false, // Don't collapse groups
    logState: false   // Don't log state
  });
  
  // Then use in your middleware array
  const middleware = [customLogger];