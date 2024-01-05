// ModerateurDetails.js

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
  

  const [data, setData] = useState({
    auteurs: "Auteurs",
    institutions: "Institutions",
    mots_cles: "Mots_cles",
    pdf_url: "pdf_url",
    publication_date: "publication_date",
    references: "references",
    resume: "resume",
    texte_integral: "texte_integral",
    titre: "titre",
  });

  const [editMode, setEditMode] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setData(location.state?.data);
  }, [location.state?.data]);

  const handleEditClick = () => {
    setEditMode(!editMode);
    
  };
  const navigate = useNavigate();
const handleReturn = () => {
    navigate(-1);
  };
  return (
    <div>
      <NavBar />
      <div className="DetailsContainer">
        <div className="NavCorriger">
          
            <RightFleche onClick={handleReturn} />
          {!editMode ? (
            
          <IconedButton icon={Ecrire} text="Correct" onClick={handleEditClick} />):
          (<><IconedButton icon={Save} text="Save" onClick={handleEditClick} />
          <span className='cancle'>Cancel</span>
          </>
          
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
