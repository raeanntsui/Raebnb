import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createNewSpotThunk, createImageThunk } from "../../store/spots";
import "./CreateANewSpot.css";

function NewSpot() {
  const [validationErrors, setValidationErrors] = useState({});

  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [firstImageURL, setFirstImageURL] = useState("");
  const [secondImageURL, setSecondImageURL] = useState("");
  const [thirdImageURL, setThirdImageURL] = useState("");
  const [fourthImageURL, setFourthImageURL] = useState("");
  const [submit, setSubmit] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

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
    if (title.length > 50)
      errorsObject.title = "Name must be under 50 characters long";
    if (!price) errorsObject.price = "Price is required";
    if (price && price < 1)
      errorsObject.price = "Price must be greater than $0 a night!";
    if (price && price > 999999)
      errorsObject.price = "Price must less than $999,999 a night!";

    if (!previewImage) errorsObject.previewImage = "Preview image is required";
    if (
      previewImage &&
      !previewImage.endsWith(".jpg") &&
      !previewImage.endsWith(".jpeg") &&
      !previewImage.endsWith(".png")
    )
      errorsObject.previewImage =
        "Preview image must end in .png, .jpg, or .jpeg";

    // image 1
    if (
      firstImageURL &&
      !firstImageURL.endsWith(".jpg") &&
      !firstImageURL.endsWith(".jpeg") &&
      !firstImageURL.endsWith(".png")
    )
      errorsObject.firstImageURL = "Image URL must end in .png, .jpg, or .jpeg";

    // image 2
    if (
      secondImageURL &&
      !secondImageURL.endsWith(".jpg") &&
      !secondImageURL.endsWith(".jpeg") &&
      !secondImageURL.endsWith(".png")
    )
      errorsObject.secondImageURL =
        "Image URL must end in .png, .jpg, or .jpeg";

    // image 3
    if (
      thirdImageURL &&
      !thirdImageURL.endsWith(".jpg") &&
      !thirdImageURL.endsWith(".jpeg") &&
      !thirdImageURL.endsWith(".png")
    )
      errorsObject.thirdImageURL = "Image URL must end in .png, .jpg, or .jpeg";

    // image 4
    if (
      fourthImageURL &&
      !fourthImageURL.endsWith(".jpg") &&
      !fourthImageURL.endsWith(".jpeg") &&
      !fourthImageURL.endsWith(".png")
    )
      errorsObject.fourthImageURL =
        "Image URL must end in .png, .jpg, or .jpeg";

    // if an error exists, state will update with error property in the errorsObject
    setValidationErrors(errorsObject);
  }, [
    country,
    address,
    city,
    state,
    description,
    title,
    price,
    previewImage,
    firstImageURL,
    secondImageURL,
    thirdImageURL,
    fourthImageURL,
  ]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmit(true);

    const newSpotOnSubmit = {
      country,
      address,
      city,
      state,
      description,
      name: title,
      price,
      previewImage,
      firstImageURL,
      secondImageURL,
      thirdImageURL,
      fourthImageURL,
      lat: 90,
      lng: 90,
    };

    if (Object.keys(validationErrors).length === 0) {
      const res = await dispatch(createNewSpotThunk(newSpotOnSubmit));
      if (!res.errors) {
        //TODO
        await dispatch(createImageThunk(previewImage, true, res.id));
        await dispatch(createImageThunk(firstImageURL, false, res.id));
        await dispatch(createImageThunk(secondImageURL, false, res.id));
        await dispatch(createImageThunk(thirdImageURL, false, res.id));
        await dispatch(createImageThunk(fourthImageURL, false, res.id));
        history.push(`/spots/${res.id}`);
      }

      setSubmit(false);
    }
  };
  return (
    <div id="form-container">
      <h1 id="h1-create-new-spot">Create a new Spot</h1>
      <form id="create-form" onSubmit={handleSubmit}>
        <div className="titles">
          <h7>Where's your place located?</h7>
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
          <div id="inputs-information">
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
          <h7>Describe your place to guests.</h7>
          <h3>
            Mention the best features of your space, any special amenities like
            fast wifi or parking, and what you love about the neighborhood.
          </h3>
        </div>
        <div className="inputs">
          <div id="inputs-information">
            <textarea
              className="textarea-box"
              value={description}
              placeholder="Please write at least 30 characters"
              onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
          {submit && validationErrors.description && (
            <p id="p-error">{validationErrors.description}</p>
          )}
        </div>

        <div className="titles">
          <h7>Create a title for your spot</h7>
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
          <h7>Set a base price for your spot</h7>
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

        <div className="titles">
          <h7>Liven up your spot with photos</h7>
          <h3>Submit a link to at least one photo to publish your spot.</h3>
        </div>
        <div className="inputs">
          <div id="inputs-information">
            <input
              type="text"
              value={previewImage}
              placeholder="Preview Image URL"
              onChange={(e) => setPreviewImage(e.target.value)}></input>
            {submit && validationErrors.previewImage && (
              <p id="p-error">{validationErrors.previewImage}</p>
            )}
          </div>
          <div id="inputs-information">
            {" "}
            <input
              type="text"
              value={firstImageURL}
              placeholder="Image URL"
              onChange={(e) => setFirstImageURL(e.target.value)}></input>
            {submit && validationErrors.firstImageURL && (
              <p id="p-error">{validationErrors.firstImageURL}</p>
            )}
          </div>
          <div id="inputs-information">
            <input
              type="text"
              value={secondImageURL}
              placeholder="Image URL"
              onChange={(e) => setSecondImageURL(e.target.value)}></input>
            {submit && validationErrors.secondImageURL && (
              <p id="p-error">{validationErrors.secondImageURL}</p>
            )}
          </div>
          <div id="inputs-information">
            {" "}
            <input
              type="text"
              value={thirdImageURL}
              placeholder="Image URL"
              onChange={(e) => setThirdImageURL(e.target.value)}></input>
            {submit && validationErrors.thirdImageURL && (
              <p id="p-error">{validationErrors.thirdImageURL}</p>
            )}
          </div>
          <div id="inputs-information">
            <input
              type="text"
              value={fourthImageURL}
              placeholder="Image URL"
              onChange={(e) => setFourthImageURL(e.target.value)}></input>
            {submit && validationErrors.fourthImageURL && (
              <p id="p-error">{validationErrors.fourthImageURL}</p>
            )}
          </div>
        </div>
        <div id="create-spot-button-div">
          <button id="create-spot-button" type="submit">
            Create Spot
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewSpot;
