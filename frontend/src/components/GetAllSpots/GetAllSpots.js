import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllSpotsThunk } from "../../store/spots";
import "./GetAllSpots.css";

// show all spots on landing page
function ShowAllSpots() {
  // dispatch needed to change the state of app via component (ShowAllSpots)

  const dispatch = useDispatch();

  const spots = useSelector((state) => state.spots.allSpots);

  const allSpots = Object.values(spots);
  // console.log("allSpots", allSpots);
  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, [dispatch]);

  if (!allSpots || !allSpots.length) {
    dispatch(getAllSpotsThunk());
    return null;
  }
  return (
    <>
      <div id="main-spots-div">
        {allSpots.map((spot) => (
          <NavLink
            key={spot.id}
            to={`/spots/${spot.id}`}
            id="get-all-spots-nav-link"
          >
            <div id="test-div">
              <img
                src={spot.previewImage}
                alt={spot.name}
                id="landing-page-image"
              />
              <div id="landing-page-spot-info-div">
                <div id="landing-page-spot-info">
                  <p>
                    {spot.city}, {spot.state}
                  </p>
                  <p id="bold-p">${spot.price} night</p>
                </div>
                <div id="landing-page-star-rating">
                  <i className="fa-solid fa-star"></i>{" "}
                  {!spot.avgRating || isNaN(spot.avgRating)
                    ? `New`
                    : parseFloat(spot.avgRating).toFixed(2)}
                </div>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </>
  );
}

export default ShowAllSpots;
