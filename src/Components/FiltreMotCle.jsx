import React from 'react';
import './Filtrage.css';
import {ReactComponent as Check} from '../Icons/Check.svg';
import { ReactComponent as Plus } from '../Icons/Plus.svg';
import SearchBar2 from './SearchBar2';

const FiltreMotCle = () => {

    return (
        <div className="BodyFiltre">

            <SearchBar2 label={"Ajouter mot clé"} icon={<Plus/>}/>

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