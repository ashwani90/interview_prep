// pages/api/validate-image.js
import { isValidImageDomain } from '../../lib/image-validation';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  const validation = isValidImageDomain(url);

  res.status(200).json(validation);
}