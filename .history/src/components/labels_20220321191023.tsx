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







  
export const LabelsComponent: React.FC = () => {
    const toggleLabel = (id) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
        let active = useTypeSelector(state => state.labels.active) 
        if(isActive(id)){
            var index = active.indexOf(id)
            if (index !== -1) active.splice(index, 1);
        }
        else active = [...active, id];
    };

    const labels = useTypeSelector(state => state.labels.labels)    
    const isActive = (val:number) => {
        return useTypeSelector(state => state.labels.active).some(v => (v == val));
    }
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
            let active:boolean = false;
            if(isActive(label.id))active = true;
            else active = false;
            let style = {};
            if(active){
                style =             {
                color: label.color
            }
        }
            else{
                style =             {
                    color: label.color,
                    borderColor: label.color,
                }
            }
            let Item = styled(Paper)(({ theme }) => (
            {
                backgroundColor: "background.default",
                padding: theme.spacing(2),
                textAlign: 'left',
                border: '1px solid',
                ...style
            }
        ));
        return <Item key={label.id} className="labelItem">{label.title} <AddIcon /></Item>
    }
        )}
        
      </Stack>

            </div>
        </div>
    )
}