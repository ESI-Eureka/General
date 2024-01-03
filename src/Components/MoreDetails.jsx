// MoreDetails.js

import React, { useState,useEffect } from "react";
import './MoreDetails.css';

const MoreDetails = ({ editMode, institution = "Value 1", keywords = "Value 2", summary = "Value 3", fourthVariable = "Value 4" }) => {
  const [data, setData] = useState({
    institution: institution,
    keywords: keywords,
    summary: summary,
    fourthVariable: fourthVariable,
  });
  useEffect(() => {
    setData({
      institution: institution,
      keywords: keywords,
      summary: summary,
      fourthVariable: fourthVariable,
    });
  }, [institution, keywords, summary, fourthVariable]);

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
          <textarea className="textarea-as-p" defaultValue={data.institution} onChange={handleInstitutionChange} />
        ) : (
          <p>{data.institution}</p>
        )}
      </div>
      <div>
        <h4>Mots clés</h4>
        {editMode ? (
          <textarea className="textarea-as-p" defaultValue={data.keywords} onChange={handleKeywordsChange} />
        ) : (
          <p>{data.keywords}</p>
        )}
      </div>
      <div>
        <h4>Résumé</h4>
        {editMode ? (
          <textarea className="textarea-as-p" defaultValue={data.summary} onChange={handleSummaryChange} />
        ) : (
          <p>{data.summary}</p>
        )}
      </div>
      <div>
        <h4>Références bibliographiques</h4>
        {editMode ? (
          <textarea className="textarea-as-p" defaultValue={data.fourthVariable} onChange={handleFourthVariableChange} />
        ) : (
          <p>{data.fourthVariable}</p>
        )}
      </div>
    </div>
  );
};

export default MoreDetails;
