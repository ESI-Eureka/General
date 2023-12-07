import React, { useState } from "react";
import "./ModeratorForm.css";

const ModeratorForm = ({ onAdd, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Appeler la fonction de l'ajout du modérateur dans le composant parent
    onAdd(email);
    // Réinitialiser le formulaire
    setEmail("");
  };
  
  const handleCancel = () => {
    // Appeler la fonction de fermeture du formulaire dans le composant parent
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add Moderator</h2>
        <form onSubmit={handleSubmit}>
          <div className="email-password">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              pattern="[^\s@]+@[^\s@]+\.[^\s@]+" // Specify the pattern for a valid email
              title="utilisateur@example.com" // Specify the validation message
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="buttons">
            <button type="submit">Add</button>
            <button className="cancel" type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModeratorForm;
