import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSpotThunk, getAllSpotsThunk } from "../../store/spots";
import "./DeleteSpot.css";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";

function DeleteSpot({ spot }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpotsThunk(spot.id));
  }, [dispatch, spot]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(deleteSpotThunk(spot.id));

    closeModal();
  };

  const doNotDeleteAndCloseModal = (event) => {
    event.preventDefault();
    closeModal();
  };

  return (
    <>
      <div>
        <h1>Confirm Delete</h1>
        <h2>Are you sure you want to remove this spot from the listings?</h2>
        <button onClick={handleSubmit}>Yes (Delete Spot)</button>
        <button onClick={doNotDeleteAndCloseModal}>No (Keep Spot)</button>
      </div>
    </>
  );
}

export default DeleteSpot;
