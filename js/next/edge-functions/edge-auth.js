// lib/edge-auth.js
export async function authenticateRequest(request) {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    const cookieToken = request.cookies?.get('auth-token')?.value;
  
    if (!token && !cookieToken) {
      return { authenticated: false, error: 'No token provided' };
    }
  
    // Simple JWT verification (in real app, use proper JWT library)
    try {
      // This would be a proper JWT verification in production
      const isValid = await verifyToken(token || cookieToken);
      
      if (!isValid) {
        return { authenticated: false, error: 'Invalid token' };
      }
  
      return { authenticated: true, user: { id: 'user-id', name: 'John Doe' } };
    } catch (error) {
      return { authenticated: false, error: 'Token verification failed' };
    }
  }
  
  async function verifyToken(token) {
    // Mock verification - replace with real JWT verification
    return token === 'valid-token-123';
  }
  
  // Protected API route example
  export async function withAuth(handler) {
    return async (request) => {
      const auth = await authenticateRequest(request);
      
      if (!auth.authenticated) {
        return new Response(
          JSON.stringify({ error: 'Unauthorized', message: auth.error }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      }
  
      // Add user to request context
      request.user = auth.user;
      return handler(request);
    };
  }