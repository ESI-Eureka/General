import React from 'react';
import './loadingBar.css';
const LoadingBar = () => {

    return (
        <div className='loadingBar'>
        <svg width="25vw" height="6wh" viewBox="0 0 320 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="24vw" height="5vh" rx="9" fill="white" stroke="#0923A9" stroke-width="2"/>
        <rect className='bar' x="4" y="4" width="36" height="4vh" rx="8" fill="#2546F3"/>
        </svg>
        </div>
    );
};

export default LoadingBar;
