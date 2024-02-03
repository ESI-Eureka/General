import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import SearchBar from '../Components/SearchBar';
import { ReactComponent as Logo2 } from '../Icons/Logo2.svg';
import { ReactComponent as SearchIcon } from '../Icons/Search.svg';

const SearchPage = () => {
  // State pour stocker les résultats de la recherche
  const [searchResults, setSearchResults] = useState([]);

  // Hook de navigation pour rediriger vers une autre page
  const navigate = useNavigate();

  // Fonction de recherche appelée lorsqu'une recherche est effectuée
  const handleSearch = async (query) => {
    try {
      // Effectuer une requête pour obtenir les résultats de la recherche
      const response = await fetch(`http://127.0.0.1:8000/elastic/search/?query=${query}`);
      console.log(query)
      const data = await response.json();
      
      // Mettre à jour le state avec les résultats de la recherche
      setSearchResults(data);
      console.log(data);

      // Rediriger vers la page Filtre avec les résultats en tant que paramètre
      navigate('/filtre', { state: { searchResults: data } });

    } catch (error) {
      // Gérer les erreurs liées à la requête
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div>
      <NavBar />

      <div className="SearchContainer">
        <Logo2 className="Logo2" />
        <SearchBar
          label={"Search an article"}
          icon={<SearchIcon />}
          onSearch={handleSearch}  // Passer la fonction de recherche comme gestionnaire
        />
      </div>
    </div>
  );
};

export default SearchPage;
