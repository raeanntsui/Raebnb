import React, { useState, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createNewReviewThunk, getAllReviewsThunk } from "../../store/reviews";
import "./CreateReview.css";
import { getSingleSpotThunk } from "../../store/spots";

export default function PostReviewModalContent({ spotId }) {
  const dispatch = useDispatch();
  // const history = useHistory();
  const [validationErrors, setValidationErrors] = useState({});
  const [description, setDescription] = useState("");
  const [starRating, setStarRating] = useState(0);
  const [hoverStarRating, setHoverStarRating] = useState();
  const [submit, setSubmit] = useState(false);

  const { closeModal } = useModal();
  const { setModalContent, setOnModalClose } = useModal();

  // hide review button if current session user matches current spot owner

  //! error handling useEffect
  useEffect(() => {
    let errorsObject = {};
    if (description.length < 10 || !description)
      errorsObject.description =
        "Please enter a minimum of 10 characters for your review";
    // if an error exists, state will update with error property in the errorsObject
    setValidationErrors(errorsObject);
  }, [description]);

  //! prevent entire page reload
  const handleSubmit = async (event) => {
    // prevent page from refreshing on form submission via submit button
    event.preventDefault();
    setSubmit(true);

    const newReviewOnSubmit = {
      // names taken from backend
      review: description,
      stars: starRating,
    };

    if (Object.keys(validationErrors).length === 0) {
      await dispatch(createNewReviewThunk(newReviewOnSubmit, spotId));
      //   await dispatch(getSingleSpotThunk(spotId));
      await dispatch(getAllReviewsThunk(spotId));
      // history.push(`/spots/${res.id}/reviews`);
      closeModal();
      setSubmit(false);
    }
  };

  console.log("star rating*****", starRating);
  //! post new review content (description & star rating)
  const displayStarRating = hoverStarRating ? hoverStarRating : starRating;
  return (
    <form onSubmit={handleSubmit}>
      <h1>How was your stay?</h1>
      <textarea
        placeholder="Leave your review here"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <p>{submit && validationErrors.description}</p>
      <div id="stars">
        <i
          className={
            displayStarRating >= 1 ? "fa-solid fa-star" : "fa-regular fa-star"
          }
          onMouseEnter={() => setHoverStarRating(1)}
          onMouseLeave={() => setHoverStarRating(0)}
          onClick={() => setStarRating(1)}
        ></i>
        <i
          className={
            displayStarRating >= 2 ? "fa-solid fa-star" : "fa-regular fa-star"
          }
          onMouseEnter={() => setHoverStarRating(2)}
          onMouseLeave={() => setHoverStarRating(0)}
          onClick={() => setStarRating(2)}
        ></i>
        <i
          className={
            displayStarRating >= 3 ? "fa-solid fa-star" : "fa-regular fa-star"
          }
          onMouseEnter={() => setHoverStarRating(3)}
          onMouseLeave={() => setHoverStarRating(0)}
          onClick={() => setStarRating(3)}
        ></i>
        <i
          className={
            displayStarRating >= 4 ? "fa-solid fa-star" : "fa-regular fa-star"
          }
          onMouseEnter={() => setHoverStarRating(4)}
          onMouseLeave={() => setHoverStarRating(0)}
          onClick={() => setStarRating(4)}
        ></i>
        <i
          className={
            displayStarRating >= 5 ? "fa-solid fa-star" : "fa-regular fa-star"
          }
          onMouseEnter={() => setHoverStarRating(5)}
          onMouseLeave={() => setHoverStarRating(0)}
          onClick={() => setStarRating(5)}
        ></i>
      </div>
      <button>Submit Review</button>
    </form>
  );
}
