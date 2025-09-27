import React, { useEffect, useRef, useState } from 'react';
import './Waveform.css';

const Waveform = ({ currentTime, duration, onSeek }) => {
  const canvasRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // Draw waveform (simplified - in a real app you'd analyze audio data)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw progress background
    const progressWidth = (currentTime / duration) * width;
    ctx.fillStyle = '#4a8fe7';
    ctx.fillRect(0, 0, progressWidth, height);

    // Draw waveform (simulated)
    ctx.fillStyle = '#e0e0e0';
    const barCount = 100;
    const barWidth = width / barCount;

    for (let i = 0; i < barCount; i++) {
      const barHeight = Math.random() * height;
      const x = i * barWidth;
      ctx.fillRect(x, height - barHeight, barWidth - 2, barHeight);
    }
  }, [currentTime, duration]);

  const handleClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const seekTime = (clickX / canvas.width) * duration;
    onSeek(seekTime);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      handleClick(e);
    }
  };

  return (
    <div className="waveform-container">
      <canvas
        ref={canvasRef}
        width={800}
        height={80}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
      />
    </div>
  );
};

export default Waveform;