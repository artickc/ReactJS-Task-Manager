import { combineReducers } from "redux";
import { tasksReudcer } from "./tasksReducer";
import { app } from "./app";

export const rootReducer = combineReducers({
    tasks: tasksReudcer,app
})