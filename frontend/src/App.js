// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import ShowAllSpots from "./components/GetAllSpots/GetAllSpots";
import ShowSingleSpotDetails from "./components/GetSingleSpot/GetSingleSpot";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <ShowAllSpots />
          </Route>
          <Route exact path="/spots/:spotId">
            <ShowSingleSpotDetails />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
