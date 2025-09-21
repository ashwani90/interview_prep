// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      // Enable Server Components
      serverComponents: true,
    },
    // Optional: Add logging for streaming
    logging: {
      fetches: {
        fullUrl: true,
      },
    },
  };
  
  module.exports = nextConfig;