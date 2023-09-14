import React, { useState } from 'react';
import ButtonComponent from './Button';

const MButton = ({ sendDataToMButton }) => {
  const [isActive, setIsActive] = useState(false);
  const handleClick = (name) =>{
     //alert(`Changed Mode: ${name}`);
     setIsActive(name);
    sendDataToMButton(name);

     
  }

  return (
    <div>
     <ButtonComponent onClick={handleClick} name="Files mode" isActive={isActive==="Files mode"}>Read Files Coor</ButtonComponent>
     <ButtonComponent onClick={handleClick} name="Mqtt mode" isActive={isActive==="Mqtt mode"}>Mqtt Message Coor</ButtonComponent>
     <ButtonComponent onClick={handleClick} name="Auto mode" isActive={isActive==="Auto mode"}>Auto Moving Coor</ButtonComponent>
    </div>
  );
};

export default MButton;
