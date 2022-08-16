import * as React from "react";
import {useTypeSelector} from "../hooks/useTypedSelector";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import {store} from "../store";
import {Stack} from "@mui/material";
import {styled} from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import {LabelsActionTypes, lLabelsAction} from "../types/labels";
import {useSelector} from "react-redux";
import {RootState} from "../store/reducers";
import {Tasks} from "../types/tasks";
import {TasksActionTypes} from "../types/tasks";

export const LabelsComponent = () => {
 useSelector((state) => state); //Without this labels state won't update on front end
 const labels = useSelector((state: RootState) => state.labels.Label);
 let tasks = useSelector((state: RootState) => state.tasks.tasks);
 let active = useSelector((state: RootState) => state.labels.active);
 const toggleLabel = (id: number) => (event: React.MouseEvent) => {
  if (active.some((v) => v === id)) {
   var index = active.indexOf(id);
   if (index !== -1) active.splice(index, 1);
  } else active = [...active, id];
  const res = {Label: labels, active: active};
  try {
   store.dispatch({type: LabelsActionTypes.UPDATE_LABEL, payload: res});
  } catch (e) {
   store.dispatch({
    type: LabelsActionTypes.FETCH_LABELS_ERROR,
    payload: "Unable to change label state",
   });
  }
  tasks.map((task: Tasks) => {
   if (!active.some((v) => v === task.id) && active.length > 0) {
    var index = tasks.indexOf(task);
    if (index !== -1) {
     tasks.splice(index, 1);
    }
   }
  });
  try {
   store.dispatch({
    type: TasksActionTypes.FETCH_TASKS_SUCCESS,
    payload: tasks,
   });
  } catch (e) {
   store.dispatch({
    type: TasksActionTypes.FETCH_TASKS_ERROR,
    payload: "Unable to get tasks via API",
   });
  }
 };
 return (
  <div className="sidebarContainer">
   <Typography variant="h6" color="palette.text.default">
    Labels:
   </Typography>
   <div className="labelsContainer">
    <Stack
     direction="column"
     divider={<Divider orientation="vertical" flexItem />}
     spacing={1}
    >
     {labels.map((label) => {
      let isOn: string = "deactivate";
      active = useSelector((state: RootState) => state.labels.active);
      isOn = active.some((v) => v === label.id) ? "active" : "deactivate";
      let Item = styled(Paper)(({theme}) => ({
       backgroundColor: "background.default",
       padding: theme.spacing(2),
       textAlign: "left",
       border: "1px solid",
       color: label.color,
       borderColor: isOn == "active" ? label.color : "transparent",
      }));

      let icon: any = false;
      if (isOn == "active") icon = <CloseIcon color="error" />;
      else icon = <AddIcon color="success" />;

      return (
       <Item
        key={label.id}
        onClick={toggleLabel(label.id)}
        className={"labelItem " + isOn}
       >
        {" "}
        {label.title} {icon}
       </Item>
      );
     })}
    </Stack>
   </div>
  </div>
 );
};
