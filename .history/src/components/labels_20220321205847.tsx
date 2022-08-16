import * as React from 'react';
import { useTypeSelector } from "../hooks/useTypedSelector";
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { store } from "../store";
import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import { LabelsActionTypes, lLabelsAction } from '../types/labels'
import { useSelector } from 'react-redux';

export const LabelsComponent = () => {



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
                let isOn:string = 'deactivate';
                active = useTypeSelector(state => state.labels.active) 
                isOn = active.some(v => (v === label.id))?'active': 'deactivate';
                 let Item = styled(Paper)(({ theme }) => (
                    {
                        backgroundColor: "background.default",
                        padding: theme.spacing(2),
                        textAlign: 'left',
                        border: '1px solid',
                        color: label.color,
                        borderColor: isOn == 'active'?label.color:"transparent"
                    }));

                    let icon:any = false;
                    if(isOn == 'active') icon = <CloseIcon color="error" />
                    else icon = <AddIcon color="success" />

                return  <Item key={label.id} onClick={toggleLabel(label.id)} className={"labelItem "+isOn} > {label.title} {icon}</Item>
    }
        )}
        
      </Stack>

            </div>
        </div>
    )
}