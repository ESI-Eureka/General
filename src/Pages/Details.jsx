import React from 'react';
import NavBar from '../Components/NavBar';
import ResultatDetails from '../Components/ResultatDetails';
import MoreDetails from '../Components/MoreDetails';
import { ReactComponent as RightFleche } from '../Icons/RightFleche.svg';
import './Details.css';
const Details = () => {

    return (
        <div>
            <NavBar/>
            <div className="DetailsContainer">
                <RightFleche/>
                <div className="ResultatDetailsContainer">
                    <ResultatDetails
                        articleTitre={"Article Title"} 

                        nomAuteur={"Nom de l'auteur"} 
                        date={"02-12-2023"} 
                    />
                <div className="MoreDetails">
                    <MoreDetails
                        institustions={"Institutions"}
                        motsCles={"Mots Clés"}
                        resume={"Résumé"}
                        references={"Références Bibliographiques"}
                    />
                </div>
                </div>
            </div>
        </div>

    );
}

export default Details;