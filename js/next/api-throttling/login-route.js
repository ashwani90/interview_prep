// app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import { strictRateLimiter } from '@/lib/rate-limiter';

export async function POST(request) {
  const { email, password } = await request.json();
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
  
  // Very strict rate limiting for login attempts
  const limitResult = await strictRateLimiter.limit(`login:${ip}:${email}`);
  
  if (!limitResult.success) {
    return NextResponse.json(
      { error: 'Too many login attempts. Please try again later.' },
      { 
        status: 429,
        headers: {
          'Retry-After': Math.ceil((limitResult.reset - Date.now()) / 1000).toString(),
        },
      }
    );
  }

  try {
    // Authentication logic
    const user = await authenticateUser(email, password);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

async function authenticateUser(email, password) {
  // Simulate authentication
  if (email === 'user@example.com' && password === 'password') {
    return { id: 1, email, name: 'Test User' };
  }
  return null;
}