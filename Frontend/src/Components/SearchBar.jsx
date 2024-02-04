import React, { useState } from 'react';
import './SearchBar.css';

/**
 * A search bar component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.label - The label for the search bar.
 * @param {string} props.icon - The icon for the search button.
 * @param {Function} props.onSearch - The callback function to be called when the search button is clicked or Enter key is pressed.
 * @returns {JSX.Element} The search bar component.
 */
const SearchBar = ({ label, icon, onSearch }) => {
  const [search, setSearch] = useState('');

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(search);
    }
  };

  return (
    <div className="SearchBar">
      <input
        type="text"
        name='query'
        placeholder={label}
        value={search}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
      />
      <div className="DivIcon">
        <a onClick={() => onSearch(search)}> {icon} </a>
      </div>
    </div>
  );
};

export default SearchBar;
