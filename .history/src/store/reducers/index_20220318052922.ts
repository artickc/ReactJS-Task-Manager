import { combineReducers } from "redux";
import { tasksReudcer } from "./tasksReducer";

export const rootReducer = combineReducers({
    tasks: tasksReudcer,
})