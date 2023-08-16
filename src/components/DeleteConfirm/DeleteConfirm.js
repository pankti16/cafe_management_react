import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Btn } from "../Controls/Button/Button";
import { CommonText, CafeText, EmployeeText } from "../../utils/Texts";
//Dialog for confirmation before deleting
export default function DeleteConfirm({ open, handleClose, name, type }) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => {
          handleClose(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {CommonText.deleteTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {CommonText.deleteBody}
            <strong>
              {` ${name} `}
            </strong>
            {type === "cafe"
              ? CafeText.deleteBody
              : EmployeeText.deleteBody}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Btn
            text={CommonText.deleteBtn}
            variant="text"
            color="error"
            handleClick={() => {
              handleClose(true);
            }}
          />
          <Btn
            text={CommonText.cancelBtn}
            variant="text"
            autoFocus
            focusRipple
            handleClick={() => {
              handleClose(false);
            }}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
}
