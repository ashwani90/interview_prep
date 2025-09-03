// app/api/rate-limit/route.js
import { NextResponse } from 'next/server';
import { rateLimiter } from '@/lib/rate-limiter';

export async function GET(request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key') || ip;
  
  const info = await rateLimiter.getInfo(key);
  
  return NextResponse.json({
    key,
    limit: rateLimiter.tokensPerInterval,
    remaining: info.remaining,
    reset: new Date(info.reset).toISOString(),
    resetIn: Math.ceil((info.reset - Date.now()) / 1000),
  });
}