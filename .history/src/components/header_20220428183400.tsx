import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import {useTypeSelector} from "../hooks/useTypedSelector";
import {AppActionTypes} from "../types/app";
import {store} from "../store";
import {LabelsComponent} from "./labels";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {theme} from "../";

export const Header: React.FC = () => {
 const sidebar = useTypeSelector((state) => state.app.sidebar);

 const toggleColorMode = () => () => {
  try {
   store.dispatch({
    type: AppActionTypes.THEME_UPDATE,
    payload: theme.palette.mode == "dark" ? "light" : "dark",
   });
  } catch (e) {
   store.dispatch({
    type: AppActionTypes.FETCH_APP_ERROR,
    payload: "Unable to change APP state",
   });
  }
 };

 const toggleDrawer = () => (event: React.KeyboardEvent | React.MouseEvent) => {
  try {
   store.dispatch({
    type: AppActionTypes.OPEN_APP_SIDEBAR,
    payload: sidebar ? false : true,
   });
  } catch (e) {
   store.dispatch({
    type: AppActionTypes.FETCH_APP_ERROR,
    payload: "Unable to change sidebar state",
   });
  }
 };

 return (
  <Box sx={{flexGrow: 1}} className="appBar">
   <AppBar
    sx={{background: "primary.main"}}
    className="header"
    position="relative"
   >
    <Toolbar>
     <IconButton
      onClick={toggleDrawer()}
      edge="start"
      aria-label="Sidebar"
      sx={{
       mr: 2,
       marginLeft: "-12px !important",
       marginRight: "16px !important",
       padding: "8px !important",
      }}
     >
      <MenuIcon sx={{color: "white"}} />
     </IconButton>
     <a href="/" style={{textDecoration: "initial"}}>
      <Typography variant="h6" sx={{color: "white"}}>
       Board
      </Typography>
     </a>
    </Toolbar>
    <Drawer anchor="left" open={sidebar} onClose={toggleDrawer()}>
     <Box
      sx={{width: 350}}
      role="presentation"
      onClick={toggleDrawer()}
      onKeyDown={toggleDrawer()}
     ></Box>
     <LabelsComponent />
    </Drawer>
    <div className="themeToggle">
     {theme.palette.mode} mode
     <IconButton sx={{ml: 1}} onClick={toggleColorMode} color="inherit">
      {theme.palette.mode == "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
     </IconButton>
    </div>
   </AppBar>
  </Box>
 );
};
