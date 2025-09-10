// components/WebVitalsTracker.js
'use client';

import { useEffect } from 'react';
import { onCLS, onFID, onFCP, onLCP, onTTFB, onINP } from 'web-vitals';
import { trackWebVital } from '../lib/gtag';

export default function WebVitalsTracker() {
  useEffect(() => {
    // Track Core Web Vitals
    onCLS(trackWebVital);
    onFID(trackWebVital);
    onFCP(trackWebVital);
    onLCP(trackWebVital);
    onTTFB(trackWebVital);
    onINP(trackWebVital);

    // Track additional performance metrics
    if ('connection' in navigator) {
      const connection = navigator.connection;
      
      if (connection) {
        // Track connection type
        trackWebVital({
          name: 'Connection Type',
          value: 1,
          id: 'connection-type',
          rating: 'good',
          delta: 0,
        });

        // Track effective connection type
        trackWebVital({
          name: 'Effective Connection',
          value: 1,
          id: 'effective-connection',
          rating: 'good',
          delta: 0,
        });
      }
    }

    // Track memory usage if available
    if ('memory' in performance) {
      performance.memory.then((memory) => {
        trackWebVital({
          name: 'Memory Usage',
          value: memory.usedJSHeapSize / 1024 / 1024, // Convert to MB
          id: 'memory-usage',
          rating: 'good',
          delta: 0,
        });
      });
    }

  }, []);

  return null; // This component doesn't render anything
}