// lib/performance.js
export class RenderingMetrics {
    static async trackPageRender(page, strategy, duration) {
      // Send metrics to your analytics service
      console.log(`[${strategy}] ${page} rendered in ${duration}ms`);
      
      if (typeof window !== 'undefined') {
        // Client-side metrics
        window.__PERF_METRICS__ = window.__PERF_METRICS__ || [];
        window.__PERF_METRICS__.push({
          page,
          strategy,
          duration,
          timestamp: Date.now()
        });
      }
    }
  }
  
  // Higher-order function to measure rendering time
  export function withMetrics(PageComponent, strategy) {
    return async function MeasuredPage(props) {
      const start = Date.now();
      const result = await PageComponent(props);
      const end = Date.now();
      
      await RenderingMetrics.trackPageRender(
        props.params?.pathname || '/',
        strategy,
        end - start
      );
      
      return result;
    };
  }