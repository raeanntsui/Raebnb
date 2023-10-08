import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk } from "../../store/spots";
import OpenModalButton from "../OpenModalButton";
import DeleteSpot from "../DeleteSpot/DeleteSpot";
import "./ManageSpot.css";

function ManageSpot() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  console.log(
    "🚀 ~ file: ManageSpot.js:11 ~ ManageSpot ~ sessionUser:",
    sessionUser
  );
  const spots = useSelector((state) => state.spots.allSpots);
  //   console.log("🚀 ~ file: ManageSpot.js:13 ~ ManageSpot ~ spots:", spots);

  const allSpots = Object.values(spots);
  //   console.log("🚀 ~ file: ManageSpot.js:20 ~ ManageSpot ~ allSpots:", allSpots);

  if (!allSpots || !allSpots.length) {
    // grab all spots
    dispatch(getAllSpotsThunk());
    return null;
  }

  // if user logs out or no user is logged in currently, redirect to main landing page
  if (!sessionUser) {
    return <Redirect to="/"></Redirect>;
  }

  //! filter the spots that are owned by the current session user
  const userSpotsArray = allSpots.filter(
    (spot) => spot.ownerId === sessionUser.id
  );
  console.log(
    "🚀 ~ file: ManageSpot.js:36 ~ ManageSpot ~ userSpotsArray:",
    userSpotsArray
  );

  return (
    <>
      <div id="manage-spots-header-and-button">
        <h1>Manage Spots</h1>
        <NavLink exact to="/spots/new" id="create-new-spot">
          {sessionUser && (
            <button id="create-spot-button">Create a New Spot</button>
          )}
        </NavLink>
      </div>
      <div id="all-spots-container">
        {userSpotsArray.map((spot) => (
          <>
            <div id="single-spot">
              <NavLink
                key={spot.id}
                to={`/spots/${spot.id}`}
                id="get-all-spots-nav-link">
                <div id="image-div">
                  <div id="image-div-child">
                    <img
                      id="manage-spots-image"
                      src={spot.previewImage}
                      alt={spot.name}
                    />
                  </div>
                  <div id="manage-city-state-rating">
                    <div id="manage-city-state">
                      <p>
                        {spot.city}, {spot.state}
                      </p>
                      <p>${spot.price} night</p>
                    </div>
                    <div id="manage-rating">
                      <i className="fa-solid fa-star"></i>{" "}
                      {!spot.avgRating || isNaN(spot.avgRating)
                        ? `New`
                        : parseFloat(spot.avgRating).toFixed(2)}
                    </div>
                  </div>
                </div>
              </NavLink>
              <div id="update-delete">
                <NavLink to={`/spots/${spot.id}/edit`}>
                  <button id="update-button">Update</button>
                </NavLink>
                {/* <div></div> */}
                <OpenModalButton
                  id="delete-button"
                  buttonText="Delete"
                  modalComponent={<DeleteSpot spot={spot} />}
                />
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export default ManageSpot;
