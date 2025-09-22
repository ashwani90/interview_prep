// components/SubdomainHandler.js
'use client';

import { useEffect, useState } from 'react';
import { extractSubdomain } from '../lib/domains';

export function useSubdomain() {
  const [subdomain, setSubdomain] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      const detectedSubdomain = extractSubdomain(hostname);
      setSubdomain(detectedSubdomain);
    }
  }, []);

  return subdomain;
}

export default function SubdomainHandler() {
  const subdomain = useSubdomain();

  if (!subdomain) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm">
      Subdomain: {subdomain}
    </div>
  );
}