import { csrfFetch } from "./csrf";

//******************! 1. action constant
//? GET_ALL_SPOTS action constant
const GET_ALL_SPOTS = "spots/getAllSpots";
//? GET_A_SPOT action constant
const GET_SINGLE_SPOT = "spots/getSingleSpot";
//? CREATE_NEW_SPOT action constant
const CREATE_NEW_SPOT = "spots/createNewSpot";
// ? CREATE_NEW_IMAGE action constant
const CREATE_NEW_IMAGE = "/spots/createNewImage";

//******************! 2. action creator: updates store
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

//? createNewImage action creator
const createNewImageActionCreator = (newImage) => {
  return {
    type: CREATE_NEW_IMAGE,
    newImage,
  };
};

//******************! 3. Thunks
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
  // console.log("before csrfFetch");
  let res;
  try {
    res = await csrfFetch("/api/spots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(spot),
    });
    const newSpot = await res.json();
    dispatch(createNewSpotActionCreator(newSpot));
    return newSpot;
  } catch (e) {
    // console.log("ERROR (e) ****", e);
    return await e.json();
  }
};

//? createImageThunk
export const createImageThunk = (url, preview, spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, preview }),
  });
  // console.log("res for images", res);
  if (res.ok) {
    const newImage = await res.json();
    // console.log("res for new images", newImage);
    dispatch(createNewImageActionCreator(newImage));
    return newImage;
  } else {
    const error = await res.json();
    return error;
  }
};

// 4. what is the initial state of the app?
const initialState = {
  allSpots: {},
  singleSpot: {},
  // user: {},
};

// 5. spots reducer
// state = current state of app
// action = action that has occurred
const spotsDetailsReducer = (state = initialState, action) => {
  let newState;
  const newSpots = { ...state.allSpots };
  switch (action.type) {
    case GET_ALL_SPOTS:
      newState = { ...state, allSpots: {} };
      action.spots.Spots.forEach((spot) => {
        newState.allSpots[spot.id] = spot;
      });
      return newState;
    case GET_SINGLE_SPOT:
      newState = { ...state, singleSpot: action.spot };
      return newState;
    case CREATE_NEW_SPOT:
      return {
        ...state,
        singleSpot: action.spot,
        allSpots: newSpots,
      };
    default:
      return state;
  }
};

export default spotsDetailsReducer;
