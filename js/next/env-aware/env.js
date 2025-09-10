// lib/env.js
export const getApiUrl = () => {
    if (typeof window !== 'undefined') {
      // Client-side: use public environment variable
      return process.env.NEXT_PUBLIC_API_URL;
    }
  
    // Server-side: use server environment variable with fallback
    return process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
  };
  
  export const getEnvironment = () => {
    return process.env.NEXT_PUBLIC_APP_ENV || 'development';
  };
  
  export const isProduction = () => {
    return getEnvironment() === 'production';
  };
  
  export const isDevelopment = () => {
    return getEnvironment() === 'development';
  };
  
  export const isStaging = () => {
    return getEnvironment() === 'staging';
  };
  
  // Environment-specific configuration
  export const envConfig = {
    development: {
      apiUrl: process.env.API_URL || 'http://localhost:3001/api',
      cdnUrl: 'http://localhost:3001/cdn',
      analytics: false,
      cacheTTL: 60, // 1 minute
    },
    staging: {
      apiUrl: process.env.API_URL || 'https://staging-api.example.com/api',
      cdnUrl: 'https://staging-cdn.example.com',
      analytics: true,
      cacheTTL: 300, // 5 minutes
    },
    production: {
      apiUrl: process.env.API_URL || 'https://api.example.com/api',
      cdnUrl: 'https://cdn.example.com',
      analytics: true,
      cacheTTL: 3600, // 1 hour
    },
  };
  
  export const getConfig = () => {
    const env = getEnvironment();
    return envConfig[env] || envConfig.development;
  };