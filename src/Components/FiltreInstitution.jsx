import React from 'react';
import './Filtrage.css';
import {ReactComponent as Check} from '../Icons/Check.svg';
import { ReactComponent as Plus } from '../Icons/Plus.svg';
import SearchBar2 from './SearchBar2';

const FiltreInstitution = () => {

    return (
        <div className="BodyFiltre">

            <SearchBar2 label={"Recherhcer institution"} icon={<Plus/>}/>

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

                <div className="Ligne">
                    <Check className='Check'/>
                    <span> Nom 5 </span>
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