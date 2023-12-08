import React from 'react';
import './Filtrage.css';
import {ReactComponent as Check} from '../Icons/Check.svg';
import { ReactComponent as SearchIcon2 } from '../Icons/Search2.svg';
import SearchBar2 from './SearchBar2';

const FiltreAuteur = () => {

    return (
        <div className="BodyFiltre">

            <SearchBar2 label={"Rechercher Auteur"} icon={<SearchIcon2/>}/>

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

export default FiltreAuteur;