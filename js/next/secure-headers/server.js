// server.js
const express = require('express');
const helmet = require('helmet');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = express();

  // ======================
  // HELMET CONFIGURATION
  // ======================
  server.use(helmet({
    // Disable some headers that might conflict with Next.js
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        'default-src': ["'self'"],
        'script-src': [
          "'self'",
          "'unsafe-eval'", // Required for Next.js development
          "'unsafe-inline'", // Required for Next.js
          ...(dev ? ["'unsafe-eval'", "'unsafe-inline'"] : []),
        ],
        'style-src': [
          "'self'",
          "'unsafe-inline'", // Required for Next.js styles
          ...(dev ? ["'unsafe-inline'"] : []),
        ],
        'img-src': [
          "'self'",
          'data:',
          'blob:',
          ...getImageDomains(), // Your allowed image domains
        ],
        'connect-src': [
          "'self'",
          ...(dev ? ['ws:', 'wss:'] : []), // WebSocket for dev
        ],
        'font-src': ["'self'", 'data:'],
        'frame-src': ["'self'"],
        'object-src': ["'none'"],
        'media-src': ["'self'"],
        'form-action': ["'self'"],
        'frame-ancestors': ["'self'"],
        'upgrade-insecure-requests': dev ? null : [],
      },
    },
    crossOriginEmbedderPolicy: dev ? false : true,
    crossOriginOpenerPolicy: dev ? false : true,
    crossOriginResourcePolicy: { policy: "same-site" },
  }));

  // ======================
  // ADDITIONAL SECURITY HEADERS
  // ======================
  server.use((req, res, next) => {
    // Remove X-Powered-By header
    res.removeHeader('X-Powered-By');
    
    // Set X-Content-Type-Options
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
    // Set X-Frame-Options
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    
    // Set Referrer-Policy
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Set Permissions-Policy
    res.setHeader(
      'Permissions-Policy',
      'camera=(), microphone=(), geolocation=(), interest-cohort=()'
    );
    
    // Set X-DNS-Prefetch-Control
    res.setHeader('X-DNS-Prefetch-Control', 'on');
    
    next();
  });

  // ======================
  // ROUTE-SPECIFIC HEADERS
  // ======================
  
  // Static files with long cache headers
  server.use('/_next/static', (req, res, next) => {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    next();
  });

  // API routes - no cache
  server.use('/api', (req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    next();
  });

  // ======================
  // CUSTOM ROUTES
  // ======================
  
  // Health check endpoint
  server.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
  });

  // ======================
  // NEXT.JS REQUEST HANDLING
  // ======================
  
  // Handle all other requests with Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // ======================
  // ERROR HANDLING
  // ======================
  
  server.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
  });

  // ======================
  // START SERVER
  // ======================
  
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`
      🚀 Server running on port ${port}
      📁 Environment: ${dev ? 'development' : 'production'}
      🔒 Security headers enabled
      🌐 Next.js ready
    `);
    
    // Log security configuration
    console.log('🔐 Security Configuration:');
    console.log('   - Helmet.js enabled');
    console.log('   - CSP configured');
    console.log('   - Additional security headers set');
  });
});

// ======================
// HELPER FUNCTIONS
// ======================

function getImageDomains() {
  const domains = process.env.IMAGE_DOMAINS || '';
  return domains
    .split(',')
    .map(domain => domain.trim())
    .filter(domain => domain.length > 0);
}