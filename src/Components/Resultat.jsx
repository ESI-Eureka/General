import React, { useState } from 'react';
import { ReactComponent as Fleche2 } from '../Icons/Fleche2.svg';
import { ReactComponent as Favoris } from '../Icons/Favoris.svg';
import './Resultat.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Resultat = (props) => {
  const [isIconFilled, setIconFilled] = useState(false);
  const navigate = useNavigate();

  const handleIconClick = () => {
    setIconFilled(!isIconFilled);
  };

  const handleDetailsClick = () => {
    // Ensure that props.Data is defined and has expected properties before navigating
    navigate(
     '/det',
      {state: { data: {
        "auteurs": props.Data.auteurs,
        "institutions": props.Data.institutions,
        "mots_cles": props.Data.mots_cles,
        "pdf_url": props.Data.pdf_url,
        "publication_date": props.Data.publication_date,
        "references": props.Data.references,  
        "resume": props.Data.resume,
        "texte_integral": props.Data.texte_integral,
        "titre": props.Data.titre,
      } }}
    );
  };

  return (
    <div className="resultats">
      <div className="Information">
        <div className='info1'> {props.Data.titre}</div>
        <div className='info'>{props.Data.auteurs}</div>
        <div className='info'>{props.Data.institutions}</div>
        <div className='info'>{props.Data.publication_date}</div>
        <Favoris className={isIconFilled ? 'filled' : 'none'} onClick={handleIconClick} />
      </div>

      <div className="Details">
        <a onClick={handleDetailsClick}>Afficher Details</a>
          
        <Fleche2 />
      </div>
    </div>
  );
};

export default Resultat;
