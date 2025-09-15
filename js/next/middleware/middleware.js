// middleware.js
import { NextResponse } from 'next/server';
import { fetchData } from './lib/data-fetcher';

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Preload data for specific routes
  if (pathname.startsWith('/products/')) {
    try {
      const productId = pathname.split('/').pop();
      const productData = await fetchData(`/api/products/${productId}`);
      
      // Clone the request headers
      const requestHeaders = new Headers(request.headers);
      
      // Add preloaded data to request headers
      requestHeaders.set('x-preloaded-data', JSON.stringify({
        product: productData,
        timestamp: Date.now(),
      }));
      
      // Continue with modified headers
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      console.error('Preloading failed:', error);
      // Continue without preloaded data
      return NextResponse.next();
    }
  }
  
  // Preload for user profile pages
  if (pathname.startsWith('/user/')) {
    try {
      const userId = pathname.split('/').pop();
      const [userData, userPosts] = await Promise.all([
        fetchData(`/api/users/${userId}`),
        fetchData(`/api/users/${userId}/posts`),
      ]);
      
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-preloaded-data', JSON.stringify({
        user: userData,
        posts: userPosts,
        timestamp: Date.now(),
      }));
      
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      console.error('Preloading failed:', error);
      return NextResponse.next();
    }
  }
  
  // Preload for home page
  if (pathname === '/') {
    try {
      const [featuredProducts, recentPosts] = await Promise.all([
        fetchData('/api/products/featured'),
        fetchData('/api/posts/recent'),
      ]);
      
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-preloaded-data', JSON.stringify({
        featuredProducts,
        recentPosts,
        timestamp: Date.now(),
      }));
      
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      console.error('Preloading failed:', error);
      return NextResponse.next();
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/products/:path*',
    '/user/:path*',
  ],
};