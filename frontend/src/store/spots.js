import { csrfFetch } from "./csrf";

// 1. action constant
const GET_ALL_SPOTS = "spots/getAllSpots";

// 2. action creator getAllSpots
// action creator: create & return action objects that describe events/changes that occurred in the application
const getAllSpotsActionCreator = (spots) => {
  return {
    type: GET_ALL_SPOTS,
    spots,
  };
};

// 3. getAllSpots Thunk
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

// 4. what is the initial state of the app?
const initialState = {
  allSpots: {},
};

// 5. spots reducer
// state = current state of app
// action = action that has occurred
const spotsReducer = (state = initialState, action) => {
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
        newState.allSpots[spot.id] = spot;
      });
      return newState;
    default:
      return state;
  }
};

export default spotsReducer;
