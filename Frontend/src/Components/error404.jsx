import React from 'react';

import "./error404.css";
import svg from '../Icons/Ellipse 3.svg';

const Error404 = () => {
    return (
        <>
        <div className='container-error'>
        <div className="err404">
                <h1>404</h1>
        </div >
        <div className='hero'>
            <div className='BottomImg'>
            <svg xmlns="http://www.w3.org/2000/svg" width="136" height="136" viewBox="0 0 236 236" fill="none">
            <circle cx="118" cy="118" r="118" fill="#2546F3"/>
            </svg>
            </div>
            <div  className='TopImg' ></div>
        </div>   
        <div className='text'>
        <p className='first'><b>Something went wrong ! </b><br></br><br></br>The page you are looking for does not exist or has been removed</p>
        <div className='btn'>Refresh</div></div>
        
        </div></>
    );
};

export default Error404;
