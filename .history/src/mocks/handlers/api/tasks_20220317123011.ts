import { rest } from "msw";

export const tasksHandlers = [
    rest.post('/api/tasks', (req, res, ctx) => {
        return res(ctx.status(200));
    })
]