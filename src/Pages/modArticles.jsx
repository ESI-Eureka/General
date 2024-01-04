import React from 'react';
import Resultat from '../Components/Resultat'
import './modArticles.css';
import NavBar from '../Components/NavBar';
import { useState,useEffect } from 'react';
import axios from 'axios';

const ModArticles = () => {
    const navItems = [
        { text: "Articles", path: "/mod", className: "Articles" },
        { text: "Profil", path: "/profil", className: "Profile" },
      ];
    const [data,setData]=useState([]);

    useEffect(() => {
        
        const fetchData = async () => {
            try{
            const result = await axios.get("http://127.0.0.1:8000/elastic/viewAll/");
            setData(result.data);
            console.log(result.data)
        }
        catch(err){
            console.error('Error fetching data:', err);
        }}
        fetchData();
    }
    , []);

    return (
        <div>

        <NavBar navItems={navItems} />
        {data.map((item) => 
            (
            <Resultat
            key={item._id}
            id={item._id}
            Data={
                {"titre": item._source.titre,
                "resume": item._source.resume,
                "auteurs": item._source.auteurs,
                "institutions": item._source.institutions,
                "mots_cles": item._source.mots_cles,
                "texte_integral": item._source.texte_integral,
                "pdf_url": item._source.pdf_url,
                "references": item._source.references,  
                "publication_date": item._source.publication_date,
                "etat": item._source.etat,  } 
            }
            />
            
        ))}
            
        </div>
    );
};

export default ModArticles;
