// app/api/internal/[...path]/route.js
import { NextResponse } from 'next/server';
import { fetchData } from '../../../lib/data-fetcher';

export async function GET(request, { params }) {
  const { path } = params;
  const apiPath = `/${path.join('/')}`;
  const { searchParams } = new URL(request.url);
  
  try {
    // Forward the request to the actual API
    const data = await fetchData(apiPath, {
      headers: {
        // Pass through auth headers if needed
        authorization: request.headers.get('authorization') || '',
      },
    });
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Internal API proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}