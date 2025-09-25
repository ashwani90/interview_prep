import React from 'react';
import { useTable } from '../../../contexts/TableContext';
import DataCell from './DataCell';
import RowHandle from './RowHandle';
import './DataRow.css';

const DataRow = ({ rowIndex, rowData }) => {
  const { rowHeights } = useTable();

  return (
    <tr style={{ height: rowHeights[rowIndex] || 30 }}>
      <RowHandle rowIndex={rowIndex} />
      {rowData.map((cell, colIndex) => (
        <DataCell 
          key={colIndex} 
          rowIndex={rowIndex} 
          colIndex={colIndex} 
          value={cell}
        />
      ))}
    </tr>
  );
};

export default DataRow;