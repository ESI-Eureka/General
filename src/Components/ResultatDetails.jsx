import React from 'react';
import { ReactComponent as Pdf } from '../Icons/Pdf.svg';
import { ReactComponent as Txt } from '../Icons/Txt.svg';
import './ResultatDetails.css';

const ResultatDetails = ({articleTitre, nomAuteur, date}) => {

    return (
        <div className="ResultatDetails">

            <div className="InformationContainer">
                <h3> {articleTitre} </h3>
                <h5> {nomAuteur} </h5>
                <span> {date} </span>
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