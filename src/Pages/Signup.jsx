import React, { useState } from "react";
import "./Login.css";
import { ReactComponent as PicAuth } from "../Icons/Auth.svg";
import { useNavigate } from "react-router-dom";

const Signup = ( { setAuthenticated } ) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSignup = () => {
    console.log("Signing up with:", { email, password });

    setLoading(true);
    let signupRes;
    // Create an object containing the user data
    const userData = {
      email: email,
      password: password,
      role: 3,
    };

    // Make a POST request to the Django backend endpoint
    fetch("http://localhost:8000/users/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        signupRes = response.status;
        console.log(response);
        if (response.ok) {
          return response.json();
        } else  {
          throw new Error("Failed to signup.");
        }
      })
      .then((data) => {
        setError(null);
        // Destructure the response data
        const { access_token, user_id,email,password, user_role } = data;

        // Store the access token, user ID, and user role in local storage
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("user_id", user_id);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("user_role", user_role);
    
        setAuthenticated(true);
        navigate("/home");
      })
    .catch((error) => {
      console.error("Error during Signup:", error);
      if (signupRes === 401) {
        setError("Email already exists.");
      } else {
        setError("Failed to Signup. Please try again.");
      }
      setLoading(false);
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    handleSignup();
  };

  return (
    <div className="login-container">
      <div className="picAuth-container">
        <PicAuth className="picAuth" />
      </div>
      <form className="login-form" onSubmit={handleFormSubmit}>
        <h2>Sign-Up</h2>

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
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        <p>
          Already have an account? <a href="/login">Log-in</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
