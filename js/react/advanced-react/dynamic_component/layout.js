import React from 'react';
import DynamicLoader from './DynamicLoader';
import './LayoutRenderer.css';

const LayoutRenderer = ({ layoutConfig }) => {
  return (
    <div className="layout-renderer">
      {layoutConfig.map((componentData, index) => (
        <section key={`${componentData.id}-${index}`} className="layout-section">
          <DynamicLoader {...componentData} />
        </section>
      ))}
    </div>
  );
};

export default LayoutRenderer;