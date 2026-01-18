import { createStore, applyMiddleware } from 'redux';
import { loggerMiddleware } from '../middleware/logger';
import rootReducer from './reducers';

const configureStore = (preloadedState) => {
  const middleware = [loggerMiddleware];
  
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middleware)
  );

  // Attach toggle function to store for easy access
  store.toggleLogger = (enabled) => {
    loggerMiddleware.toggleLogging(enabled);
  };

  return store;
};

export default configureStore;