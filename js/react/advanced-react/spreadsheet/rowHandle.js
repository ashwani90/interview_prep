import React, { useState } from 'react';
import { useTable } from '../../../contexts/TableContext';
import './RowHandle.css';

const RowHandle = ({ rowIndex }) => {
  const { setRowHeight } = useTable();
  const [isResizing, setIsResizing] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startHeight, setStartHeight] = useState(30);

  const handleMouseDown = (e) => {
    setIsResizing(true);
    setStartY(e.clientY);
    setStartHeight(30);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isResizing) return;
    const newHeight = startHeight + (e.clientY - startY);
    setRowHeight(rowIndex, Math.max(20, newHeight));
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <td className="row-handle">
      <div 
        className="resize-handle" 
        onMouseDown={handleMouseDown}
      />
      {rowIndex + 1}
    </td>
  );
};

export default RowHandle;