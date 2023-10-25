import React, { useState, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createNewReviewThunk, getAllReviewsThunk } from "../../store/reviews";
import "./CreateReview.css";
import { getSingleSpotThunk } from "../../store/spots";

export default function PostReviewModalContent({ spot }) {
  console.log(
    "🚀 ~ file: ReviewForm.js:10 ~ PostReviewModalContent ~ spot:",
    spot
  );
  const dispatch = useDispatch();
  // const history = useHistory();
  const [validationErrors, setValidationErrors] = useState({});
  const [description, setDescription] = useState("");
  const [starRating, setStarRating] = useState(0);
  const [hoverStarRating, setHoverStarRating] = useState();
  const [submit, setSubmit] = useState(false);

  const { closeModal } = useModal();
  const { setModalContent, setOnModalClose } = useModal();
  const currentSessionUser = useSelector((state) => state.session.user);

  // hide review button if current session user matches current spot owner

  //! error handling useEffect
  useEffect(() => {
    let errorsObject = {};
    if (description.length < 10 || !description)
      errorsObject.description =
        "Please enter a minimum of 10 characters for your review";
    // if an error exists, state will update with error property in the errorsObject
    if (!starRating)
      errorsObject.starRating = "Please enter a valid star rating";
    setValidationErrors(errorsObject);
  }, [description, starRating]);

  // console.log("🚀 ~ file: ReviewForm.js:45 ~ handleSubmit ~ spotId:", spotId);
  //! prevent entire page reload
  const handleSubmit = async (event) => {
    if (!spot.id) return null;
    // prevent page from refreshing on form submission via submit button
    event.preventDefault();
    setSubmit(true);

    const newReviewOnSubmit = {
      // names taken from backend
      userId: currentSessionUser.id,
      spotId: spot.id,
      review: description,
      stars: starRating,
    };
    if (Object.keys(validationErrors).length === 0) {
      await dispatch(createNewReviewThunk(newReviewOnSubmit, spot.id));

      // dispatch(getSingleSpotThunk(spotId));
      // dispatch(getAllReviewsThunk(spotId));
      // history.push(`/spots/${res.id}/reviews`);

      closeModal();
      setSubmit(false);
      return null;
    }
  };

  // console.log("star rating*****", starRating);
  //! post new review content (description & star rating)
  const displayStarRating = hoverStarRating ? hoverStarRating : starRating;
  return (
    <form onSubmit={handleSubmit}>
      <h1>How was your stay?</h1>
      <textarea
        placeholder="Leave your review here..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}></textarea>
      <p>{submit && validationErrors.description}</p>
      <div id="stars-box">
        <div id="stars">
          <i
            className={
              displayStarRating >= 1 ? "fa-solid fa-star" : "fa-regular fa-star"
            }
            onMouseEnter={() => setHoverStarRating(1)}
            onMouseLeave={() => setHoverStarRating(0)}
            onClick={() => setStarRating(1)}></i>
          <i
            className={
              displayStarRating >= 2 ? "fa-solid fa-star" : "fa-regular fa-star"
            }
            onMouseEnter={() => setHoverStarRating(2)}
            onMouseLeave={() => setHoverStarRating(0)}
            onClick={() => setStarRating(2)}></i>
          <i
            className={
              displayStarRating >= 3 ? "fa-solid fa-star" : "fa-regular fa-star"
            }
            onMouseEnter={() => setHoverStarRating(3)}
            onMouseLeave={() => setHoverStarRating(0)}
            onClick={() => setStarRating(3)}></i>
          <i
            className={
              displayStarRating >= 4 ? "fa-solid fa-star" : "fa-regular fa-star"
            }
            onMouseEnter={() => setHoverStarRating(4)}
            onMouseLeave={() => setHoverStarRating(0)}
            onClick={() => setStarRating(4)}></i>
          <i
            className={
              displayStarRating >= 5 ? "fa-solid fa-star" : "fa-regular fa-star"
            }
            onMouseEnter={() => setHoverStarRating(5)}
            onMouseLeave={() => setHoverStarRating(0)}
            onClick={() => setStarRating(5)}></i>
        </div>
        <div id="stars2">
          <h3>Stars</h3>
        </div>
      </div>
      <p>{submit && validationErrors.starRating}</p>
      <button
        type="submit"
        disabled={!starRating || !description || description.length < 10}
        onClick={handleSubmit}>
        Submit Review
      </button>

      {/* <button
        id={
          !starRating || !description || description.length < 10
            ? "disabled-review-submit"
            : "enabled-review-submit"
        }
        disabled={!starRating || !description || description.length < 10}
        // className="submit-review-button"
        type="submit"
        onClick={handleSubmit}>
        Submit Review
      </button> */}
    </form>
  );
}
