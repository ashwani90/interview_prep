// hooks/useWebVitals.js
'use client';

import { useEffect } from 'react';
import { reportWebVitals } from '../lib/web-vitals';

export function useWebVitals() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      reportWebVitals();
    } else {
      // Development mode: log to console and dispatch events for dashboard
      const vitalsHandler = (metric) => {
        console.log('Web Vital:', metric);
        window.dispatchEvent(new CustomEvent('web-vital', { detail: metric }));
      };

      require('web-vitals').onCLS(vitalsHandler);
      require('web-vitals').onFID(vitalsHandler);
      require('web-vitals').onFCP(vitalsHandler);
      require('web-vitals').onLCP(vitalsHandler);
      require('web-vitals').onTTFB(vitalsHandler);
      require('web-vitals').onINP(vitalsHandler);
    }
  }, []);
}