import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk } from "../../store/spots";
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
      <h1>Manage Spots</h1>
      <div id="user-single-spot">
        {userSpotsArray.map((spot) => (
          <NavLink key={spot.id} to={`/spots/${spot.id}`}>
            <div>
              <img src={spot.previewImage} alt={spot.name} />
              <p>
                {spot.city}, {spot.state}
              </p>
              <p>${spot.price} night</p>
              <div>
                <i className="fa-solid fa-star"></i>{" "}
                {!spot.avgRating || isNaN(spot.avgRating)
                  ? `New`
                  : parseFloat(spot.avgRating).toFixed(2)}
                <button>Update</button>
                <button>Delete</button>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </>
  );
}

export default ManageSpot;
