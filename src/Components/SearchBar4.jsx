import React , {useState} from 'react';
import { ReactComponent as Plus } from '../Icons/Plus.svg';
import './SearchBar2.css';

const SearchBar3 = () => {

    const [search, setSearch] = useState('');
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    return (
        <div className="SearchBar3">
            <input
                type="text"
                placeholder="Rechercher une institution"
                value={search}
                onChange={handleSearchChange}
            />
            <Plus className='Plus'/>
        </div>
    );
}

export default SearchBar3;