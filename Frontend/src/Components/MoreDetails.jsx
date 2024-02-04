// MoreDetails.js

import React from "react";
import './MoreDetails.css';

const MoreDetails = ({ editMode,data,setData}) => {
  
  

  const handleInstitutionChange = (e) => {
    setData((prevData) => ({ ...prevData, institutions: e.target.value }));
  };

  const handleKeywordsChange = (e) => {
    setData((prevData) => ({ ...prevData, mots_cles: e.target.value }));
  };

  const handleSummaryChange = (e) => {
    setData((prevData) => ({ ...prevData, resume: e.target.value }));
  };

  const handleFourthVariableChange = (e) => {
    setData((prevData) => ({ ...prevData, references: e.target.value }));
  };

  return (
    <div className='MoreDetails'>
      <div className="Corr-Details">
        <h4>Institutions</h4>
        {editMode ? (
          <textarea className="textarea-as-p" defaultValue={data.institutions} onChange={handleInstitutionChange} />
        ) : (
          <p>{data.institutions}</p>
        )}
      </div>
      <div className="Corr-Details">
        <h4>Keywords</h4>
        {editMode ? (
          <textarea className="textarea-as-p" defaultValue={data.mots_cles} onChange={handleKeywordsChange} />
        ) : (
          <p>{data.mots_cles}</p>
        )}
      </div>
      <div className="Corr-Details abstract">
        <h4>Abstract</h4>
        {editMode ? (
          <textarea className="textarea-as-p" defaultValue={data.resume} onChange={handleSummaryChange} />
        ) : (
          <p>{data.resume}</p>
        )}
      </div>
      <div className="Corr-Details">
        <h4>Bibliographic references</h4>
        {editMode ? (
          <textarea className="textarea-as-p" defaultValue={data.references} onChange={handleFourthVariableChange} />
        ) : (
          <p>{data.references}</p>
        )}
      </div>
    </div>
  );
};

export default MoreDetails;
