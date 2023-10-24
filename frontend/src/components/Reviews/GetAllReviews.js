import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleSpotThunk } from "../../store/spots";
import { getAllReviewsThunk } from "../../store/reviews";
import NewReviewModal from "../Reviews/CreateReview";
import PostReviewModalContent from "./ReviewForm";
import OpenModalButton from "../OpenModalButton";

function GetAllReviews() {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  const spot = useSelector((state) => state.spots.singleSpot);
  const allReviewsObject = useSelector((state) => state.reviews.spot);
  const reviewArr = Object.values(allReviewsObject);

  useEffect(() => {
    dispatch(getSingleSpotThunk(spotId));
    dispatch(getAllReviewsThunk(spotId));
  }, [dispatch, spotId]);

  if (
    !spot ||
    Object.keys(spot).length === 0 ||
    !allReviewsObject ||
    !reviewArr
  ) {
    return null;
  }

  // if (!allReviewsObject) {
  //   return null;
  // }

  // if (!reviewArr) return null;

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

  return (
    <>
      <div>
        {reviewArr.reverse().map((singleReview) => (
          <div key={singleReview.id} id="single-review">
            <h3>{singleReview.User && singleReview.User.firstName}</h3>
            <h4>{newDateFormatter(singleReview.createdAt)}</h4>
            <h4>{singleReview.review}</h4>
          </div>
        ))}
      </div>
    </>
  );
}

export default GetAllReviews;
