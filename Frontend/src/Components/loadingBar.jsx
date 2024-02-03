import React from 'react';
import './loadingBar.css';
import load from '../Icons/load.png';
const LoadingBar = () => {

    return (
        <div className="loading-bar">
        <img className="spin" src={load} alt="loading" />
</div>
    );
};

export default LoadingBar;
