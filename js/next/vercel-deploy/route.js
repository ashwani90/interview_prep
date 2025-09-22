// app/api/subdomain/validate/route.js
import { NextResponse } from 'next/server';
import { isValidSubdomain, extractSubdomain } from '../../../lib/domains';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');
  
  if (!domain) {
    return NextResponse.json(
      { error: 'Domain parameter is required' },
      { status: 400 }
    );
  }
  
  const isValid = isValidSubdomain(domain);
  const subdomain = isValid ? extractSubdomain(domain) : null;
  
  return NextResponse.json({
    domain,
    isValid,
    subdomain,
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request) {
  try {
    const { domain, subdomain } = await request.json();
    
    // Validate subdomain format
    if (!isValidSubdomainFormat(subdomain)) {
      return NextResponse.json(
        { error: 'Invalid subdomain format' },
        { status: 400 }
      );
    }
    
    // Check if subdomain is available (you'd check against database)
    const isAvailable = await checkSubdomainAvailability(subdomain);
    
    return NextResponse.json({
      subdomain,
      isAvailable,
      fullDomain: `${subdomain}.mydomain.com`,
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function isValidSubdomainFormat(subdomain) {
  const regex = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/;
  return regex.test(subdomain) && subdomain.length <= 63;
}

async function checkSubdomainAvailability(subdomain) {
  // In a real app, you'd check against a database
  const reserved = ['www', 'api', 'cdn', 'blog', 'support', 'admin'];
  return !reserved.includes(subdomain);
}