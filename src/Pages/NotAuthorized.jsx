import React from 'react';
import { Link } from 'react-router-dom';

const NotAuthorized = ({ authenticated }) => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Unauthorized Access</h2>
      <p>You do not have permission to access this page.</p>
      {authenticated ? (
        // Display a Link to the home page if the user is authenticated
        <p>
          <Link to="/home">Go to Home</Link>
        </p>
      ) : (
        // Display a Link to the login page if the user is not authenticated
        <p>
          <Link to="/login">Go to Login</Link>
        </p>
      )}
    </div>
  );
};

export default NotAuthorized;
