// NavBar.js
import React from 'react';
import './NavBar.css';
import { ReactComponent as ProfileIcon } from '../Icons/Profile.svg';
import { ReactComponent as FavorisIcon } from '../Icons/Favoris.svg';
import { ReactComponent as HomeIcon } from '../Icons/Home.svg';
import { ReactComponent as Logo } from '../Icons/Logo.svg';

const NavBar = ({ Nav1, Nav2, Nav3 }) => {
    return (
        <div className='NavBar'>
            <div className="Logo">
                <Logo />
            </div>
            <div className="LinkIcon">
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div className="Links">
                <a href='#' className="Home" > {Nav1} </a>
                <a href='#' className='Favoris'> {Nav2} </a>
                <a href='#' className='Profile'> {Nav3} </a>
            </div>

            <div className="Icons">
                <HomeIcon className='HomeIcon'/>
                <FavorisIcon className='FavIcon'/>
                <ProfileIcon className='ProfIcon'/>
            </div>
        </div>
    );
}

export default NavBar;
