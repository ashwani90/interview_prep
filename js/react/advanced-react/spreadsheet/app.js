import React from 'react';
import { TableProvider } from './contexts/TableContext';
import Table from './components/SpreadsheetTable/Table';
import './App.css';

function App() {
  return (
    <div className="app">
      <h1>React Spreadsheet</h1>
      <TableProvider initialRows={20} initialCols={10}>
        <Table />
      </TableProvider>
    </div>
  );
}

export default App;