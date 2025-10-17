import React from 'react';
import { ListProvider } from './contexts/ListContext';
import List from './components/ReorderableList/List';
import './App.css';

function App() {
  return (
    <div className="app">
      <ListProvider>
        <List />
      </ListProvider>
    </div>
  );
}

export default App;