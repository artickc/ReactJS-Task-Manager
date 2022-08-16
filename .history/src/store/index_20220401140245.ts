import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {rootReducer} from "./reducers";

export const loadState = () => {
 try {
  const serialState = localStorage.getItem("appState");
  if (serialState === null) {
   return undefined;
  }
  return JSON.parse(serialState);
 } catch (err) {
  return undefined;
 }
};

export const saveState = (state: any) => {
 try {
  console.log(state);
  if (state.labels.Label && state.labels.Label.length < 1) return false;
  if (state.tasks.tasks && state.tasks.tasks.length < 1) return false;
  const serialState = JSON.stringify(state);
  localStorage.setItem("appState", serialState);
 } catch (err) {
  console.log(err);
 }
};

export const store = createStore(rootReducer, loadState());
