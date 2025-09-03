// lib/redis-rate-limiter.js
import { Redis } from '@upstash/redis';

export class RedisRateLimiter {
  constructor(options = {}) {
    this.redis = new Redis({
      url: process.env.UPSTASH_REDIS_URL,
      token: process.env.UPSTASH_REDIS_TOKEN,
    });
    
    this.tokensPerInterval = options.tokensPerInterval || 100;
    this.interval = options.interval || 60; // seconds
    this.namespace = options.namespace || 'ratelimit';
  }

  async limit(key, tokens = 1) {
    const now = Math.floor(Date.now() / 1000);
    const windowStart = now - this.interval;
    const redisKey = `${this.namespace}:${key}`;

    try {
      // Use Redis sorted set for sliding window rate limiting
      const pipeline = this.redis.pipeline();
      
      // Remove old timestamps
      pipeline.zremrangebyscore(redisKey, 0, windowStart);
      
      // Add current timestamp
      pipeline.zadd(redisKey, { score: now, member: now.toString() });
      
      // Get count of requests in current window
      pipeline.zcard(redisKey);
      
      // Set expiration
      pipeline.expire(redisKey, this.interval * 2);
      
      const results = await pipeline.exec();
      const requestCount = results[2]; // Result of zcard

      if (requestCount <= this.tokensPerInterval) {
        return {
          success: true,
          remaining: this.tokensPerInterval - requestCount,
          reset: now + this.interval,
        };
      } else {
        // Get the oldest request to calculate reset time
        const oldest = await this.redis.zrange(redisKey, 0, 0, { withScores: true });
        const resetTime = oldest.length > 0 ? parseInt(oldest[1]) + this.interval : now + this.interval;
        
        return {
          success: false,
          remaining: 0,
          reset: resetTime,
        };
      }
    } catch (error) {
      console.error('Redis rate limiting error:', error);
      // Allow requests if Redis fails
      return { success: true, remaining: this.tokensPerInterval, reset: now + this.interval };
    }
  }

  async getInfo(key) {
    const now = Math.floor(Date.now() / 1000);
    const windowStart = now - this.interval;
    const redisKey = `${this.namespace}:${key}`;

    try {
      await this.redis.zremrangebyscore(redisKey, 0, windowStart);
      const requestCount = await this.redis.zcard(redisKey);
      
      return {
        remaining: Math.max(0, this.tokensPerInterval - requestCount),
        reset: now + this.interval,
      };
    } catch (error) {
      return {
        remaining: this.tokensPerInterval,
        reset: now + this.interval,
      };
    }
  }
}