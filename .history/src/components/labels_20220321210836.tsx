import * as React from 'react';
import { useTypeSelector } from "../hooks/useTypedSelector";
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { store } from "../store";
import { Stack, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import { LabelsActionTypes, lLabelsAction } from '../types/labels'
import { useSelector } from 'react-redux';
import { ExpandMore } from '@mui/icons-material'

export const LabelsComponent = () => {

    const defState = useSelector(state => state.labels);
    return <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-label="Expand"
        aria-controls="-content"
        id="-header"
      >
        <Typography></Typography>
      </AccordionSummary>
      <AccordionDetails></AccordionDetails>
    </Accordion>;
}