import React from 'react';

const NotAuthorized = ({ authenticated }) => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Unauthorized Access</h2>
      <p>You do not have permission to access this page.</p>
      {authenticated ? (
        // Display a link to the home page if the user is authenticated
        <p>
          <a href="/home">Go to Home</a>
        </p>
      ) : (
        // Display a link to the login page if the user is not authenticated
        <p>
          <a href="/login">Go to Login</a>
        </p>
      )}
    </div>
  );
};

export default NotAuthorized;
