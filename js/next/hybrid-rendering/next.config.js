// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    // Different revalidation times based on environment
    env: {
      ISR_REVALIDATION: process.env.NODE_ENV === 'production' ? '3600' : '60',
      SSR_CACHE: process.env.NODE_ENV === 'production' ? 'false' : 'true'
    },
    
    // Enable SWC for better performance
    swcMinify: true,
    
    // Compress responses
    compress: true,
    
    // Optimize images
    images: {
      formats: ['image/avif', 'image/webp'],
      minimumCacheTTL: 60,
    }
  };
  
  module.exports = nextConfig;