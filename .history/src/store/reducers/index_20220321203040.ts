import { combineReducers } from "redux";
import { tasksReudcer } from "./tasksReducer";
import { app } from "./app";
import { labels } from "./labels";

export const rootReducer = combineReducers({
    tasks: tasksReudcer,
    app: app,
    labels: labels
})

export type RootState = ReturnType<typeof rootReducer>