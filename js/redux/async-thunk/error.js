import React from 'react';
import './Error.css';

const Error = ({ message }) => {
  return (
    <div className="error">
      <p>Error: {message}</p>
    </div>
  );
};

export default Error;