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

interface TaskProps {
 task: Tasks;
}
export const TaskCard: React.FC<TaskProps> = React.memo(function TaskCard({
 task,
}) {
 const labels = useTypeSelector((state) => state.labels.Label);
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
       <Button size="small">Learn More</Button>
      </CardActions>
      <CardContent>
       <Typography variant="h5" component="div">
        {task.title}
       </Typography>
       <Typography variant="body2">{task.description}</Typography>
      </CardContent>
      <CardActions>
       {labels.map((label) => {
        return <div className="labelItem">{label.title}</div>;
       })}
       <Button size="small">Learn More</Button>
      </CardActions>
     </React.Fragment>
    </Card>
   </Box>
  </div>
 );
});
