import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";


export default function ErrorSnackbar(props) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      open={props.open}
      autoHideDuration={6000}
      onClose={props.handleClose}
      message={props.message}
      action={
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={props.handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />
  )
}
