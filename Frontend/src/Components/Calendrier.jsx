import React, { useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'; // Import des styles CSS
import calendar from '../Icons/Calendar.svg'; // Importez votre icône de calendrier
import './SearchBar2.css';

/**
 * A component for selecting a date from a calendar.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.onDateSelect - The callback function to be called when a date is selected.
 * @returns {JSX.Element} The Calendrier component.
 */
const Calendrier = ({ onDateSelect }) => {
  
  const [date, setDate] = useState(null);

  const onChange = date => {
    setDate(date);
    onDateSelect(date); 

  };

  return (
    <div className="SearchBar2">
      <DatePicker
        selected={date}
        onChange={onChange}
        value={date}
        placeholderText="dd/mm/yyyy"
        showPopperArrow={false}
        dateFormat="dd/MM/yyyy" // Format de la date ici
      />
      <img
        src={calendar}
        alt="calendar"
        onClick={() => document.querySelector('.react-datepicker-wrapper input').click()}
      />
    </div>
  );
};

export default Calendrier;
