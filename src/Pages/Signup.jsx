import React, { useState, useEffect } from 'react';
import './Login.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    // Load email from local storage if "Remember Me" is checked
    const storedEmail = localStorage.getItem('rememberedEmail');
    if (rememberMe && storedEmail) {
      setEmail(storedEmail);
    }
  }, [rememberMe]);

  const handleSignup = () => {
    console.log('Signing up with:', { email, password });

    // Store the email in local storage if "Remember Me" is checked
    if (rememberMe) {
      localStorage.setItem('rememberedEmail', email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <div className="login-container">
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
      </form>

      <button type="button" onClick={handleSignup}>
          Sign Up
        </button>
    </div>
  );
};

export default Signup;