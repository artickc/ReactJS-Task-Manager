import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import { useTypeSelector } from "../hooks/useTypedSelector";
import { AppActionTypes, AppAction } from '../types/app';
import { Dispatch } from 'redux';
import { store } from "../store";

export const DenseAppBar: React.FC = () => {
  const sidebar = useTypeSelector(state => state.app.sidebar)

  const toggleDrawer = () =>
  (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    console.log(sidebar)
    try{
      store.dispatch({type:AppActionTypes.OPEN_APP_SIDEBAR, payload: sidebar?false:true})
    } catch (e){
      store.dispatch({type:AppActionTypes.FETCH_APP_ERROR, payload: 'Unable to change sidebar state'})
    }
  };

  const list = () => (
    <Box
      sx={{ width: 350 }}
      role="presentation"
      onClick={toggleDrawer()}
      onKeyDown={toggleDrawer()}
    >
    </Box>
  );
  return (
    <Box sx={{ flexGrow: 1 }} className="appBar" >
      <AppBar position="relative">
        <Toolbar>
          <IconButton onClick={toggleDrawer()} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Board
          </Typography>
        </Toolbar>
        <Drawer
            anchor='left'
            open={sidebar}
            onClose={toggleDrawer()}
          >
            {list()}
          </Drawer>
      </AppBar>
    </Box>
  );
}