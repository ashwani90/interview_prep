import React from 'react';
import { useTable } from '../../contexts/TableContext';
import HeaderRow from './HeaderRow';
import DataRow from './DataRow';
import './Table.css';

const Table = () => {
  const { data, addRow, addColumn } = useTable();

  return (
    <div className="spreadsheet-container">
      <div className="spreadsheet-scroll">
        <table className="spreadsheet-table">
          <HeaderRow />
          <tbody>
            {data.map((row, rowIndex) => (
              <DataRow key={rowIndex} rowIndex={rowIndex} rowData={row} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-controls">
        <button onClick={addRow}>Add Row</button>
        <button onClick={addColumn}>Add Column</button>
      </div>
    </div>
  );
};

export default Table;