import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const configureAppStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV === 'development' ? {
      name: 'My App',
      trace: true,
      // other DevTools options
    } : false
  });
};

export default configureAppStore;