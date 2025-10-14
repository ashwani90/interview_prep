// src/components/Tag.js
import React from 'react';

const Tag = ({ label, onRemove }) => {
  return (
    <div className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full mr-2 mb-2">
      <span>{label}</span>
      <button
        className="ml-2 text-blue-500 hover:text-red-600"
        onClick={onRemove}
      >
        ✕
      </button>
    </div>
  );
};

export default Tag;
