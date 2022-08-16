import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import { useTypeSelector } from "../hooks/useTypedSelector";
import { Dispatch } from 'react';

export const DenseAppBar: React.FC = () => {
  const sidebar = useTypeSelector(state => state.app.sidebar)

  const toggleDrawer = (anchor, open: boolean) =>
  (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer('left', false)}
      onKeyDown={toggleDrawer('left', false)}
    >
    </Box>
  );
  return (
    <Box sx={{ flexGrow: 1 }} className="appBar" >
      <AppBar position="relative">
        <Toolbar onClick={toggleDrawer('left', true)}>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Board
          </Typography>
        </Toolbar>
        <Drawer
            anchor='left'
            open={sidebar}
            onClose={toggleDrawer('left', false)}
          >
            {list()}
          </Drawer>
      </AppBar>
    </Box>
  );
}