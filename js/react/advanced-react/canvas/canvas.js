// src/components/Canvas.js
import React, { useRef, useEffect, useState } from 'react';

const Canvas = ({ color, size, isErasing }) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctxRef.current = ctx;
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.strokeStyle = isErasing ? 'white' : color;
    ctxRef.current.lineWidth = size;
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  };

  const exportImage = () => {
    const image = canvasRef.current.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = image;
    link.click();
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        onMouseLeave={finishDrawing}
        className="fixed top-0 left-0 z-0 bg-white"
      />
      <button
        onClick={exportImage}
        className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow"
      >
        Export PNG
      </button>
    </>
  );
};

export default Canvas;
