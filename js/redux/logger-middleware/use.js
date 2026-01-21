// Enable logging
store.toggleLogger(true);

// Disable logging
store.toggleLogger(false);

// Toggle logging
store.toggleLogger(!store.getState().logger.isLoggingEnabled);