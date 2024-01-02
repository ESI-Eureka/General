import React from 'react';
import NavBar from '../Components/NavBar';
import Resultat from '../Components/Resultat';
import './Filtre.css';

const Favoris = () => {

    const navItems = [
        { text: "Home", path: "/home", className: "Home" },
        { text: "Favorite", path: "/favorite", className: "Favoris" },
        { text: "Profil", path: "/profil", className: "Profile" },
        // Ajoutez d'autres liens selon vos besoins
      ];
    return (
        <div>
            <NavBar navItems={navItems} />
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