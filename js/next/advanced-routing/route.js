// app/api/route-validation/route.js
import { validateSlugPattern, userRoutePatterns } from '../../../lib/route-validation';

export async function POST(request) {
  try {
    const { slug } = await request.json();
    
    if (!slug || !Array.isArray(slug)) {
      return Response.json(
        { error: 'Invalid slug format' },
        { status: 400 }
      );
    }
    
    const isValid = validateSlugPattern(slug, userRoutePatterns);
    
    if (!isValid) {
      return Response.json(
        { 
          error: 'Invalid route pattern',
          validPatterns: userRoutePatterns 
        },
        { status: 400 }
      );
    }
    
    return Response.json({
      valid: true,
      slug,
      message: 'Route pattern is valid'
    });
    
  } catch (error) {
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}