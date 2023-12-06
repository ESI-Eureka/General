import React from 'react';
import { useLocation } from 'react-router-dom';
import './NavBar.css';
import { ReactComponent as Logo } from '../Icons/Logo.svg';
import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const NavBar = ({ Nav1, Nav2, Nav3 }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header>
      <div>
        <Logo/>
      </div>
      <nav ref={navRef}>
        <a href='/' className={`Home ${currentPath === '/' ? 'active' : ''}`}>
          {Nav1}
        </a>
        <a href='/' className={`Favoris ${currentPath === '/favoris' ? 'active' : ''}`}>
          {Nav2}
        </a>
        <a href='/profil' className={`Profile ${currentPath === '/profil' ? 'active' : ''}`}>
          {Nav3}
        </a>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes/>
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars/>
      </button>
    </header>
  );
}

export default NavBar;





