import React from 'react';
import Calendrier from '../Components/Calendrier';
import './Filtrage.css';

const FiltreDate = () => {

    return (
        <div className="BodyFiltre">

             <span> De </span>
             <Calendrier/>
             <span> A </span>
             <Calendrier/>
            
        </div>

    );
}

export default FiltreDate;