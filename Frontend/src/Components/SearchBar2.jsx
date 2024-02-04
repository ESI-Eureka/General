import React, { useState } from 'react';
import './SearchBar2.css';

/**
 * SearchBar component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The label for the search input.
 * @param {ReactNode} props.icon - The icon to display next to the search input.
 * @returns {JSX.Element} The rendered SearchBar component.
 */
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