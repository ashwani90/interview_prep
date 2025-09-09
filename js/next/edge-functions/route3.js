// app/api/weather/route.js
export const runtime = 'edge';
export const revalidate = 300; // Cache for 5 minutes

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city') || 'London';
  const country = request.headers.get('x-country') || 'GB';

  try {
    // Simulate weather API call with edge caching
    const weatherData = await getCachedWeather(city, country);

    return new Response(JSON.stringify(weatherData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=300', // 5 minutes
        'CDN-Cache-Control': 'max-age=300',
        'x-edge-cached': 'true',
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch weather data' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

async function getCachedWeather(city, country) {
  // In production, use a edge-compatible cache like Vercel KV or Redis
  const cacheKey = `weather:${city}:${country}`;
  
  // Mock weather data
  return {
    city,
    country,
    temperature: Math.floor(Math.random() * 30) + 10, // 10-40°C
    condition: ['Sunny', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 3)],
    humidity: Math.floor(Math.random() * 100),
    windSpeed: Math.floor(Math.random() * 30),
    timestamp: new Date().toISOString(),
    servedFrom: 'edge',
  };
}