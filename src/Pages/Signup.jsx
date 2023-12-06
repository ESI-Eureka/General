import React, { useState } from 'react';
import './Login.css';
import { ReactComponent as PicAuth } from '../Icons/Auth.svg';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    console.log('Signing up with:', { email, password });
  };

  return (
    <div className="login-container">
      <div className="picAuth-container">
        <PicAuth className="picAuth"/>
      </div>
      <form className="login-form">
        <h2>Sign-Up</h2>

        <div className="email-password">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <button type="button" onClick={handleSignup}>
          Sign Up
        </button>
        <p>Already have an account? <a href="/login">Log-in</a></p>
      </form>
    </div>
  );
};

export default Signup;