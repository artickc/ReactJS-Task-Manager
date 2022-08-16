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

interface TaskProps {
 task: Tasks;
}
export const TaskCard: React.FC<TaskProps> = React.memo(function TaskCard({
 task,
}) {
 useSelector((state) => state);
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
   style={{opacity: opacity}}
   ref={drag}
   role="Card"
   className="mainCardContainer"
  >
   <Box sx={{minWidth: 275}}>
    <Card variant="outlined">
     <React.Fragment>
      <CardActions>
       <Typography variant="body2">{task.deadline}</Typography>
      </CardActions>
      <CardContent>
       <Typography variant="h5" component="div">
        {task.title}
       </Typography>
       <Typography variant="body2">{task.description}</Typography>
      </CardContent>
      <CardActions className="labelCardContainer">
       {labels.map((label) => {
        if (task.labels.some((v) => v === label.id)) {
         return (
          <div
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
     </React.Fragment>
    </Card>
   </Box>
  </div>
 );
});
