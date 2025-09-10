// lib/gtag.js
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
      transport_type: 'beacon',
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value, nonInteraction = false }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      non_interaction: nonInteraction,
    });
  }
};

// Track web vitals
export const trackWebVital = (metric) => {
  const { name, value, id, delta, rating } = metric;
  
  event({
    action: name,
    category: 'Web Vitals',
    label: id,
    value: Math.round(name === 'CLS' ? value * 1000 : value), // CLS is reported as a decimal
    nonInteraction: true,
  });

  // Also log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', {
      name,
      value: Math.round(name === 'CLS' ? value * 1000 : value),
      delta,
      rating,
      id,
    });
  }
};

// Track custom metrics
export const trackCustomMetric = (name, value, category = 'Custom Metrics') => {
  event({
    action: name,
    category: category,
    value: value,
    nonInteraction: true,
  });
};