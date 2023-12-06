import React from 'react';
import './Filtrage.css';
import {ReactComponent as Check} from '../Icons/Check.svg';
import SearchBar3 from './SearchBar3';

const FiltreMotCle = () => {

    return (
        <div className="BodyFiltre">

            <SearchBar3/>

            <div className="Container">

                <div className="Ligne">
                    <Check className='Check'/>
                    <span> Mot clé 1 </span>
                </div>

                <div className="Ligne">
                    <Check className='Check'/>
                    <span> Mot clé 2 </span>
                </div>

                <div className="Ligne">
                    <Check className='Check'/>
                    <span> Mot clé  3 </span>
                </div>

                <div className="Ligne">
                    <Check className='Check'/>
                    <span> Mot clé 4 </span>
                </div>

                <div className="Ligne">
                    <Check className='Check'/>
                    <span> Mot clé 5 </span>
                </div>

            </div>
            
        </div>

    );
}

export default FiltreMotCle;