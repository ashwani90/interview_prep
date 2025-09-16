// lib/performance-monitor.js
export class PreloadPerformanceMonitor {
    constructor() {
      this.metrics = new Map();
    }
    
    startPreload(url) {
      this.metrics.set(url, {
        startTime: Date.now(),
        endTime: null,
        success: false,
      });
    }
    
    endPreload(url, success = true) {
      const metric = this.metrics.get(url);
      if (metric) {
        metric.endTime = Date.now();
        metric.success = success;
        metric.duration = metric.endTime - metric.startTime;
      }
    }
    
    getMetrics() {
      return Array.from(this.metrics.entries()).map(([url, metric]) => ({
        url,
        ...metric,
      }));
    }
    
    logMetrics() {
      const metrics = this.getMetrics();
      console.log('Preload Performance Metrics:');
      metrics.forEach(metric => {
        console.log(`  ${metric.url}: ${metric.duration}ms ${metric.success ? '✅' : '❌'}`);
      });
    }
  }
  
  // Global instance
  export const perfMonitor = new PreloadPerformanceMonitor();