import React from 'react';
import './FeatureGrid.css';

const FeatureGrid = ({ title, items = [] }) => {
  return (
    <div className="feature-grid">
      <h2>{title}</h2>
      <div className="grid">
        {items.map((item, index) => (
          <div key={index} className="grid-item">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureGrid;