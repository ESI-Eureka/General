import React, { useState, useEffect } from 'react';
import NavBar from '../Components/NavBar';
import ResultatDetails from '../Components/ResultatDetails';
import MoreDetails from '../Components/MoreDetails';
import { ReactComponent as RightFleche } from '../Icons/RightFleche.svg';
import './ModerateurDetails.css';
import { ReactComponent as Ecrire } from '../Icons/Ecrire.svg';
import { ReactComponent as Save } from '../Icons/Save.svg';
import IconedButton from '../Components/IconedButton';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ModerateurDetails = () => {
  const location = useLocation();
  const [initialData, setInitialData] = useState(location.state?.data);
  const [data, setData] = useState(location.state?.data);
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState(location.state?.id);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    setInitialData(location.state?.data);
    setData(location.state?.data);
    setId(location.state?.id);
  }, [location.state?.data]);

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleSaveClick = async () => {
    const editedData = {
      ...data,
      "corrected": 1,
    };

    setEditMode(false);
    setData(editedData);
    setInitialData(data);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/elastic/maj/",
        {
          doc_id: id,
          nouveau_article: data,
        }
      );
      if (response.status === 200) {
        console.log('Save successful');
      } else {
        console.error('Save failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCancelClick = () => {
    setData(initialData);
    setEditMode(false);
  };

  const navigate = useNavigate();

  const handleDeleteClick = () => {
    // Afficher la boîte de dialogue de confirmation
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/elastic/delete/",
        {
          doc_id: id,
        }
      );
      if (response.status === 200) {
        console.log('Delete successful');
        navigate('/home');
      } else {
        console.error('Delete failed');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      // Masquer la boîte de dialogue de confirmation et réinitialiser le flou
      setShowDeleteConfirmation(false);
    }
  };

  const handleCancelDelete = () => {
    // Masquer la boîte de dialogue de confirmation et réinitialiser le flou
    setShowDeleteConfirmation(false);
  };

  return (
    <div>
      <NavBar />
      <div className={`DetailsContainer ${showDeleteConfirmation ? 'blurred-background' : ''}`}>
        <div className="NavCorriger">
          <Link to={'/home'}>
            <RightFleche />
          </Link>
          {!editMode ? (
            <IconedButton icon={Ecrire} text="Correct" onClick={handleEditClick} />
          ) : (
            <div className='correction'>
              <IconedButton icon={Save} text="Save" onClick={handleSaveClick} />
              <span className='cancel' onClick={handleCancelClick}>Cancel</span>
            </div>
          )}
        </div>
        <div className="ResultatDetailsContainer">
          <ResultatDetails
            data={data}
            setData={setData}
            editMode={editMode}
          />

          <div className="moreDetails">
            <MoreDetails
              data={data}
              editMode={editMode}
              setData={setData}
            />
          </div>
        </div>
      </div>
      <span className='Delete' onClick={handleDeleteClick}>Delete</span>

      {/* Afficher la boîte de dialogue de confirmation si showDeleteConfirmation est vrai */}
      {showDeleteConfirmation && (
        <>
          <div className="modal-overlay"></div>
          <div className="delete-confirmation">
            <p>Are you sure you want to delete this item?</p>
            <div className="delete-buttons">
              <button className="delete-btn" onClick={handleConfirmDelete}>
                Yes
              </button>
              <button
                className="cancel-btn"
                onClick={handleCancelDelete}
              >
                No
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ModerateurDetails;
