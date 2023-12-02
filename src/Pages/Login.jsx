import React, { useState, useEffect } from 'react';
import './Login.css';

const Login = () => {
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

  const handleLogin = () => {
    console.log('Logging in with:', { email, password });

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

        <div className="remember-me">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={handleRememberMeChange}
          />
          <label htmlFor="rememberMe">Remember me</label>
        </div>
      </form>

      <button type="button" onClick={handleLogin}>
          Log In
        </button>
    </div>
  );
};

export default Login;


