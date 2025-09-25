import React, { useState } from 'react';
import { useTable } from '../../../contexts/TableContext';
import './ColumnHeader.css';

const ColumnHeader = ({ colIndex, width }) => {
  const { setColWidth } = useTable();
  const [isResizing, setIsResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(width || 120);

  const handleMouseDown = (e) => {
    setIsResizing(true);
    setStartX(e.clientX);
    setStartWidth(width || 120);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isResizing) return;
    const newWidth = startWidth + (e.clientX - startX);
    setColWidth(colIndex, Math.max(50, newWidth));
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <th 
      style={{ width: width || 120 }} 
      className={`column-header ${isResizing ? 'resizing' : ''}`}
    >
      {String.fromCharCode(65 + colIndex)}
      <div 
        className="resize-handle" 
        onMouseDown={handleMouseDown}
      />
    </th>
  );
};

export default ColumnHeader;