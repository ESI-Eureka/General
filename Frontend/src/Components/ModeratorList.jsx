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
      console.log("Moderators fetched successfully:", data);
      const moderators = data.map((mod, index) => ({
        ...mod,
        id: index + 1,
    }));

    setModerateurs(moderators);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchModerators();
  }, []);

  const handleDelete = (id) => {
    const updatedModerateurs = moderateurs.filter((mod) => mod.id !== id);
    setModerateurs(updatedModerateurs);

    const renumberedModerateurs = updatedModerateurs.map((mod, index) => ({
      ...mod,
      id: index + 1,
    }));

    setModerateurs(renumberedModerateurs);

  };

  const handleEdit = (id, newEmail) => {
    const updatedModerateurs = moderateurs.map((mod) =>
      mod.id === id ? { ...mod, email: newEmail } : mod
    );
    setModerateurs(updatedModerateurs);
  };

  const handleAdd = (newEmail) => {
    const newModerateur = {
      id: moderateurs.length + 1,
      email: newEmail,
    };
    setModerateurs([...moderateurs, newModerateur]);
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
