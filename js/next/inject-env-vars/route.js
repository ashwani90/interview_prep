// app/api/env/route.js
import { NextResponse } from 'next/server';
import { getServerEnv, getClientEnv } from '../../lib/env';

export async function GET() {
  // Don't expose sensitive server environment variables
  const serverEnv = getServerEnv();
  const clientEnv = getClientEnv();

  return NextResponse.json({
    server: {
      environment: process.env.NEXT_PUBLIC_APP_ENV,
      buildTime: process.env.BUILD_TIME,
      // Only expose non-sensitive server info
      nodeEnv: process.env.NODE_ENV,
    },
    client: clientEnv,
    build: {
      id: process.env.BUILD_ID,
      time: process.env.BUILD_TIME,
    },
  });
}

// Security: prevent indexing of environment endpoint
export async function generateMetadata() {
  return {
    robots: {
      index: false,
      follow: false,
    },
  };
}