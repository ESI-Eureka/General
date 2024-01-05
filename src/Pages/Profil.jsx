import React, { useState, useEffect } from "react";
import "./Profil.css";
import NavBar from "../Components/NavBar";
import { ReactComponent as EditIcon } from "../Icons/Edit.svg";
import { ReactComponent as SaveIcon } from "../Icons/Save.svg";

const Profile = () => {
  const [initialEmail, setInitialEmail] = useState("");
  const [initialPassword, setInitialPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const user_role = localStorage.getItem("user_role");
  

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");
    setInitialEmail(storedEmail);
    setEmail(storedEmail);
    setInitialPassword(storedPassword);
    setPassword(storedPassword);
  }, []);

  const handleEditClick = () => {
    console.log("initial email",initialEmail)
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setEmail(initialEmail);
    setPassword(initialPassword);
    setIsEditing((prevIsEditing) => !prevIsEditing);
    setIsValidEmail(true);
  };

  const validateEmail = (inputEmail) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(inputEmail);
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    // Validate email and password
    const isEmailValid = validateEmail(email);

    setIsValidEmail(isEmailValid);


      fetch("http://localhost:8000/users/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          current_email : initialEmail,
          email: email,
          password: password,
      }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Update successful:", data);
          setIsEditing(false);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      };

  return (
    <div className="profile-container">
      <NavBar />
      <div className="profile-form">
        <form onSubmit={handleSubmit}>
          <div className="form-header">
            <h2>Profil</h2>
            <div className={`buttons ${isEditing ? "editing" : ""}`}>
              {isEditing && (
                <>
                <button className="edit-button" type="submit">
                <SaveIcon /> Save
                </button>
                <button
                  className="cancel-button"
                  type="button"
                  onClick={handleCancelClick}
                >
                  Cancel
                </button></>
              )}
              {!isEditing && (
                <button className="edit-button" onClick={handleEditClick}>
                  <EditIcon /> Edit
                </button>
              )}
            </div>
          </div>
          <div className="email-password">
            <label htmlFor="email">Email :</label>
            <input
              type="text"
              id="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => {
                setEmail(e.target.value);
                setIsValidEmail(validateEmail(e.target.value));
              }}
              pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
              title="utilisateur@example.com"
              disabled={!isEditing}
              required
            />
            <label htmlFor="password">Mot de passe :</label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Enter password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              disabled={!isEditing}
              required
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
