
const mqtt = require('mqtt');
const mqttUri = 'ws://192.168.0.102:7991'; // Office
const options = {
  userName: '', // Add your MQTT username if required
  password: '', // Add your MQTT password if required
  clientId: 'nextjs',
  reconnectPeriod: 2000,
};
const topic = "faiz";

function connectMQTT(setMessage) {
  const client = mqtt.connect(mqttUri);

  client.on('connect', () => {
    console.log("connected");
  });

  client.subscribe(topic, { qos: 0 }, function (error, granted) {
    if (error) {
      console.log("error sini");
      console.log(error);
    } else {
      console.log(`${granted[0].topic} was subscribed`);
    }
  });

  client.on('message', (receivedTopic, message, packet) => {
    console.log(`Received message on topic ${receivedTopic}: ${message.toString()}`);
    // Handle the received message here
    setMessage(message.toString()); // Update the state with the received message
  });

  return client;
}

export default connectMQTT;
