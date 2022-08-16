import {rest} from "msw";
import * as React from "react";
import worker from "../mocks/browser";
import axios from "axios";
import Board from "../components/board";
import {Header} from "../components/header";

export const Home: React.FC = () => {
 return (
  <div className="main">
   <Header></Header>
   <Board />
  </div>
 );
};
