import React, { useState, useRef, useEffect } from 'react';
import { useTable } from '../../../contexts/TableContext';
import './DataCell.css';

const DataCell = ({ rowIndex, colIndex, value }) => {
  const { updateCell, selection, setSelection, handlePaste } = useTable();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef(null);

  const isSelected = selection?.startRow === rowIndex && 
                    selection?.startCol === colIndex;

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  const handleClick = () => {
    setSelection({
      startRow: rowIndex,
      startCol: colIndex,
      endRow: rowIndex,
      endCol: colIndex
    });
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
    setTimeout(() => inputRef.current?.select(), 0);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      updateCell(rowIndex, colIndex, editValue);
      setIsEditing(false);
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditValue(value);
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
      navigator.clipboard.readText().then(handlePaste);
    }
  };

  const handleBlur = () => {
    updateCell(rowIndex, colIndex, editValue);
    setIsEditing(false);
  };

  return (
    <td 
      className={`data-cell ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        value
      )}
    </td>
  );
};

export default DataCell;