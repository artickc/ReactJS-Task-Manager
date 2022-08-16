import {Tasks} from "./tasks";

export interface AppState {
 columns: ColumnState[];
 id: number;
 loading: boolean;
 sidebar: boolean;
 dialog: boolean;
 active: Tasks;
 error: null | string;
}
export interface ColumnState {
 id: string;
 name: string;
 error: boolean;
 loading: boolean;
}

export enum AppActionTypes {
 FETCH_APP = "FETCH_APP",
 FETCH_APP_SUCCESS = "FETCH_APP_SUCCESS",
 OPEN_APP_SIDEBAR = "OPEN_APP_SIDEBAR",
 OPEN_APP_DIALOG = "OPEN_APP_DIALOG",
 FETCH_APP_ERROR = "FETCH_APP_ERROR",
}

interface FetchAppAction {
 type: AppActionTypes.FETCH_APP;
}
interface FetchTAppSuccessAction {
 type: AppActionTypes.FETCH_APP_SUCCESS;
 payload: any[];
}
interface FetchTAppErrorAction {
 type: AppActionTypes.FETCH_APP_ERROR;
 payload: string;
}
interface openAppSidebarAction {
 type: AppActionTypes.OPEN_APP_SIDEBAR;
 payload: boolean;
}
interface openAppDialogAction {
 type: AppActionTypes.OPEN_APP_DIALOG;
 payload: boolean;
}
export type AppAction =
 | FetchAppAction
 | FetchTAppSuccessAction
 | openAppDialogAction
 | FetchTAppErrorAction
 | openAppSidebarAction;