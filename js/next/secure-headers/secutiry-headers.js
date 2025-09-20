// pages/api/security-headers.js
export default function handler(req, res) {
    // This endpoint demonstrates the security headers
    res.status(200).json({
      message: 'Security headers test',
      headers: {
        'x-content-type-options': res.getHeader('x-content-type-options'),
        'x-frame-options': res.getHeader('x-frame-options'),
        'x-xss-protection': res.getHeader('x-xss-protection'),
        'referrer-policy': res.getHeader('referrer-policy'),
      },
      timestamp: new Date().toISOString(),
    });
  }