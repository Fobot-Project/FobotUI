import Login from "./components/pages/loginPage";
import Register from "./components/pages/registerPage";
import HomePage from "./components/pages/home/homePage";
import OrderPage from "./components/pages/order/orderPage";
import BookingPage from "./components/pages/booking/bookingPage";
import ReportPage from "./components/pages/report/reportPage";
import RestaurantPage from "./components/pages/restaurant/restaurantPage";
import SingleRestaurantPage from "./components/pages/restaurant/singleRestaurantPage";
import AddproductPage from "./components/pages/addproduct/addproductPage";
import { createBrowserHistory } from "history";
import { auth } from "./firebase";
// import './App.css';
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useParams,
} from "react-router-dom";

const history = createBrowserHistory();
function App() {
  
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/order" component={OrderPage} />
          <Route exact path="/booking" component={BookingPage} />
          <Route exact path="/report" component={ReportPage} />
          <Route exact path="/restaurant" component={RestaurantPage} />
          <Route
            exact
            path="/restaurant/:id"
            component={SingleRestaurantPage}
          />
          <Route exact path="/restaurant/addProduct/:id" component={AddproductPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
