import React from 'react';
import { FileExplorerProvider } from './contexts/FileExplorerContext';
import FileExplorer from './components/FileExplorer/FileExplorer';
import './App.css';

function App() {
  return (
    <div className="app">
      <FileExplorerProvider>
        <FileExplorer />
      </FileExplorerProvider>
    </div>
  );
}

export default App;