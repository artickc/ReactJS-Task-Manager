import * as React from 'react';
import Box from '@mui/material/Box';
import { useTypeSelector } from "../hooks/useTypedSelector";
import { Dispatch } from 'redux';
import { store } from "../store";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { Button } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

const toggleLabel = () =>
(event: React.KeyboardEvent | React.MouseEvent) => {


};



export const LabelsComponent: React.FC = () => {
    const labels = useTypeSelector(state => state.labels.labels)
    return(
        <div className="sidebarContainer">
            <Typography variant="h6" color="palette.text.default">
                Labels: 
            </Typography>
            <div className="labelsContainer">
                <div className="labelItem">
                    {
                        labels.map(label => {
                            <Button key={label.key} variant="contained" sx={{color: 'red'}}>{label.title}</Button>
                        })
                    }
                </div>
            </div>
        </div>
    )
}