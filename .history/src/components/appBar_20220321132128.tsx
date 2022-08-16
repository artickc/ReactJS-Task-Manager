import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import  TemporaryDrawer  from './sidebar'

export const DenseAppBar: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }} className="appBar" >
      <AppBar position="relative">
        <Toolbar onClick={TemporaryDrawer.toggleDrawer('left', true)}>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Board
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}