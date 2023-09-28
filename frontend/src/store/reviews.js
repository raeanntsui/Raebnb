import { csrfFetch } from "./csrf";

//? GET_ALL_REVIEWS action constant
const GET_ALL_REVIEWS = "spots/getAllReviews";

//? getAllReviews action creator
const getAllReviewsActionCreator = (reviews) => {
  return {
    type: GET_ALL_REVIEWS,
    reviews,
  };
};

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

const initialState = {
  allReviews: {},
};

const reviewsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_REVIEWS:
      newState = { ...state, allReviews: {} };
      action.reviews.Reviews.forEach((review) => {
        newState.allReviews[review.id] = review;
      });
      return newState;
    default:
      return state;
  }
};

export default reviewsReducer;