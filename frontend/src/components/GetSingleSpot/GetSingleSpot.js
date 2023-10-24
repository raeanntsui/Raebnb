import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleSpotThunk } from "../../store/spots";
import { getAllReviewsThunk } from "../../store/reviews";
import DeleteReview from "../DeleteReview/DeleteReview";
import "./GetSingleSpot.css";
import NewReviewModal from "../Reviews/CreateReview";
import GetAllReviews from "../Reviews/GetAllReviews";
import OpenModalButton from "../OpenModalButton";
function ShowSingleSpotDetails() {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const spot = useSelector((state) => state.spots.singleSpot);
  const allReviewsObject = useSelector((state) => state.reviews.spot);
  const { spotId } = useParams();

  useEffect(() => {
    dispatch(getSingleSpotThunk(spotId));
    dispatch(getAllReviewsThunk(spotId));
  }, [dispatch, spotId]);

  const reviewArr = Object.values(allReviewsObject);

  if (!spot || Object.keys(spot).length === 0) {
    return null;
  }

  if (!allReviewsObject) {
    return null;
  }

  const reserveButtonPopUp = () => {
    alert("Feature coming soon");
  };

  let counter = 1;

  // date
  const newDateFormatter = (date) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const adjustedDate = new Date(date);
    const month = months[adjustedDate.getMonth()];
    const year = adjustedDate.getFullYear();

    return `${month} ${year}`;
  };

  let existingReview;

  if (sessionUser) {
    console.log("🚀🚀🚀🚀🚀🚀 ~ sessionUser:", sessionUser);
    existingReview = reviewArr.find(
      (review) => review.User.id === sessionUser.id
    );
  }

  return (
    <>
      <div id="spot-details-container">
        <div id="spot-details">
          <div id="spot-details-header">
            <h1>{spot.name}</h1>
            <div id="cityStateCountry">
              {spot.city}, {spot.state}, {spot.country}
            </div>
          </div>
          <div id="all-images">
            {spot.SpotImages &&
              spot.SpotImages.map((image) => (
                <img
                  src={image.url}
                  key={image.id}
                  className={`image${counter++}`}
                />
              ))}
          </div>
          <div id="mid-section-container">
            <div id="hosted-by">
              <h1>
                Hosted by {spot?.Owner && spot?.Owner?.firstName}{" "}
                {spot?.Owner && spot?.Owner?.lastName}
              </h1>
              <div>
                <h2>{spot.description}</h2>
              </div>
            </div>

            <div id="callout-box">
              <div id="callout-top">
                <div id="price">
                  <h2>${spot.price} night</h2>
                </div>
                <div>
                  <div id="reviews-and-ratings">
                    <h2>
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
                    </h2>
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
        <h1>
          <i className="fa-solid fa-star"></i>
          {spot.numReviews === 0 ? null : `${spot?.avgRating?.toFixed(2)}`}
          {!spot.numReviews ? " " : " · "}
          {spot.numReviews === 0
            ? `New`
            : spot.numReviews === 1
            ? `1 Review`
            : `${spot.numReviews} Reviews`}
        </h1>

        {sessionUser &&
        sessionUser?.id !== spot?.Owner?.id &&
        !existingReview &&
        (!reviewArr || reviewArr.length === 0) ? (
          <>
            <h1>Be the first to post a review!</h1>
            <NewReviewModal spot={spot} />
          </>
        ) : sessionUser &&
          sessionUser?.id !== spot?.Owner?.id &&
          !existingReview &&
          reviewArr ? (
          <NewReviewModal spot={spot} />
        ) : existingReview ? (
          <OpenModalButton
            style="margin-left: 0;"
            buttonText="Delete Review"
            modalComponent={
              <DeleteReview review={existingReview} spot={spot} />
            }
          />
        ) : null}
        <GetAllReviews />
      </div>
    </>
  );
}

export default ShowSingleSpotDetails;
