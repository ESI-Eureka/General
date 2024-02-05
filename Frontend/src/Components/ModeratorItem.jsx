import React, { useState } from "react";
import "./ModeratorItem.css";
import { ReactComponent as EditIcon } from "../Icons/Edit.svg";
import { ReactComponent as SaveIcon } from "../Icons/Save.svg";
import { ReactComponent as DeleteIcon } from "../Icons/Delete.svg";
import { ReactComponent as CrossIcon } from "../Icons/Cross.svg";

/**
 * Represents a moderator item component.
 * @param {Object} props - The component props.
 * @param {Object} props.moderateur - The moderator object.
 * @param {Function} props.onDelete - The function to call when deleting the moderator.
 * @param {Function} props.onEdit - The function to call when editing the moderator.
 * @returns {JSX.Element} The moderator item component.
 */
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
    fetch('http://localhost:8000/users/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email
    }),
    })
      .then(response => {
        if (response.status === 204) {
          console.log('Moderator deleted successfully');
          onDelete(id);
        } else {
          console.error('Failed to delete moderator. Status:', response.status);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      })
      .finally(() => {
        setShowDeleteConfirmation(false);
      });
  };
  

  const handleCancelClick = () => {
    setNewEmail(initialEmail);
    setIsEditing(false);
    setIsValidEmail(true);
  };

  const handleSaveClick = () => {
    fetch('http://localhost:8000/users/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        current_email : initialEmail,
        email: newEmail
    }),
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          console.log("Update successfull:", response.body);
          onEdit(id, newEmail);
          setIsEditing(false);
          return response.json();
        } else if (response.status === 400) {
          throw new Error("Email already exists.");
        } else {
          throw new Error("Failed to edit.");
        }
      })
      .catch(error => {
        console.error('Error :', error);
      });
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
