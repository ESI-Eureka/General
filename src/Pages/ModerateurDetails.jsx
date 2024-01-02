import React from 'react';
import NavBar from '../Components/NavBar';
import ResultatDetails from '../Components/ResultatDetails';
import MoreDetails from '../Components/MoreDetails';
import { ReactComponent as RightFleche } from '../Icons/RightFleche.svg';
import './ModerateurDetails.css';
import { ReactComponent as Ecrire } from '../Icons/Ecrire.svg';
import IconedButton from '../Components/IconedButton';

const Details = () => {

    const navItems = [
        { text: "Articles", path: "/article", className: "ModerateurDetails" },
 { text: "Profile", path: "/profil", className: "Profile" },
        
      ];
    return (
        <div>
            <NavBar navItems={navItems} />
            <div className="DetailsContainer">
            <div className="NavCorriger">
                <RightFleche/>
                <IconedButton icon={Ecrire} text="Corriger" />
           </div>
                <div className="ResultatDetailsContainer">
                    <ResultatDetails
                        articleTitre={"Article Title"} 

                        nomAuteur={"Nom de l'auteur"} 
                        date={"02-12-2023"} 
                    />

                    <div className="moreDetails"> 
                        <MoreDetails
                            institution="ESI"
                            keywords="key words"
                            summary="resume"
                            fourthVariable="references"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Details;