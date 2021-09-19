import React, { useState, useEffect } from "react";
import "../../assets/css/login.css";
import "../../assets/css/App.css";
import { useHistory } from "react-router-dom";

import { auth, signInWithEmailAndPassword } from "../../firebase";

export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const history = useHistory();
  //useEffect(() => auth.onAuthStateChanged(email), [email]);
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((authObj) => {
      unsub();
      if (authObj) {
        // logged in, use authObj
      } else {
        handleReg()
      }
    });
  }, []);
  async function handleReg() {
    if(auth.currentUser){

    }
    try {
      await signInWithEmailAndPassword(email, password);

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
      <p className="link">
        <a onClick={handleNavToLogin}>Register</a>
      </p>
    </div>
  );
}
