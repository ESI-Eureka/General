import React from 'react';
import './Filtrage.css';
import { ReactComponent as Check } from '../Icons/Check.svg';
import { ReactComponent as SearchIcon2 } from '../Icons/Search2.svg';
import SearchBar2 from './SearchBar2';

const FiltreAuteur = ({ numberOfLines }) => {
  const lines = [];

  for (let i = 1; i <= numberOfLines; i++) {
    lines.push(
      <div className="Ligne" key={i}>
        <Check className='Check' />
        <span> Nom {i} </span>
      </div>
    );
  }

  return (
    <div className="BodyFiltre">
      <SearchBar2 label={"Rechercher Auteur"} icon={<SearchIcon2 />} />

      <div className="Container">{lines}</div>
    </div>
  );
};

export default FiltreAuteur;
