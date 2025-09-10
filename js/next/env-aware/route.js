// app/api/posts/route.js
import { NextResponse } from 'next/server';
import { getConfig, getEnvironment } from '../../lib/env';

export async function GET() {
  const environment = getEnvironment();
  const config = getConfig();

  try {
    // In development, you might want to return mock data
    if (environment === 'development' && process.env.USE_MOCK_DATA === 'true') {
      return NextResponse.json([
        {
          id: 1,
          title: 'Mock Post - Development Environment',
          content: 'This is mock data for development.',
          publishedAt: new Date().toISOString(),
        },
      ]);
    }

    // Forward request to the appropriate API URL
    const response = await fetch(`${config.apiUrl}/posts`, {
      headers: {
        'X-Forwarded-Environment': environment,
      },
    });

    if (!response.ok) {
      throw new Error(`API responded with ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('API proxy error:', error);
    
    // Fallback to mock data in case of error for non-production
    if (environment !== 'production') {
      return NextResponse.json([
        {
          id: 1,
          title: 'Fallback Post',
          content: 'This is fallback data due to API error.',
          publishedAt: new Date().toISOString(),
        },
      ]);
    }

    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}