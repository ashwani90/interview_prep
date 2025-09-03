// lib/rate-limiter.js
export class RateLimiter {
    constructor(options = {}) {
      this.tokensPerInterval = options.tokensPerInterval || 100;
      this.interval = options.interval || 60 * 1000; // 1 minute
      this.tokenBuckets = new Map();
      this.cleanupInterval = setInterval(() => this.cleanup(), 60 * 1000); // Cleanup every minute
    }
  
    async limit(key, tokens = 1) {
      const now = Date.now();
      let bucket = this.tokenBuckets.get(key);
  
      if (!bucket) {
        bucket = {
          tokens: this.tokensPerInterval,
          lastRefill: now,
        };
        this.tokenBuckets.set(key, bucket);
      }
  
      // Refill tokens based on time passed
      const timePassed = now - bucket.lastRefill;
      const tokensToAdd = Math.floor((timePassed / this.interval) * this.tokensPerInterval);
      
      if (tokensToAdd > 0) {
        bucket.tokens = Math.min(this.tokensPerInterval, bucket.tokens + tokensToAdd);
        bucket.lastRefill = now;
      }
  
      // Check if enough tokens are available
      if (bucket.tokens >= tokens) {
        bucket.tokens -= tokens;
        return {
          success: true,
          remaining: bucket.tokens,
          reset: now + this.interval,
        };
      } else {
        return {
          success: false,
          remaining: 0,
          reset: bucket.lastRefill + this.interval,
        };
      }
    }
  
    cleanup() {
      const now = Date.now();
      const oneHourAgo = now - 60 * 60 * 1000;
      
      for (const [key, bucket] of this.tokenBuckets.entries()) {
        if (bucket.lastRefill < oneHourAgo) {
          this.tokenBuckets.delete(key);
        }
      }
    }
  
    // Get current rate limit info for a key
    getInfo(key) {
      const bucket = this.tokenBuckets.get(key);
      if (!bucket) {
        return {
          remaining: this.tokensPerInterval,
          reset: Date.now() + this.interval,
        };
      }
      
      return {
        remaining: bucket.tokens,
        reset: bucket.lastRefill + this.interval,
      };
    }
  
    // Destroy the rate limiter (for cleanup)
    destroy() {
      clearInterval(this.cleanupInterval);
      this.tokenBuckets.clear();
    }
  }