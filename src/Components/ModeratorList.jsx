import React, { useState } from "react";
import "./ModeratorList.css";
import ModeratorItem from "./ModeratorItem";
import ModeratorForm from "./ModeratorForm";

const ModeratorList = () => {
  const [moderateurs, setModerateurs] = useState([
    { id: 1, email: "moderateur1@example.com" },
    { id: 2, email: "moderateur2@example.com" },
    { id: 3, email: "moderateur3@example.com" },
    // Ajoutez d'autres modérateurs selon vos besoins
  ]);

  const [showForm, setShowForm] = useState(false);

  const handleDelete = (id) => {
    // Supprimer le modérateur côté client
    const updatedModerateurs = moderateurs.filter((mod) => mod.id !== id);
    setModerateurs(updatedModerateurs);

    // Réorganiser les ID séquentiellement
    const renumberedModerateurs = updatedModerateurs.map((mod, index) => ({
      ...mod,
      id: index + 1,
    }));

    setModerateurs(renumberedModerateurs);

    // Ici, vous devez appeler l'API backend pour supprimer le modérateur de la BDD
    // fetch(`/api/moderateurs/${id}`, { method: 'DELETE' });
  };

  const handleEdit = (id, newEmail) => {
    // Modifier l'e-mail du modérateur côté client
    const updatedModerateurs = moderateurs.map((mod) =>
      mod.id === id ? { ...mod, email: newEmail } : mod
    );
    setModerateurs(updatedModerateurs);
    // Ici, vous devez appeler l'API backend pour mettre à jour l'e-mail dans la BDD
    // fetch(`/api/moderateurs/${id}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ email: newEmail }),
    // });
  };

  const handleAdd = (newEmail) => {
    // Ajouter le modérateur côté client
    const newModerateur = {
      id: moderateurs.length + 1,
      email: newEmail,
    };
    setModerateurs([...moderateurs, newModerateur]);
    // Ici, vous devez appeler l'API backend pour ajouter le modérateur à la BDD
    // fetch(`/api/moderateurs`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ email: newEmail }),
    // });
    // Cacher le formulaire après l'ajout
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="moderators-list-container">
      <div className="moderators-list-header">
        <h2>Moderators List</h2>
        <button onClick={() => setShowForm(true)}>Add Moderator</button>
      </div>
      <div className="moderators-list-wrapper">
        <ul className="moderators-list">
          {moderateurs.map((moderateur) => (
            <ModeratorItem
              key={moderateur.id}
              moderateur={moderateur}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </ul>
      </div>
      {showForm && <ModeratorForm onAdd={handleAdd} onClose={handleCancel} />}
    </div>
  );
};

export default ModeratorList;
