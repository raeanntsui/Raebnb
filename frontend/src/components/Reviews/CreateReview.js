import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import PostReviewModalContent from "./ReviewForm";
import "./CreateReview.css";
import { getAllReviewsThunk } from "../../store/reviews";
import DeleteReview from "../DeleteReview/DeleteReview";
import OpenModalButton from "../OpenModalButton";

function NewReviewModal({ spot }) {
  const dispatch = useDispatch();
  const { setModalContent, setOnModalClose } = useModal();
  // console.log("spot kasjdlakjdsakldja", spot);
  //! current session user
  const currentSessionUser = useSelector((state) => state.session.user);
  // console.log("currentSessionUser (session.user)", currentSessionUser);

  //! current spot's details
  const currentSpotDetails = useSelector((state) => state.spots.singleSpot);

  //! current spot's owner
  const currentSpotOwner = useSelector(
    (state) => state.spots.singleSpot.ownerId
  );

  //! current spot's reviews (in entirety)
  const currentSpotReviews = useSelector((state) => state.reviews.spot);

  //? convert current spot's reviews from object form to array form
  const currentSpotReviewsArray = Object.values(currentSpotReviews);

  // do stuff after component loads/re-render
  useEffect(() => {
    dispatch(getAllReviewsThunk(spot.id));
  }, [dispatch, spot]);

  if (!currentSpotReviewsArray) return null;
  if (!currentSessionUser) return null;

  let filteredReview = currentSpotReviewsArray.find(
    (review) => currentSessionUser.id === review.userId
  );

  return (
    <>
      <div>
        {currentSessionUser?.id !== currentSpotDetails?.Owner?.id &&
        currentSpotReviewsArray.length === 0 ? (
          <div>
            <button
              id="post-review"
              onClick={() => {
                setModalContent(<PostReviewModalContent spot={spot} />);
              }}
              type="submit">
              Post Your Review
            </button>
            <h2>Be the first the post a review!</h2>
          </div>
        ) : null}
      </div>
      <div>
        {currentSessionUser.id === filteredReview?.userId ? (
          <OpenModalButton
            buttonText="Delete Review"
            modalComponent={
              <DeleteReview review={filteredReview} spot={spot} />
            }
          />
        ) : null}
      </div>
    </>
  );
}

export default NewReviewModal;
