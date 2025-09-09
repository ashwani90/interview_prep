// middleware.js
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export const config = {
  // Run middleware on specific paths
  matcher: [
    '/',
    '/api/:path*',
    '/products/:path*',
    '/blog/:path*',
  ],
};

export default function middleware(request) {
  const { nextUrl, geo, cookies, headers } = request;
  const country = geo?.country || 'US';
  const city = geo?.city || 'Unknown';
  const region = geo?.region || 'Unknown';

  // Clone the request headers
  const requestHeaders = new Headers(headers);
  
  // Add geo location headers to API requests
  requestHeaders.set('x-country', country);
  requestHeaders.set('x-city', city);
  requestHeaders.set('x-region', region);

  // Performance monitoring - add timing header
  requestHeaders.set('x-edge-start', Date.now().toString());

  // A/B testing based on user location
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Set response headers for edge information
  response.headers.set('x-edge-runtime', 'true');
  response.headers.set('x-server-region', process.env.VERCEL_REGION || 'unknown');
  response.headers.set('x-request-country', country);
  response.headers.set('x-request-city', city);

  // Personalization based on location
  if (country === 'US') {
    response.cookies.set('user-region', 'north-america', {
      maxAge: 60 * 60 * 24, // 24 hours
    });
  } else if (['GB', 'DE', 'FR'].includes(country)) {
    response.cookies.set('user-region', 'europe', {
      maxAge: 60 * 60 * 24,
    });
  }

  // Redirect based on country (example: special promotion for Canada)
  if (country === 'CA' && nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/canada-promo', request.url));
  }

  // Block specific regions if needed
  if (['RU', 'CN'].includes(country)) {
    return new Response('Access restricted in your region', {
      status: 403,
      headers: { 'x-blocked-region': country },
    });
  }

  return response;
}