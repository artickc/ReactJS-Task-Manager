import {AppAction, AppActionTypes, AppState} from "../../types/app";
import {Tasks} from "../../types/tasks";

const emptyTask: Tasks = {
 id: null,
 title: "",
 description: "",
 deadline: "",
 labels: [1, 2],
 status: "",
};

const initialState: AppState = {
 columns: [
  {
   id: "TODO",
   name: "To do",
   error: false,
   loading: false,
  },
  {
   id: "INPROGRESS",
   name: "In progress",
   error: false,
   loading: false,
  },
  {
   id: "DONE",
   name: "Done",
   error: false,
   loading: false,
  },
  {
   id: "CANCELED",
   name: "Canceled",
   error: false,
   loading: false,
  },
 ],
 id: 0,
 loading: false,
 sidebar: false,
 dialog: false,
 error: null,
 active: emptyTask,
};

export const app = (state = initialState, action: AppAction): AppState => {
 switch (action.type) {
  case AppActionTypes.FETCH_APP:
   return state;
  case AppActionTypes.FETCH_APP_SUCCESS:
   return state;
  case AppActionTypes.OPEN_APP_SIDEBAR:
   return {
    id: 0,
    loading: false,
    error: null,
    sidebar: action.payload,
    dialog: false,
    columns: state.columns,
    active: state.active,
   };
  case AppActionTypes.OPEN_APP_DIALOG:
   return {
    id: 0,
    loading: false,
    error: null,
    sidebar: state.sidebar,
    dialog: action.payload,
    columns: state.columns,
    active: state.active,
   };
  case AppActionTypes.FETCH_APP_ERROR:
   return {
    id: 0,
    loading: false,
    error: action.payload,
    sidebar: false,
    dialog: false,
    columns: state.columns,
    active: state.active,
   };
  default:
   return state;
 }
};
