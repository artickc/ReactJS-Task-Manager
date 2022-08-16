import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {rootReducer} from "./reducers";
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

export const saveState = (state) => {
 try {
  const serializedState = JSON.stringify(state);
  localStorage.setItem("state", serializedState);
 } catch {
  // ignore write errors
 }
};

store.subscribe(() => {
 saveState({
  app: store.getState().app,
  labels: store.getState().labels,
 });
});
