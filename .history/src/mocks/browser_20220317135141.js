import { setupWorker, rest } from 'msw'
import { handlers } from '.';

const worker = setupWorker(...handlers);
worker.start()

export default worker