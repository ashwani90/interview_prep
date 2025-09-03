// types/rate-limiter.ts
export interface RateLimitOptions {
    tokensPerInterval?: number;
    interval?: number; // milliseconds
    namespace?: string;
  }
  
  export interface RateLimitResult {
    success: boolean;
    remaining: number;
    reset: number; // timestamp
  }
  
  export interface RateLimitInfo {
    remaining: number;
    reset: number; // timestamp
  }
  
  export interface RateLimiter {
    limit(key: string, tokens?: number): Promise<RateLimitResult>;
    getInfo(key: string): Promise<RateLimitInfo>;
    destroy(): void;
  }