// components/SeoHead.js
import Head from 'next/head';
import { useEnvironment } from '../hooks/useEnvironment';

export default function SeoHead({ title, description, canonical }) {
  const { isCrawlable, isStaging } = useEnvironment();

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Block indexing in non-production environments */}
      {!isCrawlable && (
        <meta name="robots" content="noindex, nofollow, noarchive" />
      )}
      
      {/* Canonical URL - only in production */}
      {isCrawlable && canonical && (
        <link rel="canonical" href={canonical} />
      )}
      
      {/* Additional staging warning */}
      {isStaging && (
        <meta name="googlebot" content="noindex, nofollow, noarchive" />
      )}
    </Head>
  );
}