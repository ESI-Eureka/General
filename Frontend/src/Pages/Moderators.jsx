import React from "react";
import NavBar from "../Components/NavBar";
import ModeratorList from "../Components/ModeratorList";

/**
 * Renders the Moderators page.
 * @returns {JSX.Element} The Moderators page component.
 */
const Moderators = () => {
  
  return (
    <div className="moderators-container">
      <NavBar />
      <ModeratorList />
    </div>
  );
};

export default Moderators;
