import React from "react";
import NavBar from "../Components/NavBar";
import ModeratorList from "../Components/ModeratorList";

const Moderators = () => {
  const navItems = [
    { text: "Home", path: "/home", className: "Home" },
    { text: "Moderatos", path: "/moderators", className: "Favoris" },
    { text: "Profil", path: "/profil", className: "Profile" },
    // Ajoutez d'autres liens selon vos besoins
  ];
  return (
    <div className="moderators-container">
      <NavBar navItems={navItems} />
      <ModeratorList />
    </div>
  );
};

export default Moderators;
