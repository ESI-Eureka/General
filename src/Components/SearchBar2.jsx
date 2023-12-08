import React, { useState } from 'react';
import { ReactComponent as SearchIcon2 } from '../Icons/Search2.svg';
import './SearchBar2.css';

const SearchBar = ({ label, icon }) => {

    const [search, setSearch] = useState('');
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    return (
        <div className="SearchBar2">
            <input
                type="text"
                placeholder={label}
                value={search}
                onChange={handleSearchChange}
            />
            {icon}
        </div>
    );
}

export default SearchBar;