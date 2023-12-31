
import React, { useState } from 'react';
import './SearchBar.css';

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
        placeholder={label}
        value={search}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
      />
      <div className="DivIcon">
        <a> {icon} </a>
      </div>
    </div>
  );
};

export default SearchBar;
