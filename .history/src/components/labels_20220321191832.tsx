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
import { LabelsActionTypes, lLabelsAction } from '../types/labels'



export const LabelsComponent: React.FC = () => {
    const toggleLabel = (id:number) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
        let active = useTypeSelector(state => state.labels.active) 
        if(isActive(id)){
            var index = active.indexOf(id)
            if (index !== -1) active.splice(index, 1);
        }
        else active = [...active, id];
        try{
            store.dispatch({type:LabelsActionTypes.UPDATE_LABEL, payload: active})
            return true;
        } catch (e){
            store.dispatch({type:LabelsActionTypes.FETCH_LABELS_ERROR, payload: 'Unable to change label state'})
            return false;
        }
    };

    const labels = useTypeSelector(state => state.labels.labels)    
    const isActive = (val:number) => {
        return useTypeSelector(state => state.labels.active).some(v => (v === val));
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
            let className = "labelItem";
            if(active){
                style =             {
                color: label.color,
                borderColor: label.color
            };
            className +=' active';
        }
            else{
                style =             {
                    color: label.color
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
        return <Item onClick={toggleLabel(label.id)} key={label.id} className={className}>{label.title} <AddIcon /></Item>
    }
        )}
        
      </Stack>

            </div>
        </div>
    )
}