import React, { useState, useEffect } from 'react';
import connectMQTT from '../pages/api/mqttApi/mqtt'; 

function MessageMQTTDisplay() {
  const [message, setMessage] = useState("Default");

  useEffect(() => {
    const client = connectMQTT(setMessage);

    // Clean up the connection when the component unmounts
    return () => {
      client.end();
    };
  }, []);

  return (
    <div>
      <h2>MQTT Message Display</h2>
      <h3>Message: {message}</h3>
    </div>
  );
}

export default MessageMQTTDisplay;
