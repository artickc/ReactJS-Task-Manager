import * as React from "react";

export const [alertV, setAlert] = React.useState(false);
export const [alertContent, setAlertContent] = React.useState("");
export const [openSnack, setOpenSnack] = React.useState(false);
export const showError = (msg: string) => {
 setAlert(false);
 setAlertContent(msg);
 setAlert(true);
 setOpenSnack(true);
};
