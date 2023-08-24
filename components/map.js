import React, { useEffect, useRef, useState } from 'react';
import { useApiKey } from '../components/ApiKeyContext';


export default function Map({ refreshFlag }){
  const mapRef = useRef(null);
  
  const { apiKey:mapKeys, updateApiKey } = useApiKey();
  

    const handleApiKeySubmit = (key) => {
    // Save the API key using the context function
    updateApiKey(key);
    };
  
  
  useEffect(() => {
    let marker;
    let map;
    let markerlatitude = 3.08;
    let latitude = 3.08;
    let longtitude = 101.56;
    let markerpos;
    let platform;
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
    function MakeMap(latitude,longtitude){
      // Initialize the platform and map
      if (map){
        console.log("Destroy Map Called");
        map.dispose();
      }
     

      
      map = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
        center: { lat: latitude, lng: longtitude },
        zoom: 17,
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
        { lat: markerlatitude, lng: 101.56 },
        { icon: emojiIcon }
      );
      return marker;
    }

    function AddMarkerOnMap(map,marker){
      map.addObject(marker);
    }
    function updateMarker(){
       markerlatitude += 0.0002;
      if(marker){
          marker.dispose();
      };
      MakeMarker(markerlatitude);
      AddMarkerOnMap(map,marker);
      
      markerpos =marker.getGeometry();
      // //23
      reCenterMarker(markerpos);
    }

    function reCenterMarker(markerpos){
      if(latitude-markerpos.lat<-0.005){
        latitude=markerlatitude+0.0020;
        MakeMap(latitude,longtitude);
        
       }
    }
   //------------------- END
    MakeMap(latitude,longtitude);
    
    
    window.addEventListener('resize', () => map.getViewPort().resize());

    setInterval(updateMarker, 1000);
    

    return () => {
      // Cleanup
      map.dispose();
    };
  }, [refreshFlag]);

  return <div ref={mapRef} style={{ width: '100%', height: '1000px' }} />;
}
