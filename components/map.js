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
    if (!mapKeys) {
      console.error("API key is not provided.");
      return;
    }
    //------------------- Start
    function MakeMap(){
      // Initialize the platform and map
      const platform = new H.service.Platform({
        apikey: mapKeys, // Replace with your HERE API Key
      });
          //ykV0LNTyrAZsQSzEcTasWIm_E2bo8fr5wrKFYaGUQPY
      const defaultLayers = platform.createDefaultLayers();
      const map = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
        center: { lat: 3.08, lng: 101.56 },
        zoom: 17,
      });
      if(map){
        let marker = MakeMarker();
        AddMarkerOnMap(map,marker);
      }
    }

    function MakeMarker(){      
      const emojiIcon = new H.map.Icon('/images/dragon_icon.png', {
      size: { w: 40, h: 40 },
      anchor: { x: 20, y: 40 }
      });
      const marker = new H.map.Marker(
        { lat: 3.08, lng: 101.56 },
        { icon: emojiIcon }
      );
      return marker;
    }

    function AddMarkerOnMap(map,marker){
      map.addObject(marker);
    }
   //-------------------- END
    MakeMap();
    
    window.addEventListener('resize', () => map.getViewPort().resize());
    

    return () => {
      // Cleanup
      map.dispose();
    };
  }, [refreshFlag]);

  return <div ref={mapRef} style={{ width: '100%', height: '500px' }} />;
}
