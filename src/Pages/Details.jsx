import React from 'react';
import NavBar from '../Components/NavBar';
import ResultatDetails from '../Components/ResultatDetails';
import MoreDetails from '../Components/MoreDetails';
import { ReactComponent as RightFleche } from '../Icons/RightFleche.svg';
import './Details.css';


const Details = (Data) => {

    const navItems = [
        { text: 'Accueil', path: '/home', className: 'Home' },
        { text: 'Favoris', path: '/favorite', className: 'Favoris' },
        { text: 'Profil', path: '/profil', className: 'Profile' },
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