import React from 'react';
import { useTable } from '../../../contexts/TableContext';
import ColumnHeader from './ColumnHeader';
import './HeaderRow.css';

const HeaderRow = () => {
  const { data, colWidths } = useTable();
  const columns = data[0] || [];

  return (
    <thead>
      <tr>
        <th className="corner-cell"></th>
        {columns.map((_, colIndex) => (
          <ColumnHeader 
            key={colIndex} 
            colIndex={colIndex} 
            width={colWidths[colIndex]}
          />
        ))}
      </tr>
    </thead>
  );
};

export default HeaderRow;