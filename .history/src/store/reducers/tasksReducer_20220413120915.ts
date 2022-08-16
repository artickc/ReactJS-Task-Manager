import {
 TasksAction,
 TasksActionTypes,
 TasksState,
 Tasks,
} from "../../types/tasks";
import axios from "axios";
import {store} from "..";
import {useSelector} from "react-redux";
import {RootState} from ".";

const initialState: TasksState = {
 tasks: [],
 loading: false,
 error: null,
};

export const getTasks = () => {
 return axios.get("/api/tasks").then((res) => {
  try {
   store.dispatch({
    type: TasksActionTypes.FETCH_TASKS_SUCCESS,
    payload: res.data.testTasks,
   });
  } catch (e) {
   store.dispatch({
    type: TasksActionTypes.FETCH_TASKS_ERROR,
    payload: "Unable to get tasks via API",
   });
  }
 });
};

export const tasksReudcer = (
 state = initialState,
 action: TasksAction
): TasksState => {
 switch (action.type) {
  case TasksActionTypes.FETCH_TASKS:
   return {loading: true, error: null, tasks: []};
  case TasksActionTypes.FETCH_TASKS_SUCCESS:
   return {loading: false, error: null, tasks: action.payload};
  case TasksActionTypes.UPDATE_TASK:
   let tasks = state.tasks;
   const newTask = action.payload.newTask;
   tasks.map((el: Tasks) => (el.id === newTask.id ? {...el, newTask} : el));
   console.log(newTask, tasks);
   return {loading: false, error: null, tasks: tasks};
  case TasksActionTypes.FETCH_TASKS_ERROR:
   return {
    loading: false,
    error: action.payload,
    tasks: [],
   };
  default:
   return state;
 }
};
