import React, { Suspense, useState, useEffect } from 'react';
import { fetchComponentConfig, componentRegistry } from '../services/componentRegistry';
import ErrorBoundary from './ErrorBoundary';
import './DynamicLoader.css';

const DynamicLoader = ({ componentId, ...initialProps }) => {
  const [componentConfig, setComponentConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadComponent = async () => {
      try {
        setLoading(true);
        const config = await fetchComponentConfig(componentId);
        setComponentConfig(config);
      } catch (err) {
        console.error(`Failed to load component ${componentId}:`, err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadComponent();
  }, [componentId]);

  if (loading) return <div className="loader">Loading component...</div>;
  if (error) return <div className="error">Component load failed</div>;
  if (!componentConfig) return null;

  const componentInfo = componentRegistry[componentConfig.type];
  if (!componentInfo) return <div>Unknown component type</div>;

  const Component = React.lazy(() => import(`${componentInfo.path}`));

  return (
    <ErrorBoundary>
      <Suspense fallback={<div className="loader">Loading component...</div>}>
        <Component {...initialProps} {...componentConfig.props} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default DynamicLoader;