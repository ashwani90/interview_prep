import React from 'react';
import { BookmarkProvider } from './contexts/BookmarkContext';
import BookmarkList from './components/BookmarkList';
import './App.css';

function App() {
  return (
    <div className="app">
      <h1>Bookmark Manager</h1>
      <BookmarkProvider>
        <BookmarkList />
      </BookmarkProvider>
    </div>
  );
}

export default App;