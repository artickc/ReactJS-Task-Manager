import { rest } from "msw";

export const tasksHandlers = [
    rest.get('/api/tasks', (req, res, ctx) => {
        return res(ctx.status(200));
    })
]