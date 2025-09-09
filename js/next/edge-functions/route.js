// app/api/hello/route.js
export const runtime = 'edge';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name') || 'World';

  // Get geo information from headers (set by middleware)
  const country = request.headers.get('x-country') || 'unknown';
  const city = request.headers.get('x-city') || 'unknown';

  // Simulate some processing
  const data = {
    message: `Hello ${name} from the Edge!`,
    timestamp: new Date().toISOString(),
    location: {
      country,
      city,
    },
    runtime: 'edge',
    region: process.env.VERCEL_REGION || 'unknown',
  };

  return new Response(JSON.stringify(data, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'x-edge-handler': 'true',
      'x-response-time': Date.now() - parseInt(request.headers.get('x-edge-start') || '0'),
    },
  });
}