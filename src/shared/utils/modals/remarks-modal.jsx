import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import {
  inputFieldStyle,
  lable1Style,
  remarksInputContainerSx,
} from "app";
import Button1 from "../button/button1";
import { hasValue } from "..";
import FullScreenModel from "./fullscreen-modal";

const UnWrappedRemarksInputModel = (Props) => {
  const [remarks, setRemarks] = useState(null);
  const { open, closeRemarksInputModel, remarksInputModelProps } = Props || "";
  const { dialogFunction, dialogContentText } = remarksInputModelProps || "";
  const handleRemarksChange = (event) => {
    const { value } = event.target;
    if (hasValue(value)) {
      setRemarks(value);
    } else {
      setRemarks("");
    }
  };

  const remarksConfirmYes = () => {
    dialogFunction(remarks);
  };
  return (
    <Dialog open={open}>
      <DialogContent>
        {dialogContentText && (
          <DialogContentText>{dialogContentText}</DialogContentText>
        )}
        <Grid container sx={remarksInputContainerSx}>
          <Grid item xs={12}>
            <Typography sx={lable1Style}>
              Remarks
              <span className="requiredField">*</span>
            </Typography>
            <TextField
              onChange={handleRemarksChange}
              error={false}
              style={inputFieldStyle}
              type="text"
              className="customeTextField"
              variant="outlined"
              defaultValue={" "}
              multiline
              rows={4}
              maxRows={4}
              value={remarks}
              inputStyle={{ padding: 0 }}
              InputProps={{
                style: {
                  padding: 0,
                  color: "#000",
                },
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button1 onClick={remarksConfirmYes}>Yes</Button1>
        <Button1 onClick={closeRemarksInputModel}>No</Button1>
      </DialogActions>
    </Dialog>
  );
};
const RemarksInputModel = (props) => {
  return (
    <FullScreenModel
      open={props.open}
      closeModel={props.closeRemarksInputModel}
      content={<UnWrappedRemarksInputModel {...props} />}
    />
  );
};

export default RemarksInputModel;
