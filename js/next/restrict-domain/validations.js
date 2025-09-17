// lib/image-validation.js
// Get allowed domains from environment (client-side compatible)
export const getAllowedDomains = () => {
    if (typeof window !== 'undefined') {
      // Client-side: use public environment variable
      const domains = process.env.NEXT_PUBLIC_IMAGE_DOMAINS || '';
      return domains.split(',').map(d => d.trim()).filter(Boolean);
    }
    
    // Server-side: use server environment variable
    const domains = process.env.IMAGE_DOMAINS || '';
    return domains.split(',').map(d => d.trim()).filter(Boolean);
  };
  
  // Validate if a URL is from an allowed domain
  export const isValidImageDomain = (url) => {
    if (!url) {
      return { isValid: false, reason: 'URL is required' };
    }
  
    try {
      const allowedDomains = getAllowedDomains();
      
      // Handle relative URLs (always allowed)
      if (url.startsWith('/') || url.startsWith('./') || url.startsWith('../')) {
        return { isValid: true, reason: 'Relative URL' };
      }
  
      // Handle data URLs (base64 images)
      if (url.startsWith('data:')) {
        return { isValid: true, reason: 'Data URL' };
      }
  
      // Handle blob URLs (local files)
      if (url.startsWith('blob:')) {
        return { isValid: true, reason: 'Blob URL' };
      }
  
      // Parse the URL to extract domain
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname;
      
      // Check if the domain is in the allowed list
      const isValid = allowedDomains.some(domain => {
        // Exact match or subdomain match
        return hostname === domain || hostname.endsWith('.' + domain);
      });
  
      return {
        isValid,
        reason: isValid ? 'Domain allowed' : `Domain not allowed: ${hostname}`,
        domain: hostname,
        allowedDomains
      };
    } catch (error) {
      return { isValid: false, reason: 'Invalid URL format', error: error.message };
    }
  };
  
  // Utility function to get domain from URL
  export const getDomainFromUrl = (url) => {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.hostname;
    } catch {
      return null;
    }
  };