// scripts/check-image-domains.js
const { getAllowedDomains } = require('../lib/image-validation');

function checkImageDomains() {
  const domains = getAllowedDomains();
  
  console.log('📋 Current image domain configuration:');
  console.log('Environment:', process.env.NODE_ENV);
  console.log('Allowed domains:', domains.length > 0 ? domains : 'None configured');
  
  if (domains.length === 0) {
    console.warn('⚠️  Warning: No image domains configured!');
    console.log('💡 Set IMAGE_DOMAINS environment variable with comma-separated domains');
  }
  
  // Test some URLs
  const testUrls = [
    'https://images.unsplash.com/photo-123',
    'https://example.com/image.jpg',
    'https://malicious-site.com/bad-image.jpg',
    '/local-image.jpg'
  ];
  
  console.log('\n🧪 Test URL validation:');
  testUrls.forEach(url => {
    const validation = isValidImageDomain(url);
    console.log(`${url} -> ${validation.isValid ? '✅' : '❌'} (${validation.reason})`);
  });
}

// Run if this script is executed directly
if (require.main === module) {
  checkImageDomains();
}

module.exports = { checkImageDomains };