import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { login } from "../../../store/session";
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-body">
      <h1 className="login-title">Gamestagram</h1>
      <img className="login-image" alt="gaming" src="https://aa-gamestagram.s3.us-west-1.amazonaws.com/branden-skeli-0SB4gTfqANY-unsplash.jpg"></img>
      <form className="login-form" onSubmit={onLogin}>
        <div>
          {errors.map((error, ind) => (
            <div className="display-errors" key={ind}>* {error}</div>
          ))}
        </div>
        <input
          name="email"
          type="text"
          placeholder="Email"
          required={true}
          value={email}
          onChange={updateEmail}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required={true}
          value={password}
          onChange={updatePassword}
        />
        <button type="submit">Login</button>
      </form>
      <div className="login-signup-con">
        Don't have an account? <NavLink to="/sign-up">Sign Up</NavLink>
      </div>
    </div>
  );
};

export default LoginForm;
