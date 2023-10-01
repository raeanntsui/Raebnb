import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReviewThunk } from "../../store/reviews";
import "./DeleteReview.css";

function DeleteReview({ review, spot }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const [exists, setExists] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("review", review);
    dispatch(deleteReviewThunk(review, spot));
    setExists(false);
    closeModal();
  };

  const doNotDeleteAndCloseModal = (event) => {
    event.preventDefault();
    closeModal();
  };

  console.log("review ****", review);

  return (
    <>
      {exists && (
        <div>
          <h1>Confirm Delete</h1>
          <h2>Are you sure you want to delete this review?</h2>
          <button onClick={handleSubmit}>Yes (Delete Spot)</button>
          <button onClick={doNotDeleteAndCloseModal}>No (Keep Spot)</button>
        </div>
      )}
    </>
  );
}

export default DeleteReview;
