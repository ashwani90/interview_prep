// app/api/rss/route.js
import { generateRSSFeed } from '../../../lib/rss';

export async function GET() {
  try {
    const rssXml = await generateRSSFeed();
    
    return new Response(rssXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new Response('Error generating RSS feed', { status: 500 });
  }
}

// Force dynamic rendering for fresh data
export const dynamic = 'force-dynamic';