// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();
  
  // You can add additional tracking headers here
  response.headers.set('X-404-Tracking', 'enabled');
  
  return response;
}

export const config = {
  matcher: '/404',
};