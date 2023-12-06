import React , {useState} from 'react';
import { ReactComponent as SearchIcon2 } from '../Icons/Search2.svg';
import './SearchBar2.css';

const SearchBar = () => {

    const [search, setSearch] = useState('');
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    return (
        <div className="SearchBar2">
            <input
                type="text"
                placeholder="Rechercher un auteur"
                value={search}
                onChange={handleSearchChange}
            />
            <SearchIcon2 className='SearchIcon2'/>
        </div>
    );
}

export default SearchBar;