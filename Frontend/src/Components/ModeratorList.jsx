import React, { useState, useEffect } from "react";
import "./ModeratorList.css";
import ModeratorItem from "./ModeratorItem";
import ModeratorForm from "./ModeratorForm";

/**
 * Represents a component that displays a list of moderators.
 * @component
 */
const ModeratorList = () => {
  const [moderateurs, setModerateurs] = useState([]);

  const [showForm, setShowForm] = useState(false);

  // Assuming you have an endpoint for fetching moderators, adjust the URL accordingly
  const moderatorsEndpoint = "http://localhost:8000/users/role/2/";

  // Function to fetch moderators
  const fetchModerators = async () => {
    try {
      const response = await fetch(moderatorsEndpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // Handle the response from the backend
      console.log("Moderators fetched successfully:", data);
      // You may want to update state or perform other actions here
      const moderators = data.map((mod, index) => ({
        ...mod,
        id: index + 1,
    }));

    setModerateurs(moderators);
    } catch (error) {
      console.error("Error:", error);
      // Handle errors, show a message to the user, etc.
    }
  };

  // Call fetchModerators when needed
  // For example, you can call it in a useEffect hook when the component mounts
  useEffect(() => {
    fetchModerators();
  }, []);

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
