import { combineReducers } from "redux";
import { tasksReudcer } from "./tasksReducer";
import { appReudcer } from "./app";

export const rootReducer = combineReducers({
    tasks: tasksReudcer,appReudcer
})