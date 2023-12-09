import React from "react";

import './MoreDetails.css';

const MoreDetails = ({ institution = "Value 1", keywords = "Value 2", summary = "Value 3", fourthVariable = "Value 4" }) => {
    return (
      <div className='MoreDetails'>
        <div>
          <h4>Institutions</h4>
          <p>{institution}</p>
        </div>
        <div>
          <h4>Mots clés</h4>
          <p>{keywords}</p>
        </div>
        <div>
          <h4>Résumé</h4>
          <p>{summary}</p>
        </div>
        <div>
          <h4>Références bibliographiques</h4>
          <p>{fourthVariable}</p>
        </div>
      </div>
    );
  };

export default MoreDetails;