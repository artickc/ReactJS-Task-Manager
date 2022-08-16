import { setupWorker } from 'msw'
import { handlers } from '.';

const worker = setupWorker(...handlers);

export default worker