import {AppAction, AppActionTypes, AppState} from "../../types/app";
import {Tasks} from "../../types/tasks";

export const emptyTask: Tasks = {
 id: null,
 title: "",
 description: "",
 deadline: "",
 labels: [],
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
 theme: "dark",
 active: emptyTask,
};

export const app = (state = initialState, action: AppAction): AppState => {
 switch (action.type) {
  case AppActionTypes.FETCH_APP:
   return state;
  case AppActionTypes.FETCH_APP_SUCCESS:
   return state;
  case AppActionTypes.OPEN_APP_SIDEBAR:
   state.sidebar = action.payload;
   return state;
  case AppActionTypes.CHANGE_ACTIVE:
   state.active = action.payload;
   return state;
  case AppActionTypes.OPEN_APP_DIALOG:
   state.dialog = action.payload;
   return state;
  case AppActionTypes.FETCH_APP_ERROR:
   state.error = action.payload;
   return state;
  case AppActionTypes.THEME_UPDATE:
   state.theme = action.payload;
   return state;
  default:
   return state;
 }
};
