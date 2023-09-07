import { useState,useEffect,createContext,useContext } from 'react';
import Link from 'next/link';
import { useMyContext } from '../components/VariableContext';
import { useRouter } from 'next/router';
import ApiKeyForm from '../components/ApiKeyForm';
import { useApiKey } from '../components/ApiKeyContext';
import Map from '../components/map';
import VariableCheck from './posts/variableTest';


const mqtt = require('mqtt')
const mqttUri = 'ws://192.168.0.102:7991'; // Corrected URI
const options = {
  userName: '', // Add your MQTT username if required
  password: '', // Add your MQTT password if required
  clientId: 'nextjs',
  reconnectPeriod: 2000,
};
const topic = "faiz";
let words = "3.08 101.56";
let dataTosend= "default";
const message = 'Hanto Dari Next jS'; // Define your message here






const MqttPage = () => {

  const { setMyVariable } = useMyContext();
  const router = useRouter();

  const handleClick = () => {
    
    setMyVariable(words);
    // router.push('./posts/variableTest'); // untuk redirct next page
  };


  // Define a state variable and a function to update it
  const [count, setCount] = useState(0);

  //api keys for HERE MAPS
  const { apiKey, updateApiKey } = useApiKey();
  //flats for resresh function ******** need revise ******
  const [refreshFlag, setRefreshFlag] = useState(false);
  //handle on submit for HERE Map api button
  const handleApiKeySubmit = (key) => {
  // Save the API key using the context function
  updateApiKey(key);
  setRefreshFlag(!refreshFlag);
  };



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
      dataTosend = words;
      handleClick();
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
      <p>Testing Pass Variable. Click Here <Link href="./posts/variableTest">Testing Propss</Link></p>

      <h1>Page A</h1>
      <button onClick={handleClick}>Set Variable and Go to Page B</button>

      <VariableCheck/>

      {!apiKey ? (
                    <ApiKeyForm onSubmit={handleApiKeySubmit} />
                   ): (<div>
                       <p>Input Here Maps Api  : {apiKey}</p>
                       {/* Pass refreshFlag to ComponentB */}
                        <Map refreshFlag={refreshFlag}  />
                   </div>           
      )}
  
  
    </div>
  );
};





export default MqttPage;
