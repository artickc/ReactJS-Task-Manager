import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {rootReducer} from "./reducers";

export const store = createStore(rootReducer, applyMiddleware(thunk));

export const loadState = () => {
 try {
  const serialState = localStorage.getItem("State");
  if (serialState === null) {
   return undefined;
  }
  return JSON.parse(serialState);
 } catch (err) {
  return undefined;
 }
};

export const saveState = (state) => {
 try {
  const serialState = JSON.stringify(state);
  localStorage.setItem("appState", serialState);
 } catch (err) {
  console.log(err);
 }
};
