import React, { useEffect } from 'react';
import { ReactComponent as Pdf } from '../Icons/Pdf.svg';
import { ReactComponent as Txt } from '../Icons/Txt.svg';
import './ResultatDetails.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const ResultatDetails = ({articleTitre, nomAuteur, date ,editMode ,pdf_url,texte_integral}) => {
    const [data, setData] = useState({
        titre: articleTitre,
        auteurs: nomAuteur,
        publication_date: date,
      
    });  
    useEffect(() => {
        setData({titre: articleTitre,
            auteurs: nomAuteur,
            publication_date: date,})
        }, [articleTitre,nomAuteur,date]);
    const handleDownloadTxt = () => {
        const textContent = texte_integral;
        
        // Create a Blob with the text content
        const blob = new Blob([textContent], { type: 'text/plain' });
    
        // Create a link element and trigger a click event to initiate the download
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'text_file.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
    const handleArticleTitre = (e) => {
        setData((prevData) => ({ ...prevData, titre: e.target.value }));
        console.log(data.titre)
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
                /> ) :
                (<h3> {data.titre} </h3>)}
            {editMode ? (
                <textarea
                  className="textarea-as-h5"
                  defaultValue={data.auteurs}
                  onChange={handleNomAuteur}
                /> ) :
                (<h5> {data.auteurs} </h5>)}
            {editMode ? (   
                <textarea
                  className="textarea-as-span"
                  defaultValue={data.publication_date}
                    onChange={handleDate}
                /> ) :
                (<span> {data.publication_date} </span>  )}
            </div>

            <div className="Format"> 
                <div className="Pdf">
                <Link to={pdf_url} target="_blank">
            <Pdf />
          </Link>
                    
                </div>
               <div className="Txt" onClick={handleDownloadTxt}>
                    <Txt />
                </div>
            </div>

        </div>
    );
}

export default ResultatDetails;