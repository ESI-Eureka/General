import React , {useState} from 'react';
import './SearchBar.css';

const SearchBar = ({label , icon}) => {

    const [search, setSearch] = useState('');
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
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
                <a href='/filtre'> {icon} </a>
            </div>
        </div>
    );
}

export default SearchBar;