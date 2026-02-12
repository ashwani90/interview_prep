// In store.js
export function configureAppStore() {
    const store = configureStore({
      reducer: {
        auth: authReducer,
        // Other static reducers...
      },
      middleware: [...],
    });
  
    // Add async reducers
    store.asyncReducers = {};
    
    store.injectReducer = (key, asyncReducer) => {
      store.asyncReducers[key] = asyncReducer;
      store.replaceReducer(
        combineReducers({
          auth: authReducer,
          ...store.asyncReducers
        })
      );
    };
  
    return store;
  }