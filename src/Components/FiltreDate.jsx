import React from 'react';
import BarreCalendar from './BarreCalendar';
import './Filtrage.css';

const FiltreDate = () => {

    return (
        <div className="BodyFiltre">

             <span> De </span>
             <BarreCalendar/>
             <span> A </span>
             <BarreCalendar/>
            
        </div>

    );
}

export default FiltreDate;