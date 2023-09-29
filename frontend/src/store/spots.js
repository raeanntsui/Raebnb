import { csrfFetch } from "./csrf";

//! 1. action constant
//? GET_ALL_SPOTS action constant
const GET_ALL_SPOTS = "spots/getAllSpots";
//? GET_A_SPOT action constant
const GET_SINGLE_SPOT = "spots/getSingleSpot";
//? CREATE_NEW_SPOT action constant
const CREATE_NEW_SPOT = "spots/createNewSpot";

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
//? const createNewSpot
const createNewSpotActionCreator = (newSpot) => {
  return {
    type: CREATE_NEW_SPOT,
    newSpot,
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
//? createNewSpotThunk
export const createNewSpotThunk = (spot) => async (dispatch) => {
  const res = await csrfFetch("/api/spots", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spot),
  });

  if (res.ok) {
    const newSpot = await res.json();
    dispatch(createNewSpotActionCreator(newSpot));
    return newSpot;
  } else {
    // not sure if this line is necessary : refer to articleReducer in react example
    const error = await res.json();
    return error;
  }
};

// 4. what is the initial state of the app?
const initialState = {
  allSpots: {},
  singleSpot: {},
  // newSpot: {},
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
        console.log("spot", spot);
        console.log("spot.id", spot.id);
        // console.log("Spots *** ", Spots);
        newState.allSpots[spot.id] = spot;
      });
      return newState;
    case GET_SINGLE_SPOT:
      newState = { ...state, singleSpot: action.spot };
      return newState;
    case CREATE_NEW_SPOT:
      return {
        ...state,
        [action.spots.newSpot.id]: action.newSpot,
      };
    // newState = { ...state, newSpot: action.newSpot };
    // newState = { ...state, allSpots: { ...state.allSpots } };
    // newState.allSpots[action.spot.id] = action.spot;
    // return newState;
    default:
      return state;
  }
};

export default spotsDetailsReducer;
