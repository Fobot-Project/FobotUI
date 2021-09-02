import Login from './components/pages/loginPage';
import Register from "./components/pages/registerPage";
import HomePage from "./components/pages/home/homePage";
import OrderPage from "./components/pages/order/orderPage";
import BookingPage from "./components/pages/booking/bookingPage";
import RestaurantPage from "./components/pages/restaurant/restaurantPage";
import AddproductPage from './components/pages/addproduct/addproductPage';
// import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router basename={'/'}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/order" component={OrderPage} />
          <Route exact path="/booking" component={BookingPage} />
          <Route exact path="/restaurant" component={RestaurantPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
