// pages/api/sensor/update.js
import Sensor from '../../../models/Sensor';

export default async function handler(req, res) {
  try {
    const { id, value1, value2, value3 } = req.body;

    const updatedReading = await Sensor.update(
      { value1, value2, value3 },
      { where: { id } }
    );

    res.status(200).json({ success: true, data: updatedReading });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
