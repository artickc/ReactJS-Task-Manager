import { combineReducers } from "redux";
import { tasksReudcer } from "./tasksReducer";
import { appReudcer } from "./appReudcer";

export const rootReducer = combineReducers({
    tasks: tasksReudcer,appReudcer
})