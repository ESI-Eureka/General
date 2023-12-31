import React, { useState } from 'react';
import Calendrier from '../Components/Calendrier';
import './Filtrage.css';

const FiltreDate = ({ onDateDebutSelect, onDateFinSelect }) => {

    //pour stocker les date sélectionnées
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');

    // Mettre à jour les dates sélectionnés
    const handleDateDebutSelection = (selectedDate) => {
        console.log('Date de début sélectionnée :', selectedDate);
        setDateDebut(selectedDate);
        onDateDebutSelect(selectedDate);
    };

    const handleDateFinSelection = (selectedDate) => {
        console.log('Date de fin sélectionnée :', selectedDate);
        setDateFin(selectedDate);
        onDateFinSelect(selectedDate);
    };

    return (
        <div className="BodyFiltre">
            <div>
                <span> De </span>
                <Calendrier onDateSelect={handleDateDebutSelection} />
            </div>
            <div>
                <span> A </span>
                <Calendrier onDateSelect={handleDateFinSelection} />
            </div>
        </div>
    );
}

export default FiltreDate;
