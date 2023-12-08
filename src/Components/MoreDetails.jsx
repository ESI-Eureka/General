import React , {useState} from 'react';

import './MoreDetails.css';

const MoreDetails = ({institustions, motsCles, resume, references}) => {

    return (
        <div className="Resultat">

            <div> {institustions} </div>
            <div> {motsCles} </div>
            <div> {resume} </div>
            <div> {references} </div>

        </div>
    );
}

export default MoreDetails;