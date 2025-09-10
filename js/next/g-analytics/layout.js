// app/layout.js
'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { pageview } from '../lib/gtag';
import WebVitalsTracker from '../components/WebVitalsTracker';
import GoogleAnalytics from '../components/GoogleAnalytics';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track page views
    if (pathname) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      pageview(url);
    }
  }, [pathname, searchParams]);

  return (
    <html lang="en">
      <body>
        <GoogleAnalytics />
        <WebVitalsTracker />
        {children}
      </body>
    </html>
  );
}