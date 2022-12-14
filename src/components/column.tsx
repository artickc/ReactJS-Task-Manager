import * as React from "react";
import {useTypeSelector} from "../hooks/useTypedSelector";
import {List} from "@material-ui/core";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {TaskCard} from "./card";
import {useDrop} from "react-dnd";
import {ColumnState} from "../types/app";
import {Tasks} from "../types/tasks";
import {useSelector} from "react-redux";
import Button from "@mui/material/Button";
import {AppActionTypes} from "../types/app";
import {store} from "../store";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {emptyTask} from "../store/reducers/app";

export interface ColumnCommponentTypes {
 column: ColumnState;
 accept: string[];
 onDrop: (item: any) => void;
}

export const ColumnCommponent: React.FC<ColumnCommponentTypes> = React.memo(
 function ColumnCommponent({column, accept, onDrop}) {
  useSelector((state) => state);
  const [alertV, setAlert] = React.useState(false);
  const [alertContent, setAlertContent] = React.useState("");
  const [openSnack, setOpenSnack] = React.useState(false);
  const showError = (msg: string) => {
   setAlert(false);
   setAlertContent(msg);
   setAlert(true);
   setOpenSnack(true);
  };
  const tasks = useTypeSelector((state) => state.tasks.tasks);
  let active = useTypeSelector((state) => state.labels.active);
  let workingObject = useTypeSelector((state) => state.app.active);
  const acceptDrop = (item: any, monitor: any) => {
   const errMsg = "Could not update: " + item.task.title;
   axios
    .post("/api/tasks/" + item.task.id + "/status", {status: item.task.status})
    .then((res) => {
     if (res.data.result) {
      onDrop(item);
     } else {
      showError(errMsg);
      return false;
     }
    });
  };
  const [{isOver, canDrop}, drop] = useDrop({
   accept,
   drop: (item, monitor) => {
    acceptDrop(item, monitor);
   },
   collect: (monitor) => ({
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
   }),
  });
  const handleCloseSnack = (
   event?: React.SyntheticEvent | Event,
   reason?: string
  ) => {
   if (reason === "clickaway") {
    return;
   }

   setOpenSnack(false);
  };

  const handleClickOpen = (status: string) => {
   try {
    store.dispatch({
     type: AppActionTypes.CHANGE_ACTIVE,
     payload: {
      object: {
       id: null,
       title: "",
       description: "",
       deadline: "",
       labels: [],
       status: status ? status : "",
      },
      errors: [],
      edited: false,
     },
    });
    store.dispatch({
     type: AppActionTypes.OPEN_APP_DIALOG,
     payload: true,
    });
   } catch (e) {
    store.dispatch({
     type: AppActionTypes.FETCH_APP_ERROR,
     payload: "Unable to change dialog state",
    });
   }
  };

  const isActive = isOver && canDrop;
  let backgroundColor = "action.disabledBackground";
  if (isActive) {
   backgroundColor = "action.hover";
  } else if (canDrop) {
   backgroundColor = "action.disabled";
  }
  return (
   <div ref={drop} key={column.id} className="listColumnContainer">
    {alertV ? (
     <Snackbar
      open={openSnack}
      autoHideDuration={6000}
      onClose={handleCloseSnack}
     >
      <Alert onClose={handleCloseSnack} severity="error" sx={{width: "100%"}}>
       {alertContent}
      </Alert>
     </Snackbar>
    ) : (
     <></>
    )}
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
         className="headerLabelContainer"
        >
         {column.name}
         <AddIcon
          className="addTaskHeader"
          onClick={() => handleClickOpen(column.id)}
         />
        </Typography>
       </Toolbar>
      </AppBar>
     </Box>
     <Box sx={{backgroundColor: backgroundColor}} className="cardsContainer">
      {tasks
       .filter((task: Tasks) => task.status == column.id)
       .map((task: Tasks) => {
        const intersection = active.filter((element) =>
         task.labels.includes(element)
        );
        if (active.length > 0 && intersection.length < 1) return false;

        return <TaskCard task={task} key={task.id}></TaskCard>;
       })}
      <Button
       sx={{
        borderColor: "transparent",
       }}
       variant="outlined"
       startIcon={<AddIcon />}
       onClick={() => handleClickOpen(column.id)}
      >
       Add Task
      </Button>
     </Box>
    </List>
   </div>
  );
 }
);
