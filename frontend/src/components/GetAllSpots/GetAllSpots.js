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
  // console.log("Spots ***** ", Spots.spots);

  // store spots (an object) as an array
  const allSpots = Object.values(spots);
  // console.log("allSpots", allSpots);

  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, [dispatch]);

  return (
    <>
      <div id="main-spots-div">
        {allSpots.map((spot) => (
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
                {/* {spot.avgRating} */}
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </>
  );
}

export default ShowAllSpots;
