import React, { useState,useEffect } from 'react';
import NavBar from '../Components/NavBar';
import ResultatDetails from '../Components/ResultatDetails';
import MoreDetails from '../Components/MoreDetails';
import { ReactComponent as RightFleche } from '../Icons/RightFleche.svg';
import './ModerateurDetails.css';
import { ReactComponent as Ecrire } from '../Icons/Ecrire.svg';
import IconedButton from '../Components/IconedButton';
import { useLocation } from 'react-router-dom';

const ModerateurDetails = () => {
  const navItems = [
    { text: "Articles", path: "/article", className: "ModerateurDetails" },
    { text: "Profile", path: "/profil", className: "Profile" },
  ];
  const [data,setData]=useState({
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
  const location = useLocation();
  useEffect(() => {
  setData( location.state?.data)}
  , [location.state?.data]);
  
  return (
    <div>
      <NavBar navItems={navItems} />
      <div className="DetailsContainer">
        <div className="NavCorriger">
          <RightFleche />
          <IconedButton icon={Ecrire} text="Corriger" />
        </div>
        <div className="ResultatDetailsContainer">
          <ResultatDetails
            articleTitre={data.titre}
            nomAuteur={data.auteurs}
            date={data.publication_date}
          />

          <div className="moreDetails">
            <MoreDetails
              institution={data.institutions}
              keywords={data.mots_cles}
              summary={data.resume}
              fourthVariable={data.references}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModerateurDetails;
