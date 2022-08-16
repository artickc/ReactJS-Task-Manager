import {rest} from "msw";
import React from "react";
import {
 BrowserRouter as Router,
 Routes,
 Route,
 useRoutes,
} from "react-router-dom";
import {Home} from "./pages/home";
import "./App.css";
import {store} from "./store";
import {saveState} from "./store";

const App = () => {
 let routes = useRoutes([
  {path: "/", element: <Home />},
  // ...
 ]);
 return routes;
};

const AppWrapper = () => {
 return (
  <Router>
   <App />
  </Router>
 );
};

export default AppWrapper;
