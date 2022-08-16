import axios from 'axios';

export const tasksHandlers = [
    axios.get('/api/tasks', (req, res, ctx) => {
        return res(ctx.status(200));
    })
]