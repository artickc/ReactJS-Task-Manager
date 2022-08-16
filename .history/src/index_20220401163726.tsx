import React from "react";
import ReactDOM from "react-dom";
import AppWrapper from "./App";
import {Provider} from "react-redux";
import {store} from "./store";
import {ThemeProvider, createTheme} from "@mui/material/styles";
import {red} from "@mui/material/colors";
import {CssBaseline, GlobalStyles} from "@mui/material";
import {saveState} from "./store";
import worker from "./mocks/browser";
import {getTasks} from "./store/reducers/tasksReducer";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {getLabels} from "./store/reducers/labels";

require("dotenv").config();
export const appStatus: boolean = process.env.REACT_APP_MSW ? true : false;
if (appStatus) {
 worker.start();
}

store.subscribe(() => {
 saveState({
  labels: store.getState().labels,
  tasks: store.getState().tasks,
 });
});

let serialState: any = localStorage.getItem("appState");
if (serialState == null) {
 getTasks(), getLabels();
}

export const theme = createTheme({
 palette: {
  mode: "dark",
 },
});

Object.assign(theme, {
 overrides: {
  MUIRichTextEditor: {
   root: {
    width: "100%",
   },
   editorContainer: {
    borderBottom: "1px solid gray",
    background: theme.palette.background.default,
    border: "1px solid",
    borderColor: theme.palette.text.disabled,
    padding: "15px",
    borderRadius: "8px",
    width: "100%",
   },
  },
 },
});

theme.spacing(0);

ReactDOM.render(
 <Provider store={store}>
  <ThemeProvider theme={theme}>
   <DndProvider backend={HTML5Backend}>
    <CssBaseline />
    <GlobalStyles
     styles={{
      body: {backgroundColor: theme.palette.background.default},
      "::-webkit-scrollbar": {
       width: "0.4em",
       backgroundColor: theme.palette.background.default,
      },
      "::-webkit-scrollbar-thumb": {
       backgroundColor: theme.palette.action.active,
      },
     }}
    />
    <AppWrapper />
   </DndProvider>
  </ThemeProvider>
 </Provider>,
 document.getElementById("root")
);
