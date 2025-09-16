// lib/preload-utils.js
import { headers } from 'next/headers';

// Get preloaded data from request headers
export function getPreloadedData() {
  try {
    const headersList = headers();
    const preloadedDataHeader = headersList.get('x-preloaded-data');
    
    if (preloadedDataHeader) {
      const data = JSON.parse(preloadedDataHeader);
      
      // Validate that data isn't too old (e.g., > 5 seconds)
      const maxAge = 5 * 1000; // 5 seconds
      if (Date.now() - data.timestamp > maxAge) {
        console.log('Preloaded data expired, ignoring');
        return null;
      }
      
      return data;
    }
  } catch (error) {
    console.error('Error parsing preloaded data:', error);
  }
  
  return null;
}

// Check if data was preloaded
export function hasPreloadedData() {
  const data = getPreloadedData();
  return data !== null;
}

// Create headers with preloaded data
export function createPreloadHeaders(data) {
  const headers = new Headers();
  headers.set('x-preloaded-data', JSON.stringify({
    ...data,
    timestamp: Date.now(),
  }));
  return headers;
}