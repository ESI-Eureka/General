import React, { useState } from "react";
import "./ModeratorForm.css";

const ModeratorForm = ({ onAdd, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const userData = {
      email: email,
      password: password,
      role: 2,
    };

    fetch("http://localhost:8000/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
    .then((response) => {
      if (response.ok) {
         console.log("Moderator added successfully:", response.body);
         onAdd(userData.email); 
         setEmail(""); 
         return response.json();
      } else if (response.status === 400) {
         setError("Email already exists.");
      } else {
         throw new Error('Failed to add a moderator.');
      }
   })
   .catch((error) => {
      console.error("Error:", error);
   })
   .finally(() => {
      setLoading(false);
   });
   
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add Moderator</h2>
        <form onSubmit={handleSubmit}>
          <div className="email-password">
            <label htmlFor="email">Email :</label>
            <input
              type="text"
              id="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
              title="utilisateur@example.com" 
              required
            />

            <label htmlFor="password">Password :</label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="buttons">
            <button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add"}
            </button>
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
