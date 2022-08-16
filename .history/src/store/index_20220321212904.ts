import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {rootReducer} from "./reducers";
import lodash from "lodash.throttle";
export const store = createStore(rootReducer, applyMiddleware(thunk));
export const loadState = () => {
 try {
  const serializedState = localStorage.getItem("state");
  if (serializedState === null) {
   return undefined;
  }
  return JSON.parse(serializedState);
 } catch (err) {
  return undefined;
 }
};

export const saveState = (state: any) => {
 try {
  const serializedState = JSON.stringify(state);
  localStorage.setItem("state", serializedState);
 } catch {
  // ignore write errors
 }
};

store.subscribe(
 throttle(() => {
  saveState({
   app: store.getState().app,
  });
 }, 1000)
);
