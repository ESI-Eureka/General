import React, { useState } from "react";
import "./Login.css";
import { ReactComponent as PicAuth } from "../Icons/Auth.svg";
import { useNavigate } from "react-router-dom";

const Login = ({ setAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
const navigate = useNavigate();
  const handleLogin = () => {
    setLoading(true);
    let loginRes;
    const loginData = {
      email: email,
      password: password,
    };

    

    fetch("http://localhost:8000/users/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => {
        loginRes = response.status;
        console.log("response : ", loginRes);

        if (response.ok) {
          console.log("Login successfull:", response.body);
          // Call the parent function with the added moderator details
          setError(null);
          return response.json();
        } else {
          throw new Error("Failed to login.");
        }
      })
      .then((data) => {
        const { access_token } = data;

        // Store the access token in local storage
        localStorage.setItem("access_token", access_token);

        // Fetch user's role after login
        fetch("http://localhost:8000/users/role/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            const { role } = data;
            console.log(data);
            
            // Store the user's role in local storage
            localStorage.setItem("user_role", role);

            
            setAuthenticated(true);
            navigate('/home');
          })
          .catch((error) => {
            console.error("Error fetching user role:", error);
            setError("Failed to fetch user role. Please try again.");
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch((error) => {
        console.error("Error during login:", error);
        if (loginRes === 404) {
          setError("User with the provided email  doesn't exist.");
        } else if (loginRes === 401) {
          setError("Password incorrect.");
        } else {
          setError("Erreur during login. Please try again.");
        }
        setLoading(false);
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="login-container">
      <div className="picAuth-container">
        <PicAuth />
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
            pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
            title="utilisateur@example.com"
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
        <button type="submit" disabled={loading}>
          {loading ? "Logging In..." : "Log In"}
        </button>
        <p className="signup-prg">
          Don't have an account yet? <a href="/signup">Sign-up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
