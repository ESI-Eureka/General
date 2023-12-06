import React from 'react';
import './Search.css';
import NavBar2 from '../Components/NavBar2';
import AddModerateurBar from '../Components/AddModerateurBar';
import { ReactComponent as Logo2 } from '../Icons/Logo2.svg';

const AddModerateur = () => {

    return (
        <div>
            <NavBar2/>
            <div className="SearchContainer">
                <Logo2 className='Logo2'/>
                <AddModerateurBar/>
            </div>
        </div>

    );
}

export default AddModerateur;