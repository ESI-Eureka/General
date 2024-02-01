import React from "react";
import { useLocation } from "react-router-dom";
import "./NavBar.css";
import { ReactComponent as Logo } from "../Icons/Logo.svg";
import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { ReactComponent as LogoutIcon } from "../Icons/Logout.svg";

const user_role = localStorage.getItem("user_role");

const allNavItems = [
  { text: "Home", path: "/home", className: "Home" },
  {
    text: "Moderators",
    path: "/moderators",
    className: "Moderators",
    visibleFor: "admin",
  },
  {
    text: "Favorite",
    path: "/favorite",
    className: "Favoris",
    visibleFor: "user",
  },
  { text: "Profil", path: "/profil", className: "Profile" },
];

const navItems = allNavItems.filter((item) => {
  return item.visibleFor === user_role || !item.visibleFor;
});

const NavBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const handleLogout = () => {
    // Clear the stored access token (and refresh token if stored)
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_id");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    // Redirect to the login page or perform other post-logout actions
    window.location.href = "/login";
  };
  return (
    <header>
      <Logo />
      <nav ref={navRef}>
        {navItems.map((item) => (
          <a
            key={item.path}
            href={item.path}
            className={`${item.className} ${
              currentPath === item.path ? "active" : ""
            }`}
          >
            {item.text}
          </a>
        ))}
        <button onClick={handleLogout} className="logout">
          <LogoutIcon />
          Logout
        </button>
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
