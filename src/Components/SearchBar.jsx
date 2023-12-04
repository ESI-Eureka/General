import React , {useState} from 'react';
import { ReactComponent as SearchIcon } from '../Icons/Search.svg';
import './SearchBar.css';

const SearchBar = () => {

    const [search, setSearch] = useState('');
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    return (
        <div className="SearchBar">
            <input
                type="text"
                placeholder="Rechercher un article"
                value={search}
                onChange={handleSearchChange}
            />
            <div className="DivIcon">
                <SearchIcon/>
            </div>
        </div>
    );
}

export default SearchBar;