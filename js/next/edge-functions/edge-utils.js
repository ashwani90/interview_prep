// lib/edge-utils.js
export function isEdgeRuntime() {
    return process.env.NEXT_RUNTIME === 'edge' || 
           process.env.VERCEL_REGION !== undefined;
  }
  
  export function getCurrentRegion() {
    return process.env.VERCEL_REGION || 'local';
  }
  
  export function shouldUseEdge() {
    return process.env.EDGE_ENABLED !== 'false' && isEdgeRuntime();
  }
  
  // Performance monitoring
  export class EdgeTimer {
    constructor() {
      this.start = Date.now();
    }
  
    elapsed() {
      return Date.now() - this.start;
    }
  
    headerValue() {
      return this.elapsed().toString();
    }
  }