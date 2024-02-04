import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import SearchBar from '../Components/SearchBar';
import NavFiltre from '../Components/NavFiltre';
import Resultat from '../Components/Resultat';
import { ReactComponent as SearchIcon } from '../Icons/Search.svg';
import './Filtre.css';

/**
 * Represents a component for filtering and displaying search results.
 * @returns {JSX.Element} The Filtre component.
 */
const Filtre = () => {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState(location.state?.searchResults || []);
  const [filteredResults, setFilteredResults] = useState(searchResults);

  useEffect(() => {
    setSearchResults(location.state?.searchResults || []);
    setFilteredResults(location.state?.searchResults || []);
  }, [location.state?.searchResults]);

  const handleSearch = async (query) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/elastic/search/?query=${query}`);
      const data = await response.json();

      location.state.searchResults = data;
      setSearchResults(data);
      setFilteredResults([]); // Effacer filteredResults lorsqu'une recherche est effectuée

    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleFilterResultUpdate = (filteredData) => {
    setFilteredResults(filteredData);
  };

  return (
    <div>
      <NavBar />
      <SearchBar
        label={"Search an article"}
        icon={<SearchIcon />}
        onSearch={handleSearch}
      />

      <div className="FiltreContainer">
        <span className='SpanFiltre'> Filter </span>
        {/* Utilise filteredResults s'il y a des éléments, sinon utilise searchResults */}
        <NavFiltre data={filteredResults.length > 0 ? filteredResults : searchResults} onFilterResultUpdate={handleFilterResultUpdate} />
        <div className="ResultatContainer">
          <span className='SpanFiltre'> Results </span>

          {/* Si filteredResults a des éléments, utilisez-les, sinon vérifiez searchResults */}
          {filteredResults.length > 0 ? (
            filteredResults.map((result, index) => (
              <Resultat
                key={index}
                Data={result._source}
                id={result._id}  
              />
            ))
          ) : (
            // Si searchResults est également vide, affichez "No article found."
            searchResults.length === 0 ? (
              <h3 className='aucun'> No article found. </h3>
            ) : (
              // Sinon, affichez les résultats de la recherche
              searchResults.map((result, index) => (
                <Resultat
                  key={index}
                  Data={result._source}
                  id={result._id}  
                />
              ))
            )
          )}

        </div>
      </div>
    </div>
  );
}

export default Filtre;
