// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    // Optional: Redirect to admin login if not authenticated
    async redirects() {
      return [
        {
          source: '/admin',
          destination: '/admin/dashboard',
          permanent: true,
        },
      ];
    },
  };
  
  module.exports = nextConfig;