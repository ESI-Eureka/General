import React from 'react';
import './Filtrage.css';
import { ReactComponent as Check } from '../Icons/Check.svg';
import { ReactComponent as Plus } from '../Icons/Plus.svg';
import SearchBar2 from './SearchBar2';

const FiltreMotCle = ({ options }) => {
    return (
        <div className="BodyFiltre">
            <SearchBar2 label={"Ajouter mot clé"} icon={<Plus />} />

            <div className="Container">
                {options.map((option, index) => (
                    <div className="Ligne" key={index}>
                        <Check className='Check' />
                        <span>{option}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FiltreMotCle;
