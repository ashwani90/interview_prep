import React, { createContext, useContext, useState, useCallback } from 'react';

const TableContext = createContext();

export const TableProvider = ({ initialRows = 10, initialCols = 5, children }) => {
  const [data, setData] = useState(() => 
    Array(initialRows).fill().map(() => 
      Array(initialCols).fill().map(() => '')
    )
  );
  const [selection, setSelection] = useState(null);
  const [colWidths, setColWidths] = useState({});
  const [rowHeights, setRowHeights] = useState({});

  const updateCell = useCallback((rowIndex, colIndex, value) => {
    setData(prev => {
      const newData = [...prev];
      newData[rowIndex] = [...newData[rowIndex]];
      newData[rowIndex][colIndex] = value;
      return newData;
    });
  }, []);

  const setColWidth = useCallback((colIndex, width) => {
    setColWidths(prev => ({ ...prev, [colIndex]: width }));
  }, []);

  const setRowHeight = useCallback((rowIndex, height) => {
    setRowHeights(prev => ({ ...prev, [rowIndex]: height }));
  }, []);

  const addRow = useCallback(() => {
    setData(prev => [...prev, Array(prev[0].length).fill('')]);
  }, []);

  const addColumn = useCallback(() => {
    setData(prev => prev.map(row => [...row, '']));
  }, []);

  const handlePaste = useCallback((text) => {
    if (!selection) return;
    
    const { startRow, startCol } = selection;
    const rows = text.split('\n').map(row => row.split('\t'));
    
    setData(prev => {
      const newData = [...prev];
      rows.forEach((row, rowOffset) => {
        const rowIndex = startRow + rowOffset;
        if (rowIndex >= newData.length) return;
        
        newData[rowIndex] = [...newData[rowIndex]];
        row.forEach((cell, colOffset) => {
          const colIndex = startCol + colOffset;
          if (colIndex < newData[rowIndex].length) {
            newData[rowIndex][colIndex] = cell;
          }
        });
      });
      return newData;
    });
  }, [selection]);

  return (
    <TableContext.Provider
      value={{
        data,
        selection,
        colWidths,
        rowHeights,
        updateCell,
        setSelection,
        setColWidth,
        setRowHeight,
        addRow,
        addColumn,
        handlePaste
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export const useTable = () => useContext(TableContext);