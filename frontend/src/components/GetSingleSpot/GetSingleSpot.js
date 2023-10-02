import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleSpotThunk } from "../../store/spots";
import { getAllReviewsThunk } from "../../store/reviews";
import "./GetSingleSpot.css";
import NewReviewModal from "../Reviews/CreateReview";

function ShowSingleSpotDetails() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  console.log("sessionUser.id", sessionUser.id);
  const spot = useSelector((state) => state.spots.singleSpot);
  const allReviewsObject = useSelector((state) => state.reviews.spot);
  const userReviewArray = Object.values(allReviewsObject);
  // console.log(
  //   "🚀 ~ file: GetSingleSpot.js:15 ~ ShowSingleSpotDetails ~ userReview:",
  //   userReviewArray
  // );

  // console.log("userReviewArray[0].userId", userReviewArray[0].userId);
  // console.log("userReviewArray[0].userId", userReviewArray[0].userId);

  // find the if the user has an existing review
  //! find the session user

  const { spotId } = useParams();

  useEffect(() => {
    dispatch(getSingleSpotThunk(spotId));
    dispatch(getAllReviewsThunk(spotId));
  }, [dispatch, spotId]);

  if (!spot || Object.keys(spot).length === 0) {
    return null;
  }

  if (!allReviewsObject) {
    return null;
  }

  const reserveButtonPopUp = () => {
    alert("Feature coming soon");
  };

  return (
    <>
      <div id="spot-details-container">
        <div id="spot-details">
          <h1>{spot.name}</h1>
          <div id="cityStateCountry">
            {spot.city}, {spot.state}, {spot.country}
          </div>
          {/* <div id="all-images">
          {spot.SpotImages &&
            spot.SpotImages.map((image) => (
              <img src={image.url} key={image.id} />
            ))}
        </div> */}
          <div id="spot-images-container">
            {spot.SpotImages && spot.SpotImages.length > 0 && (
              <div id="first-image">
                <img src={spot.SpotImages[0].url} alt={`Main Image`} />
              </div>
            )}
            <div id="other-images">
              {spot.SpotImages &&
                spot.SpotImages.slice(1, 5).map((image) => (
                  <img src={image.url} key={image.id} alt={`Other Images`} />
                ))}
            </div>
          </div>
          <div id="mid-section-container">
            <div id="hosted-by">
              <p>
                Hosted by {spot.Owner && spot.Owner.firstName}{" "}
                {spot.Owner && spot.Owner.lastName}
              </p>
              <div>
                <p>{spot.description}</p>
              </div>
            </div>

            <div id="callout-box">
              <div id="callout-top">
                <div id="price">${spot.price} night</div>
                {/* <div>
                  {spot.numReviews === 0
                    ? `New`
                    : spot.numReviews === 1
                    ? `1 Review`
                    : `${spot.numReviews} Reviews`}
                </div> */}
                <div>
                  <div id="reviews-and-ratings">
                    <i className="fa-solid fa-star"></i>
                    {spot.numReviews === 0
                      ? null
                      : `${spot?.avgRating?.toFixed(2)}`}
                    {!spot.numReviews ? " " : " · "}
                    {spot.numReviews === 0
                      ? `New`
                      : spot.numReviews === 1
                      ? `1 Review`
                      : `${spot.numReviews} Reviews`}
                  </div>
                </div>
              </div>
              <div id="callout-bottom">
                <button id="callout-button" onClick={reserveButtonPopUp}>
                  Reserve
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div id="reviews-and-ratings-2">
            <i id="star" className="fa-solid fa-star"></i>
            {spot.numReviews === 0 ? null : `${spot?.avgRating?.toFixed(2)}`}
            {!spot.numReviews ? " " : " · "}
            {spot.numReviews === 0
              ? `New`
              : spot.numReviews === 1
              ? `1 Review`
              : `${spot.numReviews} Reviews`}
          </div>
        </div>

        <div id="reviews">
          <div>
            {spot.numReviews === 0 ? (
              <>
                <h3>Be the first to post a review</h3>
                <div>{/* <NewReviewModal spot={spot} /> */}</div>
              </>
            ) : (
              <div>
                {Object.values(allReviewsObject).map((singleReview) => (
                  <>
                    <div id="single-review">
                      <h3>{singleReview.User.firstName}</h3>
                      <h4>{singleReview.createdAt.substring(0, 7)}</h4>
                      <h5>{singleReview.review}</h5>
                    </div>
                  </>
                ))}
              </div>
            )}
          </div>
        </div>
        <NewReviewModal spot={spot} />
      </div>
    </>
  );
}

export default ShowSingleSpotDetails;
