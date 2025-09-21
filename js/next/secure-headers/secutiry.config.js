// lib/security-config.js
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

// CSP configuration based on environment
exports.getCspConfig = () => {
  const baseDirectives = {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      ...(isDevelopment ? ["'unsafe-eval'", "'unsafe-inline'"] : []),
    ],
    'style-src': [
      "'self'",
      "'unsafe-inline'", // Required for CSS-in-JS
    ],
    'img-src': [
      "'self'",
      'data:',
      'blob:',
      ...getImageDomains(),
    ],
    'connect-src': [
      "'self'",
      ...(isDevelopment ? ['ws:', 'wss:'] : []),
    ],
    'font-src': ["'self'", 'data:'],
    'object-src': ["'none'"],
    'frame-ancestors': ["'self'"],
  };

  if (isProduction) {
    // Add production-specific CSP rules
    baseDirectives['upgrade-insecure-requests'] = [];
  }

  return {
    useDefaults: true,
    directives: baseDirectives,
  };
};

// Additional security headers
exports.getSecurityHeaders = () => {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  };
};

function getImageDomains() {
  const domains = process.env.IMAGE_DOMAINS || '';
  return domains
    .split(',')
    .map(domain => domain.trim())
    .filter(domain => domain.length > 0);
}