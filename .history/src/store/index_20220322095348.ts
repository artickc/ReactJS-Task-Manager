import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {rootReducer} from "./reducers";

export const store = createStore(rootReducer, loadState());

const KEY = "redux";
export function loadState() {
 try {
  const serializedState = localStorage.getItem(KEY);
  if (!serializedState) return undefined;
  return JSON.parse(serializedState);
 } catch (e) {
  return undefined;
 }
}

export async function saveState(state: any) {
 try {
  const serializedState = JSON.stringify(state);
  localStorage.setItem(KEY, serializedState);
 } catch (e) {
  // Ignore
 }
}
