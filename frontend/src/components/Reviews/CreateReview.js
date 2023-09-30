import React, { useState, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createNewReviewThunk } from "../../store/reviews";
import "./CreateReview.css";

function NewReviewModal({ rating, disabled, onChange, spotId }) {
  const dispatch = useDispatch();
  // const history = useHistory();
  const [validationErrors, setValidationErrors] = useState({});
  const [reviewDescription, setReviewDescription] = useState("");
  const [newReview, setNewReview] = useState("");
  const [starRating, setStarRating] = useState(rating);
  const [submit, setSubmit] = useState(false);

  const { closeModal } = useModal();
  const { setModalContent, setOnModalClose } = useModal();

  //! identify to the current session user and match to the current spot's ownerId
  //? if (currentSessionUser.id === currentSpotReviews.userId) Hide review button
  //? if (currentSessionUser.id !== Current spot user Id)

  //! current session user
  const currentSessionUser = useSelector((state) => state.session.user.id);
  console.log("currentSessionUser (session.user.id)", currentSessionUser);
  // console.log("currentSessionUser (session.user.id)", currentSessionUser.id);

  //! current spot's details
  const currentSpotDetails = useSelector((state) => state.spots.singleSpot);
  console.log(
    "🚀 ~ file: CreateReview.js:30 ~ NewReviewModal ~ currentSpotDetails:",
    currentSpotDetails
  );

  //! current spot's owner
  const currentSpotOwner = useSelector(
    (state) => state.spots.singleSpot.ownerId
  );
  console.log("currentSpotOwner (spots.singleSpot.ownerId)", currentSpotOwner);

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

  // hide review button if current session user matches current spot owner

  // error handling useEffect
  useEffect(() => {
    let errorsObject = {};
    if (reviewDescription.length < 10 || !reviewDescription)
      errorsObject.reviewDescription =
        "Please enter a minimum of 10 characters for your review";
    // if an error exists, state will update with error property in the errorsObject
    setValidationErrors(errorsObject);
    setStarRating(rating);
  }, [reviewDescription, rating]);

  // prevent entire page reload
  const handleSubmit = async (event) => {
    // prevent page from refreshing on form submission via submit button
    event.preventDefault();
    setSubmit(true);
    const newReviewOnSubmit = {
      // names taken from backend
      reviewDescription,
      // stars,
    };
    if (currentSessionUser !== currentSpotOwner) {
      if (Object.keys(validationErrors).length === 0) {
        const res = await dispatch(createNewReviewThunk(newReviewOnSubmit));
        if (!res.errors) {
          await dispatch(
            // createNewReviewThunk(reviewDescription, stars, res.id)
            createNewReviewThunk(reviewDescription, res.id)
          );
        }
        // history.push(`/spots/${res.id}/reviews`);
      }
    }
    setSubmit(false);
  };

  // post new review content (description & star rating)
  const PostReviewModalContent = () => (
    <form onSubmit={handleSubmit}>
      <h1>How was your stay?</h1>
      <textarea placeholder="Leave your review here"></textarea>
      <p>{submit && validationErrors.reviewDescription}</p>
      <div
        className={starRating >= 1 ? "filled" : "empty"}
        onMouseEnter={() => {
          if (!disabled) setStarRating(1);
        }}
        onMouseLeave={() => {
          if (!disabled) setStarRating(rating);
        }}
        onClick={() => {
          if (!disabled) onChange(1);
        }}
      >
        <i className="fa-solid fa-star"></i>
      </div>
      <div
        className={starRating >= 2 ? "filled" : "empty"}
        onMouseEnter={() => {
          if (!disabled) setStarRating(2);
        }}
        onMouseLeave={() => {
          if (!disabled) setStarRating(rating);
        }}
        onClick={() => {
          if (!disabled) onChange(2);
        }}
      >
        <i className="fa-solid fa-star"></i>
      </div>
      <div
        className={starRating >= 3 ? "filled" : "empty"}
        onMouseEnter={() => {
          if (!disabled) setStarRating(3);
        }}
        onMouseLeave={() => {
          if (!disabled) setStarRating(rating);
        }}
        onClick={() => {
          if (!disabled) onChange(3);
        }}
      >
        <i className="fa-solid fa-star"></i>
      </div>
      <div
        className={starRating >= 4 ? "filled" : "empty"}
        onMouseEnter={() => {
          if (!disabled) setStarRating(4);
        }}
        onMouseLeave={() => {
          if (!disabled) setStarRating(rating);
        }}
        onClick={() => {
          if (!disabled) onChange(4);
        }}
      >
        <i className="fa-solid fa-star"></i>
      </div>
      <div
        className={starRating >= 5 ? "filled" : "empty"}
        onMouseEnter={() => {
          if (!disabled) setStarRating(5);
        }}
        onMouseLeave={() => {
          if (!disabled) setStarRating(rating);
        }}
        onClick={() => {
          if (!disabled) onChange(5);
        }}
      >
        <i className="fa-solid fa-star"></i>
      </div>
      {/* <i className="fa-regular fa-star"></i> */}
      <button>Submit Review</button>
    </form>
  );

  return (
    <>
      {currentSessionUser !== currentSpotOwner ? (
        <button
          onClick={() => {
            setModalContent(PostReviewModalContent);
          }}
          type="submit"
        >
          Post Your Review
        </button>
      ) : (
        ""
      )}
    </>
  );
}

export default NewReviewModal;
