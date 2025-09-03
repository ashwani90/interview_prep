// lib/utils/rate-limit-utils.js
export function createRateLimitHeaders(limit, remaining, reset) {
    return {
      'X-RateLimit-Limit': limit.toString(),
      'X-RateLimit-Remaining': remaining.toString(),
      'X-RateLimit-Reset': reset.toString(),
      'Retry-After': Math.ceil((reset - Date.now()) / 1000).toString(),
    };
  }
  
  export function isRateLimited(response) {
    return response.status === 429;
  }
  
  export function getRateLimitInfo(response) {
    return {
      limit: parseInt(response.headers.get('X-RateLimit-Limit') || '0'),
      remaining: parseInt(response.headers.get('X-RateLimit-Remaining') || '0'),
      reset: parseInt(response.headers.get('X-RateLimit-Reset') || '0'),
    };
  }