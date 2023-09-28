// frontend/src/components/Navigation/index.js
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import NewSpot from "../CreateANewSpot/CreateANewSpot";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  return (
    <div id="airbnb-with-raebnb">
      <NavLink exact to="/" id="home-link">
        <img
          id="airbnb-logo"
          src="https://cdn.usbrandcolors.com/images/logos/airbnb-logo.svg"
          height="30"
        />
        raebnb
      </NavLink>
      <NavLink exact to="/spots/new" id="create-new-spot">
        {sessionUser && (
          <button
            id="create-spot-button"
            // onClick={handleButtonClick}
            component={NewSpot}
          >
            Create a New Spot
          </button>
        )}
      </NavLink>
      {isLoaded && <ProfileButton user={sessionUser} />}
    </div>
  );
}

export default Navigation;
