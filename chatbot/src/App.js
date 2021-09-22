import Login from "./components/pages/loginPage";
import Register from "./components/pages/registerPage";
import HomePage from "./components/pages/home/homePage";
import { AuthProvider } from "./context/AuthContext"
import { createBrowserHistory } from "history";
import PrivateRoute from "./components/privateRoute"

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
        <AuthProvider>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/" component={HomePage} />
        </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
