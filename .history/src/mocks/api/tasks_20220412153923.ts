import {rest} from "msw";
import {RequestBody, TasksResponse} from "../../types/tasks";
export let testTasks = [
 {
  id: 1,
  title: "ReactJs",
  description: "The app should be implemented using ReactJs ",
  deadline: "25-03-2022 00:00:00",
  labels: [1],
  status: "TODO",
 },
 {
  id: 2,
  title: "Redux",
  description: "The app should be implemented using Redux ",
  deadline: "2022/03/25 00:00:00",
  labels: [1, 2, 4],
  status: "TODO",
 },
 {
  id: 3,
  title: "React Router",
  description: "The app should be implemented using React Router ",
  deadline: "25-03-2022 00:00:00",
  labels: [3],
  status: "TODO",
 },
 {
  id: 4,
  title: "TypeScript",
  description:
   "TypeScript - Make sure you have a pretty strict config. No any usage is allowed.",
  deadline: "25-03-2022 00:00:00",
  labels: [4],
  status: "TODO",
 },
 {
  id: 5,
  title: "React MUI",
  description:
   "The app should be implemented using React MUI. https://mui.com/, for UI elements",
  deadline: "25-03-2022 00:00:00",
  labels: [5],
  status: "TODO",
 },
 {
  id: 6,
  title: "MSW",
  description: `The app should be implemented using MSW. https://www.npmjs.com/package/msw - Since there not real API yet, you'll have to emulate the api endpoints with MSW
        Axios for REST calls`,
  deadline: "25-03-2022 00:00:00",
  labels: [6],
  status: "TODO",
 },
 {
  id: 7,
  title: "Axios",
  description: "The app should be implemented using Axios for REST calls",
  deadline: "25-03-2022 00:00:00",
  labels: [7],
  status: "TODO",
 },
 {
  id: 8,
  title: "E2E ",
  description: "E2E tests with https://www.cypress.io/",
  deadline: "25-03-2022 00:00:00",
  labels: [8],
  status: "TODO",
 },
];
export const tasksHandlers = [
 rest.get<RequestBody, TasksResponse>("/api/tasks", (req, res, ctx) => {
  return res(
   ctx.json({
    testTasks,
   })
  );
 }),

 rest.post<RequestBody, TasksResponse>("/api/tasks", (req, res, ctx) => {
  return res(
   ctx.json({
    testTasks,
   })
  );
 }),
];
