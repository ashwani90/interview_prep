// lib/domains.js
export const DOMAINS = {
    production: {
      main: 'mydomain.com',
      wildcard: '*.mydomain.com',
      api: 'api.mydomain.com',
      cdn: 'cdn.mydomain.com',
      blog: 'blog.mydomain.com',
      support: 'support.mydomain.com'
    },
    development: {
      main: 'localhost:3000',
      wildcard: '*.localhost:3000',
      api: 'localhost:3001',
      cdn: 'localhost:3002'
    }
  };
  
  export function getDomainConfig() {
    const isProduction = process.env.NODE_ENV === 'production';
    return isProduction ? DOMAINS.production : DOMAINS.development;
  }
  
  export function isValidSubdomain(hostname) {
    const config = getDomainConfig();
    const mainDomain = config.main;
    
    // Check if it's a subdomain of our main domain
    return hostname.endsWith(mainDomain) && hostname !== mainDomain;
  }
  
  export function extractSubdomain(hostname) {
    const config = getDomainConfig();
    const mainDomain = config.main;
    
    if (hostname.endsWith(mainDomain)) {
      return hostname.replace(`.${mainDomain}`, '');
    }
    
    return null;
  }
  
  export function isWildcardDomain(hostname) {
    const config = getDomainConfig();
    return hostname.endsWith(config.main) && hostname !== config.main;
  }
  
  export function constructSubdomainUrl(subdomain, path = '') {
    const config = getDomainConfig();
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    
    if (subdomain === 'www' || subdomain === '') {
      return `${protocol}://${config.main}${path}`;
    }
    
    return `${protocol}://${subdomain}.${config.main}${path}`;
  }