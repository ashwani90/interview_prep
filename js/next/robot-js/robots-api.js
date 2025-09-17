// pages/api/robots.txt
export default function handler(req, res) {
    const isProduction = process.env.NODE_ENV === 'production';
    const isStaging = process.env.NEXT_PUBLIC_APP_ENV === 'staging' || 
                     process.env.VERCEL_ENV === 'preview' || 
                     process.env.NODE_ENV === 'development';
  
    // Set the correct content type
    res.setHeader('Content-Type', 'text/plain');
  
    // Production environment - allow all bots
    if (isProduction && !isStaging) {
      const productionRobots = `
  # Production environment - allow all
  User-agent: *
  Allow: /
  
  # Sitemap
  Sitemap: ${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}/sitemap.xml
      `.trim();
  
      res.send(productionRobots);
      return;
    }
  
    // Staging/development environments - block all bots
    const stagingRobots = `
  # Staging/Development Environment - BLOCK ALL BOTS
  User-agent: *
  Disallow: /
  
  # This is a non-production environment
  # Please do not crawl or index this site
    `.trim();
  
    res.send(stagingRobots);
  }