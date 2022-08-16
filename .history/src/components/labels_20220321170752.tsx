import * as React from 'react';
import Box from '@mui/material/Box';
import { useTypeSelector } from "../hooks/useTypedSelector";
import { Dispatch } from 'redux';
import { store } from "../store";
import { CssBaseline, GlobalStyles } from "@mui/material";


const toggleLabel = () =>
(event: React.KeyboardEvent | React.MouseEvent) => {
  if (
    event.type === 'keydown' &&
    ((event as React.KeyboardEvent).key === 'Tab' ||
      (event as React.KeyboardEvent).key === 'Shift')
  ) {
    return;
  }

};



export const labels: React.FC = () => {
    return(
        'label'
    )
);