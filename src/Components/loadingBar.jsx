import React from 'react';
import './loadingBar.css';
const LoadingBar = () => {

    return (
        <div className='loadingBar'>
        <svg width="320" height="36" viewBox="0 0 320 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="318" height="34" rx="9" fill="white" stroke="#0923A9" stroke-width="2"/>
        <rect className='bar' x="4" y="4" width="36" height="28" rx="8" fill="#2546F3"/>
        </svg>
        </div>
    );
};

export default LoadingBar;
