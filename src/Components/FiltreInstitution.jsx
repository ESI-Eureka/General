import React from 'react';
import './Filtrage.css';
import {ReactComponent as Check} from '../Icons/Check.svg';
import SearchBar4 from './SearchBar4';

const FiltreInstitution = () => {

    return (
        <div className="BodyFiltre">

            <SearchBar4/>

            <div className="Container">

                <div className="Ligne">
                    <Check className='Check'/>
                    <span> Nom 1 </span>
                </div>

                <div className="Ligne">
                    <Check className='Check'/>
                    <span> Nom 2 </span>
                </div>

                <div className="Ligne">
                    <Check className='Check'/>
                    <span> Nom 3 </span>
                </div>

                <div className="Ligne">
                    <Check className='Check'/>
                    <span> Nom 4 </span>
                </div>

                <div className="Ligne">
                    <Check className='Check'/>
                    <span> Nom 5 </span>
                </div>

            </div>
            
        </div>

    );
}

export default FiltreInstitution;