import React from 'react'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Button1 from '../button/button1';


const InfoModel = ({ open, confirmationModelContent }) => {
  const { dialogContentText, dialogTitle, dialogContentComponent, fullWidth = false,
    maxWidth = "lg", btnName = "Ok", handleClickOnOk } = confirmationModelContent || "";
  // console.log(confirmationModelContent)
  return (
    <Dialog open={open} fullWidth={fullWidth} maxWidth={maxWidth} >
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {dialogContentText}
        </DialogContentText>

        {dialogContentComponent}

      </DialogContent>
      <DialogActions >
        <Button1 onClick={handleClickOnOk}>
          {btnName}
        </Button1>
      </DialogActions>
    </Dialog>
  )
}

export default InfoModel