// src/components/VirtualizedList/Row.jsx
import React, { forwardRef, useEffect, useRef } from 'react';

const Row = forwardRef(({ data, index, style }, ref) => {
  const { items, setRowHeight } = data;
  const rowRef = useRef();
  const item = items[index];

  useEffect(() => {
    if (rowRef.current) {
      // Measure and set row height after render
      setRowHeight(index, rowRef.current.clientHeight);
    }
  }, [index, setRowHeight]);

  return (
    <div style={style} ref={ref}>
      <div ref={rowRef}>
        {item ? (
          <div style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div>Row #{index + 1}</div>
          </div>
        ) : (
          <div style={{ padding: '10px', textAlign: 'center' }}>Loading...</div>
        )}
      </div>
    </div>
  );
});

export default Row;