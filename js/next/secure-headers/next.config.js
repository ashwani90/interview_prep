// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    // Disable X-Powered-By header (redundant since we remove it in Express)
    poweredByHeader: false,
    
    // Enable compression
    compress: true,
    
    // Security headers (will be overridden by Express helmet)
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff'
            },
            {
              key: 'X-Frame-Options',
              value: 'SAMEORIGIN'
            }
          ],
        },
      ];
    },
  };
  
  module.exports = nextConfig;