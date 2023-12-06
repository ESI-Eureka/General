import React, { useState } from 'react';
import './Login.css';
import { ReactComponent as PicAuth } from '../Icons/Auth.svg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Logging in with:', { email, password });
  };

  return (
    <div className="login-container">
      <div className="picAuth-container">
        <PicAuth/>
      </div>
      <form className="login-form">
        <h2>Log-In</h2>

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
        <button type="button" onClick={handleLogin}>
          Log In
        </button>
        <p>Don't have an account yet? <a href="/signup">Sign-up</a></p>
      </form>
    </div>
  );
};

export default Login;


