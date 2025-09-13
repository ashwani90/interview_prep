// components/EnvProvider.js
'use client';

import { createContext, useContext } from 'react';
import { useEnv } from '../hooks/useEnv';

const EnvContext = createContext();

export function EnvProvider({ children }) {
  const { env, loading } = useEnv();

  const value = {
    ...env?.config,
    buildTime: env?.buildTime,
    environment: env?.environment,
    version: env?.version,
    isLoading: loading,
    isProduction: env?.environment === 'production',
    isDevelopment: env?.environment === 'development',
    isStaging: env?.environment === 'staging',
  };

  return (
    <EnvContext.Provider value={value}>
      {children}
    </EnvContext.Provider>
  );
}

export const useEnvContext = () => {
  const context = useContext(EnvContext);
  if (!context) {
    throw new Error('useEnvContext must be used within an EnvProvider');
  }
  return context;
};