import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function NewSpot() {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [errors, setErrors] = useState({});

  const errorsObject = {};
  if (!country) errorsObject.country = "Country is required";
  else {
    errorsObject.country = "";
  }

  if (!address) errorsObject.address = "Street address is required";
  else {
    errorsObject.address = "";
  }
  if (!city) errorsObject.city = "City is required";
  else {
    errorsObject.city = "";
  }
  if (!state) errorsObject.state = "State is required";
  else {
    errorsObject.state = "";
  }
  if (!description) errorsObject.description = "Description is required";
  else {
    errorsObject.description = "";
  }
  if (description && description.length < 30)
    errorsObject.description = "Description needs a minimum of 30 characters";
  else {
    errorsObject.description = "";
  }
  if (!title) errorsObject.title = "Name is required";
  else {
    errorsObject.title = "";
  }
  if (!price) errorsObject.price = "Price is required";
  else {
    errorsObject.price = "";
  }
  if (!previewImage) errorsObject.previewImage = "Preview image is required";
  else {
    errorsObject.previewImage = "";
  }
  if (
    (imageURL && !imageURL.includes(".jpg")) ||
    !imageURL.includes(".jpeg") ||
    !imageURL.includes(".png")
  )
    errorsObject.imageURL = "Image URL must end in .png, .jpg, or .jpeg";
  else {
    errorsObject.imageURL = "";
  }

  return (
    <div>
      <div>
        <h1>Create a new Spot</h1>
        <form>
          <div className="titles">
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
                placeholder="Country"
                onChange={(e) => setCountry(e.target.value)}
              />
            </label>
            {errorsObject.country && <p>{errorsObject.country}</p>}
            <label>
              Street Address
              <input
                type="text"
                placeholder="Street Address"
                onChange={(e) => setAddress(e.target.value)}
              ></input>
            </label>
            {errorsObject.address && <p>{errorsObject.address}</p>}
            <label>
              City
              <input
                type="text"
                placeholder="City"
                onChange={(e) => setCity(e.target.value)}
              ></input>
            </label>
            {errorsObject.city && <p>{errorsObject.city}</p>}
            <label>
              State
              <input
                type="text"
                placeholder="State"
                onChange={(e) => setState(e.target.value)}
              ></input>
            </label>
            {errorsObject.state && <p>{errorsObject.state}</p>}
          </div>

          <div className="titles">
            <h2>Describe your place to guests.</h2>
            <h3>
              Mention the best features of your space, any special amenities
              like fast wifi or parking, and what you love about the
              neighborhood.
            </h3>
          </div>
          <div className="inputs">
            <textarea
              placeholder="Please write at least 30 characters"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          {errorsObject.description && <p>{errorsObject.description}</p>}
          <div className="titles">
            <h2>Create a title for your spot</h2>
            <h3>
              Catch guests' attention with a spot title that highlights what
              makes your place special.
            </h3>
          </div>
          <div className="inputs">
            <input
              type="text"
              placeholder="Name of your spot"
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </div>
          {errorsObject.title && <p>{errorsObject.title}</p>}
          <div className="titles">
            <h2>Set a base price for your spot</h2>
            <h3>
              Competitive pricing can help your listing stand out and rank
              higher in search results
            </h3>
          </div>
          <div className="inputs">
            <input
              type="number"
              placeholder="Price per night (USD)"
              onChange={(e) => setPrice(e.target.value)}
            ></input>
          </div>
          {errorsObject.price && <p>{errorsObject.price}</p>}
          <div className="titles">
            <h2>Liven up your spot with photos</h2>
            <h3>Submit a link to at least one photo to publish your spot.</h3>
          </div>
          <div className="inputs">
            <input
              type="text"
              placeholder="Preview Image URL"
              onChange={(e) => setPreviewImage(e.target.value)}
            ></input>
            {errorsObject.previewImage && <p>{errorsObject.previewImage}</p>}
            <input
              type="text"
              placeholder="Image URL"
              onChange={(e) => setImageURL(e.target.value)}
            ></input>
            {errorsObject.imageURL && <p>{errorsObject.imageURL}</p>}
            <input
              type="text"
              placeholder="Image URL"
              onChange={(e) => setImageURL(e.target.value)}
            ></input>
            <input
              type="text"
              placeholder="Image URL"
              onChange={(e) => setImageURL(e.target.value)}
            ></input>
            <input
              type="text"
              placeholder="Image URL"
              onChange={(e) => setImageURL(e.target.value)}
            ></input>
          </div>
          <button type="submit">Create Spot</button>
        </form>
      </div>
    </div>
  );
}

export default NewSpot;
