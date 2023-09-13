import React, { useState } from 'react';
import ButtonComponent from './ButtonComponent';

const MButton = () => {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (label) => {
    setActiveButton(label === activeButton ? null : label);
  };

  return (
    <div>
     <ButtonComponent
  label="Special Button"
  special={true}
  onClick={() => handleButtonClick('Special Button')}
/>

    </div>
  );
};

export default MButton;
