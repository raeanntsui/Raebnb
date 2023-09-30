import { csrfFetch } from "./csrf";

//! ****************** REVIEW ACTION CONSTANTS
//? GET_ALL_REVIEWS action constant
const GET_ALL_REVIEWS = "spots/getAllReviews";
//? create new review action constant
const CREATE_NEW_REVIEW = "spots/createNewReview";

//! ****************** REVIEW ACTION CREATORS
//? getAllReviews action creator
const getAllReviewsActionCreator = (reviews) => {
  return {
    type: GET_ALL_REVIEWS,
    reviews,
  };
};

//? create new review action creator
const createNewReviewActionCreator = (review) => {
  return {
    type: CREATE_NEW_REVIEW,
    review,
  };
};

//! ****************** REVIEW THUNKS
//? getAllReviews thunk
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
//? create new review thunk
export const createNewReviewThunk = (review, spotId) => async (dispatch) => {
  console.log("before csrfFetch");
  let res;
  try {
    res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    });
    console.log("res for new review", res);
    const newReview = await res.json();
    dispatch(createNewReviewActionCreator(newReview));
    return newReview;
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
      newState = { ...state, spot: {}, user: {} };
      action.reviews.Reviews.forEach((review) => {
        newState.spot[review.id] = review;
      });
      return newState;
    case CREATE_NEW_REVIEW:
      newState = {
        ...state,
        // user: action.user,
        // spot: action.spot
        spot: { ...state.spot },
        user: { ...state.user },
      };
      newState.spot[action.newReview.id] = action.newReview;
    default:
      return state;
  }
};

export default reviewsReducer;
