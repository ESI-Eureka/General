import React from 'react';
import './Search.css';
import NavBar from '../Components/NavBar';
import SearchBar from '../Components/SearchBar';
import { ReactComponent as Logo2 } from '../Icons/Logo2.svg';
import { ReactComponent as WhitePlus } from '../Icons/WhitePlus.svg';

const Upload = () => {

    return (
        <div>
            <NavBar 
                Nav1={"Home"}
                Nav2={"Modérateurs"}
                Nav3={"Profile"}
            />
            <div className="SearchContainer">
                <Logo2 className='Logo2'/>
                <SearchBar label={"Entrer URL"} icon={<WhitePlus/>}/>
            </div>
        </div>

    );
}

export default Upload;