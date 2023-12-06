import React from 'react';
import NavBar from '../Components/NavBar';
import SearchBar from '../Components/SearchBar';
import NavFiltre from '../Components/NavFiltre';
import Resultat from '../Components/Resultat';
import './Filtre.css';

const Filtre = () => {

    return (
        <div>
            <NavBar />
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

export default Filtre;