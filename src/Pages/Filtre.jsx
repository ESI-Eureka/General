import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import SearchBar from '../Components/SearchBar';
import NavFiltre from '../Components/NavFiltre';
import Resultat from '../Components/Resultat';
import { ReactComponent as SearchIcon } from '../Icons/Search.svg';
import './Filtre.css';
import { data } from '../data';

const Filtre = () => {

    const navItems = [
        { text: "Home", path: "/home1", className: "Home" },
        { text: "Favorite", path: "/favorite", className: "Favoris" },
        { text: "Profil", path: "/profil", className: "Profile" },
        // Ajoutez d'autres liens selon vos besoins
      ];
    return (
        <div>
            <NavBar navItems={navItems} />
            <SearchBar label={"Rechercher un article"} icon={<SearchIcon/>}/>
            <div className="FiltreContainer">
                <span className='SpanFiltre'> Filtre </span>
                <NavFiltre/>
                <div className="ResultatContainer">
                    <span className='SpanFiltre'> Résultats </span>
                    {data.map(article => (
                    <Resultat
                        key={article.id}
                        titre={article.titre}
                        auteur={article.auteurs.join(', ')}  // Si plusieurs auteurs
                        date={article.publication_date}
                        resume={article.institutions}
                    />
                ))}
                    <div className="footer">
                        
                    </div>
                </div>
            </div>
        </div>
      </div>

    </div>
  );
}

export default Filtre;
