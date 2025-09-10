// app/api/web-vitals/route.js
export async function POST(request) {
    try {
      const data = await request.json();
      
      // Here you can:
      // 1. Store in your database
      // 2. Send to analytics service
      // 3. Log for monitoring
      
      console.log('Web Vital received:', data);
      
      // Example: Send to Google Analytics Measurement Protocol
      // await sendToGoogleAnalyticsMP(data);
      
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error processing web vital:', error);
      return new Response(JSON.stringify({ error: 'Failed to process' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
  
  async function sendToGoogleAnalyticsMP(data) {
    const measurementId = process.env.NEXT_PUBLIC_GA_ID;
    const apiSecret = process.env.GA_MEASUREMENT_SECRET;
    
    if (!measurementId || !apiSecret) return;
    
    const payload = {
      client_id: 'web-vitals-tracker', // You might want to generate a proper client ID
      events: [{
        name: data.event,
        params: {
          vital_type: data.vital_type,
          vital_value: data.vital_value,
          vital_rating: data.vital_rating,
          page: data.page,
          timestamp: data.timestamp,
        },
      }],
    };
    
    await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }