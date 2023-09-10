import db from './db';

export default async function handler(req, res) {
  const { id } = req.body;

  try {
    const [result] = await db.query('DELETE FROM table1 WHERE id = ?', [id]);
    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
