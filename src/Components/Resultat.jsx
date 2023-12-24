import React, { useState } from 'react';
import { ReactComponent as Fleche2 } from '../Icons/Fleche2.svg';
import { ReactComponent as Favoris } from '../Icons/Favoris.svg';
import './Resultat.css';

const Resultat = ({ titre, auteur, date, resume }) => {
  const [isIconFilled, setIconFilled] = useState(false);

  const handleIconClick = () => {
    setIconFilled(!isIconFilled);
  };

  return (
    <div className="resultats">
      <div className="Information">
        <div className='info'>{titre}</div>
        <div className='info'>{auteur}</div>
        <div className='info'>{date}</div>
        <div className='info'>{resume}</div>
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
