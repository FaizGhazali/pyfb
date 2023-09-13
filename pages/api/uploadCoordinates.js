import db from './db';
const fs = require('fs');
const path = require('path');
const filePath = path.join(process.cwd(), 'public/mapLocation.txt'); 

export default async function handler (req, res){
  try {// Read the file
    const data = fs.readFileSync(filePath, 'utf8');
    console.log('File content:', data); 
    const coordinates = data.split('\n').map(line => {
      const [latitude, longitude] = line.trim().split(' ');
      return [parseFloat(latitude), parseFloat(longitude)];
    });
    
    // Assuming your database table has columns 'latitude' and 'longitude'
    const insertQuery = 'INSERT INTO gps_location (latitude, longitude) VALUES ?';
    const values = coordinates;
    
    await db.query(insertQuery, [values]);

    res.status(200).json({ success: true, message: 'Data updated successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};