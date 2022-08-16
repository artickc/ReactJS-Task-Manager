import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {useDrag} from "react-dnd";
import {ItemTypes, DropResult} from "../types/card";
import {Tasks} from "../types/tasks";
import {useTypeSelector} from "../hooks/useTypedSelector";
import {useSelector} from "react-redux";
import {theme} from "../";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {AppActionTypes, AppAction} from "../types/app";
import {store} from "../store";

interface TaskProps {
 task: Tasks;
}
export const TaskCard: React.FC<TaskProps> = React.memo(function TaskCard({
 task,
}) {
 useSelector((state) => state);

 const handleClickOpen = (task: Tasks) => {
  try {
   store.dispatch({
    type: AppActionTypes.CHANGE_ACTIVE,
    payload: task,
   });
  } catch (e) {
   store.dispatch({
    type: AppActionTypes.FETCH_APP_ERROR,
    payload: "Unable to change dialog state",
   });
  }
 };

 let deadlineColor = "text.primary";
 const deadlineParse = task.deadline.split(" ");

 const [dday, dmonth, dyear] = deadlineParse[0].split("-");
 const [dhours, dminutes, dseconds] = deadlineParse[1].split(":");
 const deadline = `${dyear}-${dmonth}-${dday} ${dhours}:${dminutes}:${dseconds}`;

 const d1 = new Date().getTime();
 const d2 = Date.parse(deadline);
 var Difference_In_Time = d2 - d1;
 var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

 if (Difference_In_Time < 0) deadlineColor = "error.dark";
 else if (Difference_In_Time > 0 && Difference_In_Days < 1)
  deadlineColor = "warning.dark";

 const labels = useTypeSelector((state) => state.labels.Label);
 let active = useTypeSelector((state) => state.labels.active);
 const [{isDragging}, drag] = useDrag(() => ({
  type: ItemTypes.CARD,
  item: {task},
  end: (task, monitor) => {
   const dropResult = monitor.getDropResult<DropResult>();
  },
  collect: (monitor) => ({
   isDragging: monitor.isDragging(),
   handlerId: monitor.getHandlerId(),
  }),
 }));

 const opacity = isDragging ? 0.3 : 1;
 return (
  <div
   style={{opacity: opacity, cursor: "pointer"}}
   ref={drag}
   role="Card"
   className="mainCardContainer"
   onClick={() => handleClickOpen(task)}
  >
   <Box sx={{minWidth: 275}}>
    <Card variant="outlined">
     <React.Fragment>
      <CardActions className="labelCardContainer">
       {labels.map((label) => {
        if (task.labels.some((v) => v === label.id)) {
         return (
          <div
           key={label.id}
           className="cardLabelItem"
           style={{
            color: label.color,
            backgroundColor: theme.palette.divider,
           }}
          >
           {label.title}
          </div>
         );
        }
       })}
      </CardActions>
      <CardContent sx={{padding: "5px 16px"}}>
       <Typography variant="h5" component="div">
        {task.title}
       </Typography>
      </CardContent>
      <CardActions>
       <Typography
        variant="body2"
        className="cardHeading"
        sx={{color: deadlineColor}}
       >
        <AccessTimeIcon /> {task.deadline}
       </Typography>
      </CardActions>
     </React.Fragment>
    </Card>
   </Box>
  </div>
 );
});
