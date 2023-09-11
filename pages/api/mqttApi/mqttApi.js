import connectMQTT from '../mqttApi/mqtt'; // Assuming mqtt.js is inside lib directory

const handler = async (req, res) => {
  try {
    const client = connectMQTT();
    // Add any further logic you need for handling MQTT requests
    res.status(200).json({ message: 'MQTT connected' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default handler;
