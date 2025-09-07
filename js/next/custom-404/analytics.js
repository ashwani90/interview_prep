// lib/analytics.js
// Google Analytics 4 (GA4) implementation
export const track404 = (data) => {
    const { path, referrer, userAgent, action, type = 'pageview' } = data;
    
    // Send to Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', '404_error', {
        event_category: 'error',
        event_label: path,
        value: 1,
        referrer: referrer,
        user_agent: userAgent,
        custom_action: action,
      });
    }
  
    // Send to your backend API (optional)
    sendToBackend({
      type: '404_error',
      data: {
        path,
        referrer,
        userAgent: userAgent.substring(0, 200), // Limit length
        action,
        timestamp: new Date().toISOString(),
        url: window.location.href,
      }
    });
  
    // Console log for development
    if (process.env.NODE_ENV === 'development') {
      console.log('404 Error tracked:', data);
    }
  };
  
  // Send to your backend API
  const sendToBackend = async (payload) => {
    try {
      const response = await fetch('/api/analytics/404', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        console.error('Failed to send analytics to backend');
      }
    } catch (error) {
      console.error('Error sending analytics:', error);
    }
  };
  
  // Track custom events
  export const trackEvent = (category, action, label, value = 1) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  };