import React from 'react';
import './Filtrage.css';
import { ReactComponent as SearchIcon2 } from '../Icons/Search2.svg';
import SearchBar2 from './SearchBar2';

const FiltreMotCle = ({ options }) => {
    return (
        <div className="BodyFiltre">
            <SearchBar2 label={"Ajouter mot clé"} icon={<SearchIcon2 />} />
            <div className="Container">
                {options.map((option, index) => (
                    <div className="Ligne" key={index}>
                        <input type="checkbox" id={option} />
                        <label htmlFor={option}>{option}</label>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default FiltreMotCle;