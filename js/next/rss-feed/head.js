// components/HeadWithRSS.js
import Head from 'next/head';

export default function HeadWithRSS({ title, description, canonical }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* RSS Discovery */}
      <link
        rel="alternate"
        type="application/rss+xml"
        title="RSS Feed for My Blog"
        href={`${baseUrl}/rss.xml`}
      />
      <link
        rel="alternate"
        type="application/atom+xml"
        title="Atom Feed for My Blog"
        href={`${baseUrl}/atom.xml`}
      />
      <link
        rel="alternate"
        type="application/json"
        title="JSON Feed for My Blog"
        href={`${baseUrl}/feed.json`}
      />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
    </Head>
  );
}