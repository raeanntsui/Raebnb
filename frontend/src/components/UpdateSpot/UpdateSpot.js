import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateSpotThunk, getSingleSpotThunk } from "../../store/spots";
import "./UpdateSpot.css";

function UpdateSpot() {
  const currentSpot = useSelector((state) => state.spots.singleSpot);
  // console.log(
  //   "🚀 ~ file: UpdateSpot.js:9 ~ UpdateSpot ~ currentSpot:",
  //   currentSpot
  // );

  const { spotId } = useParams();
  const [validationErrors, setValidationErrors] = useState({});

  const [country, setCountry] = useState(currentSpot.country);
  const [address, setAddress] = useState(currentSpot.address);
  const [city, setCity] = useState(currentSpot.city);
  const [state, setState] = useState(currentSpot.state);
  const [description, setDescription] = useState(currentSpot.description);
  const [title, setTitle] = useState(currentSpot.title);
  const [price, setPrice] = useState(currentSpot.price);
  const [submit, setSubmit] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  // runs after component loads
  useEffect(() => {
    let errorsObject = {};
    if (!country) errorsObject.country = "Country is required";
    if (!address) errorsObject.address = "Street address is required";
    if (!city) errorsObject.city = "City is required";
    if (!state) errorsObject.state = "State is required";
    if (!description) errorsObject.description = "Description is required";
    if (description && description.length < 30)
      errorsObject.description = "Description needs a minimum of 30 characters";
    if (!title) errorsObject.title = "Name is required";
    if (title && title.length > 50)
      errorsObject.title = "Name must be under 50 characters long";
    if (!price) errorsObject.price = "Price is required";
    if (price && price < 1)
      errorsObject.price = "Price must be greater than $0 a night!";

    // if an error exists, state will update with error property in the errorsObject
    setValidationErrors(errorsObject);
  }, [country, address, city, state, description, title, price]);

  useEffect(() => {
    dispatch(getSingleSpotThunk(spotId));
  }, [dispatch, spotId]);

  useEffect(() => {
    setCountry(currentSpot.country || "");
    setAddress(currentSpot.address || "");
    setCity(currentSpot.city || "");
    setState(currentSpot.state || "");
    setDescription(currentSpot.description || "");
    setTitle(currentSpot.name || "");
    setPrice(currentSpot.price || "");
  }, [currentSpot]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmit(true);

    // newSpot that will be made
    const newSpotOnSubmit = {
      id: currentSpot.id,
      country,
      address,
      city,
      state,
      description,
      name: title,
      price,
      lat: 90,
      lng: 90,
    };

    if (Object.keys(validationErrors).length === 0) {
      const res = await dispatch(updateSpotThunk(newSpotOnSubmit));
      history.push(`/spots/${res.id}`);

      setSubmit(false);
    }
  };
  return (
    <div id="form-container">
      <h1>Update your Spot</h1>
      <form id="create-form" onSubmit={handleSubmit}>
        <div className="titles">
          <h2>Where's your place located?</h2>
          <h3>
            Guests will only get your exact address once they booked a
            reservation.
          </h3>
        </div>
        <div className="inputs">
          <div id="inputs-information">
            <label>
              Country
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
              />
            </label>
            {submit && validationErrors.country && (
              <p id="p-error">{validationErrors.country}</p>
            )}
          </div>
          <div className="titles">
            <label>
              Street Address
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street Address"></input>
            </label>
            {submit && validationErrors.address && (
              <p id="p-error">{validationErrors.address}</p>
            )}
          </div>
          <div id="city-state">
            <div id="city-state-inputs-information">
              <label>
                City
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"></input>
              </label>
              {submit && validationErrors.city && (
                <p id="p-error">{validationErrors.city}</p>
              )}
            </div>
            <div id="city-state-inputs-information">
              <label>
                State
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="State"></input>
              </label>
              {submit && validationErrors.state && (
                <p id="p-error">{validationErrors.state}</p>
              )}
            </div>
          </div>
        </div>

        <div className="titles">
          <h2>Describe your place to guests.</h2>
          <h3>
            Mention the best features of your space, any special amenities like
            fast wifi or parking, and what you love about the neighborhood.
          </h3>
        </div>
        <div className="inputs">
          <textarea
            className="textarea-box"
            value={description}
            placeholder="Please write at least 30 characters"
            onChange={(e) => setDescription(e.target.value)}></textarea>
          {submit && validationErrors.description && (
            <p id="p-error">{validationErrors.description}</p>
          )}
        </div>

        <div className="titles">
          <h2>Create a title for your spot</h2>
          <h3>
            Catch guests' attention with a spot title that highlights what makes
            your place special.
          </h3>
        </div>
        <div className="inputs">
          <div id="inputs-information">
            <input
              type="text"
              value={title}
              placeholder="Name of your spot"
              onChange={(e) => setTitle(e.target.value)}></input>
          </div>
          {submit && validationErrors.title && (
            <p id="p-error">{validationErrors.title}</p>
          )}
        </div>

        <div className="titles">
          <h2>Set a base price for your spot</h2>
          <h3>
            Competitive pricing can help your listing stand out and rank higher
            in search results
          </h3>
        </div>
        <div className="inputs">
          <div id="inputs-information">
            <input
              type="number"
              value={price}
              placeholder="Price per night (USD)"
              onChange={(e) => setPrice(e.target.value)}></input>
          </div>
          {submit && validationErrors.price && (
            <p id="p-error">{validationErrors.price}</p>
          )}
        </div>
        <div id="update-spot-button-div">
          <button id="update-spot-button" type="submit">
            Update your Spot
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateSpot;
