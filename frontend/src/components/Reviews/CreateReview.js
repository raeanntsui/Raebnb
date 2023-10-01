import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import PostReviewModalContent from "./ReviewForm";
import "./CreateReview.css";
import { getAllReviewsThunk } from "../../store/reviews";

function NewReviewModal({ spotId }) {
  const dispatch = useDispatch();
  const { setModalContent, setOnModalClose } = useModal();

  //! current session user
  const currentSessionUser = useSelector((state) => state.session.user);
  console.log("currentSessionUser (session.user)", currentSessionUser);

  //! current spot's details
  const currentSpotDetails = useSelector((state) => state.spots.singleSpot);
  // console.log(
  //   "🚀 ~ file: CreateReview.js:30 ~ NewReviewModal ~ currentSpotDetails:",
  //   currentSpotDetails
  // );
  //! current spot's owner
  // const currentSpotOwner = useSelector(
  //   (state) => state.spots.singleSpot.ownerId
  // );
  // console.log("currentSpotOwner (spots.singleSpot.ownerId)", currentSpotOwner);
  //! current spot's reviews (in entirety)
  const currentSpotReviews = useSelector((state) => state.reviews.spot);
  console.log(
    "🚀 ~ file: CreateReview.js:30 ~ NewReviewModal ~ currentSpotReviews:",
    currentSpotReviews
  );

  //? convert current spot's reviews from object form to array form
  const currentSpotReviewsArray = Object.values(currentSpotReviews);
  console.log(
    "🚀 ~ file: CreateReview.js:42 ~ NewReviewModal ~ currentSpotReviewsArray:",
    currentSpotReviewsArray
  );

  useEffect(() => {
    dispatch(getAllReviewsThunk(spotId));
  }, [dispatch, spotId]);

  if (!currentSpotReviewsArray) return null;
  if (!currentSessionUser) return null;

  let filteredReview = currentSpotReviewsArray.find(
    (review) => currentSessionUser.id === review.userId
  );

  return (
    <>
      {currentSessionUser.id &&
      currentSessionUser.id !== currentSpotDetails.Owner.id &&
      !filteredReview ? (
        <button
          onClick={() => {
            setModalContent(<PostReviewModalContent spotId={spotId} />);
          }}
          type="submit"
        >
          Post Your Review
        </button>
      ) : null}
    </>
  );
}

export default NewReviewModal;
