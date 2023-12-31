import React, { useState, useEffect } from 'react';
import { ReactComponent as Fleche } from '../Icons/Fleche.svg';
import './NavFiltre.css';
import FiltreAuteur from './FiltreAuteur';
import FiltreMotCle from './FiltreMotCle';
import FiltreInstitution from './FiltreInstitution';
import FiltreDate from './FiltreDate';

const NavFiltre = ({ data }) => {
    const [filtreAuteurVisible, setFiltreAuteurVisible] = useState(false);
    const [filtreMotCleVisible, setFiltreMotCleVisible] = useState(false);
    const [FiltreInstitutionVisible, setFiltreInstitutionVisible] = useState(false);
    const [FiltreDateVisible, setFiltreDateVisible] = useState(false);
    const [FiltreInstitutionVisible, setFiltreInstitutionVisible] = useState(false);
    const [FiltreDateVisible, setFiltreDateVisible] = useState(false);

    const [rotateAngleAuteur, setRotateAngleAuteur] = useState(0);
    const [rotateAngleMotCle, setRotateAngleMotCle] = useState(0);
    const [rotateAngleInstitution, setRotateAngleInstitution] = useState(0);
    const [rotateAngleDate, setRotateAngleDate] = useState(0);

    const [auteurs, setAuteurs] = useState([]);
    const [institutions, setInstitutions] = useState([]);
    const [motsCles, setMotsCles] = useState([]);

    useEffect(() => {
        // Call handleFilterList when the component mounts or when data changes
        handleFilterList();
    }, [data]);

    const toggleFiltreAuteur = () => {
        setFiltreAuteurVisible(!filtreAuteurVisible);
        setRotateAngleAuteur((prevAngle) => (prevAngle + 180) % 360);
    };

    const toggleFiltreMotCle = () => {
        setFiltreMotCleVisible(!filtreMotCleVisible);
        setRotateAngleMotCle((prevAngle) => (prevAngle + 180) % 360);
    };

    const toggleFiltreInstitution = () => {
        setFiltreInstitutionVisible(!FiltreInstitutionVisible);
        setRotateAngleInstitution((prevAngle) => (prevAngle + 180) % 360);
    };

    const toggleFiltreDate = () => {
        setFiltreDateVisible(!FiltreDateVisible);
        setRotateAngleDate((prevAngle) => (prevAngle + 180) % 360);
    };

    const handleFilterList = () => {
        // Extract unique authors, keywords, etc., from the search results
        const auteur = Array.from(new Set(data.map(result => result._source.auteurs).flat()));
        setAuteurs(auteur);
        const institution = Array.from(new Set(data.map(result => result._source.institutions).flat()));
        setInstitutions(institution);
        const motCle = Array.from(new Set(data.map(result => result._source.mots_cles).flat()));
        setMotsCles(motCle);

    };

    return (
        <div className="NavFiltre">
            <div className="Listes">
                <div id="Auteur" onClick={toggleFiltreAuteur}>
                    <span> Auteur </span>
                    <Fleche style={{ transform: `rotate(${rotateAngleAuteur}deg)` }} />
                </div>
                {filtreAuteurVisible && <FiltreAuteur numberOfLines={8} />}
            </div>

            <div className="Listes">
                <div id="MotCle" onClick={toggleFiltreMotCle}>
                    <span> Mot clé </span>
                    <Fleche style={{ transform: `rotate(${rotateAngleMotCle}deg)` }} />
                </div>
                {filtreMotCleVisible && <FiltreMotCle />}
            </div>

            <div className="Listes">
                <div id="Institution" onClick={toggleFiltreInstitution}>
                    <span> Institution </span>
                    <Fleche style={{ transform: `rotate(${rotateAngleInstitution}deg)` }} />
                </div>
                {FiltreInstitutionVisible && <FiltreInstitution options={institutions}/>}
            </div>

            <div className="Listes">
                <div id="Periode" onClick={toggleFiltreDate}>
                    <span> Période </span>
                    <Fleche style={{ transform: `rotate(${rotateAngleDate}deg)` }} />
                </div>
                {FiltreDateVisible && <FiltreDate />}
            </div>

            <div className="Button">
                <button> Filtrer par </button>
            </div>
        </div>
    );
};

export default NavFiltre;
