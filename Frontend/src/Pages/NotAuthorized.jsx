import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Renders a component for displaying an unauthorized access message.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.authenticated - Indicates whether the user is authenticated.
 * @returns {JSX.Element} The rendered component.
 */
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
