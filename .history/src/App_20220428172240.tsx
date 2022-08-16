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
import withScrolling from "react-dnd-scrollzone";

const App = () => {
 let routes = useRoutes([
  {path: "/", element: <Home />},
  // ...
 ]);
 return routes;
};

const ScrollingComponent = withScrolling("div");

const AppWrapper = () => {
 return (
  <Router>
   <ScrollingComponent className="App">
    <App />
   </ScrollingComponent>
  </Router>
 );
};

export default AppWrapper;
