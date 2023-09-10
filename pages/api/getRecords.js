// pages/api/getRecords.js

import db from './db';

export default async function handler(req, res) {
  try {
    const [results] = await db.query('SELECT * FROM table_name');
    res.status(200).json({ success: true, results });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
