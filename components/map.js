import React, { useEffect, useRef, useState } from 'react';
import { useApiKey } from '../components/ApiKeyContext';


export default function Map({ refreshFlag }){
  const mapRef = useRef(null);
  
  const { apiKeys, updateApiKey } = useApiKey();
  

    const handleApiKeySubmit = (key) => {
    // Save the API key using the context function
    updateApiKey(key);
    };
  
  
  useEffect(() => {
    // if (!apiKeys) {
    //   console.error("API key is not provided.");
    //   return;
    // }
    console.log("Here your api keys"+apiKeys);
    // Initialize the platform and map

    const platform = new H.service.Platform({
      apikey: "ykV0LNTyrAZsQSzEcTasWIm_E2bo8fr5wrKFYaGUQPY", // Replace with your HERE API Key
    });
  //ykV0LNTyrAZsQSzEcTasWIm_E2bo8fr5wrKFYaGUQPY

    const defaultLayers = platform.createDefaultLayers();
    const map = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: 3.08, lng: 101.56 },
      zoom: 17,
    });

    // Add a marker
    const marker = new H.map.Marker({ lat: 52.5, lng: 13.4 });
    map.addObject(marker);

    // Add event listener for resizing
    window.addEventListener('resize', () => map.getViewPort().resize());

    return () => {
      // Cleanup
      map.dispose();
    };
  }, [refreshFlag]);

  return <div ref={mapRef} style={{ width: '100%', height: '500px' }} />;
}
