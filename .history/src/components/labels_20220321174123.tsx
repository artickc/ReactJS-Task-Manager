import * as React from 'react';
import Box from '@mui/material/Box';
import { useTypeSelector } from "../hooks/useTypedSelector";
import { Dispatch } from 'redux';
import { store } from "../store";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { Button } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';



const toggleLabel = () =>
(event: React.KeyboardEvent | React.MouseEvent) => {


};



export const LabelsComponent: React.FC = () => {
    return(
        <div className="sidebarContainer">
            <Typography variant="h6" color="palette.text.default">
                Labels: 
            </Typography>
            <div className="labelsContainer">
                <div className="labelItem">
                    <Button variant="contained">Contained</Button>
                    <Button variant="contained">Contained</Button>
                    <Button variant="contained">Contained</Button>
                    <Button variant="contained" endIcon={<DeleteIcon  />>Contained</Button>
                </div>
            </div>
        </div>
    )
}