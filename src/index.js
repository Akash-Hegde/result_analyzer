import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import {
  Route,
  NavLink,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import Result from "./Result";
import ExcelReader from "./ExcelReader"

const routing = (
  <Router>
    <div>
    {/* <Link exact activeClassName="active" to="/">
      Home
          </Link> */}
      
      
        <Route exact path="/" component={ExcelReader} />
        <Route path="/Result" component={Result} />
        {/* <Route path="/contact" component={Contact} />
        <Route component={Notfound} /> */}
      
    </div>
  </Router>
);
ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
