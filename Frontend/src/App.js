import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Profil from "./Pages/Profil";
import Upload from "./Pages/Upload";
import Moderators from "./Pages/Moderators";
import Filtre from "./Pages/Filtre";
import SearchPage from "./Pages/Search";
import Favoris from "./Pages/Favoris";
import Details from "./Pages/Details";
import NotAuthorized from "./Pages/NotAuthorized";
import ModArticles from "./Pages/modArticles";
import ModerateurDetails from "./Pages/ModerateurDetails";

const PrivateRoute = ({ element: Element, role, ...rest }) => {
  const roles = {
    admin: ["admin"],
    moderator: ["moderator"],
    user: ["user"],
  };

  const accessToken = localStorage.getItem("access_token");
  const userRole = localStorage.getItem("user_role");

  const isAuthenticated = accessToken !== null;

  const isAuthorized = role ? roles[role].includes(userRole) : true;

  if (isAuthenticated) {
    return isAuthorized ? <Element {...rest} /> : <Navigate to="/not-authorized" replace />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

/**
 * Represents the main component of the application.
 * @returns {JSX.Element} The rendered JSX element.
 */
function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const storedUserRole = localStorage.getItem("user_role");
    if (accessToken) {
      setAuthenticated(true);
      setUserRole(storedUserRole);
    } else {
      setAuthenticated(false);
      setUserRole(null);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={authenticated ? <Navigate to="/home" /> : <Navigate to="/login" />} />
        <Route
          path="/home"
          element={
            userRole === "admin" ? (
              <PrivateRoute element={Upload} />
            ) : userRole === "moderator" ? (
              <PrivateRoute element={ModArticles} />
            ) : userRole === "user" ? (
              <PrivateRoute element={SearchPage} />
            ) : authenticated ? (
              <Navigate to="/home" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/favorite" element={<PrivateRoute element={Favoris} role="user" />} />
        <Route path="/filtre" element={<PrivateRoute element={Filtre} role="user" />} />
        <Route path="/moderators" element={<PrivateRoute element={Moderators} role="admin" />} />
        <Route path="/profil" element={<PrivateRoute element={Profil} />} />
        <Route path="/details" element={<PrivateRoute element={userRole === "moderator" ? ModerateurDetails : userRole === "user" ? Details : NotAuthorized} role={userRole} />} />
        <Route path="/login" element={!authenticated ? <Login setAuthenticated={setAuthenticated} /> : <Navigate to="/home" />} />
        <Route path="/signup" element={!authenticated ? <Signup setAuthenticated={setAuthenticated} /> : <Navigate to="/home" />} />
        <Route path="/not-authorized" element={<NotAuthorized authenticated={authenticated} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;