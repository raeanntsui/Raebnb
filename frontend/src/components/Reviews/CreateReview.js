import React, { useState, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";

// import { createNewSpotThunk, createImageThunk } from "../../store/spots";
import "./CreateReview.css";

function NewReviewModal() {
  // const dispatch = useDispatch();
  // const [newReview, setNewReview] = useState("");
  // const [rating, setRating] = useState("");
  // const { closeModal } = useModal();
  // const [errors, setErrors] = useState({});
  const { setModalContent, setOnModalClose } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (!review || review.length < 10) errors.review = "Enter";
  };

  const PostReviewModalContent = () => (
    <form onSubmit={handleSubmit}>
      <h1>How was your stay?</h1>
      <textarea placeholder="Leave your review here"></textarea>
      <div className="rating-input">
        <i className="fa-solid fa-star"></i>
        <i className="fa-regular fa-star"></i>
      </div>
    </form>
  );

  return (
    <>
      <button
        onClick={() => {
          setModalContent(PostReviewModalContent);
        }}
        type="submit"
      >
        Post Your Review
      </button>
    </>
  );
}

export default NewReviewModal;
