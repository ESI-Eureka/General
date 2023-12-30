import React, { useState } from 'react';
import './Login.css';
import { ReactComponent as PicAuth } from '../Icons/Auth.svg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = () => {
    console.log('Logging in with:', { email, password });

    setLoading(true);

    // Create an object containing the user login data
    const loginData = {
      email: email,
      password: password,
    };

    // Make a POST request to the Django backend login endpoint
    fetch('http://localhost:8000/users/login/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          console.log("Login successfull:", response.body);
          // Call the parent function with the added moderator details
          setError(null);
          return response.json();
        } else if (response.status === 404) {
          setError("User with the provided email  doesn't exist.");
        } else if (response.status === 401) {
          setError("Password incorrect.");
        } else {
          throw new Error("Failed to login.");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        // Handle errors, show a message to the user, etc.
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    handleLogin();
  };


  return (
    <div className="login-container">
      <div className="picAuth-container">
        <PicAuth/>
      </div>
      <form className="login-form" onSubmit={handleFormSubmit}>
        <h2>Log-In</h2>

        <div className="email-password">
        <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            pattern="[^\s@]+@[^\s@]+\.[^\s@]+" // Specify the pattern for a valid email
            title="utilisateur@example.com" // Specify the validation message
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">
          {loading ? "Loging In..." : "Log In"}
        </button>
        <p className="signup-prg">Don't have an account yet? <a href="/signup">Sign-up</a></p>
      </form>
    </div>
  );
};

export default Login;


