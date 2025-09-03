// middleware.js
import { NextResponse } from 'next/server';
import { RateLimiter } from './lib/rate-limiter';

// Initialize rate limiter
const rateLimiter = new RateLimiter({
  // 100 requests per minute per IP
  tokensPerInterval: 100,
  interval: 60 * 1000, // 1 minute
});

// Initialize stricter rate limiter for auth endpoints
const authRateLimiter = new RateLimiter({
  // 10 requests per minute per IP for auth
  tokensPerInterval: 10,
  interval: 60 * 1000,
});

// Initialize very strict rate limiter for sensitive operations
const strictRateLimiter = new RateLimiter({
  // 5 requests per minute per IP
  tokensPerInterval: 5,
  interval: 60 * 1000,
});

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const ip = getClientIP(request);
  const userId = getUserId(request); // Extract user ID if available

  // Apply different rate limits based on route
  let limiter = rateLimiter;
  let limitKey = ip;

  // Auth routes have stricter limits
  if (pathname.startsWith('/api/auth')) {
    limiter = authRateLimiter;
  }
  
  // Sensitive operations have very strict limits
  if (pathname.startsWith('/api/payment') || pathname.startsWith('/api/password')) {
    limiter = strictRateLimiter;
  }

  // Use user ID for rate limiting if available (more accurate than IP)
  if (userId) {
    limitKey = userId;
  }

  try {
    const { success, remaining, reset } = await limiter.limit(limitKey);

    // Add rate limit headers to response
    const response = success ? NextResponse.next() : createRateLimitResponse();
    
    response.headers.set('X-RateLimit-Limit', limiter.tokensPerInterval.toString());
    response.headers.set('X-RateLimit-Remaining', remaining.toString());
    response.headers.set('X-RateLimit-Reset', reset.toString());

    if (!success) {
      response.headers.set('Retry-After', Math.ceil((reset - Date.now()) / 1000).toString());
      console.warn(`Rate limit exceeded for ${limitKey} on ${pathname}`);
    }

    return response;

  } catch (error) {
    console.error('Rate limiting error:', error);
    // Allow the request to proceed if rate limiting fails
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/api/:path*', // Protect all API routes
  ],
};

// Helper functions
function getClientIP(request) {
  // Get client IP from headers (works with Vercel, Netlify, etc.)
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  // Fallback to a unique identifier for the request
  return request.ip || 'unknown';
}

function getUserId(request) {
  // Extract user ID from auth token or session
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    // In a real app, you would verify the JWT and extract user ID
    try {
      const token = authHeader.slice(7);
      // This is a placeholder - use a proper JWT library
      const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
      return payload.userId || payload.sub;
    } catch {
      return null;
    }
  }
  
  return null;
}

function createRateLimitResponse() {
  return new Response(
    JSON.stringify({ 
      error: 'Too many requests', 
      message: 'Rate limit exceeded. Please try again later.' 
    }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}