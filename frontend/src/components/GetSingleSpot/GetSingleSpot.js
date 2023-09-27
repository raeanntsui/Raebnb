import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleSpotThunk } from "../../store/spots";
import "./GetSingleSpot.css";

function ShowSingleSpotDetails() {
  const dispatch = useDispatch();

  const spot = useSelector((state) => state.spots.singleSpot);

  const { spotId } = useParams();

  // Dispatch the getSingleSpotThunk with the spotId
  useEffect(() => {
    dispatch(getSingleSpotThunk(spotId));
  }, [dispatch, spotId]);

  // add a popup window for the reserve button
  const reserveButtonPopUp = (event) => {
    event.preventDefault();
    alert("Feature coming soon");
  };

  return (
    <>
      <div id="spot-details">
        <h1>Name: {spot.name}</h1>
        <div>
          Location:
          {spot.city}, {spot.state}, {spot.country}
        </div>
        <div>
          {spot.SpotImages.map((image) => (
            <img key={image.id} src={image.url} />
          ))}
        </div>
        <div>
          <p>Hosted by {spot.Owner.firstName}</p>
        </div>
        <div>
          <p>Spot description: {spot.description}</p>
        </div>
      </div>

      <div id="callout-box">
        <div>${spot.price} night</div>
        <button onClick={reserveButtonPopUp}>Reserve</button>
      </div>
    </>
  );
}

export default ShowSingleSpotDetails;
