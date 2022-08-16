import * as React from 'react';
import Box from '@mui/material/Box';
import { useTypeSelector } from "../hooks/useTypedSelector";
import { Dispatch } from 'redux';
import { store } from "../store";
import { CssBaseline, GlobalStyles } from "@mui/material";



export const labels: React.FC = () => {
    return(
        <Box
        sx={{ width: 350 }}
        role="presentation"
        onClick={toggleDrawer()}
        onKeyDown={toggleDrawer()}
        >
        </Box>
    )
);