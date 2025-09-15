// lib/enhanced-fetcher.js
import { getPreloadedData } from './preload-utils';
import { fetchData } from './data-fetcher';

export async function fetchWithPreload(url, options = {}) {
  const preloadedData = getPreloadedData();
  
  // Check if data is available in preloaded cache
  if (preloadedData && preloadedData[url]) {
    console.log('Using preloaded data for:', url);
    return preloadedData[url];
  }
  
  // Fallback to normal fetch
  return fetchData(url, options);
}

// Hook for client-side data fetching with preload awareness
export function usePreloadedData(key) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function loadData() {
      try {
        // First check if we have preloaded data
        const preloaded = getPreloadedData();
        if (preloaded && preloaded[key]) {
          setData(preloaded[key]);
          setIsLoading(false);
          return;
        }
        
        // Fallback to API call
        const result = await fetchData(`/api/${key}`);
        setData(result);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadData();
  }, [key]);
  
  return { data, isLoading };
}