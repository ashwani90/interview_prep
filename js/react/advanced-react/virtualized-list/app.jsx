// src/App.jsx
import React from 'react';
import VirtualizedList from './components/VirtualizedList/VirtualizedList';

// Mock data fetcher
const fetchData = async (page) => {
  const pageSize = 20;
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  
  return Array.from({ length: pageSize }, (_, i) => ({
    id: (page - 1) * pageSize + i,
    title: `Item ${(page - 1) * pageSize + i + 1}`,
    description: `Description for item ${(page - 1) * pageSize + i + 1}. ` +
      'This is a longer description that will make the row height dynamic.',
  }));
};

function App() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1>Virtualized List with Infinite Loading</h1>
      <VirtualizedList fetchData={fetchData} estimatedRowHeight={80} />
    </div>
  );
}

export default App;