// lib/cache-config.js
export const getCacheConfig = () => {
    const isProduction = process.env.NODE_ENV === 'production';
    
    return {
      staticAssets: isProduction 
        ? 'public, max-age=31536000, immutable' 
        : 'no-cache',
      
      pages: isProduction
        ? 'public, max-age=3600, stale-while-revalidate=86400'
        : 'no-cache',
      
      api: isProduction
        ? 'public, max-age=300, stale-while-revalidate=3600'
        : 'no-cache'
    };
  };