import { csrfFetch } from "./csrf";
import { getSingleSpotThunk } from "./spots";

//! ****************** REVIEW ACTION CONSTANTS
const GET_ALL_REVIEWS = "spots/getAllReviews";
const CREATE_NEW_REVIEW = "spots/createNewReview";
const DELETE_REVIEW = "/spots/deleteReview";

//! ****************** REVIEW ACTION CREATORS
const getAllReviewsActionCreator = (reviews) => {
  return {
    type: GET_ALL_REVIEWS,
    reviews,
  };
};

const createNewReviewActionCreator = (review) => {
  return {
    type: CREATE_NEW_REVIEW,
    review,
  };
};

const deleteReviewActionCreator = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    reviewId,
  };
};

//! ****************** REVIEW THUNKS
export const getAllReviewsThunk = (spotId) => async (dispatch) => {
  // retrieve all the reviews at specified spotId
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
  if (res.ok) {
    // parse the json response body showing the reviews from specified spotId
    const reviews = await res.json();
    // dispatch to the redux store that were getting all reviews
    dispatch(getAllReviewsActionCreator(reviews));
    return res;
  }
};
export const createNewReviewThunk = (review, spotId) => async (dispatch) => {
  // console.log("before csrfFetch");
  let res;
  res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  if (res.ok) {
    // console.log("res for new review", res);
    const newReview = await res.json();
    dispatch(createNewReviewActionCreator(review));
    // dispatch(getSingleSpotThunk(review));
    return newReview;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const deleteReviewThunk = (review, spot) => async (dispatch) => {
  let res;
  try {
    res = await csrfFetch(`/api/reviews/${review.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      dispatch(deleteReviewActionCreator(review.id));
    }
  } catch (e) {
    return await e.json();
  }
};

//! ****************** REVIEWS INITIAL STATE
const initialState = {
  spot: {},
  user: {},
};

//! ****************** REVIEWS REDUCER
const reviewsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_REVIEWS:
      newState = { ...state, spot: {} };
      action.reviews.Reviews.forEach((review) => {
        newState.spot[review.id] = review;
      });
      return newState;
    case CREATE_NEW_REVIEW:
      newState = {
        ...state,
        spot: { ...state.spot },
        user: { ...state.user },
      };
      newState.spot[action.review.id] = action.review;
      return newState;
    case DELETE_REVIEW:
      const reviewsObj = { ...state.spot };
      delete reviewsObj[action.reviewId];
      return {
        ...state,
        spot: { ...reviewsObj },
      };
    default:
      return state;
  }
};

export default reviewsReducer;
