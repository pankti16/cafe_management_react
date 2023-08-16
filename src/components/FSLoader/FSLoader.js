import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
//Component to show full screen loader
const FSLoader = ({show}) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: 99999 }}
      open={show}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default FSLoader;
