import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleSpotThunk } from "../../store/spots";
import { getAllReviewsThunk } from "../../store/reviews";
import NewReviewModal from "../Reviews/CreateReview";

function GetAllReviews() {
  const dispatch = useDispatch();

  //! session user id = 4
  const sessionUser = useSelector((state) => state.session.user);
  const spot = useSelector((state) => state.spots.singleSpot);
  const allReviewsObject = useSelector((state) => state.reviews.spot);
  const { spotId } = useParams();
  useEffect(() => {
    dispatch(getSingleSpotThunk(spotId));
    dispatch(getAllReviewsThunk(spotId));
  }, [dispatch, spotId]);

  const reviewArr = Object.values(allReviewsObject);
  console.log("🚀🚀🚀🚀🚀🚀 ~ ShowSingleSpotDetails ~ reviewArr:", reviewArr);

  if (!spot || Object.keys(spot).length === 0) {
    return null;
  }

  if (!allReviewsObject) {
    return null;
  }

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

  return (
    <>
      <div id="reviews">
        <div>
          <div>
            {reviewArr.toReversed().map((singleReview) => (
              <>
                <div id="single-review">
                  <h3>{singleReview?.User?.firstName}</h3>
                  <h4>{newDateFormatter(singleReview.createdAt)}</h4>
                  <h4>{singleReview?.review}</h4>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
      <NewReviewModal spot={spot} />
    </>
  );
}

export default GetAllReviews;
