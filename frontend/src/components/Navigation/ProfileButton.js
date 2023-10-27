// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect, useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import CreateANewSpotFormModal from "../CreateANewSpot/CreateANewSpot";

function ProfileButton({ user }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      {/* <div id="test"> */}
      <button id="dropdown-button-w-icons" onClick={openMenu}>
        <div>
          <i id="bars-icon" className="fa-solid fa-bars"></i>
        </div>
        <div>
          <i id="person-icon" className="fa-solid fa-user" />
        </div>
      </button>
      {/* </div> */}

      <ul id="dropdown-info" className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li id="li-1">
              <h2 id="dropdown-h2">Hello, {user.firstName}</h2>
            </li>
            <li id="li-2">{user.email}</li>
            <li id="li-3">
              <NavLink id="navlink-test" exact to="/spots/current">
                {/* <button id="manage-spot-button">Manage Spots</button> */}
                Manage Spots
              </NavLink>
            </li>{" "}
            <li id="li-4">
              <button onClick={logout} className="logout-button">
                Log Out
              </button>
            </li>
          </>
        ) : (
          <div id="login-signup-dropdown">
            <div id="li-link">
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </div>

            <div id="li-link-2">
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div>
          </div>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
