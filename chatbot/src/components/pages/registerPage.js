import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../assets/css/login.css";
import logo from "../../assets/logo/fobot.jpg";

export default function Register() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setCPassowrd] = useState("");
  const [email, setEmail] = useState("");
  const [info, setInfo] = useState("");
  const { register } = useAuth();

  var history = useHistory();

  function handleReg() {
    if (userName === "" || password === "" || email === "") {
      setInfo("Please Fill All the Field!");
    } else if (password !== c_password) {
      setInfo("Confirm Password Does Not Match the Password!");
    } else if (
      !/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
        email
      )
    ) {
      setInfo("Please Enter a Vaild Email Address!");
    }

    if (
      (userName !== "") &
      (password !== "") &
      (email !== "") &
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
        email
      )
    ) {
      if (register(userName, email, password)) {
        history.push("/");
      }
    }
  }

  function handleNavToLogin() {
    history.push("/login");
  }

  return (
    <div className="card">
      <div className="card--header ">
        <div className="logo-bg lobby-title">
          <img src={logo} alt="logo"></img>
        </div>
        <p className="title">Sign up</p>
      </div>
      <div className="card--body">
        <div>
          <label>Username</label>
          <input
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
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
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            onChange={(e) => {
              setCPassowrd(e.target.value);
            }}
          />
        </div>
      </div>
      <button onClick={handleReg} type="submit" id="signup" class="btn_sign-up">
        Register
      </button>
      <button
        onClick={handleNavToLogin}
        type="submit"
        id="login"
        class="btn_sign-up"
      >
        Login
      </button>
      {/* <p className="link">
        <a onClick={handleNavToLogin}>Login</a>
      </p> */}
    </div>
  );
}
