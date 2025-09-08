// pages/api/cache-control.js
export default function handler(req, res) {
    // Set appropriate cache headers
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    
    // Add ETag for cache validation
    const etag = require('crypto')
      .createHash('md5')
      .update(Date.now().toString())
      .digest('hex');
    
    res.setHeader('ETag', etag);
    
    // Handle If-None-Match header for 304 responses
    if (req.headers['if-none-match'] === etag) {
      res.status(304).end();
      return;
    }
    
    res.json({ message: 'Cached response' });
  }