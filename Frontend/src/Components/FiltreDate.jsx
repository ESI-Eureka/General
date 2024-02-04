import React, { useState } from 'react';
import Calendrier from '../Components/Calendrier';
import './Filtrage.css';

/**
 * Component for filtering dates.
 * 
 * @param {Object} props - The component props.
 * @param {Function} props.onDateDebutSelect - Callback function for handling the selection of start date.
 * @param {Function} props.onDateFinSelect - Callback function for handling the selection of end date.
 * @returns {JSX.Element} The rendered component.
 */
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
                <span> From </span>
                <Calendrier onDateSelect={handleDateDebutSelection} />
            </div>
            <div>
                <span> To </span>
                <Calendrier onDateSelect={handleDateFinSelection} />
            </div>
        </div>
    );
}

export default FiltreDate;
