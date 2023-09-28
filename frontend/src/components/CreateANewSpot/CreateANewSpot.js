import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//   const sessionUser = useSelector((state) => state.session.user);
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const { closeModal } = useModal();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (password === confirmPassword) {
//       setErrors({});
//       return dispatch(
//         sessionActions.signup({
//           country,
//           address,
//           city,
//           state,
//           password,
//         })
//       )
//         .then(closeModal)
//         .catch(async (res) => {
//           const data = await res.json();
//           if (data && data.errors) {
//             setErrors(data.errors);
//           }
//         });
//     }
//     return setErrors({
//       confirmPassword:
//         "Confirm Password field must be the same as the Password field",
//     });
//   };

//   const showCreateSpotForm = () => {};
//   return (
//     <>
//       {/* {sessionUser && <button>Create a New Spot</button>} */}
//       <form onSubmit={handleSubmit}>
//         <h1>Create a new Spot</h1>
//         <h2>Section #1: Where's your place located?</h2>
//         <h2>
//           Guests will only get your exact address once they booked a
//           reservation.
//         </h2>

//         <h2>Section #2: Describe your place to guests</h2>
//         <h3>
//           Mention the best features of your space, any special amentities like
//           fast wifi or parking, and what you love about the neighborhood.
//         </h3>
//         <textarea>Tell us about your spot</textarea>

//         <h2>Section #3: Create a title for your spot</h2>
//         <h3>
//           Catch guests' attention with a spot title that highlights what makes
//           your place special
//         </h3>
//         <textarea>Name of your spot</textarea>

//         <h2>Section #4: Set a base price for your spot</h2>
//         <h3>
//           Competitive pricing can help your listing stand out and rank higher in
//           search results.
//         </h3>
//         <input>Price per night (USD)</input>

//         <h2>Section #5: Liven up your spot with photos</h2>
//         <h3>Submit a link to at least one photo to publish your spot.</h3>
//         <input>Preview Image URL x5</input>
//         <button type="submit">Create Spot</button>
//       </form>
//       {/* <label>
//           country
//           <input
//             type="text"
//             value={country}
//             onChange={(e) => setCountry(e.target.value)}
//             required
//           />
//         </label>
//         {errors.country && <p>{errors.country}</p>}
//         <label>
//           address
//           <input
//             type="text"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             required
//           />
//         </label>
//         {errors.address && <p>{errors.address}</p>}
//         <label>
//           First Name
//           <input
//             type="text"
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//             required
//           />
//         </label>
//         {errors.city && <p>{errors.city}</p>}
//         <label>
//           Last Name
//           <input
//             type="text"
//             value={state}
//             onChange={(e) => setState(e.target.value)}
//             required
//           />
//         </label>
//         {errors.state && <p>{errors.state}</p>}
//         <label>
//           Password
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </label>
//         {errors.password && <p>{errors.password}</p>}
//         <label>
//           Confirm Password
//           <input
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//         </label>
//         {errors.confirmPassword && <p>{errors.confirmPassword}</p>} */}
//     </>
//   );
// }

function NewSpot() {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
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
    imageURL &&
    (!imageURL.endsWith(".jpg") ||
      !imageURL.endsWith(".jpeg") ||
      !imageURL.endsWith(".png"))
  )
    errorsObject.imageURL = "Image URL must end in .png, .jpg, or .jpeg";

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
            <textarea placeholder="Please write at least 30 characters"></textarea>
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
            <input type="text" placeholder="Name of your spot"></input>
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
            <input type="number" placeholder="Price per night (USD)"></input>
          </div>
          {errorsObject.price && <p>{errorsObject.price}</p>}
          <div className="titles">
            <h2>Liven up your spot with photos</h2>
            <h3>Submit a link to at least one photo to publish your spot.</h3>
          </div>
          <div className="inputs">
            <input type="text" placeholder="Preview Image URL"></input>
            {errorsObject.previewImage && <p>{errorsObject.previewImage}</p>}
            <input type="text" placeholder="Image URL"></input>
            {errorsObject.imageURL && <p>{errorsObject.imageURL}</p>}
            <input type="text" placeholder="Image URL"></input>
            <input type="text" placeholder="Image URL"></input>
            <input type="text" placeholder="Image URL"></input>
          </div>
          <button type="submit">Create Spot</button>
        </form>
      </div>
    </div>
  );
}

export default NewSpot;
