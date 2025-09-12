// lib/rendering-strategies.js
export const RENDERING_STRATEGIES = {
    STATIC: {
      name: 'Static Generation (SSG)',
      description: 'Pre-rendered at build time, served from CDN',
      useCases: ['Marketing pages', 'Blog posts', 'Documentation'],
      config: {
        dynamic: 'error',
        revalidate: false
      }
    },
    ISR: {
      name: 'Incremental Static Regeneration',
      description: 'Pre-rendered with periodic revalidation',
      useCases: ['Product pages', 'Blog posts with comments', 'Catalog pages'],
      config: {
        revalidate: 3600, // 1 hour
        dynamicParams: true
      }
    },
    SSR: {
      name: 'Server-Side Rendering',
      description: 'Rendered on each request',
      useCases: ['Dashboard', 'User profiles', 'Real-time data'],
      config: {
        dynamic: 'force-dynamic',
        revalidate: 0
      }
    },
    CSR: {
      name: 'Client-Side Rendering',
      description: 'Rendered in the browser',
      useCases: ['User interactions', 'Forms', 'Real-time updates'],
      config: {
        dynamic: 'force-static'
      }
    }
  };
  
  export function getStrategyConfig(strategy) {
    return RENDERING_STRATEGIES[strategy]?.config || {};
  }
  
  export function shouldUseStrategy(pathname, dataRequirements) {
    if (pathname === '/dashboard') return 'SSR';
    if (pathname.startsWith('/products/')) return 'ISR';
    if (pathname.startsWith('/blog/')) return 'ISR';
    if (pathname === '/profile') return 'CSR';
    return 'STATIC';
  }