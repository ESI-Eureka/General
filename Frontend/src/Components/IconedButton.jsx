// IconedButton.js
import React from 'react';
import './IconedButton.css';

const IconedButton = ({ icon: Icon, text , onClick }) => {
  return (
    <div onClick={onClick} className='Corriger'>
      {Icon && <Icon />}
      <span>{text}</span>
    </div>
  );
};

export default IconedButton;
