// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      // Load domains from environment variables
      domains: getImageDomains(),
      
      // Optional: Load remote patterns for more control
      remotePatterns: getRemotePatterns(),
      
      // Additional image optimization settings
      formats: ['image/avif', 'image/webp'],
      minimumCacheTTL: 60,
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    env: {
      // Expose image domains to the client if needed
      NEXT_PUBLIC_IMAGE_DOMAINS: process.env.IMAGE_DOMAINS || '',
    },
  };
  
  // Function to parse image domains from environment variables
  function getImageDomains() {
    const domains = process.env.IMAGE_DOMAINS || '';
    
    // Split by comma and trim each domain
    return domains
      .split(',')
      .map(domain => domain.trim())
      .filter(domain => domain.length > 0);
  }
  
  // Function to create remote patterns for more granular control
  function getRemotePatterns() {
    const domains = getImageDomains();
    
    return domains.map(domain => ({
      protocol: 'https',
      hostname: domain,
      port: '',
      pathname: '/**',
    }));
  }
  
  // Validate domains on startup
  if (process.env.NODE_ENV === 'production') {
    const domains = getImageDomains();
    if (domains.length === 0) {
      console.warn('⚠️  No image domains configured in IMAGE_DOMAINS environment variable');
    } else {
      console.log('✅ Image domains configured:', domains);
    }
  }
  
  module.exports = nextConfig;