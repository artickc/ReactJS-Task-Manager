import {rest} from "msw";
import {RequestBody, TasksResponse} from "../../types/labels";
import {LabelsState} from "../../types/labels";

let initialState: LabelsState = {
 Label: [
  {
   id: 1,
   title: "ReactJs",
   color: "#000",
  },
  {
   id: 2,
   title: "Redux",
   color: "#90caf9",
  },
  {
   id: 3,
   title: "React Router",
   color: "#e3f2fd",
  },
  {
   id: 4,
   title: "TypeScript",
   color: "#42a5f5",
  },
  {
   id: 5,
   title: "React MUI",
   color: "#f3e5f5",
  },
  {
   id: 6,
   title: "MSW",
   color: "#f44336",
  },
  {
   id: 7,
   title: "Axios",
   color: "#d32f2f",
  },
  {
   id: 8,
   title: "E2E",
   color: "#f57c00",
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
