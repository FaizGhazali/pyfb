// pages/api/sensor/delete.js
import Sensor from '../../../models/Sensor';

export default async function handler(req, res) {
  try {
    const { id } = req.body;

    const deletedRows = await Sensor.destroy({ where: { id } });

    res.status(200).json({ success: true, data: deletedRows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
