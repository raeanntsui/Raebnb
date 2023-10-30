import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleSpotThunk } from "../../store/spots";
import { getAllReviewsThunk } from "../../store/reviews";
import NewReviewModal from "../Reviews/CreateReview";
import PostReviewModalContent from "./ReviewForm";
import OpenModalButton from "../OpenModalButton";
import DeleteReview from "../DeleteReview/DeleteReview";

function GetAllReviews() {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  const currentSessionUser = useSelector((state) => state.session.user);
  // console.log("🚀🚀🚀🚀🚀🚀 ~ currentSessionUser:", currentSessionUser);
  const spot = useSelector((state) => state.spots.singleSpot);
  const allReviewsObject = useSelector((state) => state.reviews.spot);
  const reviewArr = Object.values(allReviewsObject);

  useEffect(() => {
    dispatch(getSingleSpotThunk(spotId));
    dispatch(getAllReviewsThunk(spotId));
  }, [dispatch, spotId, reviewArr.length]);

  if (
    !spot ||
    Object.keys(spot).length === 0 ||
    !allReviewsObject ||
    !reviewArr
  ) {
    return null;
  }

  let counter = 1;

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

  if (currentSessionUser) {
    existingReview = reviewArr.find(
      (review) => review.User.id === currentSessionUser.id
    );
  }

  //

  return (
    <>
      <div id="reviews">
        {reviewArr.reverse().map((singleReview) => (
          <div key={singleReview.id} id="single-review">
            <div id="review-icon">
              <i class="fa-regular fa-face-smile"></i>
            </div>
            <div id="review-chunk">
              <div id="firstname">
                {singleReview.User && singleReview.User.firstName}
              </div>
              <div id="date">
                <h6>{newDateFormatter(singleReview.createdAt)}</h6>
              </div>
              <div id="actual-review">
                <h9>{singleReview.review}</h9>
              </div>
              {currentSessionUser &&
              currentSessionUser.id === singleReview.User.id ? (
                <div id="delete-button">
                  <OpenModalButton
                    buttonText="Delete Review"
                    modalComponent={
                      <DeleteReview review={existingReview} spot={spotId} />
                    }
                  />
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default GetAllReviews;
