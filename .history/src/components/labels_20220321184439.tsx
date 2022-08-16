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
import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';




const toggleLabel = () =>
(event: React.KeyboardEvent | React.MouseEvent) => {


};


  
export const LabelsComponent: React.FC = () => {
    const labels = useTypeSelector(state => state.labels.labels)    
    const exists = useTypeSelector(state => state.labels.active).some(v => (v === this));
    return(
        <div className="sidebarContainer">
            <Typography variant="h6" color="palette.text.default">
                Labels: 
            </Typography>
            <div className="labelsContainer">
            <Stack
        direction="column"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={1}
      >
          
                {
                
                labels.map(label=>
        {
            let Item = styled(Paper)(({ theme }) => ({
            backgroundColor: "background.default",
            padding: theme.spacing(2),
            textAlign: 'left',
            color: label.color
        }));
        return <Item className="labelItem">{label.title} <AddIcon /></Item>
    }
        )}
        
      </Stack>

            </div>
        </div>
    )
}