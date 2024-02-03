import React, { useState, useEffect } from 'react';
import { ReactComponent as Fleche } from '../Icons/Fleche.svg';
import './NavFiltre.css';
import FiltreAuteur from './FiltreAuteur';
import FiltreMotCle from './FiltreMotCle';
import FiltreInstitution from './FiltreInstitution';
import FiltreDate from './FiltreDate';

const NavFiltre = ({ data, onFilterResultUpdate }) => {

    const [filtreAuteurVisible, setFiltreAuteurVisible] = useState(false);
    const [filtreMotCleVisible, setFiltreMotCleVisible] = useState(false);
    const [FiltreInstitutionVisible, setFiltreInstitutionVisible] = useState(false);
    const [FiltreDateVisible, setFiltreDateVisible] = useState(false);

    const [rotateAngleAuteur, setRotateAngleAuteur] = useState(0);
    const [rotateAngleMotCle, setRotateAngleMotCle] = useState(0);
    const [rotateAngleInstitution, setRotateAngleInstitution] = useState(0);
    const [rotateAngleDate, setRotateAngleDate] = useState(0);

    //pour stocker les valeurs extraites à partir du data 
    const [auteurs, setAuteurs] = useState([]);
    const [institutions, setInstitutions] = useState([]);
    const [motsCles, setMotsCles] = useState([]);

    //pour stocker les options sélectionnés dont FiltreAuteur, FiltreMotCle, FiltreInstitutions, FiltrDate
    const [selectedAuteurs, setSelectedAuteurs] = useState([]);
    const [selectedMotsCles, setSelectedMotsCles] = useState([]);
    const [selectedInstitutions, setSelectedInstitutions] = useState([]);
    const [selectedDateDebut, setSelectedDateDebut] = useState('');
    const [selectedDateFin, setSelectedDateFin] = useState('');

    // Fonction de filtrage
    const applyFilters = (data, selectedAuteurs, selectedMotsCles, selectedInstitutions, selectedDateDebut, selectedDateFin) => {
         return data.filter(article =>
            (selectedAuteurs.length === 0 || selectedAuteurs.some(auteur => article._source.auteurs.includes(auteur))) &&
            (selectedMotsCles.length === 0 || selectedMotsCles.some(motCle => article._source.mots_cles.includes(motCle))) &&
            (selectedInstitutions.length === 0 || selectedInstitutions.some(institution => article._source.institutions.includes(institution))) &&
            (!selectedDateDebut || new Date(article._source.publication_date) >= selectedDateDebut) &&
            (!selectedDateFin || new Date(article._source.publication_date) <= selectedDateFin)
         );
     };

    useEffect(() => {
        // Call handleFilterList when the component mounts or when data changes
        handleFilterList();
    }, [data, selectedAuteurs, selectedMotsCles, selectedInstitutions, selectedDateDebut, selectedDateFin]);

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
    // pour extraire des valeurs uniques des auteurs, mots clés, institutions à partir de data = résultat de la recherche 
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
                    <span> Author </span>
                    <Fleche style={{ transform: `rotate(${rotateAngleAuteur}deg)` }} />
                </div>
                {filtreAuteurVisible && <FiltreAuteur options={auteurs} onSelect={setSelectedAuteurs}/>}
            </div>

            <div className="Listes">
                <div id="MotCle" onClick={toggleFiltreMotCle}>
                    <span> Keyword </span>
                    <Fleche style={{ transform: `rotate(${rotateAngleMotCle}deg)` }} />
                </div>
                {filtreMotCleVisible && <FiltreMotCle options={motsCles} onSelect={setSelectedMotsCles}/>}
            </div>

            <div className="Listes">
                <div id="Institution" onClick={toggleFiltreInstitution}>
                    <span> Institution </span>
                    <Fleche style={{ transform: `rotate(${rotateAngleInstitution}deg)` }} />
                </div>
                {FiltreInstitutionVisible && <FiltreInstitution options={institutions} onSelect={setSelectedInstitutions} />}
            </div>

            <div className="Listes">
                <div id="Periode" onClick={toggleFiltreDate}>
                    <span> Period </span>
                    <Fleche style={{ transform: `rotate(${rotateAngleDate}deg)` }} />
                </div>
                {FiltreDateVisible && <FiltreDate onDateDebutSelect={setSelectedDateDebut} onDateFinSelect={setSelectedDateFin}/>}
            </div>

            <div className="Button">
                <button
                    onClick={() => {
                        // Appeler la fonction de filtrage avec les états actuels
                        const filteredData = applyFilters(data, selectedAuteurs, selectedMotsCles, selectedInstitutions, selectedDateDebut, selectedDateFin);
                        console.log('Données filtrées :', filteredData);
                        onFilterResultUpdate(filteredData); // pour passer les résultats de filtre au parent Filtre
                    }}
                > Filter by </button>
            </div>
            
        </div>
    );
};

export default NavFiltre;
