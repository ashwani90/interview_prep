import React, { useState, useEffect } from 'react';
import LayoutRenderer from './components/LayoutRenderer';
import './App.css';

function App() {
  const [layoutConfig, setLayoutConfig] = useState([]);

  useEffect(() => {
    // Simulate fetching layout from CMS
    const fetchLayout = async () => {
      // In a real app, this would come from an API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setLayoutConfig([
        { id: 'hero1', type: 'heroBanner', props: { 
          title: 'Welcome to our Site',
          content: 'This hero banner was loaded dynamically',
          imageUrl: 'https://via.placeholder.com/1200x400'
        }},
        { id: 'features1', type: 'featureGrid', props: {
          title: 'Our Features',
          items: [
            { title: 'Dynamic Loading', description: 'Components load on demand' },
            { title: 'CMS Driven', description: 'Configure layout without code changes' },
            { title: 'Error Resilient', description: 'Fails gracefully if components break' }
          ]
        }},
        { id: 'cta1', type: 'ctaSection' } // Using default props from registry
      ]);
    };

    fetchLayout();
  }, []);

  return (
    <div className="app">
      <h1>Dynamic Component Injection Demo</h1>
      <LayoutRenderer layoutConfig={layoutConfig} />
    </div>
  );
}

export default App;