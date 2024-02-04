// MoreDetails.js

import React, { useState,useEffect } from "react";
import './MoreDetails.css';

/**
 * Renders a component for displaying and editing additional details.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.editMode - Flag indicating whether the component is in edit mode.
 * @param {Object} props.data - The data object containing the details.
 * @param {Function} props.setData - The function to update the data object.
 * @returns {JSX.Element} The rendered MoreDetails component.
 */
const MoreDetails = ({ editMode,data,setData}) => {
  
  

  const handleInstitutionChange = (e) => {
    setData((prevData) => ({ ...prevData, institution: e.target.value }));
    console.log(data)
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
      <div className="Corr-Details">
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
