import mq from './mqtt';

export default async function handler(req, res) {
  try {
    const [results] = await mq.query('SELECT * FROM table1');
    res.status(200).json({ success: true, results });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
