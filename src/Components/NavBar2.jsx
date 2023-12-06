import React from 'react';
import './NavBar.css';
import { ReactComponent as ProfileIcon } from '../Icons/Profile.svg';
import { ReactComponent as FavorisIcon } from '../Icons/Favoris.svg';
import { ReactComponent as HomeIcon } from '../Icons/Home.svg';
import { ReactComponent as Logo } from '../Icons/Logo.svg';

const NavBar2 = () => {

    return (
        <div className='NavBar'>
            <div className="Logo">
                 <Logo/>
            </div>
            <div className="LinkIcon">
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div className="Links">
                <a href='/Home' className="Home" > Aceuil </a>
                <a href='/Favoris' className='Moderateurs'> Modérateurs </a>
                <a href='/Profile' className='Profile'> Profile </a>
            </div>

            <div className="Icons">
                <HomeIcon className='HomeIcon'/>
                <FavorisIcon className='FavIcon'/>
                <ProfileIcon className='ProfIcon'/>
            </div>

            <div className="Menu">
                <span> </span>
                <span> </span>
                <span> </span>
            </div>
            
        </div>
    );
}

export default NavBar2;