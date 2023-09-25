// frontend/src/components/Navigation/index.js
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  // return (
  //   <ul id="sign-up">
  //     <li id="airbnb-with-raebnb">
  //       <NavLink exact to="/" className="home-link">
  //         <img
  //           id="airbnb-logo"
  //           src="https://cdn.usbrandcolors.com/images/logos/airbnb-logo.svg"
  //           height="30"
  //         />
  //         <p>Raebnb</p>
  //       </NavLink>
  //     </li>
  //     {isLoaded && (
  //       <li>
  //         <ProfileButton user={sessionUser} />
  //       </li>
  //     )}
  //   </ul>
  // );

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
      {isLoaded && <ProfileButton user={sessionUser} />}
    </div>
  );
}

export default Navigation;
