import React, { useState, useEffect } from "react";
import "../../assets/css/login.css";
import "../../assets/css/App.css";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo/fobot.jpg";

export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { login } = useAuth();

  const history = useHistory();

  async function handleReg() {
    try {
      await login(email, password);
      history.push("/");
    } catch (err) {
      history.push("/login");
    }
  }
  function handleNavToLogin() {
    history.push("/register");
  }

  return (
    <div className="card">
      <div className="card--header ">
        <div className="logo-bg lobby-title">
          <img src={logo} alt="logo"></img>
        </div>
        <p className="title">Log in</p>
      </div>
      <div className="card--body">
        <div>
          <label>Email</label>
          <input
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
      </div>
      <button onClick={handleReg} type="submit" id="login" class="btn_sign-up">
        Log in
      </button>
      <button
        onClick={handleNavToLogin}
        type="submit"
        id="signup"
        class="btn_sign-up"
      >
        Register
      </button>
      {/* <p className="link">
        <a onClick={handleNavToLogin}>Register</a>
      </p> */}
    </div>
  );
}
