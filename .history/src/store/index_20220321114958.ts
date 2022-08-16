import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers";
import { TaskInterface } from '../types/tasks'

export const testTasks = [
    {
        id: 1,
        title: 'ReactJs',
        description: 'The app should be implemented using ReactJs ',
        deadline: '25-03-2022 0:0:0',
        labels: [1],
        status: 'TODO' 
    },
    {
        id: 1,
        title: 'Redux',
        description: 'The app should be implemented using Redux ',
        deadline: '25-03-2022 0:0:0',
        labels: [1],
        status: 'TODO' 
    },
    {
        id: 1,
        title: 'React Router',
        description: 'The app should be implemented using React Router ',
        deadline: '25-03-2022 0:0:0',
        labels: [1],
        status: 'TODO' 
    },
    {
        id: 1,
        title: 'React MUI',
        description: 'The app should be implemented using React MUI. https://mui.com/, for UI elements',
        deadline: '25-03-2022 0:0:0',
        labels: [1],
        status: 'TODO' 
    },
    {
        id: 1,
        title: 'MSW',
        description: `The app should be implemented using MSW. https://www.npmjs.com/package/msw - Since there not real API yet, you'll have to emulate the api endpoints with MSW
        Axios for REST calls`,
        deadline: '25-03-2022 0:0:0',
        labels: [1],
        status: 'TODO' 
    },
    {
        id: 1,
        title: 'Axios',
        description: 'The app should be implemented using Axios for REST calls',
        deadline: '25-03-2022 0:0:0',
        labels: [1],
        status: 'TODO' 
    },
    {
        id: 1,
        title: 'E2E ',
        description: 'E2E tests with https://www.cypress.io/',
        deadline: '25-03-2022 0:0:0',
        labels: [1],
        status: 'TODO' 
    }
]
export const store = createStore(rootReducer, applyMiddleware(thunk))