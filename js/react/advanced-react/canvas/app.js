// src/App.js
import React, { useState } from 'react';
import Canvas from './components/Canvas';
import Toolbar from './components/Toolbar';

const App = () => {
  const [color, setColor] = useState('#000000');
  const [size, setSize] = useState(5);
  const [isErasing, setIsErasing] = useState(false);

  return (
    <div>
      <Toolbar
        color={color}
        setColor={setColor}
        size={size}
        setSize={setSize}
        isErasing={isErasing}
        setIsErasing={setIsErasing}
      />
      <Canvas color={color} size={size} isErasing={isErasing} />
    </div>
  );
};

export default App;
