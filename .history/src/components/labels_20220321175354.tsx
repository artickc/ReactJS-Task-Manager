import * as React from 'react';
import Box from '@mui/material/Box';
import { useTypeSelector } from "../hooks/useTypedSelector";
import { Dispatch } from 'redux';
import { CssBaseline, GlobalStyles } from "@mui/material";
import { Button } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { store } from "../store";

const toggleLabel = () =>
(event: React.KeyboardEvent | React.MouseEvent) => {


};


export const LabelsComponent: React.FC = () => {
    const labels = useTypeSelector(state => state.app)    
    return(
        <div className="sidebarContainer">
            <Typography variant="h6" color="palette.text.default">
                Labels: 
            </Typography>
            <div className="labelsContainer">
                {
                console.log('ok');
                // labels.map(label => {
                //     <Button key="" variant="contained">l</Button>
                // })
                }
            </div>
        </div>
    )
}