// pages/404.js
import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { track404 } from '../lib/analytics';

export default function Custom404() {
  const router = useRouter();
  const { asPath } = router;

  useEffect(() => {
    // Track the 404 page view
    track404({
      path: asPath,
      referrer: document.referrer || '',
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    });
  }, [asPath]);

  return (
    <>
      <Head>
        <title>Page Not Found | 404 Error</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          {/* Error Icon */}
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>

          {/* Error Message */}
          <div>
            <h1 className="text-6xl font-bold text-gray-900">404</h1>
            <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
              Page not found
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              Sorry, we couldn't find the page you're looking for.
            </p>
            <p className="mt-1 text-sm text-gray-500">
              The page <code className="bg-gray-100 p-1 rounded">{asPath}</code> doesn't exist.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => track404Action('home_click')}
            >
              Go back home
            </Link>
            
            <button
              onClick={() => {
                track404Action('back_click');
                router.back();
              }}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Go back
            </button>
          </div>

          {/* Additional Help */}
          <div className="mt-8 border-t border-gray-200 pt-8">
            <p className="text-sm text-gray-500">
              Think this is an error?{' '}
              <a
                href={`mailto:support@yourdomain.com?subject=404%20Error%20on%20${encodeURIComponent(asPath)}&body=I%20encountered%20a%20404%20error%20on%20${encodeURIComponent(asPath)}`}
                className="font-medium text-indigo-600 hover:text-indigo-500"
                onClick={() => track404Action('contact_click')}
              >
                Contact support
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// Track specific actions on the 404 page
function track404Action(action) {
  track404({
    path: window.location.pathname,
    action: action,
    type: 'user_action'
  });
}