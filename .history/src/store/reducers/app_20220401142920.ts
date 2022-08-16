import {AppAction, AppActionTypes, AppState} from "../../types/app";

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
    sidebar: false,
    columns: state.columns,
   };
  case AppActionTypes.FETCH_APP_ERROR:
   return {
    id: 0,
    loading: false,
    error: action.payload,
    sidebar: false,
    sidebar: false,
    columns: state.columns,
   };
  default:
   return state;
 }
};
