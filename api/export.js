import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get all feedback IDs
    const feedbackIds = await kv.lrange('feedback-list', 0, -1);
    
    // Get all feedback objects
    const allFeedback = [];
    for (const id of feedbackIds) {
      const feedback = await kv.get(id);
      if (feedback) {
        allFeedback.push(JSON.parse(feedback));
      }
    }

    // Return as CSV
    const csv = convertToCSV(allFeedback);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=feedback.csv');
    return res.send(csv);
  } catch (error) {
    console.error('Error exporting feedback:', error);
    return res.status(500).json({ error: 'Failed to export feedback' });
  }
}

function convertToCSV(data) {
  if (data.length === 0) return '';
  
  const headers = Object.keys(data[0]);
  const rows = data.map(obj => 
    headers.map(header => JSON.stringify(obj[header] || '')).join(',')
  );
  
  return [headers.join(','), ...rows].join('\n');
}