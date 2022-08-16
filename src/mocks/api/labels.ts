import {rest} from "msw";
import {RequestBody, TasksResponse} from "../../types/labels";
import {LabelsState} from "../../types/labels";

let initialState: LabelsState = {
 Label: [
  {
   id: 1,
   title: "ReactJs",
   color: "#0475b8",
  },
  {
   id: 2,
   title: "Redux",
   color: "#764abc",
  },
  {
   id: 3,
   title: "React Router",
   color: "#f44250",
  },
  {
   id: 4,
   title: "TypeScript",
   color: "#3178c6",
  },
  {
   id: 5,
   title: "React MUI",
   color: "#00aeff",
  },
  {
   id: 6,
   title: "MSW",
   color: "#ff6a33",
  },
  {
   id: 7,
   title: "Axios",
   color: "#671ddf",
  },
  {
   id: 8,
   title: "E2E",
   color: "#3e5afd",
  },
 ],
 active: [],
};

export const labelHandlers = [
 rest.get<RequestBody, TasksResponse>("/api/labels", (req, res, ctx) => {
  return res(
   ctx.json({
    initialState,
   })
  );
 }),
];
