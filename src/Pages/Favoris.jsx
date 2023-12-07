import React from 'react';
import NavBar from '../Components/NavBar';
import Resultat from '../Components/Resultat';
import './Filtre.css';

const Favoris = () => {

    return (
        <div>
           <NavBar 
                Nav1={"Acceuil"}
                Nav2={"Favoris"}
                Nav3={"Profile"}
            />          
            <div className="FavorisContainer">
                <span className='SpanFavoris'> Favoris </span>
                <Resultat
                    titre={"Titre"}
                    auteur={"Nom de l'auteur"}
                    date={"02-12-2023"}
                    resume={"Resume"}
                />
                <Resultat
                    titre={"Titre"}
                    auteur={"Nom de l'auteur"}
                    date={"02-12-2023"}
                    resume={"Resume"}
                />
                <Resultat
                    titre={"Titre"}
                    auteur={"Nom de l'auteur"}
                    date={"02-12-2023"}
                    resume={"Resume"}
                />
                <Resultat
                    titre={"Titre"}
                    auteur={"Nom de l'auteur"}
                    date={"02-12-2023"}
                    resume={"Resume"}
                />
                <Resultat
                    titre={"Titre"}
                    auteur={"Nom de l'auteur"}
                    date={"02-12-2023"}
                    resume={"Resume"}
                />
                <Resultat
                    titre={"Titre"}
                    auteur={"Nom de l'auteur"}
                    date={"02-12-2023"}
                    resume={"Resume"}
                />
                <Resultat
                    titre={"Titre"}
                    auteur={"Nom de l'auteur"}
                    date={"02-12-2023"}
                    resume={"Resume"}
                />
                <Resultat
                    titre={"Titre"}
                    auteur={"Nom de l'auteur"}
                    date={"02-12-2023"}
                    resume={"Resume"}
                />
                <Resultat
                    titre={"Titre"}
                    auteur={"Nom de l'auteur"}
                    date={"02-12-2023"}
                    resume={"Resume"}
                />
                <Resultat
                    titre={"Titre"}
                    auteur={"Nom de l'auteur"}
                    date={"02-12-2023"}
                    resume={"Resume"}
                />

            </div>
        </div>

    );
}

export default Favoris;