// hooks/useEnv.js
'use client';

import { useState, useEffect } from 'react';

export function useEnv() {
  const [env, setEnv] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEnv() {
      try {
        // Try to load from generated config file
        const response = await fetch('/env-config.json', {
          cache: 'no-store',
        });
        
        if (response.ok) {
          const config = await response.json();
          setEnv(config);
        } else {
          // Fallback to process.env (build-time injected)
          setEnv({
            buildTime: process.env.BUILD_TIME,
            environment: process.env.NEXT_PUBLIC_APP_ENV,
            version: process.env.NEXT_PUBLIC_APP_VERSION,
            config: {
              NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
              NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
              NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
            },
          });
        }
      } catch (error) {
        console.warn('Failed to load environment config:', error);
        // Fallback to empty config
        setEnv({
          buildTime: new Date().toISOString(),
          environment: 'development',
          version: '1.0.0',
          config: {},
        });
      } finally {
        setLoading(false);
      }
    }

    loadEnv();
  }, []);

  return { env, loading };
}