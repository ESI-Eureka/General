import React, { useState } from 'react';
import { ReactComponent as Fleche } from '../Icons/Fleche.svg';
import './NavFiltre.css';
import FiltreAuteur from './FiltreAuteur';
import FiltreMotCle from './FiltreMotCle';
import FiltreInstitution from './FiltreInstitution';
import FiltreDate from './FiltreDate';

const NavFiltre = () => {
    const [filtreAuteurVisible, setFiltreAuteurVisible] = useState(false);
    const [filtreMotCleVisible, setFiltreMotCleVisible] = useState(false);
    const [FiltreInstitutionVisible, setFiltreInstitutionVisible] = useState(false);
    const [FiltreDateVisible, setFiltreDateVisible] = useState(false);

    const toggleFiltreAuteur = () => {
        setFiltreAuteurVisible(!filtreAuteurVisible);
    };

    const toggleFiltreMotCle = () => {
        setFiltreMotCleVisible(!filtreMotCleVisible);
    };
    
    const toggleFiltreInstitution = () => {
        setFiltreInstitutionVisible(!FiltreInstitutionVisible);
    };

    const toggleFiltreDate = () => {
        setFiltreDateVisible(!FiltreDateVisible);
    };

    return (
        <div className="NavFiltre">
            <div id="Auteur" onClick={toggleFiltreAuteur}>
                <span> Auteur </span>
                <Fleche />
            </div>

            {/* Condition pour afficher FiltreAuteur uniquement si filtreAuteurVisible est true */}
            {filtreAuteurVisible && <FiltreAuteur/>}

            <div id="MotCle"  onClick={toggleFiltreMotCle}>
                <span> Mot clé </span>
                <Fleche />
            </div>

            {/* Condition pour afficher FiltreAuteur uniquement si filtreAuteurVisible est true */}
            {filtreMotCleVisible && <FiltreMotCle/>}

            <div id="Institution" onClick={toggleFiltreInstitution}>
                <span> Institution </span>
                <Fleche />
            </div>

            {/* Condition pour afficher FiltreAuteur uniquement si filtreAuteurVisible est true */}
            {FiltreInstitutionVisible && <FiltreInstitution/>}

            <div id="Periode" onClick={toggleFiltreDate}>
                <span> Période </span>
                <Fleche />
            </div>

             {/* Condition pour afficher FiltreAuteur uniquement si filtreAuteurVisible est true */}
             {FiltreDateVisible && <FiltreDate/>}

            <button> Filtrer par </button>
        </div>
    );
};

export default NavFiltre;
