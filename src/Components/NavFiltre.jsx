import React, { useState } from 'react';
import { ReactComponent as Fleche } from '../Icons/Fleche.svg';
import './NavFiltre.css';
import FiltreAuteur from './FiltreAuteur';
import FiltreMotCle from './FiltreMotCle';
import FiltreInstitution from './FiltreInstitution';
import FiltreDate from './FiltreDate';
import { data } from '../data';

const extractUniqueValues = (property) => {
    // Utilisez Set pour obtenir des valeurs uniques
    const uniqueValues = new Set(data.map(article => article[property]).flat());
    return Array.from(uniqueValues);
};

const NavFiltre = () => {
    const [filtreAuteurVisible, setFiltreAuteurVisible] = useState(false);
    const [filtreMotCleVisible, setFiltreMotCleVisible] = useState(false);
    const [filtreInstitutionVisible, setFiltreInstitutionVisible] = useState(false);
    const [filtreDateVisible, setFiltreDateVisible] = useState(false);

    const [rotateAngleAuteur, setRotateAngleAuteur] = useState(0);
    const [rotateAngleMotCle, setRotateAngleMotCle] = useState(0);
    const [rotateAngleInstitution, setRotateAngleInstitution] = useState(0);
    const [rotateAngleDate, setRotateAngleDate] = useState(0);

    const toggleFiltreAuteur = () => {
        setFiltreAuteurVisible(!filtreAuteurVisible);
        setRotateAngleAuteur((prevAngle) => (prevAngle + 180) % 360);
    };

    const toggleFiltreMotCle = () => {
        setFiltreMotCleVisible(!filtreMotCleVisible);
        setRotateAngleMotCle((prevAngle) => (prevAngle + 180) % 360);
    };
    
    const toggleFiltreInstitution = () => {
        setFiltreInstitutionVisible(!filtreInstitutionVisible);
        setRotateAngleInstitution((prevAngle) => (prevAngle + 180) % 360);
    };

    const toggleFiltreDate = () => {
        setFiltreDateVisible(!filtreDateVisible);
        setRotateAngleDate((prevAngle) => (prevAngle + 180) % 360);
    };

    const auteurs = extractUniqueValues('auteurs');
    const motsCles = extractUniqueValues('mots_cles');
    const institutions = extractUniqueValues('institutions');
    const periodes = extractUniqueValues('publication_date');

    return (
        <div className="NavFiltre">
            <div className="Listes">
                <div id="Auteur" onClick={toggleFiltreAuteur}>
                    <span> Auteur </span>
                    <Fleche
                        style={{ transform: `rotate(${rotateAngleAuteur}deg)` }}
                    />
                </div>
                {filtreAuteurVisible && <FiltreAuteur options={auteurs} />}
            </div>
            
            <div className="Listes">
                <div id="MotCle" onClick={toggleFiltreMotCle}>
                    <span> Mot clé </span>
                    <Fleche
                        style={{ transform: `rotate(${rotateAngleMotCle}deg)` }}
                    />
                </div>
                {filtreMotCleVisible && <FiltreMotCle options={motsCles} />}
            </div>
        
            <div className="Listes">
                <div id="Institution" onClick={toggleFiltreInstitution}>
                    <span> Institution </span>
                    <Fleche
                        style={{ transform: `rotate(${rotateAngleInstitution}deg)` }}
                    />
                </div>
                {filtreInstitutionVisible && <FiltreInstitution options={institutions} />}
            </div>
            
            <div className="Listes">
                <div id="Periode" onClick={toggleFiltreDate}>
                    <span> Période </span>
                    <Fleche
                        style={{ transform: `rotate(${rotateAngleDate}deg)` }}
                    />
                </div>
                {filtreDateVisible && <FiltreDate options={periodes} />}
            </div>

            <div className="Button">
                <button> Filtrer par </button>
            </div>
        </div>
    );
};

export default NavFiltre;
