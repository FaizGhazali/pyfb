import React, { useEffect, useRef, useState } from 'react';
import { useApiKey } from '../components/ApiKeyContext';
import ApiKeyForm from '../components/ApiKeyForm';
import mqtt from 'mqtt';


export default function Map() {
  const mapRef = useRef(null);
  const [marker, setMarker] = useState(null);
  const { apiKey: mapKeys } = useApiKey();
  const mqtt = require('mqtt');
  const mqttUri = 'ws://192.168.0.102:7991'; // Corrected URI
const options = {
  userName: '', // Add your MQTT username if required
  password: '', // Add your MQTT password if required
  clientId: 'nextjs',
  reconnectPeriod: 2000,
};
const topic = "faiz";
let words = "3.08 101.56";

  const { apiKey, updateApiKey } = useApiKey();

  const handleApiKeySubmit = (key) => {
    // Save the API key using the context function
    updateApiKey(key);
    
    };
  

  //ykV0LNTyrAZsQSzEcTasWIm_E2bo8fr5wrKFYaGUQPY
  // Your MQTT function to receive messages and parse instructions
  const handleMQTTMessage = (message) => {
    
    const instructions = JSON.parse(message);
    const { latitude, longitude } = instructions;

    // Update the marker position
    if (marker) {
      updateMarkerPosition(latitude, longitude);
    }
  };
  
  

  useEffect(() => {
    let platform;
    let map;

    

    if (!mapKeys) {
      console.error('API key is not provided.');
      return;
    }
    

    platform = new H.service.Platform({
      apikey: mapKeys, // Replace with your HERE API Key
    });

    const defaultLayers = platform.createDefaultLayers();

    const MakeMap = (latitude, longitude) => {
      map = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
        center: { lat: latitude, lng: longitude },
        zoom: 17,
      });

      // Create the initial marker
      const marker = MakeMarker(latitude, longitude);
      AddMarkerOnMap(map, marker);
      setMarker(marker);
    };

    const MakeMarker = (latitude, longitude) => {
      const emojiIcon = new H.map.Icon('/images/dragon_icon.png', {
        size: { w: 40, h: 40 },
        anchor: { x: 20, y: 40 },
      });

      const newMarker = new H.map.Marker(
        { lat: latitude, lng: longitude },
        { icon: emojiIcon }
      );

      return newMarker;
    };

    const AddMarkerOnMap = (map, marker) => {
      map.addObject(marker);
    };

    MakeMap(3.08, 101.56); // Initialize the map with default coordinates

    // Assuming you're subscribing to an MQTT topic here
    const mqttClient = mqtt.connect(mqttUri);
    mqttClient.subscribe(topic);
    
    mqttClient.on('message', (topic, message, packet) => {
      console.log("subcribed mqtt");
      handleMQTTMessage(message);  
    });

    return () => {
      mqttClient.disconnect(); // Clean up MQTT connection on component unmount
      map.dispose();
    };
  }, [mapKeys]);

  return (
  <>
  {!apiKey ? (
                    <ApiKeyForm onSubmit={handleApiKeySubmit} />
                   ): (<div>
                       <p>Input Here Maps Api  : {apiKey}</p>
                       {/* Pass refreshFlag to ComponentB */}
                       
                   </div>           
      )}
      <div ref={mapRef} style={{ width: '100%', height: '1000px' }} />
  </>);
}