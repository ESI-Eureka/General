import React, { useState } from 'react';
import './Filtrage.css';
import { ReactComponent as SearchIcon2 } from '../Icons/Search2.svg';
import SearchBar2 from './SearchBar2';

/**
 * Component for filtering institutions.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.options - The available options (authors).
 * @param {Function} props.onSelect - The function to be called when options are selected.
 * @returns {JSX.Element} The rendered component.
 */
const FiltreInstitution = ({ options, onSelect }) => {

     //pour stocker les options (auteurs) sélectionnés
     const [selectedOptions, setSelectedOptions] = useState([]);
  
     const handleCheckboxChange = (option) => {
       console.log('Option sélectionnée:', option);
   
       // Mettre à jour la liste des auteurs sélectionnés
       setSelectedOptions((prevSelected) => {
           if (prevSelected.includes(option)) {
               console.log('Désélection de l\'option:', option);
               return prevSelected.filter((selected) => selected !== option);
           } else {
               console.log('Sélection de l\'option:', option);
               return [...prevSelected, option];
           }
       });
   };
   
   console.log('Options disponibles:', options);
   console.log('Options sélectionnées:', selectedOptions);

     // Appeler la fonction onSelect pour mettre à jour les options sélectionnées dans le composant parent
     React.useEffect(() => {
        onSelect(selectedOptions);
         }, [selectedOptions, onSelect]);

    return (
        <div className="BodyFiltre">
            <SearchBar2 label={"Search an institution"} icon={<SearchIcon2 />} />
            <div className="Container">
                {options.map((option, index) => (
                    <div className="Ligne" key={index}>
                          <input
                              type="checkbox"
                              id={option}
                              checked={selectedOptions.includes(option)}
                              onChange={() => handleCheckboxChange(option)}
                          />
                        <label htmlFor={option}>{option}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FiltreInstitution;