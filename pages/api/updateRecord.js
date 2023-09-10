import db from './db';

export default async function handler(req, res) {
  const { id, column1, column2 } = req.body;

  try {
    const [result] = await db.query('UPDATE table1 SET column1 = ?, column2 = ? WHERE id = ?', [column1, column2, id]);
    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
