// pages/api/analytics/404.js
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { type, data } = req.body;

    if (type !== '404_error') {
      return res.status(400).json({ message: 'Invalid event type' });
    }

    // Log to console (replace with your analytics service)
    console.log('404 Error Analytics:', {
      timestamp: new Date().toISOString(),
      ...data,
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    });

    // Here you can send data to:
    // - Google Analytics Measurement Protocol
    // - Mixpanel
    // - Amplitude
    // - Your database
    // - Logging service (Sentry, LogRocket, etc.)

    // Example: Store in database (pseudo-code)
    // await store404Error(data);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error processing analytics:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}