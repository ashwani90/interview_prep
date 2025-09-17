// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      // You can add custom environment variables here
      APP_ENV: process.env.APP_ENV || 'development',
    },
    // Optional: Redirect to the dynamic robots.txt
    async redirects() {
      return [
        {
          source: '/robots.txt',
          destination: '/api/robots.txt',
          permanent: false,
        },
      ];
    },
  };
  
  module.exports = nextConfig;