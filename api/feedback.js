import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const feedback = {
      ...req.body,
      timestamp: new Date().toISOString(),
      id: `feedback-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };

    // Store in KV
    await kv.set(feedback.id, JSON.stringify(feedback));
    
    // Also add to a list for easy retrieval
    await kv.lpush('feedback-list', feedback.id);

    return res.status(200).json({ success: true, id: feedback.id });
  } catch (error) {
    console.error('Error saving feedback:', error);
    return res.status(500).json({ error: 'Failed to save feedback' });
  }
}