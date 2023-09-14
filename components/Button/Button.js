// import React from 'react';
// import styles from './button.module.css';

// const Button = ({ children, onClick,name }) => {
//   const handleClick = () => {
//     onClick(name);
//   };
//   return (
//     <button className={styles.customButton} onClick={handleClick}>
//       {children}
//     </button>
//   );
// };

// export default Button;

import React from 'react';
import styles from './button.module.css';

const Button = ({ children, onClick,name,isActive }) => {
  const buttonClass = isActive ? styles.activeButton : styles.inactiveButton;
  const handleClick = ()=>{
    onClick(name);
  }
  return (
    <button className={buttonClass} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;
