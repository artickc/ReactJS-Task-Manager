import { setupWorker, rest } from 'msw'


const worker = setupWorker(...handlers);

worker.start()