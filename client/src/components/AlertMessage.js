import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import Close from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";

export default function AlertMessage(props) {
  const [open, setOpen] = useState(true);

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
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
          severity={props.severity}
          sx={{ width: "100%" }}
        >
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
