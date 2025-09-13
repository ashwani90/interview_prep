// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    // Internationalized routing
    i18n: {
      locales: ['en', 'fr', 'es', 'de', 'ja'],
      defaultLocale: 'en',
      localeDetection: false, // We handle detection in middleware
    },
  };
  
  module.exports = nextConfig;