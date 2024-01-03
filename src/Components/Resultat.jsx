import React, { useState } from 'react';
import { ReactComponent as Fleche2 } from '../Icons/Fleche2.svg';
import { ReactComponent as Favoris } from '../Icons/Favoris.svg';
import './Resultat.css';

const Resultat = ({ titre, auteur, institution, date }) => {
  const [isIconFilled, setIconFilled] = useState(false);

  const handleIconClick = () => {
    setIconFilled(!isIconFilled);
  };

  return (
    <div className="resultats">
      <div className="Information">
        <div className='info1'> {titre}</div>
        <div className='info'> <h4>Auteurs</h4> {auteur}</div>
        <div className='info'> <h4>Institutions</h4> {institution}</div>
        <div className='info'> <h4>Date de publication</h4>{date}</div>
        <Favoris className={isIconFilled ? 'filled' : 'none'} onClick={handleIconClick} />
      </div>

      <div className="Details">
        <a href='/Détails'>Afficher détails</a>
        <Fleche2 />
      </div>
    </div>
  );
};

export default Resultat;
