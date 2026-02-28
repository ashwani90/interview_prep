import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Counter from './components/Counter';
import UndoRedoControls from './components/UndoRedoControls';

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <h1>Redux Undo/Redo Demo</h1>
        <UndoRedoControls />
        <Counter />
      </div>
    </Provider>
  );
};

export default App;