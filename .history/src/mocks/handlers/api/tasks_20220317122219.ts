import { rest } from "msw";

export default tasksHandlers = [
    rest.post('/api/tasks:page', (req, res, ctx) => {
        return res.(ctx.status(200));
    })
]