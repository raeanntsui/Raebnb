import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllSpotsThunk } from "../../store/spots";
import "./GetAllSpots.css";

function ShowAllSpots() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.allSpots);
  const allSpots = Object.values(spots);

  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, [dispatch]);

  if (!allSpots || !allSpots.length) {
    return null;
  }

  return (
    <>
      <div className="all-spots-container">
        {allSpots.map((spot) =>
          spot ? (
            <NavLink key={spot.id} to={`/spots/${spot.id}`} className="NavLink">
              <img
                src={spot.previewImage}
                alt={spot.name}
                className="landing-page-image"
                title={spot.name}
              />
              <div className="spot-details">
                <div className="location-price">
                  <p id="location">
                    {spot.city}, {spot.state}
                  </p>
                  <p className="p2">${spot.price} night</p>
                </div>
                <div className="rating">
                  <p>
                    <i id="filled-star" className="fa-solid fa-star"></i>{" "}
                    {!spot.avgRating || isNaN(spot.avgRating)
                      ? `New`
                      : parseFloat(spot.avgRating).toFixed(2)}
                  </p>
                </div>
              </div>
            </NavLink>
          ) : null
        )}
      </div>
    </>
  );
}

export default ShowAllSpots;
