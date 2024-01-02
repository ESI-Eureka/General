import React, { useState } from 'react';
import { ReactComponent as Fleche2 } from '../Icons/Fleche2.svg';
import { ReactComponent as Favoris } from '../Icons/Favoris.svg';
import './Resultat.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Resultat = (props) => {
  const [isIconFilled, setIconFilled] = useState(false);
  const history = useNavigate();

  const handleIconClick = () => {
    setIconFilled(!isIconFilled);
  };

  const handleDetailsClick = () => {
    // Ensure that props.Data is defined and has expected properties before navigating
    history({
      pathname: '/det',
      state: { data: props.Data },
    });
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
        <Link
          to={{
            pathname: "/det",
            state: { data: props.Data } // Pass data as state
          }}
        >
          Afficher Details
        </Link>
        <Fleche2 />
      </div>
    </div>
  );
};

export default Resultat;
