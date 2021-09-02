import React, { useEffect, useState,useRef } from "react";
import '../../assets/css/login.css';
import '../../assets/css/App.css';
import { useHistory } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signInWithEmailAndPassword} from "../../firebase";
import { Link } from "react-router-dom"

export default function Login() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [info, setInfo] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  async function handleReg() {
    const data = { password: password, email: email };
    try{
      await signInWithEmailAndPassword(email, password)
      history.push('/restaurant')
      } catch(err){
      history.push('/')
    }
    
  }

  function handleNavToLogin(){
    history.push('/register')
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