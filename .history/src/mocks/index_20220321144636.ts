import { tasksHandlers } from "./api/tasks";
import { rest } from "msw";

export const defaultHandlers = [

  ]
export const handlers = [...tasksHandlers, ...defaultHandlers]

