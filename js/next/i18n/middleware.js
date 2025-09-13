// middleware.js
import { NextResponse } from 'next/server';
import { i18n, isValidLocale, getPreferredLocale } from './lib/i18n';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Check if the pathname is missing a locale
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect to default locale if no locale is present
  if (pathnameIsMissingLocale) {
    const preferredLocale = getPreferredLocale(request);
    const url = new URL(`/${preferredLocale}${pathname}`, request.url);
    return NextResponse.redirect(url);
  }

  // Check if the locale in URL is valid
  const pathSegments = pathname.split('/');
  const locale = pathSegments[1];
  
  if (locale && !isValidLocale(locale)) {
    // Redirect to default locale if invalid locale is detected
    const url = new URL(`/${i18n.defaultLocale}${pathname}`, request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Match all paths except static files and API routes
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};