import { csrfFetch } from "./csrf";

//! 1. action constant
//? GET_ALL_SPOTS action constant
const GET_ALL_SPOTS = "spots/getAllSpots";
//? GET_A_SPOT action constant
const GET_SINGLE_SPOT = "spots/getSingleSpot";
//? GET_ALL_REVIEWS action constant
const GET_ALL_REVIEWS = "spots/getAllReviews";

//! 2. action creator
//? getAllSpots action creator
// action creator: create & return action objects that describe events/changes that occurred in the application
const getAllSpotsActionCreator = (spots) => {
  return {
    type: GET_ALL_SPOTS,
    spots,
  };
};
//? getSingleSpot action creator
const getSingleSpotActionCreator = (spot) => {
  return {
    type: GET_SINGLE_SPOT,
    spot,
  };
};
//? getAllReviews action creator
const getAllReviewsActionCreator = (reviews) => {
  return {
    type: GET_ALL_REVIEWS,
    reviews,
  };
};

//! 3. Thunks
//? getAllSpots thunk
// make network requests
export const getAllSpotsThunk = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots");
  if (res.ok) {
    // parse res.body as JSON
    const spots = await res.json();
    // dispatch redux action with the fetched spots data
    dispatch(getAllSpotsActionCreator(spots));
    // return the res object
    return res;
  }
};
//? getSingleSpot thunk
export const getSingleSpotThunk = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`);
  if (res.ok) {
    const spot = await res.json();
    // console.log("spotId****** ", spotId);
    dispatch(getSingleSpotActionCreator(spot));
    return res;
  }
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

// 4. what is the initial state of the app?
const initialState = {
  allSpots: {},
  singleSpot: {},
  allReviews: {},
};

// 5. spots reducer
// state = current state of app
// action = action that has occurred
const spotsDetailsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_SPOTS:
      // { ... state } : copies the properties + values of the current state into newState
      // { ..., allSpots: {} } : appending new property + values "allSpots" to the newState
      // create a shallow copy (...state + allSpots) for newState
      newState = { ...state, allSpots: {} };
      //   console.log("allSpots", allSpots);
      // loop through each spot in the spots array and add to the newState, the key = id
      action.spots.Spots.forEach((spot) => {
        // console.log("spot", spot);
        // console.log("spot.id", spot.id);
        newState.allSpots[spot.id] = spot;
      });
      return newState;
    case GET_SINGLE_SPOT:
      newState = { ...state, singleSpot: action.spot };
      return newState;
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

export default spotsDetailsReducer;
