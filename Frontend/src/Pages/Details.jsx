import React, { useState, useEffect } from 'react';

import NavBar from '../Components/NavBar';
import ResultatDetails from '../Components/ResultatDetails';
import MoreDetails from '../Components/MoreDetails';
import { ReactComponent as RightFleche } from '../Icons/RightFleche.svg';
import './Details.css';
import { Link, useLocation } from 'react-router-dom';

const Details = () => {
    
    const location = useLocation();
    const [initialData, setInitialData] = useState(location.state?.data);
    const [data, setData] = useState(location.state?.data);
    const [editMode, setEditMode] = useState(false);
    const [id, setId] = useState(location.state?.id);
    
    useEffect(() => {
      setInitialData(location.state?.data);
      setData(location.state?.data);
      setId(location.state?.id);
    }, [location.state?.data]);


    return (
        <div>
            <NavBar  />
            <div className="DetailsContainer">
                <Link to={'/filtre'}>
                <RightFleche   />
                </Link>
                <div className="ResultatDetailsContainer">
                    <ResultatDetails
                        data={data}
                        setData={setData}
                        editMode={editMode}
                    />
                    <div className="moreDetails"> 
                        <MoreDetails
                        data={data}
                        editMode={editMode}
                        setData={setData}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Details;