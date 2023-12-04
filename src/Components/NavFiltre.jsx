import React , {useState} from 'react';
import { ReactComponent as Fleche } from '../Icons/Fleche.svg';
import './NavFiltre.css';

const NavFiltre = () => {

    return (
        <div className="NavFiltre">

            <div id="Auteur">
                <span> Auteur </span>
                <Fleche/>    
            </div>

            <div id="MotCle">
                <span> Mot clé </span>
                <Fleche/>    
            </div>

            <div id="Institution">
                <span> Institution </span>
                <Fleche/>    
            </div>

            <div id="Periode">
                <span> Période </span>
                <Fleche/>    
            </div>

            <button> Filtrer par </button>
        </div>
    );
}

export default NavFiltre;