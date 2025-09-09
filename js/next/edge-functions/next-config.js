// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      // Enable edge runtime for middleware and routes
      runtime: 'experimental-edge',
    },
    // Optional: Configure which pages use edge runtime
    env: {
      EDGE_ENABLED: process.env.EDGE_ENABLED || 'true',
    },
  };
  
  module.exports = nextConfig;