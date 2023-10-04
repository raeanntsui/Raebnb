import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

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
      <form onSubmit={handleSubmit}>
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
        <div id="modal-buttons">
          <button id="login-button" disabled={!credential} type="submit">
            Log In
          </button>
          <button
            id="submit-button"
            disabled={!password}
            type="submit"
            onClick={loginDemoUser}>
            Log in as Demo User
          </button>
        </div>
      </form>
    </>
  );
}

export default LoginFormModal;
