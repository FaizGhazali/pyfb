import React, { useEffect, useRef, useState } from 'react';
import { useApiKey } from '../components/ApiKeyContext';
import { useMyContext } from '../components/VariableContext';


export default function Map({ refreshFlag,activeButton,forwardedRef,dbRef  }){
  const mapRef = useRef(null);
  const { apiKey:mapKeys, updateApiKey } = useApiKey();

  let newLa= useRef();
  const [newLo,setNewLo]=useState('');
  

  const [a, setA]= useState('');
  const [b, setB]= useState('');
  
  
  
  //contact for myVariable
  const { myVariable } = useMyContext();
  const [latitudes,longitudes] =myVariable ? myVariable.split(' ').map(parseFloat) : [3.08, 101.56];

  const handleApiKeySubmit = (key) => {
  // Save the API key using the context function
  updateApiKey(key);
  };
  
  useEffect(() => {
    
    let marker;
    let map;
    let markerlatitude = 3.08;
    let markerlongitude = 101.56;
    let latitude = 3.08;
    let longtitude = 101.56;
    let markerpos;
    let platform;
    let la= 3.08;
    let lon= 101.56;
    if (!mapKeys) {
      console.error("API key is not provided.");
      return;
    }
    platform = new H.service.Platform({
      apikey: mapKeys, // Replace with your HERE API Key
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
        zoom: 17,//17
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
      setA(markerlatitude);
      setB(markerlongitude);
      console.log(newLa);
      //markerlatitude -=0.0008 ;
      if(forwardedRef.current==="Files mode"){
        markerlatitude -=0.0008;
      }else if (forwardedRef.current==="Mqtt mode"){
        markerlongitude +=0.0008;
      }else if (forwardedRef.current==="Auto mode"){
       // markerlatitude = newLa;
        // markerlongitude =newLo;

      }
      console.log("value" +forwardedRef.current);
      if(marker){
          marker.dispose();
      };
      
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
      else if(longtitude-markerpos.lng<-0.012){
        MakeMap(latitude,markerlongitude);
      }
      else if(longtitude-markerpos.lng>0.012){
        MakeMap(latitude,markerlongitude);
      }
    }
   //------------------- END
    MakeMap(latitude,longtitude);
    
    
    window.addEventListener('resize', () => map.getViewPort().resize());
    setInterval(updateMarker, 1000); //interval refresh
    

    return () => {
      // Cleanup
      map.dispose();
    };
  }, [refreshFlag]);

  useEffect(()=>{
    const intervalId = setInterval(() => {
      const currentArray = dbRef.current;
      
      if (currentArray.length > 0) {
        const item = currentArray.shift(); // Remove the first element from the array
         newLa.current = item.latitude ;
        // newLo = item.longitude;
       
        currentArray.push(item);
      }else {
        clearInterval(intervalId); // Stop processing if the array is empt
      }
      //console.log(currentArray);
    },2000);//5 sec
    return () => clearInterval(intervalId);
  });

  return (<>
  <h1>HERE MAPS components</h1>
  <p>Active Button: {activeButton}</p>
  <p>markerlatitude : {a}</p> <p>&nbsp;markerlongitude : {b}</p>
    <div ref={mapRef} style={{ width: '100%', height: '1000px' }} />
    Received Data: {myVariable} <br/>
        Latitude : {latitudes} <br/>
        Longitude : {longitudes} <br/>
        Received Value: {forwardedRef.current}
  </>);
}
