import React from "react";
import { useLocation } from "react-router-dom";
import "./NavBar.css";
import { ReactComponent as Logo } from "../Icons/Logo.svg";
import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const NavBar = ({ navItems }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header>
      <Logo />
      <nav ref={navRef}>
        {navItems.map((item) => (
          <a
            key={item.path}
            href={item.path}
            className={`${item.className} ${currentPath === item.path ? "active" : ""}`}
          >
            {item.text}
          </a>
        ))}
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
};

export default NavBar;
