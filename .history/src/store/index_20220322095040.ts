import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {rootReducer} from "./reducers";

import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore({
 devTools: true,
 reducer: rootReducer,
 // here we restore the previously persisted state
 preloadedState: loadState(),
});

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
