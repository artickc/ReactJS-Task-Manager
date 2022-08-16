import * as React from "react";
import {useTypeSelector} from "../hooks/useTypedSelector";
import {ItemTypes} from "../types/card";
import {ColumnCommponent} from "./column";
import {ColumnState} from "../types/app";
import {store} from "../store";
import {TasksActionTypes, Tasks} from "../types/tasks";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {AppActionTypes} from "../types/app";
import {useSelector} from "react-redux";
import MUIRichTextEditor from "mui-rte";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {convertFromHTML, ContentState, convertToRaw} from "draft-js";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterDateFns";
import {emptyTask} from "../store/reducers/app";
import {format} from "date-fns";
import {stateToHTML} from "draft-js-export-html";
import {useConfirm} from "material-ui-confirm";
import axios from "axios";
import {backend} from "../";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

interface ListsState {
 accepts: string[];
}

export const Board: React.FC = () => {
 useSelector((state) => state);
 const [alertV, setAlert] = React.useState(false);
 const [alertContent, setAlertContent] = React.useState("");
 const [openSnack, setOpenSnack] = React.useState(false);
 const [text, setText] = React.useState("");
 const [errorMessage, setErrorMessage] = React.useState("");
 const [saveDisabled, setsaveDisabled] = React.useState(false);

 const TITLE_MIN_LENGTH = 3;
 const handleCloseSnack = (
  event?: React.SyntheticEvent | Event,
  reason?: string
 ) => {
  if (reason === "clickaway") {
   return;
  }

  setOpenSnack(false);
 };
 React.useEffect(() => {
  // Set errorMessage only if text is equal or bigger than MAX_LENGTH
  if (text.length < TITLE_MIN_LENGTH) {
   setErrorMessage("Title Too Short");
  }
 }, [text]);

 const columns = useTypeSelector((state) => state.app.columns);
 const tasks = useTypeSelector((state) => state.tasks.tasks);
 const labels = useTypeSelector((state) => state.labels.Label);
 const error = useTypeSelector((state) => state.app.error);
 const workingObject = useTypeSelector((state) => state.app.active);
 const contentHTML = convertFromHTML(workingObject.description);
 const content = ContentState.createFromBlockArray(
  contentHTML.contentBlocks,
  contentHTML.entityMap
 );
 const description = JSON.stringify(convertToRaw(content));
 let deadLine = new Date();

 if (workingObject.id) {
  const deadlineParse = workingObject.deadline.split(" ");
  const [dday, dmonth, dyear] = deadlineParse[0].split("-");
  const [dhours, dminutes, dseconds] = deadlineParse[1].split(":");
  const deadline = `${dyear}-${dmonth}-${dday} ${dhours}:${dminutes}:${dseconds}`;
  deadLine = new Date(deadline);
 } else {
  workingObject.deadline = format(deadLine, "dd-MM-Y HH:mm:ss");
 }
 const showError = (msg: string) => {
  setAlert(false);
  setAlertContent(msg);
  setAlert(true);
  setOpenSnack(true);
 };

 const open = useTypeSelector((state) => state.app.dialog);

 const handleChange = (newValue: Date | null, active: Tasks) => {
  if (!newValue) return false;
  active.deadline = format(newValue, "dd-MM-Y HH:mm:ss");
 };

 const handleLabelsOnChange = (event: SelectChangeEvent<unknown>) => {
  let value: number[] = event.target.value as number[];
  workingObject.labels = value;
  updateActive();
 };

 const setAppError = (error: string = "") => {
  store.dispatch({
   type: AppActionTypes.FETCH_APP_ERROR,
   payload: error,
  });
 };

 const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const value = event.target.value as string;
  workingObject.title = value;
  updateActive();
  ssetsaveDisabled(true);

  if (workingObject.title.length > TITLE_MIN_LENGTH) setAppError("");
  else setAppError("Title");
 };

 const updateActive = (clear: boolean = false) => {
  setAppError();
  try {
   store.dispatch({
    type: AppActionTypes.CHANGE_ACTIVE,
    payload: clear ? emptyTask : workingObject,
   });
  } catch (e) {
   store.dispatch({
    type: AppActionTypes.FETCH_APP_ERROR,
    payload: "Unable to change dialog state",
   });
  }
 };
 const onEditorChange = (event: any) => {
  const plainText = event.getCurrentContent().getPlainText();
  const rteContent = stateToHTML(event.getCurrentContent());
  workingObject.description = rteContent;
 };

 const handleStatusOnChange = (event: SelectChangeEvent<unknown>) => {
  const value = event.target.value as string;
  workingObject.status = value;
  updateActive();
 };

 const handleClose = () => {
  try {
   store.dispatch({
    type: AppActionTypes.OPEN_APP_DIALOG,
    payload: false,
   });
   setTimeout(() => {
    updateActive(true);
   }, 200);
  } catch (e) {
   store.dispatch({
    type: AppActionTypes.FETCH_APP_ERROR,
    payload: "Unable to change dialog state",
   });
  }
 };
 const createTask = () => {
  const errMsg = "Could not create: " + workingObject.title;
  if (!backend) workingObject.id = tasks.length + 1;
  axios.post("/api/tasks/", {task: workingObject}).then((res) => {
   if (res.data.result) {
    if (backend) workingObject.id = res.data.id;
    try {
     store.dispatch({
      type: TasksActionTypes.CREATE_TASK,
      payload: workingObject,
     });
    } catch (e) {
     store.dispatch({
      type: AppActionTypes.FETCH_APP_ERROR,
      payload: errMsg,
     });
    }
   } else showError(errMsg);
  });
 };
 const deleteTask = () => {
  const errMsg = "Could not delete: " + workingObject.title;
  let id: null | number = workingObject.id;
  axios.post("/api/tasks/" + id + "/delete").then((res) => {
   if (res.data.result) {
    try {
     store.dispatch({
      type: TasksActionTypes.DELETE_TASK,
      payload: id,
     });
    } catch (e) {
     store.dispatch({
      type: AppActionTypes.FETCH_APP_ERROR,
      payload: errMsg,
     });
    }
   } else showError(errMsg);
  });
 };
 const updateTask = () => {
  const errMsg = "Could not update: " + workingObject.title;
  axios
   .post("/api/tasks/" + workingObject.id, {task: workingObject})
   .then((res) => {
    if (res.data.result) {
     updateActive();
     try {
      store.dispatch({
       type: TasksActionTypes.UPDATE_TASK,
       payload: workingObject,
      });
     } catch (e) {
      store.dispatch({
       type: AppActionTypes.FETCH_APP_ERROR,
       payload: errMsg,
      });
     }
    } else {
     showError(errMsg);
    }
   });
 };

 const updateOrCreateTask = () => {
  workingObject.id ? updateTask() : createTask();
 };
 const handleSave = () => {
  if (error.length) return false;
  try {
   store.dispatch({
    type: AppActionTypes.OPEN_APP_DIALOG,
    payload: false,
   });
   setTimeout(() => {
    setTimeout(() => {
     updateOrCreateTask();
     updateActive(true);
    }, 200);
   }, 200);
  } catch (e) {
   store.dispatch({
    type: AppActionTypes.FETCH_APP_ERROR,
    payload: "Unable to change dialog state",
   });
  }
 };
 const confirm = useConfirm();
 const handleDelete = () => {
  confirm({description: "This action is permanent!"}).then(() => {
   try {
    store.dispatch({
     type: AppActionTypes.OPEN_APP_DIALOG,
     payload: false,
    });
    setTimeout(() => {
     updateActive(true);
     deleteTask();
    }, 200);
   } catch (e) {
    store.dispatch({
     type: AppActionTypes.FETCH_APP_ERROR,
     payload: "Unable to change state",
    });
   }
  });
 };

 const handleDrop = (card: Tasks, item: ColumnState) => {
  card.status = item.id;
  const errMsg = "Could not update: " + card.title;

  try {
   store.dispatch({type: TasksActionTypes.UPDATE_TASK, payload: card});
  } catch (e) {
   store.dispatch({
    type: TasksActionTypes.FETCH_TASKS_ERROR,
    payload: errMsg,
   });
  }
 };

 return (
  <div className="boardContainer">
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
   {columns.map((colum) => (
    <ColumnCommponent
     accept={[ItemTypes.CARD]}
     onDrop={(item) => handleDrop(item.task, colum)}
     column={colum}
     key={colum.id}
    />
   ))}

   <div>
    <Dialog
     sx={{height: "100%"}}
     open={open}
     onClose={handleClose}
     maxWidth="md"
     PaperProps={{
      sx: {
       width: "50%",
       maxHeight: "100%",
      },
     }}
    >
     <DialogTitle>{workingObject.id ? "Edit" : "Add New"} Task</DialogTitle>
     <DialogContent>
      <DialogContentText></DialogContentText>

      <FormControl variant="standard" sx={{m: 0, minWidth: "100%"}}>
       <InputLabel id="status">Status</InputLabel>
       <Select
        labelId="status"
        id="statusSelector"
        value={workingObject.status}
        multiple={false}
        label="Status"
        onChange={handleStatusOnChange}
        sx={{}}
       >
        {columns.map((columnItem) => {
         return (
          <MenuItem key={columnItem.id} value={columnItem.id}>
           {columnItem.name}
          </MenuItem>
         );
        })}
       </Select>
      </FormControl>

      <TextField
       margin="dense"
       id="title"
       label="Title"
       helperText={errorMessage}
       error={error.length > 0 ? true : false}
       value={workingObject.title}
       type="text"
       fullWidth
       onChange={handleTitleChange}
       variant="standard"
      />
      <MUIRichTextEditor
       id="description"
       controls={["bold", "italic", "underline"]}
       label="Description..."
       defaultValue={description}
       onChange={onEditorChange}
      />

      <FormControl
       variant="standard"
       sx={{m: 0, minWidth: "100%", marginBottom: "35px"}}
      >
       <InputLabel id="labels">Labels</InputLabel>
       <Select
        labelId="labels"
        id="labelsSelector"
        value={workingObject.labels}
        multiple={true}
        label="Labels"
        onChange={handleLabelsOnChange}
        sx={{}}
       >
        {labels.map((label) => {
         return (
          <MenuItem key={label.id} sx={{color: label.color}} value={label.id}>
           {label.title}
          </MenuItem>
         );
        })}
       </Select>
      </FormControl>

      <LocalizationProvider dateAdapter={DateAdapter}>
       <DateTimePicker
        ampm={false}
        label="Deadline"
        inputFormat="dd-MM-Y HH:mm:ss"
        mask="__-__-____ __:__:__"
        value={deadLine}
        onChange={(newValue) => handleChange(newValue, workingObject)}
        renderInput={(params) => <TextField {...params} />}
       />
      </LocalizationProvider>
     </DialogContent>
     <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button sx={{color: "error.dark"}} onClick={handleDelete}>
       Delete
      </Button>
      <Button
       disabled={saveDisabled}
       sx={{color: "success.dark"}}
       onClick={handleSave}
      >
       Save
      </Button>
     </DialogActions>
    </Dialog>
   </div>
  </div>
 );
};
