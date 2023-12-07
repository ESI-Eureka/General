import React from "react";
import "./Search.css";
import NavBar from "../Components/NavBar";
import UploadBar from "../Components/UploadBar";
import { ReactComponent as Logo2 } from "../Icons/Logo2.svg";

const Upload = () => {
  const navItems = [
    { text: "Home", path: "/home", className: "Home" },
    { text: "Moderatos", path: "/moderators", className: "Favoris" },
    { text: "Profil", path: "/profil", className: "Profile" },
    // Ajoutez d'autres liens selon vos besoins
  ];

  return (
    <div>
      <NavBar navItems={navItems} />
      <div className="SearchContainer">
        <Logo2 className="Logo2" />
        <SearchBar label={"Entrer URL"} icon={<WhitePlus/>}/>
      </div>
    </div>
  );
};

export default Upload;