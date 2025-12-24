import React from 'react';
import './Loading.css';

const Loading = ({ small = false }) => {
  return (
    <div className={`loading ${small ? 'small' : ''}`}>
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;