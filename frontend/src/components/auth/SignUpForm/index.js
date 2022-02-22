import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "@mui/material/Avatar";
import { NavLink, Redirect } from "react-router-dom";
import {UploadIcon} from '@heroicons/react/outline'
import { signUp } from "../../../store/session";
import "./SignUpForm.css";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [image, setImage] = useState(null);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();

    const errArr = [];
    username || errArr.push("* Please enter a username.");
    email || errArr.push("* Please enter an email.");
    password || errArr.push("* Please enter a password.");
    repeatPassword === password || errArr.push("* Passwords do not match.");
    if (errArr.length) {
      setErrors(errArr);
    } else {
      await dispatch(signUp(username, email, password, image));
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="sign-up-body">
      <div className="sign-up-left">
        <img
          className="sign-up-image"
          alt="playing games"
          src="https://aa-gamestagram.s3.us-west-1.amazonaws.com/carl-raw-m3hn2Kn5Bns-unsplash.jpg"
        ></img>
      </div>
      <div className="sign-up-right">
        <h1 id="sign-up-title">Gamestagram</h1>
        <form className="sign-up-form" onSubmit={onSignUp}>
          <ul>
            {errors.length > 0 &&
              errors.map((err) => (
                <li className="display-errors" key={err}>
                  {err}
                </li>
              ))}
          </ul>
          <div className="input-wrapper">
            <input
              type="text"
              className="signup-input"
              name="username"
              onChange={updateUsername}
              value={username}
              required={true}
            ></input>
            <label className="signup-label">Username</label>
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              className="signup-input"
              name="email"
              onChange={updateEmail}
              value={email}
              required={true}
            ></input>
            <label className="signup-label">Email</label>
          </div>
          <div className="input-wrapper">
            <input
              type="password"
              className="signup-input"
              name="password"
              onChange={updatePassword}
              value={password}
              required={true}
            ></input>
            <label className="signup-label">Password</label>
          </div>
          <div className="input-wrapper">
            <input
              type="password"
              className="signup-input"
              name="repeat_password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
            <label className="signup-label">Confirm Password</label>
          </div>
          <label for="file-upload" className="file-input-con">
              <div className="avatar-upload-con">
                <div className="file-button-con">
                  <UploadIcon width={16} />
                  <p>Upload File...</p>
                </div>
                <Avatar src={image && URL.createObjectURL(image)}/>
              </div>
            </label>
            <input
              type="file"
              onChange={updateImage}
              id="file-upload"
              className="hide-upload-button"
            />
          <button type="submit">Sign Up</button>
        </form>
        <div className="sign-up-login-con">
          Have an account? <NavLink to="/login">Login</NavLink>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
