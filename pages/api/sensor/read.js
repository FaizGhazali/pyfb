// pages/api/sensor/read.js
import Sensor from '../../../models/Sensor';

export default async function handler(req, res) {
  try {
    const sensorData = await Sensor.findAll();

    res.status(200).json({ success: true, data: sensorData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
