import React from "react";
import { useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import PostReviewModalContent from "./ReviewForm";
import "./CreateReview.css";

function NewReviewModal({ spotId }) {
  const { setModalContent, setOnModalClose } = useModal();
  // hide button if current session user = spot owner
  //! identify to the current session user and match to the current spot's ownerId
  //? if (currentSessionUser.id === currentSpotReviews.userId) Hide review button
  //? if (currentSessionUser.id !== Current spot user Id)
  //! current session user
  const currentSessionUser = useSelector((state) => state.session.user.id);
  console.log("currentSessionUser (session.user.id)", currentSessionUser);
  // console.log("currentSessionUser (session.user.id)", currentSessionUser.id);
  //! current spot's details
  const currentSpotDetails = useSelector((state) => state.spots.singleSpot);
  // console.log(
  //   "🚀 ~ file: CreateReview.js:30 ~ NewReviewModal ~ currentSpotDetails:",
  //   currentSpotDetails
  // );
  //! current spot's owner
  const currentSpotOwner = useSelector(
    (state) => state.spots.singleSpot.ownerId
  );
  // console.log("currentSpotOwner (spots.singleSpot.ownerId)", currentSpotOwner);
  //! current spot's reviews (in entirety)
  const currentSpotReviews = useSelector((state) => state.reviews.spot);
  // console.log(
  //   "🚀 ~ file: CreateReview.js:30 ~ NewReviewModal ~ currentSpotReviews:",
  //   currentSpotReviews
  // );
  //? convert current spot's reviews from object form to array form
  const currentSpotReviewsArray = Object.values(currentSpotReviews);
  // console.log(
  //   "🚀 ~ file: CreateReview.js:42 ~ NewReviewModal ~ currentSpotReviewsArray:",
  //   currentSpotReviewsArray
  // );

  let filteredReview = currentSpotReviewsArray.filter(
    (review) => currentSessionUser === review.userId
  );
  console.log(
    "🚀 ~ file: CreateReview.js:44 ~ NewReviewModal ~ filteredReviewUser:",
    filteredReview
  );

  console.log(
    "userId of filtered review at current spot",
    filteredReview[0].userId
  );

  return (
    <>
      {(currentSessionUser !== currentSpotOwner ||
        currentSessionUser === filteredReview) && (
        <button
          onClick={() => {
            setModalContent(<PostReviewModalContent spotId={spotId} />);
          }}
          type="submit"
        >
          Post Your Review
        </button>
      )}
    </>
  );
}

export default NewReviewModal;
