import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteSpotThunk } from "../../store/spots";
import "./DeleteSpot.css";
import { useModal } from "../../context/Modal";

function DeleteSpot({ spot }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const [exists, setExists] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(deleteSpotThunk(spot.id));
    setExists(false);
    closeModal();
  };

  const doNotDeleteAndCloseModal = (event) => {
    event.preventDefault();
    closeModal();
  };

  return (
    <>
      {exists && (
        <div>
          <h1>Confirm Delete</h1>
          <h2>Are you sure you want to remove this spot from the listings?</h2>
          <button onClick={handleSubmit}>Yes (Delete Spot)</button>
          <button onClick={doNotDeleteAndCloseModal}>No (Keep Spot)</button>
        </div>
      )}
    </>
  );
}

export default DeleteSpot;
