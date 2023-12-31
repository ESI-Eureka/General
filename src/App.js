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

const PrivateRoute = ({ element: Element, role, authenticated, ...rest }) => {
  const roles = {
    admin: ["admin"],
    moderator: ["moderator"],
    user: ["user"],
  };

  const userRole = localStorage.getItem("user_role");
  const isAuthorized = role ? roles[role].some((r) => userRole === r) : true;

  return ( isAuthorized && authenticated) ? (<Element {...rest} />) : (<Navigate to="/not-authorized" replace />);
};

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const storedUserRole = localStorage.getItem("user_role");

    if (accessToken) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }

    setUserRole(storedUserRole);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={authenticated ? <Navigate to="/home" /> : <Navigate to="/login" />} />
        <Route path="/home" element={<PrivateRoute element={userRole === "admin" ? Upload : userRole === "user" ? SearchPage : SearchPage} authenticated={true} role={userRole} />} />
        <Route path="/favorite" element={<PrivateRoute element={Favoris} authenticated={true} role="user" />} />
        <Route path="/filtre" element={<PrivateRoute element={Filtre} authenticated={true} role="user" />} />
        <Route path="/moderators" element={<PrivateRoute element={Moderators} authenticated={true} role="admin" />} />
        <Route path="/profil" element={<PrivateRoute element={Profil} authenticated={true} />} />
        <Route path="/details" element={<PrivateRoute element={Details} authenticated={true} role="user" />} />
        <Route path="/login" element={!authenticated ? <Login setAuthenticated={setAuthenticated} /> : <NotAuthorized authenticated={authenticated} />} />
        <Route path="/signup" element={!authenticated ? <Signup setAuthenticated={setAuthenticated} /> : <NotAuthorized authenticated={authenticated} />} />
        <Route path="/not-authorized" element={<NotAuthorized authenticated={authenticated} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;