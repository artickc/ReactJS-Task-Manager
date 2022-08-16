import * as React from "react";
import {useTypeSelector} from "../hooks/useTypedSelector";
import {List} from "@material-ui/core";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {TaskCard} from "./card";
import {useDrop} from "react-dnd";
import {ItemTypes, DropResult} from "../types/card";
import {ColumnCommponent} from "./column";
import {ColumnState} from "../types/app";
import update from "immutability-helper";
import {store} from "../store";
import {TasksActionTypes, Tasks} from "../types/tasks";
import {useSelector} from "react-redux";

interface ListsState {
 accepts: string[];
}

export const Board: React.FC = () => {
 const columns = useTypeSelector((state) => state.app.columns);
 const tasks = useTypeSelector((state) => state.tasks.tasks);
 const [statusLists] = React.useState<ListsState[]>([
  {accepts: [ItemTypes.CARD]},
 ]);

 const handleDrop = (card: Tasks, item: ColumnState) => {
  card.status = item.id;
  const res = {tasks: tasks, newTask: card};
  try {
   store.dispatch({type: TasksActionTypes.UPDATE_TASK, payload: res});
  } catch (e) {
   store.dispatch({
    type: TasksActionTypes.FETCH_TASKS_ERROR,
    payload: "Unable to change task status",
   });
  }
 };

 return (
  <div className="boardContainer">
   {columns.map((colum) => (
    <ColumnCommponent
     accept={[ItemTypes.CARD]}
     onDrop={(item) => handleDrop(item.task, colum)}
     column={colum}
     key={colum.id}
    />
   ))}
  </div>
 );
};
