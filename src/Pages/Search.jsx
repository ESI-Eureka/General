import React from 'react';
import './Search.css';
import NavBar from '../Components/NavBar';
import SearchBar from '../Components/SearchBar';
import { ReactComponent as Logo2 } from '../Icons/Logo2.svg';
import { ReactComponent as SearchIcon } from '../Icons/Search.svg';

const SearchPage = () => {
    const navItems = [
        { text: "Aceuil", path: "/home1", className: "Home" },
        { text: "Favoris", path: "/favorite", className: "Favoris" },
        { text: "Profile", path: "/profil", className: "Profile" },
        // Ajoutez d'autres liens selon vos besoins
      ];
    return (
        <div>
            <NavBar navItems={navItems} />
            <div className="SearchContainer">
                <Logo2 className='Logo2'/>
                <SearchBar label={"Rechercher un article"} icon={<SearchIcon/>}/>
            </div>
        </div>

    );
}

export default SearchPage;