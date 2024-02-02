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
  useEffect(() => {
    setInitialData(location.state?.data);
    setData(location.state?.data);
    setId(location.state?.id);
  }, [location.state?.data]);

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleSaveClick = async() => {
    const editedData={
      ...data,
      "corrected": 1,
    }
    // Perform save logic here
    setEditMode(0);
    setData(editedData);
    setInitialData(data);
    console.log(id);
    try {
      console.log(id,data);
      const response = await axios.post(
        "http://127.0.0.1:8000/elastic/maj/",
        {
          doc_id: id,  // Pass the doc_id as a parameter
          nouveau_article: data,  // Pass the updated data as a parameter
        }
        
      );
      if (response.status === 200) {
        // Perform additional logic if the save was successful
        console.log('Save successful');
      } else {
        // Handle errors if the save fails
        console.error('Save failed');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error:', error);
    }
  };

  const handleCancelClick = () => {
    // Revert back to the initial data on cancel
    setData(initialData);
    setEditMode(false);
  };

  const navigate = useNavigate();
  
  const handleDeleteClick = async() => {
    try {
      console.log(id);
      const response = await axios.post(
        "http://127.0.0.1:8000/elastic/delete/",
        {
          doc_id: id,  // Pass the doc_id as a parameter
        }

      );  
      if (response.status === 200) {
        // Perform additional logic if the save was successful
        console.log('Delete successful');
        navigate('/home');
      } else {  
        // Handle errors if the save fails
        console.error('Delete failed');
      }
    } 
    catch (error) {
      // Handle network or other errors
      console.error('Error:', error);
    }
  } 

  return (
    <div>
      <NavBar />
      <div className="DetailsContainer">
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
    </div>
  );
};

export default ModerateurDetails;
