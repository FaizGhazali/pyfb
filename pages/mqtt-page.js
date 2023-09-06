import { useState,useEffect } from 'react';

const mqtt = require('mqtt')
const mqttUri = 'mqtt://192.168.0.102:7991'; // Corrected URI
const options = {
  userName: '', // Add your MQTT username if required
  password: '', // Add your MQTT password if required
  clientId: 'nextjs',
  reconnectPeriod: 2000,
};
const topic = "faiz";
let words = "default";

const message = 'Hanto Dari Next jS'; // Define your message here



const MqttPage = () => {
  // Define a state variable and a function to update it
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Connect to your MQTT broker
    
    const client = mqtt.connect(mqttUri);

    // Set up event handlers
    
    client.on('connect', () => {
      console.log('Connected to MQTT broker');
      
      // Publish the message to a topic
      // client.publish(topic, message); // Use the 'message' variable here
    });
    // Receive
    client.subscribe(topic, { qos: 0 }, function (error, granted) {
      if (error) {
        console.log(error)
      } else {
        console.log(`${granted[0].topic} was subscribed`)
      }
    });
    // Receive
    client.on('message', (topic, message, packet) => {
      console.log(`Received Message: ${message.toString()} On topic: ${topic}`)
      words = message.toString();
    });


    client.on('error', (error) => {
      console.error('MQTT error:', error);
    });
    // Change the value of the variable after a delay (for demonstration purposes)
    setTimeout(() => {
      setCount(count + 1);
    }, 2000); // Change the value after 2 seconds

    // Clean up when the component unmounts
    return () => {
      console.log("destroctor mqqt called");
      client.end();
      
    };
  }, [count]);

  return (
    <div>
      <h1>Send MQTT Message</h1>
  <p>Check the console for MQTT status and messages. {words}</p>
  <p>Count: {count}</p>
    </div>
  );
};

export default MqttPage;
