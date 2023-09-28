import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

// function CreateANewSpotFormModal() {
//   const sessionUser = useSelector((state) => state.session.user);

//   const dispatch = useDispatch();
//   const [country, setCountry] = useState("");
//   const [address, setAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errors, setErrors] = useState({});
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

// export default CreateANewSpotFormModal;

function NewSpot() {
  const sessionUser = useSelector((state) => state.session.user);
  const [showForm, setShowForm] = useState(false);

  // Function to handle button click
  const handleButtonClick = () => {
    setShowForm(true);
  };

  return (
    <div>
      {/* <NavLink exact to="/new" id="create-new-spot">
        {sessionUser && (
          <button id="create-spot-button">Create a New Spot</button>
        )}
      </NavLink> */}
      <div>
        <h1>My Form</h1>
        <button onClick={handleButtonClick}>Show Form</button>
        {showForm && (
          <form>
            <p>Testing</p>
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default NewSpot;
