import {
 LabelsState,
 LabelsActionTypes,
 lLabelsAction,
} from "../../types/labels";
import axios from "axios";
import {store} from "..";
import {useSelector} from "react-redux";

export interface RequestBody {}
export interface TasksResponse {
 [items: string]: any[];
}

let Label: LabelsState = {
 Label: [],
 active: [],
};

export const getLabels = () => {
 return axios.get("/api/labels").then((res) => {
  try {
   store.dispatch({
    type: LabelsActionTypes.FETCH_LABELS,
    payload: res.data.initialState,
   });
  } catch (e) {
   store.dispatch({
    type: LabelsActionTypes.FETCH_LABELS_ERROR,
    payload: "Unable to get tasks via API",
   });
  }
 });
};

export const labels = (state = Label, action: lLabelsAction): LabelsState => {
 switch (action.type) {
  case LabelsActionTypes.FETCH_LABELS:
   return {Label: action.payload.Label, active: action.payload.active};
  case LabelsActionTypes.UPDATE_LABEL:
   return {Label: action.payload.Label, active: action.payload.active};
  default:
   return state;
 }
};
