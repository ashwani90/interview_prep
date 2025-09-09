// hooks/useEdgeInfo.js
'use client';

import { useState, useEffect } from 'react';

export function useEdgeInfo() {
  const [edgeInfo, setEdgeInfo] = useState({
    isEdge: false,
    region: 'unknown',
    latency: 0,
  });

  useEffect(() => {
    async function detectEdge() {
      const start = Date.now();
      
      try {
        const response = await fetch('/api/hello');
        const data = await response.json();
        const latency = Date.now() - start;

        setEdgeInfo({
          isEdge: data.runtime === 'edge',
          region: data.region,
          latency,
          country: data.location?.country,
        });
      } catch (error) {
        console.error('Edge detection failed:', error);
      }
    }

    detectEdge();
  }, []);

  return edgeInfo;
}