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


    const labels = useTypeSelector(state => state.labels.labels)  
    let active = useTypeSelector(state => state.labels.active) 

    const isActive = (val:number) => {
        return useTypeSelector(state => state.labels.active).some(v => (v === val));
    }

    function toggleLabel(id:number) {
        if(isActive(id)){
            var index = active.indexOf(id)
            if (index !== -1) active.splice(index, 1);
        }
        else active = [...active, id];
        console.log(active);
        try{
            store.dispatch({type:LabelsActionTypes.UPDATE_LABEL, payload: active})
        } catch (e){
            store.dispatch({type:LabelsActionTypes.FETCH_LABELS_ERROR, payload: 'Unable to change label state'})
        }
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
            let isOn:boolean = false;
            if(isActive(label.id))isOn = true;
            else isOn = false;
            let style = {};
            let className = "labelItem";
            if(isOn){
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
                border: '1px solid background.default',
                ...style
            }
        ));
        return  (<div className="labelItemMain"  key={label.id} onClick={toggleLabel(label.id)}><Item className={className} > {label.title} <AddIcon /> </Item></div>)
    }
        )}
        
      </Stack>

            </div>
        </div>
    )
}