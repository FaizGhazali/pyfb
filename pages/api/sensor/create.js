// pages/api/sensor/create.js
import Sensor from '../../../models/Sensor';

export default async function handler(req, res) {
  try {
    const newReading = await Sensor.create({
      value1: req.body.value1,
      value2: req.body.value2,
      value3: req.body.value3,
    });

    res.status(200).json({ success: true, data: newReading });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
