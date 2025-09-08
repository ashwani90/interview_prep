/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable static exports for optimal caching
    output: 'export',
    
    // Optional: Add trailing slashes for better caching consistency
    trailingSlash: true,
    
    // Configure caching headers
    async headers() {
      return [
        {
          source: '/:path*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
        {
          // More specific rules for static assets
          source: '/_next/static/:path*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
        {
          // For static pages
          source: '/static/:path*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
        {
          // For images and media files
          source: '/images/:path*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
      ];
    },
    
    // Enable compression for better performance
    compress: true,
    
    // Optimize images (if using next/image)
    images: {
      formats: ['image/avif', 'image/webp'],
      minimumCacheTTL: 31536000, // 1 year
    },
  };
  
  module.exports = nextConfig;