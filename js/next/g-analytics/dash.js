// components/PerformanceDashboard.js
'use client';

import { useState, useEffect } from 'react';

export default function PerformanceDashboard() {
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    // Listen for web vitals (development only)
    if (process.env.NODE_ENV === 'development') {
      const handleVitals = (event) => {
        if (event.detail && event.detail.name) {
          setMetrics(prev => ({
            ...prev,
            [event.detail.name]: event.detail,
          }));
        }
      };

      window.addEventListener('web-vital', handleVitals);
      return () => window.removeEventListener('web-vital', handleVitals);
    }
  }, []);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200 z-50 max-w-sm">
      <h3 className="font-semibold mb-2">Web Vitals (Dev)</h3>
      <div className="space-y-2 text-sm">
        {Object.entries(metrics).map(([name, metric]) => (
          <div key={name} className="flex justify-between">
            <span className="font-medium">{name}:</span>
            <span className={getColorClass(metric.rating)}>
              {Math.round(metric.value)}ms ({metric.rating})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function getColorClass(rating) {
  switch (rating) {
    case 'good': return 'text-green-600';
    case 'needs-improvement': return 'text-yellow-600';
    case 'poor': return 'text-red-600';
    default: return 'text-gray-600';
  }
}