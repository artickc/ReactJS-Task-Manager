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
import {store} from "../store";
import {TasksActionTypes, Tasks} from "../types/tasks";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog, {DialogProps} from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {AppActionTypes, AppAction} from "../types/app";
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
import emptyTask from "../types/app";

interface ListsState {
 accepts: string[];
}

export const Board: React.FC = () => {
 useSelector((state) => state);
 const columns = useTypeSelector((state) => state.app.columns);
 const tasks = useTypeSelector((state) => state.tasks.tasks);
 const labels = useTypeSelector((state) => state.labels.Label);
 const active = useTypeSelector((state) => state.app.active);

 const contentHTML = convertFromHTML(active.description);
 const content = ContentState.createFromBlockArray(
  contentHTML.contentBlocks,
  contentHTML.entityMap
 );
 const description = JSON.stringify(convertToRaw(content));
 const crrDate = active.deadline ? active.deadline : new Date();

 const [statusLists] = React.useState<ListsState[]>([
  {accepts: [ItemTypes.CARD]},
 ]);
 const open = useTypeSelector((state) => state.app.dialog);

 const [value, setValue] = React.useState<Date | null>(new Date(crrDate));

 const handleChange = (newValue: Date | null) => {
  setValue(newValue);
 };

 const handleClose = () => {
  try {
   store.dispatch({
    type: AppActionTypes.OPEN_APP_DIALOG,
    payload: false,
   });
   store.dispatch({
    type: AppActionTypes.CHANGE_ACTIVE,
    payload: store.emptyTask,
   });
  } catch (e) {
   store.dispatch({
    type: AppActionTypes.FETCH_APP_ERROR,
    payload: "Unable to change dialog state",
   });
  }
 };

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
     <DialogTitle>{active.id ? "Edit" : "Add New"} Task</DialogTitle>
     <DialogContent>
      <DialogContentText></DialogContentText>

      <FormControl variant="standard" sx={{m: 0, minWidth: "100%"}}>
       <InputLabel id="status">Status</InputLabel>
       <Select
        labelId="status"
        id="statusSelector"
        defaultValue={active.status}
        multiple={false}
        label="Status"
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
       defaultValue={active.title}
       type="text"
       fullWidth
       variant="standard"
      />
      <MUIRichTextEditor
       id="description"
       controls={["bold", "italic", "underline"]}
       label="Description..."
       defaultValue={description}
      />

      <FormControl
       variant="standard"
       sx={{m: 0, minWidth: "100%", marginBottom: "35px"}}
      >
       <InputLabel id="labels">Labels</InputLabel>
       <Select
        labelId="labels"
        id="labelsSelector"
        defaultValue={active.labels}
        multiple={true}
        label="Labels"
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
        label="Date&Time picker"
        inputFormat="dd-MM-Y HH:mm:ss"
        value={value}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} />}
       />
      </LocalizationProvider>
     </DialogContent>
     <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleClose}>Save</Button>
     </DialogActions>
    </Dialog>
   </div>
  </div>
 );
};
