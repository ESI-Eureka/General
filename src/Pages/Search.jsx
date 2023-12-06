import React, {useState} from 'react';
import './Search.css';
import NavBar from '../Components/NavBar';
import SearchBar from '../Components/SearchBar';
import { ReactComponent as Logo2 } from '../Icons/Logo2.svg';

const SearchPage = () => {

    return (
        <div>
            <NavBar
                Nav1="Accueil"
                Nav2="Favoris"
                Nav3="Profile"
            />
            <div className="SearchContainer">
                <Logo2 className='Logo2'/>
                <SearchBar/>
            </div>
        </div>

    );
}

export default SearchPage;