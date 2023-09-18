import React, { useEffect } from 'react';
import styles from './rotatingmarker.module.css'; // Import the CSS module

const RotatingMarker = ({ lat, lng, rotation }) => {
  useEffect(() => {
    const markerElement = document.createElement('div');
    markerElement.className = styles['rotating-marker']; // Use the CSS module class name

    markerElement.style.transform = `rotate(${rotation}deg)`;

    const marker = new H.map.DomMarker({ lat, lng }, { element: markerElement });
    map.addObject(marker);

    return () => {
      map.removeObject(marker);
    };
  }, [lat, lng, rotation]);

  return null;
};

export default RotatingMarker;
