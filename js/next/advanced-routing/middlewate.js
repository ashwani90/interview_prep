// middleware.js
import { NextResponse } from 'next/server';
import { validateSlugPattern, userRoutePatterns } from './lib/route-validation';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Check for user routes
  if (pathname.startsWith('/user/')) {
    const slug = pathname.split('/').filter(Boolean).slice(1); // Remove 'user'
    
    // Validate route pattern
    const isValid = validateSlugPattern(slug, userRoutePatterns);
    
    if (!isValid) {
      // Redirect to 404 for invalid patterns
      return NextResponse.redirect(new URL('/404', request.url));
    }
    
    // Add security headers for user routes
    const response = NextResponse.next();
    response.headers.set('X-User-Route', 'true');
    
    return response;
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/user/:path*',
    '/search/:path*',
  ],
};