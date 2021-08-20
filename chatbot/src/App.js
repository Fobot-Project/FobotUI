import Login from './components/login';
import Register from "./components/register";
// import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Addproduct from './components/sections/Addproduct/Addproductcontent';
import Addproductcontent from './components/pages/Addproduct';
import Menulist from './components/pages/Menulist';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <Addproductcontent></Addproductcontent>
        
    //   </header>
    // </div>
    // <Router>
    //   <Switch>
    //     <div>
    //     <Route exact path='/'>
    //         <div>
    //             <Register></Register>
    //         </div>
    //       </Route>

    //       <Route exact path='/register'>
    //         <div className="App">
    //             <Register></Register>
    //         </div>
    //       </Route>

    //       <Route exact path='/login'>
    //         <div className="App">
    //             <Login/>
    //         </div>
    //       </Route>

    //     </div>
    //   </Switch>
    // </Router>
    <Router basename={'/chatbot'}>
      <Switch>
        <Route exact path="/" component={Addproductcontent} />
        <Route path="/add-product" component={Addproductcontent} />
        <Route path="/menu-list" component={Menulist} />
      </Switch>
    </Router>
  );
}

export default App;
