import {tasksHandlers} from "./api/tasks";
import {labelHandlers} from "./api/labels";
import {rest} from "msw";

export const defaultHandlers = [
 rest.get("*", (req, res, ctx) => res(ctx.status(200), ctx.json({}))),
 rest.post("*", (req, res, ctx) => res(ctx.status(200), ctx.json({}))),
 rest.patch("*", (req, res, ctx) => res(ctx.status(200), ctx.json({}))),
 rest.put("*", (req, res, ctx) => res(ctx.status(200), ctx.json({}))),
 rest.delete("*", (req, res, ctx) => res(ctx.status(200), ctx.json({}))),
];
export const handlers = [
 ...labelHandlers,
 ...tasksHandlers,
 ...defaultHandlers,
];
