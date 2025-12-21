import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Posts from './components/Posts';

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <h1>Redux Thunk Demo</h1>
        <Posts />
      </div>
    </Provider>
  );
};

export default App;