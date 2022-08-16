import {rest} from "msw";
import * as React from "react";
import worker from "../mocks/browser";
import axios from "axios";
import {Board} from "../components/board";
import {Header} from "../components/header";
import {useSelector} from "react-redux";

export const Home: React.FC = () => {
 useSelector((state) => state); //Without this labels state won't update on front end
 return (
  <div className="main">
   <Header></Header>
   <Board></Board>
  </div>
 );
};
