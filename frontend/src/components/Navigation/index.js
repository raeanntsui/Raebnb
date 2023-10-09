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
    <div id="header-nav-bar-container">
      <NavLink to="/" id="home-link">
        <img
          id="raebnb-logo"
          src="https://cdn.usbrandcolors.com/images/logos/airbnb-logo.svg"
        />
        <h1 id="raebnb-h1">raebnb</h1>
      </NavLink>
      <div id="right-side-nav">
        <div id="right-side-nav-create-spot-button">
          <NavLink exact to="/spots/new" id="navlink-test">
            {sessionUser && (
              // <button id="create-spot-button">Create a New Spot</button>
              <h2>Create a New Spot</h2>
            )}
          </NavLink>
        </div>
        <div id="right-side-nav-profile-button">
          {isLoaded && <ProfileButton user={sessionUser} />}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
