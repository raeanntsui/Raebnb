import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleSpotThunk } from "../../store/spots";
import "./GetSingleSpot.css";

function ShowSingleSpotDetails() {
  const dispatch = useDispatch();

  const spot = useSelector((state) => state.spots.singleSpot);

  const { spotId } = useParams();

  useEffect(() => {
    dispatch(getSingleSpotThunk(spotId));
  }, [dispatch, spotId]);

  // add a popup window for the reserve button
  const reserveButtonPopUp = () => {
    alert("Feature coming soon");
  };

  return (
    <>
      <div id="spot-details">
        <h1>Name: {spot.name}</h1>
        <div id="all-images">
          {spot.SpotImages &&
            spot.SpotImages.map((image) => (
              <img src={image.url} key={image.id} />
            ))}
        </div>
        <div>
          Location:
          {spot.city}, {spot.state}, {spot.country}
        </div>
        <div>
          <p>
            Hosted by {spot.Owner && spot.Owner.firstName} {spot.Owner.lastName}
          </p>
        </div>
        <div>
          <p>Spot description: {spot.description}</p>
        </div>
      </div>

      <div id="callout-box">
        <div>${spot.price} night</div>
        <button onClick={reserveButtonPopUp}>Reserve</button>
        <p>
          {spot.numReviews === 0
            ? `New`
            : spot.numReviews === 1
            ? `1 review`
            : `${spot.numReviews} reviews`}
        </p>
      </div>

      <div>
        <div>
          <i class="fa-solid fa-star"></i>
          {spot.numReviews === 0 ? `No ratings yet!` : `${spot.avgRating}`}
        </div>
        <div>
          {spot.numReviews === 0
            ? `New`
            : spot.numReviews === 1
            ? `1 review`
            : `${spot.numReviews} reviews`}
        </div>
      </div>
    </>
  );
}

export default ShowSingleSpotDetails;
