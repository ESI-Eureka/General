import React from 'react';
import NavBar from '../Components/NavBar';
import SearchBar from '../Components/SearchBar';
import NavFiltre from '../Components/NavFiltre';
import Resultat from '../Components/Resultat';
import './Filtre.css';

const Filtre = () => {

    return (
        <div>
            <NavBar
                Nav1="Accueil"
                Nav2="Favoris"
                Nav3="Profile"
            />
            <SearchBar/>
            <div className="FiltreContainer">
                <span className='SpanFiltre'> Filtre </span>
                <NavFiltre/>
                <div className="ResultatContainer">
                    <span className='SpanFiltre'> Résultats </span>
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
                    <div className="footer">
                        
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Filtre;