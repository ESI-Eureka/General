import React , {useState} from 'react';
import { ReactComponent as Calendar } from '../Icons/Calendar.svg';
import './SearchBar2.css';

const SearchBar3 = () => {

    const [search, setSearch] = useState('');
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    return (
        <div>
            
        </div>
    );
}

export default SearchBar3;