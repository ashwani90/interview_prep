import React from 'react';
import KanbanBoard from './components/KanbanBoard';

export default function App() {
  return (
    <div className="app">
      <h1 className="app-title">Simple Kanban Board</h1>
      <KanbanBoard />
    </div>
  );
}
