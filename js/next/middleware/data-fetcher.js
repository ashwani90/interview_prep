// lib/data-fetcher.js
const cache = new Map();

export async function fetchData(url, options = {}) {
  const cacheKey = `${url}-${JSON.stringify(options)}`;
  const cacheTimeout = 30 * 1000; // 30 seconds cache
  
  // Check cache first
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < cacheTimeout) {
    return cached.data;
  }
  
  try {
    // Use absolute URL for internal API calls
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;
    
    const response = await fetch(fullUrl, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      next: { revalidate: 30 }, // Cache for 30 seconds
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Cache the response
    cache.set(cacheKey, {
      data,
      timestamp: Date.now(),
    });
    
    return data;
  } catch (error) {
    console.error(`Failed to fetch data from ${url}:`, error);
    throw error;
  }
}

// Clear cache utility
export function clearCache() {
  cache.clear();
}

// Preload multiple URLs
export async function preloadUrls(urls) {
  const requests = urls.map(url => fetchData(url).catch(error => {
    console.error(`Preload failed for ${url}:`, error);
    return null;
  }));
  
  return Promise.all(requests);
}