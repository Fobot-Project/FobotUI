import Login from './components/pages/loginPage';
import Register from "./components/pages/registerPage";
import HomePage from "./components/pages/homePage";
// import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Addproduct from './components/sections/Addproductcontent';
import Addproductcontent from './components/sections/Addproductcontent';

function App() {
  return (
    <div className="App">
      <Router basename={'/'}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/register" component={Register} />
          <Route path="/add-product" component={Addproductcontent} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
