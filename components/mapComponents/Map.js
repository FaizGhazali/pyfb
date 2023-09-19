import React, { useEffect, useRef, useState } from 'react';
// import H from 'react-leaflet-here-map';


export default function Map({ refreshFlag,activeButton,forwardedRef,dbRef,data  }){
  const mapRef = useRef(null);
  const dataRef = useRef();
  const trailsCoor = useRef([null,null]);

  let markerlatitude = 3.08;
  let markerlongitude = 101.56;
  
  useEffect(() => {
    
    let marker;
    let trailsMarker;
    let map;
    
    let latitude = 3.08;
    let longtitude = 101.56;
    let markerpos;
    let platform;
    let la= 3.08;
    let lon= 101.56;
    
    platform = new H.service.Platform({
      apikey: "ykV0LNTyrAZsQSzEcTasWIm_E2bo8fr5wrKFYaGUQPY", // Replace with your HERE API Key
    });
        //ykV0LNTyrAZsQSzEcTasWIm_E2bo8fr5wrKFYaGUQPY
    const defaultLayers = platform.createDefaultLayers({
      layers: ['raster', 'terrain', 'labels'], // Add 'raster' layer
    });

    //-------------------- Start
    function MakeMap(latitudep,longtitudep){
      // Initialize the platform and map
      if (map){
        console.log("Destroy Map Called");
        map.dispose();
      }
      latitude = latitudep;
      longtitude = longtitudep

      
      map = new H.Map(mapRef.current, defaultLayers.raster.satellite.map, { // Use satellite view
        center: { lat: latitude, lng: longtitude },
        zoom: 16,
        
        
      });
      const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

      // Enable zoom control
      const ui = H.ui.UI.createDefault(map, defaultLayers);
      
      if(map){
        marker = MakeMarker(markerlatitude);
        AddMarkerOnMap(map,marker);
      }
      if(trailsCoor.length&&map){
        
        trailsCoor.array.forEach(element => {
            makeOldTrails.current(element[0],element[1])
        });
      }
      trailsCoor.current = [];

    }

    function MakeMarker(markerlatitude){      
      const emojiIcon = new H.map.Icon('/images/dragon_icon.png', {
      size: { w: 40, h: 40 },
      anchor: { x: 0, y: 0 },
      rotation: 180
      });
      marker = new H.map.Marker(
        { lat: markerlatitude, lng: markerlongitude },
        { icon: emojiIcon }
      );
      
      return marker;
    }
    function makeOldTrails(Tlat,Tlng){
        const trailsIcon = new H.map.Icon('/images/red_trails.png', {
            size: { w: 20, h: 20 },
            anchor: { x: 0, y: 0 }
        });
        trailsMarker = new H.map.Marker(
            { lat: Tlat, lng: Tlng },
            { icon: trailsIcon }
        );
        if(map){
            map.addObject(trailsMarker);
        }
        
    }
    function makeTrails(old_marker_position){
        // console.log("Latitude " + old_marker_position.lng);
        const trailsIcon = new H.map.Icon('/images/red_trails.png', {
            size: { w: 10, h: 10 },
            anchor: { x: -15, y: -15 }
            });
            trailsMarker = new H.map.Marker(
              { lat: old_marker_position.lat, lng: old_marker_position.lng },
              { icon: trailsIcon }
            );
        if(map){
            map.addObject(trailsMarker);

            trailsCoor.current.push([old_marker_position.lat,old_marker_position.lng]);
        }
    }

    function AddMarkerOnMap(map,marker){
      map.addObject(marker);
      
    }
    function updateMarker(){
     
     
      if(marker){
          makeTrails(marker.getGeometry());
          marker.dispose();
      };
      if(dataRef.current){
        markerlatitude=dataRef.current.lat;
        markerlongitude=dataRef.current.long;
        // markerlatitude = 3.08527; //101.56249
        // markerlongitude = 101.56249;
      }
      MakeMarker(markerlatitude,markerlongitude);
      AddMarkerOnMap(map,marker);
      
      markerpos =marker.getGeometry();
      // //23
      //reCenterMarker(markerpos);
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

  useEffect(() => {
    // Function to be executed every 2 seconds
    const interval = setInterval(() => {
    if(data.current){
        dataRef.current = JSON.parse(data.current);
        // console.log(dataRef.current);
        
        
    }
    console.log(trailsCoor);
    }, 2000);

    // Clear the interval when the component is unmounted or when the effect is cleaned up
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures the effect runs only once on component mount
  return (<>
  
    <div ref={mapRef} style={{ width: '100%', height: '1200px' }} />
  </>);
}
