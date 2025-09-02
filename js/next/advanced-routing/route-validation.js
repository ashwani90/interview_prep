// lib/route-validation.js
export function validateSlugPattern(slug, patterns) {
    if (!slug || !Array.isArray(slug)) return false;
    
    return patterns.some(pattern => {
      if (pattern.length !== slug.length) return false;
      
      return pattern.every((segment, index) => {
        if (segment.startsWith(':')) {
          // Dynamic segment - always valid if it exists
          return slug[index] !== undefined;
        }
        // Static segment - must match exactly
        return segment === slug[index];
      });
    });
  }
  
  export const userRoutePatterns = [
    [':id'],                      // /user/123
    [':id', 'posts'],             // /user/123/posts
    [':id', 'posts', ':postId'],  // /user/123/posts/456
    [':id', 'followers'],         // /user/123/followers
    [':id', 'settings', ':tab'],  // /user/123/settings/profile
  ];
  
  export const searchRoutePatterns = [
    [],                          // /search
    ['::query'],                 // /search/term
    ['::query', ':filter'],      // /search/term/filter
  ];
  
  // Parse dynamic segments into key-value pairs
  export function parseDynamicSegments(slug, pattern) {
    const result = {};
    
    pattern.forEach((segment, index) => {
      if (segment.startsWith(':')) {
        const key = segment.slice(1); // Remove the colon
        result[key] = slug[index];
      }
    });
    
    return result;
  }
  
  // Example usage:
  // const slug = ['123', 'posts', '456'];
  // const pattern = [':userId', 'posts', ':postId'];
  // const params = parseDynamicSegments(slug, pattern);
  // → { userId: '123', postId: '456' }