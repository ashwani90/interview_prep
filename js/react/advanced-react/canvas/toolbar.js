// src/components/Toolbar.js
import React from 'react';

const Toolbar = ({ color, setColor, size, setSize, isErasing, setIsErasing }) => {
  return (
    <div className="fixed top-4 left-4 bg-white p-4 rounded shadow z-10 space-y-4">
      <div>
        <label className="block mb-1">Color:</label>
        <input type="color" value={color} onChange={e => setColor(e.target.value)} />
      </div>

      <div>
        <label className="block mb-1">Stroke Size:</label>
        <input
          type="range"
          min="1"
          max="50"
          value={size}
          onChange={e => setSize(e.target.value)}
        />
        <span className="ml-2">{size}px</span>
      </div>

      <div>
        <button
          onClick={() => setIsErasing(!isErasing)}
          className={`px-3 py-1 rounded ${isErasing ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
        >
          {isErasing ? 'Eraser On' : 'Eraser Off'}
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
