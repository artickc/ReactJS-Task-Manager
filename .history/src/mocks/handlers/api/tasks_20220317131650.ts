import { rest } from "msw";

export const tasksHandlers = [
    rest.get(`${process.env.REACT_APP_URL}/api/tasks`, (req, res, ctx) => {
        return res(ctx.status(200));
    })
]