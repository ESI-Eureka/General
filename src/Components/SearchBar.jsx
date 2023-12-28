// SearchBar.js

import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ label, icon, onAddClick }) => {
  const [search, setSearch] = useState('');

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleAddClick = () => {
    // Invoke the callback function with the current search value
    onAddClick(search);
  };

  return (
    <div className="SearchBar">
      <input
        type="text"
        placeholder={label}
        value={search}
        onChange={handleSearchChange}
      />
      <div className="DivIcon">
        {/* Call handleAddClick when the + icon is clicked */}
        <a  onClick={handleAddClick}>{icon}</a>
      </div>
    </div>
  );
}

export default SearchBar;
