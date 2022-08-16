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
  const serialState = JSON.stringify(state);
  localStorage.setItem("appState", serialState);
 } catch (err) {
  console.log(err);
 }
};

const prevState = LoadState();
const enhancers = [prevState, applyMiddleware(thunk)];
export const store = createStore(rootReducer, if (!persistedState) persistedState = applyMiddleware(thunk));
