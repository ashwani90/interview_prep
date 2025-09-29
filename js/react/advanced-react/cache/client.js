import { apiCache } from './apiCache';

const apiClient = {
  activeRequests: new Map(),

  async request(endpoint, options = {}) {
    const { method = 'GET', body, headers = {}, useCache = true } = options;
    const cacheKey = `${method}:${endpoint}`;

    // Check cache for GET requests
    if (method === 'GET' && useCache) {
      const cachedData = apiCache.get(cacheKey);
      if (cachedData) {
        return cachedData;
      }
    }

    // Cancel previous request to same endpoint if exists
    if (this.activeRequests.has(cacheKey)) {
      this.activeRequests.get(cacheKey).abort();
    }

    const controller = new AbortController();
    this.activeRequests.set(cacheKey, controller);

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Cache GET responses
      if (method === 'GET' && useCache) {
        apiCache.set(cacheKey, data);
      }

      return data;
    } finally {
      this.activeRequests.delete(cacheKey);
    }
  },

  cancelRequest(endpoint, method = 'GET') {
    const cacheKey = `${method}:${endpoint}`;
    if (this.activeRequests.has(cacheKey)) {
      this.activeRequests.get(cacheKey).abort();
      this.activeRequests.delete(cacheKey);
    }
  }
};

export default apiClient;