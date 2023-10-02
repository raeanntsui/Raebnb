// frontend/src/components/Navigation/index.js
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import NewSpot from "../CreateANewSpot/CreateANewSpot";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  return (
    <div id="airbnb-with-raebnb-and-signin">
      <NavLink exact to="/" id="home-link">
        <img
          id="airbnb-logo"
          src="https://cdn.usbrandcolors.com/images/logos/airbnb-logo.svg"
          height="30"
        />
        raebnb
      </NavLink>
      <div id="right-side-nav">
        <div id="nav-left-create-spot">
          <NavLink exact to="/spots/new" id="create-new-spot">
            {sessionUser && (
              <button id="create-spot-button">Create a New Spot</button>
            )}
          </NavLink>
        </div>
        <div id="nav-right-dropdown-menu">
          {isLoaded && <ProfileButton user={sessionUser} />}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
