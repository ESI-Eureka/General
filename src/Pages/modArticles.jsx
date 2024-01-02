import React from 'react';
import Resultat from '../Components/Resultat'
import './modArticles.css';
import NavBar from '../Components/NavBar';
const ModArticles = () => {
    const navItems = [
        { text: "Articles", path: "/mod", className: "Articles" },
        { text: "Profil", path: "/profil", className: "Profile" },
        // Add other links as needed
      ];
    return (
        <div>

            <NavBar navItems={navItems} />
            <Resultat />
        </div>
    );
};

export default ModArticles;
