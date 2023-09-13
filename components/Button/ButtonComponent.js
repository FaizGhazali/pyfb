import React from 'react';
import styles from './ButtonComponent.module.css';

const ButtonComponent = ({ label, active, onClick, special }) => {
  const buttonClass = special ? styles.specialButton : (active ? styles.activeButton : styles.normalButton);

  return (
    <button
      className={buttonClass}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default ButtonComponent;
