import { useState,useEffect,createContext,useContext,useRef } from 'react';
import Link from 'next/link';
import { useMyContext } from '../components/VariableContext';
import { useRouter } from 'next/router';
import ApiKeyForm from '../components/ApiKeyForm';
import { useApiKey } from '../components/ApiKeyContext';
import Map from '../components/map';
import VariableCheck from './posts/variableTest';


const mqtt = require('mqtt')
//const mqttUri = 'ws://192.168.1.107:7083'; // Rumah
const mqttUri = 'ws://192.168.0.102:7991'; // Ofiice
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

let markerlatitude = 3.08;
let markerlongitude = 101.56;








const MqttPage = () => {

  const mapRef = useRef(null);
  const mqttRef = useRef(null);
  

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

    //-------------------------------------------------MQTT PART----------------------
    // Connect to your MQTT broker
    
    const client = mqtt.connect(mqttUri);

    // Set up event handlers
    
    client.on('connect', () => {
      //console.log('Connected to MQTT broker');
      
      // Publish the message to a topic
      // client.publish(topic, message); // Use the 'message' variable here
    });
    // Receive
    client.subscribe(topic, { qos: 0 }, function (error, granted) {
      if (error) {
        console.log(error)
      } else {
       // console.log(`${granted[0].topic} was subscribed`)
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
    mqttRef.current = words;
    
    

   
    

    return () => {
      //console.log("destroctor mqqt called");
      client.end();
      //map dispose 
      //map.dispose();
      
    };
  }, [count,refreshFlag]);
////-------------------------------------------------MQTT PART----------------------
//00000000000000000000000000000000000 MAP PART 000000000000000000000000000000000000
  useEffect(()=>{
    let coor = mqttRef.current;
    console.log("map started");
    console.log(coor);
    let marker;
    let map;
    
    let latitude = 3.08;
    let longtitude = 101.56;
    let markerpos;
    let platform;
    
    if (!apiKey) {
      console.error("API key is not provided.");
      return;
    }
    platform = new H.service.Platform({
      apikey: apiKey, // Replace with your HERE API Key
    });
        //ykV0LNTyrAZsQSzEcTasWIm_E2bo8fr5wrKFYaGUQPY
    const defaultLayers = platform.createDefaultLayers();

    //-------------------- Start
    function MakeMap(latitudep,longtitudep){
      // Initialize the platform and map
      if (map){
        console.log("Destroy Map Called");
        map.dispose();
      }
      latitude = latitudep;
      longtitude = longtitudep

      
      map = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
        center: { lat: latitude, lng: longtitude },
        zoom: 17,
        //default value 17
      });
      if(map){
        marker = MakeMarker(markerlatitude);
        AddMarkerOnMap(map,marker);
      }
    }

    function MakeMarker(markerlatitude){      
      const emojiIcon = new H.map.Icon('/images/dragon_icon.png', {
      size: { w: 40, h: 40 },
      anchor: { x: 20, y: 40 }
      });
      marker = new H.map.Marker(
        { lat: markerlatitude, lng: markerlongitude },
        { icon: emojiIcon }
      );
      return marker;
    }

    function AddMarkerOnMap(map,marker){
      map.addObject(marker);
    }
    function updateMarker(){
        
      // markerlatitude +=0.0008 ;
      // markerlatitude =3.0808 ;
      //markerlatitude = latitudes;
      // markerlongitude = longitudes;
      coor = mqttRef.current;
      const [latitudes,longitudes] =coor ? coor.split(' ') : [null, null];
      console.log("New Coor : " +latitudes+" "+ longitudes);
      if(marker){
          marker.dispose();
      };
      markerlatitude=latitudes;
      markerlongitude = longitudes;
      // markerlatitude -=0.0008 ;
      // markerlongitude -=0.0008;
      MakeMarker(markerlatitude,markerlongitude);
      AddMarkerOnMap(map,marker);
      
      markerpos =marker.getGeometry();
      // //23
      reCenterMarker(markerpos);
    }

    function reCenterMarker(markerpos){
      if(latitude-markerpos.lat<-0.005){
        MakeMap(markerlatitude,longtitude);
       }
      else if (latitude-markerpos.lat>0.005){
        MakeMap(markerlatitude,longtitude);
      }
      if(longtitude-markerpos.lng<-0.012){
        MakeMap(latitude,markerlongitude);
      }
      else if(longtitude-markerpos.lng>0.012){
        MakeMap(latitude,markerlongitude);
      }
    }
   //------------------- END
    MakeMap(latitude,longtitude);
    
    
    window.addEventListener('resize', () => map.getViewPort().resize());

    setInterval(updateMarker, 1000);

    return () =>{
      map.dispose();
    }
  },[refreshFlag]);

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
                       <div ref={mapRef} style={{ width: '100%', height: '1000px' }} />
                       <p>Marker Coordinate : {markerlatitude} : {markerlongitude}</p>
                   </div>           
      )}
  
  
    </div>
  );
};





export default MqttPage;
