import NavBar from '../Components/NavBar';
import Resultat from '../Components/Resultat';
import React, { useState, useEffect } from 'react';
import './Filtre.css';

/**
 * Renders the Favoris page component.
 * 
 * @returns {JSX.Element} The rendered Favoris page component.
 */
const Favoris = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user_id = localStorage.getItem("user_id");
                const response = await fetch(`http://localhost:8000/elastic/search_favoris/?UserId=${user_id}`);
                if (!response.ok) {
                    throw new Error('Erreur lors de la requête HTTP');
                }
                const responseData = await response.json();
                setData(responseData);
            } catch (error) {
                console.error('Erreur lors de la récupération des résultats de recherche:', error);
                // Handle error cases, e.g., setting data to an empty array
                setData([]);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <NavBar />
            <div className="FavorisContainer">
                <span className='SpanFavoris'> Favorite </span>
                {Array.isArray(data) && data.map((item) => (
                    <Resultat
                        key={item._id}
                        id={item._id}
                        Data={{
                            "titre": item._source.titre,
                            "resume": item._source.resume,
                            "auteurs": item._source.auteurs,
                            "institutions": item._source.institutions,
                            "mots_cles": item._source.mots_cles,
                            "texte_integral": item._source.texte_integral,
                            "pdf_url": item._source.pdf_url,
                            "references": item._source.references,
                            "publication_date": item._source.publication_date,
                            "corrected": item._source.etat,
                        }}
                    />
                ))}
                {!Array.isArray(data) && <p>No favorites found.</p>}
            </div>
        </div>
    );
};

export default Favoris;
