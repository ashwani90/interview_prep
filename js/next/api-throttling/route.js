// app/api/users/route.js
import { NextResponse } from 'next/server';
import { rateLimiter } from '@/lib/rate-limiter';

// Optional: Use a different rate limiter for specific endpoints
const userRateLimiter = new RateLimiter({
  tokensPerInterval: 50,
  interval: 60 * 1000,
});

export async function GET(request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
  
  // Check rate limit
  const limitResult = await userRateLimiter.limit(`users:${ip}`);
  
  if (!limitResult.success) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': '50',
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': limitResult.reset.toString(),
          'Retry-After': Math.ceil((limitResult.reset - Date.now()) / 1000).toString(),
        },
      }
    );
  }

  try {
    // Your API logic here
    const users = await getUsers();
    
    const response = NextResponse.json(users);
    
    // Add rate limit headers
    response.headers.set('X-RateLimit-Limit', '50');
    response.headers.set('X-RateLimit-Remaining', limitResult.remaining.toString());
    response.headers.set('X-RateLimit-Reset', limitResult.reset.toString());
    
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function getUsers() {
  // Simulate database call
  return [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
  ];
}