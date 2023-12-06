import React from 'react';
import { ReactComponent as Fleche2 } from '../Icons/Fleche2.svg';
import { ReactComponent as Favoris } from '../Icons/Favoris.svg';
import './Resultat.css';

const Resultat = ({titre, auteur, date, resume}) => {

    return (
        <div className="Resultat">

            <div className="Information">
                <div> {titre} </div>
                <div> {auteur} </div>
                <div> {date} </div>
                <div> {resume} </div>
                <Favoris className='MakeItFav'/>
            </div>

            <div className="Details"> 
                <Fleche2/>
                <span> Afficher détails </span>
            </div>

        </div>
    );
}

export default Resultat;