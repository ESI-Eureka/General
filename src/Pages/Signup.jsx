import React, { useState } from "react";
import "./Login.css";
import { ReactComponent as PicAuth } from "../Icons/Auth.svg";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignup = () => {
    console.log("Signing up with:", { email, password });

    setLoading(true);

    // Create an object containing the user data
    const userData = {
      email: email,
      password: password,
      role: 3,
    };

    // Make a POST request to the Django backend endpoint
    fetch("http://localhost:8000/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          console.log("Signup successfull:", response.body);
          setError(null);
          // Call the parent function with the added moderator details
          return response.json();
        } else if (response.status === 400) {
          setError("Email already exists.");
        } else {
          throw new Error("Failed to signup.");
        }
      })
      .catch((error) => {
        console.error("Error during signup:", error);
        // Handle errors, show a message to the user, etc.
      })
      .finally(() => {
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
