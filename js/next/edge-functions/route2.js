// app/api/analytics/track/route.js
export const runtime = 'edge';
export const dynamic = 'force-dynamic'; // No caching

export async function POST(request) {
  try {
    const { event, data } = await request.json();
    const { geo, headers } = request;

    const analyticsData = {
      event,
      data,
      timestamp: new Date().toISOString(),
      location: {
        country: geo?.country,
        city: geo?.city,
        region: geo?.region,
      },
      userAgent: headers.get('user-agent'),
      ip: headers.get('x-forwarded-for'),
    };

    // Store in edge-optimized database (e.g., Upstash Redis)
    // For now, we'll just log it
    console.log('Analytics event:', JSON.stringify(analyticsData));

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'x-edge-processed': 'true',
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to process analytics' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}