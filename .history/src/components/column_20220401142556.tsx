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
import {ColumnState} from "../types/app";
import {Tasks} from "../types/tasks";
import {useSelector} from "react-redux";

export interface ColumnCommponentTypes {
 column: ColumnState;
 accept: string[];
 onDrop: (item: any) => void;
}

export const ColumnCommponent: React.FC<ColumnCommponentTypes> = React.memo(
 function ColumnCommponent({column, accept, onDrop}) {
  useSelector((state) => state); //Without this labels state won't update on front end
  const tasks = useTypeSelector((state) => state.tasks.tasks);
  const active = useTypeSelector((state) => state.labels.active);
  const [{isOver, canDrop}, drop] = useDrop({
   accept,
   drop: onDrop,
   collect: (monitor) => ({
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
   }),
  });
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
   setOpen(true);
  };
  isActive = isOver && canDrop;
  let backgroundColor = "action.disabledBackground";
  if (isActive) {
   backgroundColor = "action.hover";
  } else if (canDrop) {
   backgroundColor = "action.disabled";
  }
  return (
   <div ref={drop} key={column.id} className="listColumnContainer">
    <List className="columList" disablePadding={true}>
     <Box>
      <AppBar position="static">
       <Toolbar>
        <Typography
         variant="h6"
         noWrap
         component="div"
         sx={{flexGrow: 1, display: {xs: "none", sm: "block"}}}
         color="info"
        >
         {column.name}
        </Typography>
       </Toolbar>
      </AppBar>
     </Box>
     <Box sx={{backgroundColor: backgroundColor}} className="cardsContainer">
      {tasks
       .filter((task: Tasks) => task.status == column.id)
       .map((task: Tasks) => {
        if (active.length > 0 && !active.some((v) => v === task.id)) {
         return false;
        }
        return <TaskCard task={task} key={task.id}></TaskCard>;
       })}
     </Box>
    </List>
   </div>
  );
 }
);
