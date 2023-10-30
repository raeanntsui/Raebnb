import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { NavLink, useHistory } from "react-router-dom";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  // login as demo user (demo-lition, password)
  const loginDemoUser = (e) => {
    e.preventDefault();
    setErrors({});
    history.push("/");
    return dispatch(
      sessionActions.login({ credential: "Demo-lition", password: "password" })
    )
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <>
      <h1 id="h1-form">Log In</h1>
      <form id="form-content-width" onSubmit={handleSubmit}>
        <div id="inputs-information">
          <label>
            Username or Email
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          {errors.credential && <p id="p-error">{errors.credential}</p>}
        </div>
        <div id="inputs-information">
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.credential && <p id="p-error">{errors.credential}</p>}
        </div>
        <div id="modal-buttons-up-down">
          <div id="btn">
            <button type="submit">Log In</button>
          </div>
          <div id="btn">
            <button
              id="accepted-pressed-button"
              type="submit"
              onClick={loginDemoUser}>
              Log in as Demo User
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default LoginFormModal;
