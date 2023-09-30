import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";

// import { createNewSpotThunk, createImageThunk } from "../../store/spots";
import "./CreateReview.css";

function NewReviewModal() {
  const dispatch = useDispatch();
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState("");
  const { closeModal } = useModal();
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!review || review.length < 10) errors.review = "Enter";
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Test</h1>
        <label>How was your stay?</label>
        <input placeholder="Leave your review here"></input>
      </form>
      <button type="submit">Post Review</button>;
    </>
  );
}

export default NewReviewModal;
