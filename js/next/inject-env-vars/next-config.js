// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      // Expose environment variables to the client
      NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
      NEXT_PUBLIC_APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION,
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
      NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
    },
    
    // Webpack configuration to inject environment variables
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      // Define global constants for build-time injection
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.BUILD_ID': JSON.stringify(buildId),
          'process.env.BUILD_TIME': JSON.stringify(new Date().toISOString()),
          'process.env.IS_SERVER': JSON.stringify(isServer),
          'process.env.IS_PRODUCTION': JSON.stringify(!dev),
        })
      );
      
      return config;
    },
    
    // Environment-aware settings
    compress: process.env.NEXT_PUBLIC_APP_ENV === 'production',
    poweredByHeader: process.env.NEXT_PUBLIC_APP_ENV !== 'production',
  };
  
  module.exports = nextConfig;