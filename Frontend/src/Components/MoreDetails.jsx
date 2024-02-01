// MoreDetails.js

import React, { useState,useEffect } from "react";
import './MoreDetails.css';

const MoreDetails = ({ editMode,data,setData}) => {
  
  

  const handleInstitutionChange = (e) => {
    setData((prevData) => ({ ...prevData, institution: e.target.value }));
  };

  const handleKeywordsChange = (e) => {
    setData((prevData) => ({ ...prevData, keywords: e.target.value }));
  };

  const handleSummaryChange = (e) => {
    setData((prevData) => ({ ...prevData, summary: e.target.value }));
  };

  const handleFourthVariableChange = (e) => {
    setData((prevData) => ({ ...prevData, fourthVariable: e.target.value }));
  };

  return (
    <div className='MoreDetails'>
      <div>
        <h4>Institutions</h4>
        {editMode ? (
          <textarea className="textarea-as-p" defaultValue={data.institutions} onChange={handleInstitutionChange} />
        ) : (
          <p>{data.institutions}</p>
        )}
      </div>
      <div>
        <h4>Mots clés</h4>
        {editMode ? (
          <textarea className="textarea-as-p" defaultValue={data.mots_cles} onChange={handleKeywordsChange} />
        ) : (
          <p>{data.mots_cles}</p>
        )}
      </div>
      <div>
        <h4>Résumé</h4>
        {editMode ? (
          <textarea className="textarea-as-p" defaultValue={data.resume} onChange={handleSummaryChange} />
        ) : (
          <p>{data.resume}</p>
        )}
      </div>
      <div>
        <h4>Références bibliographiques</h4>
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
