import {rest} from "msw";
import * as React from "react";
import worker from "../mocks/browser";
import axios from "axios";
import {Board} from "../components/board";
import {Header} from "../components/header";
import {store} from "../store";
import {saveState} from "../store";

export const Home: React.FC = () => {
 store.subscribe(() => {
  saveState({
   labels: store.getState().labels,
   tasks: store.getState().tasks,
  });
 });

 return (
  <div className="main">
   <Header></Header>
   <Board></Board>
  </div>
 );
};
