// app/document.js
import { Html, Head, Main, NextScript } from 'next/document';
import { getDomainConfig } from '../lib/domains';

export default function Document() {
  const domainConfig = getDomainConfig();
  
  return (
    <Html lang="en">
      <Head>
        <meta property="og:url" content={domainConfig.main} />
        <meta property="og:image" content={`https://${domainConfig.cdn}/og-image.png`} />
        
        {/* Preconnect to domains */}
        <link rel="preconnect" href={`https://${domainConfig.main}`} />
        <link rel="preconnect" href={`https://${domainConfig.cdn}`} />
        <link rel="dns-prefetch" href={`https://${domainConfig.main}`} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={`https://${domainConfig.main}`} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}