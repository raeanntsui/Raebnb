import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleSpotThunk } from "../../store/spots";
import { getAllReviewsThunk } from "../../store/spots";
import "./GetSingleSpot.css";

function ShowSingleSpotDetails() {
  const dispatch = useDispatch();

  const spot = useSelector((state) => state.spots.singleSpot);
  const allReviewsObject = useSelector((state) => state.spots.allReviews);
  console.log(
    "🚀 ~ file: GetSingleSpot.js:13 ~ ShowSingleSpotDetails ~ allReviewsObject:",
    allReviewsObject
  );

  // const allReviewsArray = Object.keys(allReviewsObject).map((review) => {
  //   return {
  //     review: review,
  //     ...allReviewsObject[review],
  //   };
  // });

  // console.log(
  //   "🚀 ~ file: GetSingleSpot.js:24 ~ allReviewsArray ~ allReviewsArray:",
  //   allReviewsArray
  // );

  // Object.keys(spot);
  // console.log(
  //   "🚀 ~ file: GetSingleSpot.js:19 ~ ShowSingleSpotDetails ~ Object.values(spot):",
  //   Object.keys(spot)
  // );

  const { spotId } = useParams();

  useEffect(() => {
    dispatch(getSingleSpotThunk(spotId));
    dispatch(getAllReviewsThunk(spotId));
  }, [dispatch, spotId]);

  if (!allReviewsObject) {
    return null;
  }

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
          <p>Hosted by {spot.Owner && spot.Owner.firstName}</p>
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
        <div id="reviews-and-ratings">
          <i className="fa-solid fa-star"></i>
          {spot.numReviews === 0 ? `No ratings yet!` : `${spot.avgRating}`}
          {!spot.numReviews ? " " : " · "}
          {spot.numReviews === 0
            ? `New`
            : spot.numReviews === 1
            ? `1 review`
            : `${spot.numReviews} reviews`}
        </div>
      </div>

      <div id="reviews">
        <h1>Reviews</h1>
        <div>
          {Object.keys(allReviewsObject).map((singleReview) => (
            <p>{singleReview.review}</p>
          ))}
        </div>
      </div>
    </>
  );
}

export default ShowSingleSpotDetails;
