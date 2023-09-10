import db from './db';

export default async function handler(req, res) {
  const { column1, column2 } = req.body;

  try {
    const [result] = await db.query('INSERT INTO table1 (column1, column2) VALUES (?, ?)', [column1, column2]);
    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
