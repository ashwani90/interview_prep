// scripts/verify-headers.js
const https = require('https');
const http = require('http');

function checkHeaders(url) {
  const client = url.startsWith('https') ? https : http;
  
  client.get(url, (res) => {
    console.log(`\n🔍 Checking headers for: ${url}`);
    console.log('Status Code:', res.statusCode);
    console.log('\n📋 Security Headers:');
    
    const securityHeaders = [
      'content-security-policy',
      'x-content-type-options',
      'x-frame-options',
      'x-xss-protection',
      'referrer-policy',
      'permissions-policy',
      'strict-transport-security',
    ];
    
    securityHeaders.forEach(header => {
      const value = res.headers[header] || res.headers[header.toLowerCase()];
      console.log(`${header}: ${value || '❌ Not set'}`);
    });
    
    console.log('\n📊 All Headers:');
    Object.keys(res.headers).forEach(header => {
      console.log(`${header}: ${res.headers[header]}`);
    });
  }).on('error', (err) => {
    console.error('Error:', err.message);
  });
}

// Check local development server
checkHeaders('http://localhost:3000');
checkHeaders('http://localhost:3000/health');