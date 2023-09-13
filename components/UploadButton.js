import React from 'react';

const UploadButton = () => {
  const handleClick = async () => {
    try {
      const response = await fetch('/api/uploadCoordinates', {
        method: 'GET'
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Data from API:', data);
      } else {
        console.error('Error fetching data from API');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <button onClick={handleClick}>Upload Coordinates</button>
  );
};

export default UploadButton;
