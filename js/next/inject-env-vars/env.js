// lib/env.js
// Server-side environment variables (not exposed to client)
export const getServerEnv = () => {
    return {
      // API URLs
      API_URL: process.env.API_URL,
      INTERNAL_API_URL: process.env.INTERNAL_API_URL,
      
      // Authentication
      AUTH_SECRET: process.env.AUTH_SECRET,
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
      
      // Database
      DATABASE_URL: process.env.DATABASE_URL,
      
      // Analytics
      ANALYTICS_ID: process.env.ANALYTICS_ID,
      
      // Feature flags (server-side)
      ENABLE_BETA_FEATURES: process.env.ENABLE_BETA_FEATURES === 'true',
    };
  };
  
  // Client-side environment variables (exposed via NEXT_PUBLIC_ prefix)
  export const getClientEnv = () => {
    return {
      // Public API URL
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
      
      // App configuration
      NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
      NEXT_PUBLIC_APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION,
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
      
      // Third-party services
      NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
      NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      
      // Feature flags (client-side)
      NEXT_PUBLIC_ENABLE_NEW_UI: process.env.NEXT_PUBLIC_ENABLE_NEW_UI === 'true',
      NEXT_PUBLIC_MAINTENANCE_MODE: process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true',
    };
  };
  
  // Validation function
  export const validateEnv = () => {
    const clientEnv = getClientEnv();
    const requiredClientVars = [
      'NEXT_PUBLIC_API_URL',
      'NEXT_PUBLIC_APP_ENV',
      'NEXT_PUBLIC_SITE_URL',
    ];
  
    const missingVars = requiredClientVars.filter(
      varName => !clientEnv[varName]
    );
  
    if (missingVars.length > 0) {
      throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
    }
  
    return true;
  };
  
  // Type-safe environment access
  export const env = {
    // Server-side (throws if accessed on client)
    server: getServerEnv(),
    
    // Client-side (safe for both server and client)
    client: getClientEnv(),
    
    // Runtime check for environment
    isProduction: () => process.env.NEXT_PUBLIC_APP_ENV === 'production',
    isDevelopment: () => process.env.NEXT_PUBLIC_APP_ENV === 'development',
    isStaging: () => process.env.NEXT_PUBLIC_APP_ENV === 'staging',
  };