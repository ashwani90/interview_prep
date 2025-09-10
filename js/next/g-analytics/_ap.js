// app/_app.js (if using Pages Router) or use layout.js for App Router
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { pageview } from '../lib/gtag';
import WebVitalsTracker from '../components/WebVitalsTracker';
import GoogleAnalytics from '../components/GoogleAnalytics';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Track page views
    const handleRouteChange = (url) => {
      pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <GoogleAnalytics />
      <WebVitalsTracker />
      <Component {...pageProps} />
    </>
  );
}