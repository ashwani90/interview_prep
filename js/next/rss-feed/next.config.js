// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    // Generate RSS feed during build
    async generateBuildId() {
      // This ensures the RSS feed is generated on every build
      return process.env.GITHUB_SHA || Date.now().toString();
    },
  };
  
  module.exports = nextConfig;