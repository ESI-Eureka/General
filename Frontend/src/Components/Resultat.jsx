import React, { useState, useEffect } from 'react';
import { ReactComponent as Fleche2 } from '../Icons/Fleche2.svg';
import { ReactComponent as FavorisIcon } from '../Icons/Favoris.svg';
import { ReactComponent as FavorisIconFilled } from '../Icons/FavorisFilled.svg';
import './Resultat.css';
import { useNavigate } from 'react-router-dom';

const Resultat = (props) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");
  const userRole = localStorage.getItem("user_role");
  console.log(userRole);
    const articleData = {
      idArticle: props.id,
      idUser: userId,
    };

    useEffect(() => {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || {};
      setIsFavorite(Array.isArray(favorites[props.id]) && favorites[props.id].includes(userId));
    }, [props.id, userId]);
    

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
        const favorites = JSON.parse(localStorage.getItem('favorites')) || {};
        favorites[props.id] = favorites[props.id]?.filter(id => id !== userId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        setIsFavorite(false);
        console.log("Successfully removed from favorites.")
      } else {
        throw new Error("Failed to remove from favorites.");
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
        const favorites = JSON.parse(localStorage.getItem('favorites')) || {};
        const existingFavorites = Array.isArray(favorites[props.id]) ? favorites[props.id] : [];
        const updatedFavorites = [...existingFavorites, userId];
        favorites[props.id] = updatedFavorites;
        localStorage.setItem('favorites', JSON.stringify(favorites));
        setIsFavorite(true);
        console.log("Successfully added to favorites.")
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

  const setAuteurs = [...new Set(props.Data.auteurs)];
  const setInstitutions = [...new Set(props.Data.institutions)];

  return (
    <div className="resultats">
      <div className="Information">
        <h3 className='info1'> {props.Data.titre}</h3>
        <div className='info'> <h4> Authors: </h4>{setAuteurs.join(', ')}</div>
        <div className='info'> <h4> Institutions: </h4>{setInstitutions.join(', ')}</div>
        <div className='info'> <h4> Publication date: </h4>{props.Data.publication_date.substring(0, 10)}</div>

        {userRole === "user" && ( // Condition pour vérifier si l'utilisateur a le rôle "user"
        isFavorite ? (
          <FavorisIconFilled className="favoris-icon" onClick={handleRemoveClick} />
        ) : (
          <FavorisIcon className="favoris-icon" onClick={handleAddClick} />
        )
      )}
      </div>

      <div className="Details">
        <a onClick={handleDetailsClick}>More details</a>
        <Fleche2 />
      </div>
    </div>
  );
};

export default Resultat;
