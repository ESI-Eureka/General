import React, { useState } from "react";
import "./ModeratorItem.css";
import { ReactComponent as EditIcon } from "../Icons/Edit.svg";
import { ReactComponent as SaveIcon } from "../Icons/Save.svg";
import { ReactComponent as DeleteIcon } from "../Icons/Delete.svg";
import { ReactComponent as CrossIcon } from "../Icons/Cross.svg";

const ModeratorItem = ({ moderateur, onDelete, onEdit }) => {
  const { id, email } = moderateur;
  const [isEditing, setIsEditing] = useState(false);
  const [newEmail, setNewEmail] = useState(email);
  const [initialEmail, setInitialEmail] = useState("utilisateur@example.com");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleDelete = () => {
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirmation = () => {
    onDelete(id);
    setShowDeleteConfirmation(false);
  };

  const handleCancelClick = () => {
    setNewEmail(initialEmail);
    setIsEditing(false);
    setIsValidEmail(true);
  };

  const handleSaveClick = () => {
    // Perform save logic here
    // You can call the onEdit function with the updated email
    onEdit(id, newEmail);
    // Set isEditing to false to exit the editing mode
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setNewEmail(email);
    setInitialEmail(email);
    setIsValidEmail(true);
  };

  const validateEmail = (inputEmail) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(inputEmail);
  };

  return (
    <li className="moderator-item">
      <span className="id-moderator">{id}</span>
      {isEditing ? (
        <>
          <input
            type="text"
            value={newEmail}
            onChange={(e) => {
              setNewEmail(e.target.value);
              setIsValidEmail(validateEmail(e.target.value));
            }}
          />
          <div className="buttons">
            <button
              className="editing"
              onClick={handleSaveClick}
              disabled={!isValidEmail}
            >
              <SaveIcon />
              <span className="button-text">Save</span>
            </button>
            <button className="cross" onClick={handleCancelClick}>
              <CrossIcon />
              <span className="button-text">Cancel</span>
            </button>
          </div>
        </>
      ) : (
        <>
          <span>{email}</span>
          <div className="buttons">
            <button className="editing" onClick={handleEditClick}>
              <EditIcon />
              <span className="button-text">Edit</span>
            </button>
            <button onClick={handleDelete}>
              <DeleteIcon />
              <span className="button-text">Delete</span>
            </button>
          </div>
        </>
      )}
      {showDeleteConfirmation && (
        <>
          <div className="modal-overlay"></div>
          <div className="delete-confirmation">
            <p>Are you sure you want to delete this item?</p>
            <div className="delete-buttons">
              <button className="delete-btn" onClick={handleDeleteConfirmation}>
                Yes
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowDeleteConfirmation(false)}
              >
                No
              </button>
            </div>
          </div>
        </>
      )}
    </li>
  );
};

export default ModeratorItem;
