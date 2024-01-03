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

const ModerateurDetails = () => {
  const navItems = [
    { text: "Articles", path: "/article", className: "ModerateurDetails" },
    { text: "Profile", path: "/profil", className: "Profile" },
  ];

  const location = useLocation();
  const [initialData, setInitialData] = useState(location.state?.data);
  const [data, setData] = useState(location.state?.data);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setInitialData(location.state?.data);
    setData(location.state?.data);
  }, [location.state?.data]);

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleSaveClick = () => {
    // Perform save logic here
    setEditMode(false);
    setInitialData(data);
  };

  const handleCancelClick = () => {
    // Revert back to the initial data on cancel
    setData(initialData);
    setEditMode(false);
  };

  const navigate = useNavigate();
  const handleReturn = () => {
    navigate(-1);
  };

  return (
    <div>
      <NavBar navItems={navItems} />
      <div className="DetailsContainer">
        <div className="NavCorriger">
          <RightFleche onClick={handleReturn} />
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
    </div>
  );
};

export default ModerateurDetails;
