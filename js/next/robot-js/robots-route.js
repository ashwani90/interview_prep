// pages/robots.txt.tsx
import { GetServerSideProps } from 'next';

export default function RobotsTxt() {
  // This component won't render anything for robots.txt
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const isStaging = process.env.NEXT_PUBLIC_APP_ENV === 'staging' || 
                   process.env.VERCEL_ENV === 'preview';

  let robotsContent = '';

  if (isProduction && !isStaging) {
    robotsContent = `
# Production environment - allow all
User-agent: *
Allow: /

# Sitemap
Sitemap: ${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}/sitemap.xml
    `.trim();
  } else {
    robotsContent = `
# Staging/Development Environment - BLOCK ALL BOTS
User-agent: *
Disallow: /

# This is a non-production environment
# Please do not crawl or index this site
    `.trim();
  }

  res.setHeader('Content-Type', 'text/plain');
  res.write(robotsContent);
  res.end();

  return {
    props: {},
  };
};