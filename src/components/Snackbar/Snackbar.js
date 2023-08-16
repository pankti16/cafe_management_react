import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";
import { hideSnackbarAction } from "../../store/Snackbar/SnackbarAction";

const Alert = React.forwardRef((props, ref) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
});
//Component to show messages
export const MaterialSnackbar = React.forwardRef((props, ref) => {
  const { isOpen, message, type } = useSelector((state) => state.snackbar);
  const dispatch = useDispatch();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(hideSnackbarAction());
  };
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={2000}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      key={`bottom,center`}
      onClose={handleClose}
    >
      <div>
        <Alert onClose={handleClose} severity={type} className="medium_font">
          {message}
        </Alert>
      </div>
    </Snackbar>
  );
});
