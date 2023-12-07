import React, { useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'; // Import des styles CSS
import calendar from '../Icons/Calendar.svg'; // Importez votre icône de calendrier
import './SearchBar2.css';

const Calendrier = () => {
  const [date, setDate] = useState(null);
  const onChange = date => {
    setDate(date);
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
