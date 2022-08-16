export enum TasksActionTypes {
 FETCH_TASKS = "FETCH_TASKS",
 FETCH_TASKS_SUCCESS = "FETCH_TASKS_SUCCESS",
 UPDATE_TASK = "UPDATE_TASK",
 FETCH_TASKS_ERROR = "FETCH_TASKS_ERROR",
}

export interface TasksState {
 tasks: any[] | any;
 loading?: boolean;
 error?: null | string;
}
interface FetchTasksAction {
 type: TasksActionTypes.FETCH_TASKS;
}
interface FetchTasksSuccessAction {
 type: TasksActionTypes.FETCH_TASKS_SUCCESS;
 payload: Tasks[];
}
interface FetchTasksErrorAction {
 type: TasksActionTypes.FETCH_TASKS_ERROR;
 payload: null | string;
}
interface UpdateTaskAction {
 type: TasksActionTypes.UPDATE_TASK;
 payload: {tasks: Tasks[]; newTask: Tasks};
}
export type TasksAction =
 | FetchTasksAction
 | FetchTasksSuccessAction
 | UpdateTaskAction
 | FetchTasksErrorAction;

export interface RequestBody {}
export interface TasksRecieve {
 description?: string;
 title?: string;
 deadline?: string;
 labels?: number[];
}
export interface Tasks {
 id: number | null;
 title: string;
 description: string;
 deadline: string; // `D-M-Y H:i:s`
 labels: number[];
 status: string; // 'TODO' | 'INPROGRESS' | 'DONE' | 'CENCELED'
}
export interface TasksResponse {
 [items: string]: any[];
}
