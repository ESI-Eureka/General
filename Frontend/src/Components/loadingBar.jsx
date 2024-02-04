import React from 'react';
import './loadingBar.css';
import load from '../Icons/load.png';
/**
 * Represents a loading bar component.
 * @returns {JSX.Element} The loading bar component.
 */
const LoadingBar = () => {

    return (
        <div className="loading-bar">
        <img className="spin" src={load} alt="loading" />
</div>
    );
};

export default LoadingBar;
