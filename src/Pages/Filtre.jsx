import React from 'react';
import NavBar from '../Components/NavBar';
import SearchBar from '../Components/SearchBar';
import NavFiltre from '../Components/NavFiltre';
import Resultat from '../Components/Resultat';
import './Filtre.css';

const Filtre = () => {

    return (
        <div>
            <NavBar/>
            <SearchBar/>
            <div className="FiltreContainer">
                <span className='SpanFiltre'> Filtre </span>
                <NavFiltre/>
                <div className="ResultatContainer">
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
        </div>

    );
}

export default Filtre;