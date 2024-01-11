import React, { useState, useEffect } from 'react';
import { ReactComponent as Fleche2 } from '../Icons/Fleche2.svg';
import { ReactComponent as FavorisIcon } from '../Icons/Favoris.svg';
import { ReactComponent as FavorisIconFilled } from '../Icons/FavorisFilled.svg';
import './Resultat.css';
import { useNavigate } from 'react-router-dom';

const Resultat = (props) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const UserId = localStorage.getItem("user_id");
    const articleData = {
      idArticle: props.id,
      idUser: UserId,
    };

  const handleRemoveClick = async () => {
    try {
      const response = await fetch("http://localhost:8000/elastic/delete_favoris_document/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articleData),
      });

      if (response.ok) {
        // Toggle the favorite status
        setIsFavorite(false);
        console.log("Seccussefully deleted from favorites.")
        console.log(articleData)
      } else {
        throw new Error("Failed to add to favorites.");
      }
    } catch (error) {
      console.error("Error during fav:", error);
    }
  }

  const handleAddClick = async () => {
    

    try {
      const response = await fetch("http://localhost:8000/elastic/index_fav/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articleData),
      });

      if (response.ok) {
        // Toggle the favorite status
        setIsFavorite(true);
        console.log("Seccussefully added to favorites.")
        console.log(articleData)
      } else {
        throw new Error("Failed to add to favorites.");
      }
    } catch (error) {
      console.error("Error during fav:", error);
    }
  };

  const handleDetailsClick = () => {
    navigate(
      '/details',
      {
        state: {
          id: props.id,
          data: {
            "titre": props.Data.titre,
            "resume": props.Data.resume,
            "auteurs": props.Data.auteurs,
            "institutions": props.Data.institutions,
            "mots_cles": props.Data.mots_cles,
            "texte_integral": props.Data.texte_integral,
            "pdf_url": props.Data.pdf_url,
            "references": props.Data.references,
            "publication_date": props.Data.publication_date,
            "corrected": props.Data.etat,
          },
        },
      }
    );
  };

  return (
    <div className="resultats">
      <div className="Information">
        <div className='info1'> {props.Data.titre}</div>
        <div className='info'>{props.Data.auteurs}</div>
        <div className='info'>{props.Data.institutions}</div>
        <div className='info'>{props.Data.publication_date}</div>

        {isFavorite ? (
          <FavorisIconFilled className="favoris-icon" onClick={handleRemoveClick} />
        ) : (
          <FavorisIcon className="favoris-icon" onClick={handleAddClick} />
        )}
      </div>

      <div className="Details">
        <a onClick={handleDetailsClick}>Afficher Details</a>
        <Fleche2 />
      </div>
    </div>
  );
};

export default Resultat;
