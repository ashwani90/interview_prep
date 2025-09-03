// hooks/useRateLimit.js
'use client';

import { useState, useEffect } from 'react';

export function useRateLimit() {
  const [limits, setLimits] = useState({});
  const [isLimited, setIsLimited] = useState(false);

  useEffect(() => {
    // Monitor fetch requests for rate limit headers
    const originalFetch = window.fetch;
    
    window.fetch = async function(...args) {
      const response = await originalFetch.apply(this, args);
      
      if (response.headers.has('X-RateLimit-Remaining')) {
        const limit = parseInt(response.headers.get('X-RateLimit-Limit'));
        const remaining = parseInt(response.headers.get('X-RateLimit-Remaining'));
        const reset = parseInt(response.headers.get('X-RateLimit-Reset'));
        
        setLimits({ limit, remaining, reset });
        setIsLimited(remaining === 0);
        
        if (remaining === 0) {
          console.warn('Rate limit exceeded. Please slow down.');
        }
      }
      
      return response;
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  return { limits, isLimited };
}