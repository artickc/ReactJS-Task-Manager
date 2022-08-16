import { combineReducers } from "redux";
import { tasksReudcer } from "./tasksReducer";
import { appReudcer } from "./tasksReducer";

export const rootReducer = combineReducers({
    tasks: tasksReudcer,appReudcer
})