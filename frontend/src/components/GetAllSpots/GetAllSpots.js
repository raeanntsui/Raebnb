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

  // console.log("*******spots", spots);

  // store spots (an object) as an array
  const allSpots = Object.values(spots);
  // console.log("allSpots", allSpots);

  useEffect(() => {
    // dispatch to trigger retrieval of data when the ShowAllSpots mounts
    // getAllSpotsThunk will fetch data from /api/spots
    dispatch(getAllSpotsThunk());
    // run this useEffect if dispatch changes (which should only change one time)
  }, [dispatch]);

  return (
    <>
      <div id="main-spots-div">
        {allSpots.map((spot) => (
          <NavLink to={`/spots/${spot.id}`}>
            <div key={spot.id}>
              <img src={spot.previewImage} alt={spot.name} />
              <p>
                {spot.city}, {spot.state}
              </p>
              <p>${spot.price} night</p>
              <div>
                <i className="fa-solid fa-star"></i>{" "}
                {/* {!spot.avgStarRating ? `New` : spot.avgStarRating.toFixed(2)} */}
                {/* {!spot.avgRating ? `New` : spot.avgRating.toFixed(2)} */}
                {spot.avgRating}
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </>
  );
}

export default ShowAllSpots;
