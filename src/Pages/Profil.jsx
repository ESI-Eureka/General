// src/components/Profile.js
import React, { useState } from "react";
import "./Profil.css";
import NavBar from "../Components/NavBar";
import { ReactComponent as EditIcon } from "../Icons/Edit.svg";
import { ReactComponent as SaveIcon } from "../Icons/Save.svg";

const Profile = () => {
  const [initialEmail, setInitialEmail] = useState("utilisateur@example.com");
  const [initialPassword, setInitialPassword] = useState("");
  const [email, setEmail] = useState("utilisateur@example.com");
  const [password, setPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  
  const navItems = [
    { text: "Home", path: "/", className: "Home" },
    { text: "Moderatos", path: "/moderators", className: "Favoris" },
    { text: "Profil", path: "/profil", className: "Profile" },
    // Ajoutez d'autres liens selon vos besoins
  ];

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    console.log("isEditing:", isEditing);
    setInitialEmail(email);
    setInitialPassword(password);
  };

  const handleCancelClick = () => {
    setEmail(initialEmail);
    setPassword(initialPassword);
    setIsEditing(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ajoutez ici la logique pour mettre à jour le profil (envoyer au backend, etc..)
    console.log("Profil mis à jour :", { email, password });
  };

  return (
    <div className="profile-container">
      <NavBar navItems={navItems} />
      <div className="profile-form">
        <form onSubmit={handleSubmit}>
          <div className="form-header">
            <h2>Profil</h2>
            <div className={`buttons ${isEditing ? "editing" : ""}`}>
              {isEditing && (
                <button
                  className="cancel-button"
                  type="button"
                  onClick={handleCancelClick}
                >
                  Cancel
                </button>
              )}
              <button className="edit-button" onClick={handleEditClick}>
                {isEditing ? <SaveIcon /> : <EditIcon />}
                {isEditing ? "Save" : "Edit"}
              </button>
            </div>
          </div>
          <div className="email-password">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              disabled={!isEditing}
            />
            <label htmlFor="password">Mot de passe :</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              disabled={!isEditing}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
