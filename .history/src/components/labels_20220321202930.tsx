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
import { RootState } from "../store/reducers";
import { useSelector } from 'react-redux';

export const LabelsComponent: React.FC = () => {


    const labels = useTypeSelector(state => state.labels.labels)  
    let active = useTypeSelector(state => state.labels.active) 

    const toggleLabel = (id:number) =>{
        if(active.some(v => (v === id))){
            var index = active.indexOf(id)
            if (index !== -1) active.splice(index, 1);
        }
        else active = [...active, id];
        store.dispatch({type:LabelsActionTypes.UPDATE_LABEL, payload: active})
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
                    <div style={{
                        textAlign: 'left',
                        border: '1px solid',
                        color: label.color,
                        borderColor: useSelector(state => state.labels.active).some(v => (v === label.id))?label.color:"transparent"    
                    }} key={label.id} onClick={() => toggleLabel(label.id)} className={useSelector(state => state.labels.active).some(v => (v === label.id))?'labelItem active': 'labelItem'}>
                        {label.title}
                        {useSelector(state => state.labels.active).some(v => (v === label.id))?<CloseIcon color="error" />:<AddIcon color="success" />}
                    </div>
        )}
        
      </Stack>

            </div>
        </div>
    )
}