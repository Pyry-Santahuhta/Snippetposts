import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import Close from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";

//Alert messages component for various actions in the application
export default function AlertMessage(props) {
  //State to show the snackbar or not, default to true when called
  const [open, setOpen] = useState(true);

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    //Close the snackbar
    setOpen(false);
  }

  return (
    <div>
      <Snackbar
        open={open}
        onClose={handleClose}
        action={[
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>,
        ]}
      >
        <Alert
          onClose={handleClose}
          //Get the severity/color from props.
          severity={props.severity}
          sx={{ width: "100%" }}
        >
          {/* get the alert message from props */}
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
