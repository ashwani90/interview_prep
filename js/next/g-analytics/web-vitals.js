// lib/web-vitals.js
import { onCLS, onFID, onFCP, onLCP, onTTFB, onINP } from 'web-vitals';

// Extended web vitals tracking with additional metrics
export function reportWebVitals() {
  // Core Web Vitals
  onCLS(sendToGoogleAnalytics);
  onFID(sendToGoogleAnalytics);
  onLCP(sendToGoogleAnalytics);
  
  // Additional metrics
  onFCP(sendToGoogleAnalytics);
  onTTFB(sendToGoogleAnalytics);
  onINP(sendToGoogleAnalytics);

  // Custom metrics
  trackCustomMetrics();
}

function sendToGoogleAnalytics(metric) {
  const { name, value, id, delta, rating } = metric;
  
  // Use navigator.sendBeacon if available, otherwise use fetch
  const body = JSON.stringify({
    event: 'web_vital',
    vital_type: name,
    vital_value: Math.round(name === 'CLS' ? value * 1000 : value),
    vital_delta: Math.round(delta),
    vital_rating: rating,
    vital_id: id,
    page: window.location.pathname,
    timestamp: new Date().toISOString(),
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/web-vitals', body);
  } else {
    fetch('/api/web-vitals', {
      body,
      method: 'POST',
      keepalive: true,
    });
  }

  // Also send to gtag
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, {
      event_category: 'Web Vitals',
      event_label: id,
      value: Math.round(name === 'CLS' ? value * 1000 : value),
      non_interaction: true,
    });
  }
}

function trackCustomMetrics() {
  // Track time to first byte
  if (window.performance && window.performance.timing) {
    const { timing } = window.performance;
    const ttfb = timing.responseStart - timing.requestStart;
    
    if (ttfb > 0) {
      sendToGoogleAnalytics({
        name: 'TTFB',
        value: ttfb,
        id: 'custom-ttfb',
        delta: ttfb,
        rating: ttfb < 600 ? 'good' : ttfb < 1800 ? 'needs-improvement' : 'poor',
      });
    }
  }

  // Track DOM content loaded
  if (document.readyState === 'interactive') {
    const dcl = performance.now();
    sendToGoogleAnalytics({
      name: 'DCL',
      value: dcl,
      id: 'dom-content-loaded',
      delta: dcl,
      rating: dcl < 2000 ? 'good' : dcl < 4000 ? 'needs-improvement' : 'poor',
    });
  }

  // Track window load time
  window.addEventListener('load', () => {
    const loadTime = performance.now();
    sendToGoogleAnalytics({
      name: 'Load',
      value: loadTime,
      id: 'window-load',
      delta: loadTime,
      rating: loadTime < 2500 ? 'good' : loadTime < 4000 ? 'needs-improvement' : 'poor',
    });
  });
}

// Utility function to get vitals score
export function getVitalsScore(value, thresholds) {
  if (value <= thresholds.good) return 'good';
  if (value <= thresholds.needsImprovement) return 'needs-improvement';
  return 'poor';
}