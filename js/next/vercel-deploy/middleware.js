// middleware.js
import { NextResponse } from 'next/server';
import { extractSubdomain, isValidSubdomain, constructSubdomainUrl } from './lib/domains';

export function middleware(request) {
  const { nextUrl, headers } = request;
  const hostname = headers.get('host') || '';
  const pathname = nextUrl.pathname;

  // Skip API routes and static files
  if (pathname.startsWith('/api/') || pathname.startsWith('/_next/')) {
    return NextResponse.next();
  }

  // Handle subdomains
  if (isValidSubdomain(hostname)) {
    const subdomain = extractSubdomain(hostname);
    
    // Special subdomain handling
    switch (subdomain) {
      case 'api':
        // Redirect api subdomain to API routes
        return NextResponse.redirect(new URL(`/api${pathname}`, nextUrl.origin));
      
      case 'cdn':
        // Serve static assets from CDN subdomain
        if (pathname.startsWith('/assets/')) {
          return NextResponse.next();
        }
        return NextResponse.redirect(new URL(pathname, constructSubdomainUrl('www')));
      
      case 'blog':
        // External blog redirect
        return NextResponse.redirect('https://blog.mydomain.com');
      
      case 'support':
        // External support redirect
        return NextResponse.redirect('https://support.mydomain.com');
      
      case 'www':
        // Redirect www to non-www
        return NextResponse.redirect(new URL(pathname, constructSubdomainUrl('')));
      
      default:
        // Custom subdomain handling (e.g., user profiles, tenant sites)
        return handleCustomSubdomain(request, subdomain, pathname);
    }
  }

  // Redirect naked domain to www (optional)
  if (hostname === 'mydomain.com' && process.env.NODE_ENV === 'production') {
    return NextResponse.redirect(new URL(pathname, constructSubdomainUrl('www')));
  }

  return NextResponse.next();
}

function handleCustomSubdomain(request, subdomain, pathname) {
  const { nextUrl } = request;
  
  // Add subdomain to request headers for page components to use
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-subdomain', subdomain);
  
  // You can also rewrite to specific pages based on subdomain
  if (subdomain.startsWith('user-')) {
    const userId = subdomain.replace('user-', '');
    requestHeaders.set('x-user-id', userId);
    
    // Rewrite to user profile page
    nextUrl.pathname = `/user/${userId}${pathname}`;
  }
  
  // For tenant subdomains (e.g., company.mydomain.com)
  if (subdomain.match(/^[a-zA-Z0-9-]+$/)) {
    requestHeaders.set('x-tenant', subdomain);
    nextUrl.searchParams.set('tenant', subdomain);
  }

  return NextResponse.rewrite(nextUrl, {
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};