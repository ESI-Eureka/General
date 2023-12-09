import React from 'react';
import NavBar from '../Components/NavBar';
import ResultatDetails from '../Components/ResultatDetails';
import MoreDetails from '../Components/MoreDetails';
import { ReactComponent as RightFleche } from '../Icons/RightFleche.svg';
import './Details.css';

const Details = () => {

    const navItems = [
        { text: "Home", path: "/home1", className: "Home" },
        { text: "Favorite", path: "/favorite", className: "Favoris" },
        { text: "Profil", path: "/profil", className: "Profile" },
        // Ajoutez d'autres liens selon vos besoins
      ];
    return (
        <div>
            <NavBar navItems={navItems} />
            <div className="DetailsContainer">
                <RightFleche/>
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