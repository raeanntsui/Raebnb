import React, { useEffect } from "react";
import { useParams, NavLink, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk } from "../../store/spots";
import OpenModalButton from "../OpenModalButton";
import DeleteSpot from "../DeleteSpot/DeleteSpot";
import "./ManageSpot.css";

function ManageSpot() {
  const { current } = useParams();

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const spots = useSelector((state) => state.spots.allSpots);
  // console.log("🚀 ~ file: ManageSpot.js:13 ~ ManageSpot ~ spots:", spots);

  const allSpots = Object.values(spots);
  //   console.log("🚀 ~ file: ManageSpot.js:20 ~ ManageSpot ~ allSpots:", allSpots);

  let userSpotsArray;
  if (sessionUser) {
    userSpotsArray = allSpots.filter(
      (spot) => spot && spot.ownerId === sessionUser.id
    );
  }

  useEffect(() => {
    if (userSpotsArray) {
      dispatch(getAllSpotsThunk({ current }));
    }
  }, [dispatch, userSpotsArray.length]);

  return (
    <div id="manage-spots-entire">
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
                <div id="update1">
                  <NavLink to={`/spots/${spot.id}/edit`}>
                    <button id="update-button">Update</button>
                  </NavLink>
                </div>
                <div id="update2">
                  <OpenModalButton
                    buttonText="Delete"
                    modalComponent={<DeleteSpot spot={spot} />}
                  />
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default ManageSpot;
