import React , {useState} from 'react';
import { ReactComponent as Etoile } from '../Icons/Etoile.svg';
import { ReactComponent as Pdf } from '../Icons/Pdf.svg';
import { ReactComponent as Txt } from '../Icons/Txt.svg';
import './ResultatDetails.css';

const ResultatDetails = ({articleTitre, nomAuteur, date}) => {

    return (
        <div className="Resultat">

            <div className="Information">
                <div> {articleTitre} </div>
                <Etoile className='Etoile'/>
                <div> {nomAuteur} </div>
                <div> {date} </div>
            </div>

            <div className="Format"> 
                <div className="Pdf">
                    <Pdf/>
                </div>
               <div className="Txt">
                    <Txt/>
                </div>
            </div>

        </div>
    );
}

export default ResultatDetails;