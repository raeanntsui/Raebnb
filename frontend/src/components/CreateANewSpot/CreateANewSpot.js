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
    if (!price) errorsObject.price = "Price is required";
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

    // newSpot that will be made
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
      console.log("response*******", res);
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
      <h1>Create a new Spot</h1>
      <form onSubmit={handleSubmit}>
        <div id="titles">
          <h2>Where's your place located?</h2>
          <h3>
            Guests will only get your exact address once they booked a
            reservation.
          </h3>
        </div>
        <div className="inputs">
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
            <p>{validationErrors.country}</p>
          )}
          <label>
            Street Address
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Street Address"
            ></input>
          </label>
          {submit && validationErrors.address && (
            <p>{validationErrors.address}</p>
          )}
          <div id="city-state">
            <label>
              City
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
              ></input>
            </label>
            {submit && validationErrors.city && <p>{validationErrors.city}</p>}
            <label>
              State
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="State"
              ></input>
            </label>
            {submit && validationErrors.state && (
              <p>{validationErrors.state}</p>
            )}
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
            value={description}
            placeholder="Please write at least 30 characters"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        {submit && validationErrors.description && (
          <p>{validationErrors.description}</p>
        )}
        <div className="titles">
          <h2>Create a title for your spot</h2>
          <h3>
            Catch guests' attention with a spot title that highlights what makes
            your place special.
          </h3>
        </div>
        <div className="inputs">
          <input
            type="text"
            value={title}
            placeholder="Name of your spot"
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        {submit && validationErrors.title && <p>{validationErrors.title}</p>}
        <div className="titles">
          <h2>Set a base price for your spot</h2>
          <h3>
            Competitive pricing can help your listing stand out and rank higher
            in search results
          </h3>
        </div>
        <div className="inputs">
          <input
            type="number"
            value={price}
            placeholder="Price per night (USD)"
            onChange={(e) => setPrice(e.target.value)}
          ></input>
        </div>
        {submit && validationErrors.price && <p>{validationErrors.price}</p>}
        <div className="titles">
          <h2>Liven up your spot with photos</h2>
          <h3>Submit a link to at least one photo to publish your spot.</h3>
        </div>
        <div className="inputs">
          <input
            type="text"
            value={previewImage}
            placeholder="Preview Image URL"
            onChange={(e) => setPreviewImage(e.target.value)}
          ></input>
          {submit && validationErrors.previewImage && (
            <p>{validationErrors.previewImage}</p>
          )}
          <input
            type="text"
            value={firstImageURL}
            placeholder="Image URL"
            onChange={(e) => setFirstImageURL(e.target.value)}
          ></input>
          {submit && validationErrors.firstImageURL && (
            <p>{validationErrors.firstImageURL}</p>
          )}
          <input
            type="text"
            value={secondImageURL}
            placeholder="Image URL"
            onChange={(e) => setSecondImageURL(e.target.value)}
          ></input>
          {submit && validationErrors.secondImageURL && (
            <p>{validationErrors.secondImageURL}</p>
          )}
          <input
            type="text"
            value={thirdImageURL}
            placeholder="Image URL"
            onChange={(e) => setThirdImageURL(e.target.value)}
          ></input>
          {submit && validationErrors.thirdImageURL && (
            <p>{validationErrors.thirdImageURL}</p>
          )}
          <input
            type="text"
            value={fourthImageURL}
            placeholder="Image URL"
            onChange={(e) => setFourthImageURL(e.target.value)}
          ></input>
          {submit && validationErrors.fourthImageURL && (
            <p>{validationErrors.fourthImageURL}</p>
          )}
        </div>
        <button type="submit">Create Spot</button>
      </form>
    </div>
  );
}

export default NewSpot;
