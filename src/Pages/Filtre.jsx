import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import SearchBar from '../Components/SearchBar';
import NavFiltre from '../Components/NavFiltre';
import Resultat from '../Components/Resultat';
import { ReactComponent as SearchIcon } from '../Icons/Search.svg';
import './Filtre.css';

const Filtre = () => {

  // Utilisez useLocation pour obtenir les données de l'emplacement actuel
  const location = useLocation();

  // State pour stocker les résultats de la recherche
  const [searchResults, setSearchResults] = useState(location.state?.searchResults || []);

  // Effet pour mettre à jour le state lorsque l'état de l'emplacement change
  useEffect(() => {
    setSearchResults(location.state?.searchResults || []);
  }, [location.state?.searchResults]);

  // Fonction de recherche appelée lorsqu'une recherche est effectuée
  const handleSearch = async (query) => {
    try {
      // Effectuer une requête pour obtenir les résultats de la recherche
      const response = await fetch(`http://127.0.0.1:8000/elastic/search/?query=${query}`);
      const data = await response.json();
      console.log(data);

      // Mettre à jour les searchResults dans l'état de l'emplacement
      location.state.searchResults = data;
      setSearchResults(data);

    } catch (error) {
      // Gérer les erreurs liées à la requête
      console.error('Error fetching search results:', error);
    }
  };

  // Navigation items pour la barre de navigation
  const navItems = [
    { text: 'Accueil', path: '/home1', className: 'Home' },
    { text: 'Favoris', path: '/favorite', className: 'Favoris' },
    { text: 'Profil', path: '/profil', className: 'Profile' },
  ];

  // Rendu de la page Filtre
  return (
    <div>

      <NavBar navItems={navItems} />
      <SearchBar
        label={"Rechercher un article"}
        icon={<SearchIcon />}
        onSearch={handleSearch}
      />

      <div className="FiltreContainer">
        <span className='SpanFiltre'> Filtre </span>
        <NavFiltre data={searchResults} />
        <div className="ResultatContainer">
          <span className='SpanFiltre'> Résultats </span>
          {searchResults && searchResults.map((result, index) => (
            <Resultat
              key={index}
              institution={result._source.institutions.join(', ')}
              titre={result._source.titre}
              auteur={result._source.auteurs.join(', ')}
              date={result._source.publication_date}
            />
          ))}
        </div>
      </div>

    </div>
  );
}

export default Filtre;
