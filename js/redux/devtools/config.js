import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const configureStore = () => {
  const middleware = [thunk];
  
  // Development-specific configuration
  if (process.env.NODE_ENV === 'development') {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    
    const devToolsOptions = {
      name: 'My App',
      actionsBlacklist: ['SOME_ACTION_TO_IGNORE'],
      trace: true, // Enable stack traces for actions
      traceLimit: 25, // Limit stack trace depth
      features: {
        pause: true, // Start/pause recording of dispatched actions
        lock: true, // Lock/unlock dispatching actions
        persist: true, // Persist states on page reloading
        export: true, // Export history of actions in a file
        import: 'custom', // Import history of actions from a file
        jump: true, // Jump back and forth (time travel)
        skip: true, // Skip (cancel) actions
        reorder: true, // Drag and drop actions in the history list
        dispatch: true, // Dispatch custom actions or action creators
        test: true // Generate tests for the selected actions
      }
    };

    return createStore(
      rootReducer,
      composeEnhancers(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__(devToolsOptions)
      )
    );
  }

  // Production store (no DevTools)
  return createStore(
    rootReducer,
    applyMiddleware(...middleware)
  );
};

export default configureStore;