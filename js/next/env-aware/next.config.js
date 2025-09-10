// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      // Expose environment variables to the client
      NEXT_PUBLIC_APP_ENV: process.env.APP_ENV || 'development',
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    },
    
    // Environment-aware logging
    logging: {
      fetches: {
        fullUrl: process.env.APP_ENV !== 'production',
      },
    },
  };
  
  module.exports = nextConfig;