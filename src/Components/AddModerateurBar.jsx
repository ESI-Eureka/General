import React , {useState} from 'react';
import { ReactComponent as WhitePlus } from '../Icons/WhitePlus.svg';
import './SearchBar.css';

const AddModerateurBar = () => {

    const [search, setSearch] = useState('');
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    return (
        <div className="SearchBar">
            <input
                type="text"
                placeholder="Ajouter un modérateur"
                value={search}
                onChange={handleSearchChange}
            />
            <div className="DivIcon">
                <WhitePlus/>
            </div>
        </div>
    );
}

export default AddModerateurBar;