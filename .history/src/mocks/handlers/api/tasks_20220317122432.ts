import { rest } from "msw";

export default const tasksHandlers = [
    rest.post('/api/tasks:page', (req, res, ctx) => {
        return res(ctx.status(200));
    })
]