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
// import './App.css';

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


const history = createBrowserHistory();
function App() {


  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/" component={HomePage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
