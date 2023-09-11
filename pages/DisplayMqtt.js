import React, { useState, useEffect } from 'react';

function DisplayMqtt() {
  const [message, setMessage] = useState("Default");

  async function getMessage() {
    
    // get message from mqtt.js
    try{
      const response = await fetch('/api/mqttApi/showMessage');
      const result = await response.json();
      setMessage(result.message); // Update state with received message
    }catch (error){
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    // Initial getMessage
    getMessage();
  }, []);

  useEffect(() => {
    // Update getMessage every 5 seconds
    const interval = setInterval(() => {
    
      getMessage();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <h2>Display MQTT</h2>
      <h3>Message :: {message}</h3>
    </div>
  );
}

export default DisplayMqtt;
