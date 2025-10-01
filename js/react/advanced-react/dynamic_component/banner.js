import React from 'react';
import './HeroBanner.css';

const HeroBanner = ({ title, content, imageUrl }) => {
  return (
    <div className="hero-banner">
      {imageUrl && <img src={imageUrl} alt={title} className="hero-image" />}
      <div className="hero-content">
        <h1>{title}</h1>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default HeroBanner;