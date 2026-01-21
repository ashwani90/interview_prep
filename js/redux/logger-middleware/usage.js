import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './App';
import LoggerToggle from './components/LoggerToggle';

const store = configureStore();

const Root = () => (
  <Provider store={store}>
    <LoggerToggle />
    <App />
  </Provider>
);

export default Root;