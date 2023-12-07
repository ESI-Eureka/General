import React , {useState} from 'react';
import { ReactComponent as WhitePlus } from '../Icons/WhitePlus.svg';
import './SearchBar.css';

const UploadBar = () => {

    const [search, setSearch] = useState('');
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    return (
        <div className="SearchBar">
            <input
                type="text"
                placeholder="Entrer URL"
                value={search}
                onChange={handleSearchChange}
            />
            <div className="DivIcon">
                <WhitePlus/>
            </div>
        </div>
    );
}

export default UploadBar;