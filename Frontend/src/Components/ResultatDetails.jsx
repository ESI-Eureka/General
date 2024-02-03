import React, { useEffect } from "react";
import { ReactComponent as Pdf } from "../Icons/Pdf.svg";
import { ReactComponent as Txt } from "../Icons/Txt.svg";
import "./ResultatDetails.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import config from "../config";

const ResultatDetails = ({ data, setData, editMode }) => {
  const handleDownloadTxt = () => {
    const textContent = data.texte_integral;

    const blob = new Blob([textContent], { type: 'text/plain' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'text_file.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleArticleTitre = (e) => {
    setData((prevData) => ({ ...prevData, titre: e.target.value }));
  };

  const handleNomAuteur = (e) => {
    setData((prevData) => ({ ...prevData, auteurs: e.target.value }));
  };

  const handleDate = (e) => {
    setData((prevData) => ({ ...prevData, publication_date: e.target.value }));
  };

  return (
    <div className="ResultatDetails">
      <div className="InformationContainer">
        {editMode ? (
          <textarea
            className="textarea-as-h3"
            defaultValue={data.titre}
            onChange={handleArticleTitre}
          />
        ) : (
          <h3> {data.titre} </h3>
        )}

        {editMode ? (
          <textarea
            className="textarea-as-h5"
            defaultValue={data.auteurs}
            onChange={handleNomAuteur}
          />
        ) : (
          <>
            <div className='info'>Authors: </div>
            <div className='info2'>{data.auteurs.join(', ')}</div>
          </>
        )}

        {editMode ? (
          <textarea
            className="textarea-as-span"
            defaultValue={data.publication_date}
            onChange={handleDate}
          />
        ) : (
          <div>{data.publication_date}</div>
        )}
      </div>

      <div className="Format">
        <div className="Pdf">
          <Link to={`${config.PORT}${data.pdf_url}`} target="_blank">
            <Pdf />
          </Link>
        </div>

        <div className="Txt" onClick={handleDownloadTxt}>
          <Txt />
        </div>
      </div>
    </div>
  );
};

export default ResultatDetails;

