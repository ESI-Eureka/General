import React from 'react';
import './Search.css';
import NavBar from '../Components/NavBar';
import UploadBar from '../Components/UploadBar';
import { ReactComponent as Logo2 } from '../Icons/Logo2.svg';

const Upload = () => {

    return (
        <div>
            <NavBar
                Nav1="Home"
                Nav2="Moderators"
                Nav3="Profil"
            />
            <div className="SearchContainer">
                <Logo2 className='Logo2'/>
                <UploadBar/>
            </div>
        </div>

    );
}

export default Upload;