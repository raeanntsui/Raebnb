import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleSpotThunk } from "../../store/spots";
import { getAllSpotsThunk } from "../../store/spots";
import { manageSpotsThunk } from "../../store/spots";
import "./ManageSpot.css";

function ManageSpot() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  console.log(
    "🚀 ~ file: ManageSpot.js:11 ~ ManageSpot ~ sessionUser:",
    sessionUser
  );
  const spots = useSelector((state) => state.spots.allSpots);
  console.log("🚀 ~ file: ManageSpot.js:13 ~ ManageSpot ~ spots:", spots);

  const allSpots = Object.values(spots);

  useEffect(() => {
    dispatch(getAllSpotsThunk());
    dispatch(manageSpotsThunk());
  }, [dispatch]);
  return (
    <>
      {allSpots.map(
        (spot) => {
          // if (sessionUser && sessionUser.id === spots.AllSpots.ownerId) {
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
              </div>
            </div>
          </NavLink>;
        }
        //   }
      )}
    </>
  );
}

export default ManageSpot;
