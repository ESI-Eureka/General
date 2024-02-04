// IconedButton.js
import React from 'react';
import './IconedButton.css';

/**
 * Renders a button component with an optional icon and text.
 *
 * @param {Object} props - The component props.
 * @param {React.ElementType} props.icon - The icon component to be rendered.
 * @param {string} props.text - The text to be displayed.
 * @param {Function} props.onClick - The function to be called when the button is clicked.
 * @returns {React.Element} The rendered button component.
 */
const IconedButton = ({ icon: Icon, text , onClick }) => {
  return (
    <div onClick={onClick} className='Corriger'>
      {Icon && <Icon />}
      <span>{text}</span>
    </div>
  );
};

export default IconedButton;
