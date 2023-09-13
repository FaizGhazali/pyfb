const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'public/mapLocation.txt'); 

export default function handler(req, res) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const coordinates = data.split('\n').map(line => line.trim());

    console.log('Parsed coordinates:', coordinates);
    
    res.status(200).json({ success: true, coordinates });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
