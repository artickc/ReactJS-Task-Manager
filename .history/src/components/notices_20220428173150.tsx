import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import * as React from "react";

interface NoticesProps {
 msg: string;
 type: string;
}
export const notifier: React.FC<NoticesProps> = React.memo(function notifier({
 msg,
 type,
}) {
 const [alertV, setAlert] = React.useState(false);
 const [alertContent, setAlertContent] = React.useState("");
 const [openSnack, setOpenSnack] = React.useState(false);

 const handleCloseSnack = (
  event?: React.SyntheticEvent | Event,
  reason?: string
 ) => {
  if (reason === "clickaway") {
   return;
  }

  setOpenSnack(false);
 };

 return (
  <div>
   {alertV ? (
    <Snackbar
     open={openSnack}
     autoHideDuration={6000}
     onClose={handleCloseSnack}
    >
     <Alert onClose={handleCloseSnack} severity="error" sx={{width: "100%"}}>
      {alertContent}
     </Alert>
    </Snackbar>
   ) : (
    ""
   )}
  </div>
 );
});
