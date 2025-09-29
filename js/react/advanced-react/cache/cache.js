class ApiCache {
    constructor() {
      this.cache = new Map();
      this.maxAge = 5 * 60 * 1000; // 5 minutes cache duration
    }
  
    get(key) {
      const entry = this.cache.get(key);
      if (!entry) return null;
  
      // Check if cache entry is expired
      if (Date.now() - entry.timestamp > this.maxAge) {
        this.cache.delete(key);
        return null;
      }
  
      return entry.data;
    }
  
    set(key, data) {
      this.cache.set(key, {
        data,
        timestamp: Date.now()
      });
    }
  
    clear(key) {
      if (key) {
        this.cache.delete(key);
      } else {
        this.cache.clear();
      }
    }
  }
  
  export const apiCache = new ApiCache();