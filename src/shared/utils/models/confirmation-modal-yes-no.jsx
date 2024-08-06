import React from 'react'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Button1 from '../button/button1';


const ConfirmationYesNoModal = ({ open, confirmationYesNoModelContent }) => {
  const { dialogTitle, dialogComponent, dialogContentText, confirmedYes, confirmedNo , firstButtonName= "Yes",secondButtonName="No" } = confirmationYesNoModelContent || "";
  return (
    <Dialog open={open} >
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        {
          dialogContentText &&
          <DialogContentText>
            {dialogContentText}
          </DialogContentText>
        }
         {dialogComponent}
     
      </DialogContent>
      <DialogActions>
        <Button1 onClick={confirmedYes}>
          {firstButtonName}
        </Button1>
        <Button1 onClick={confirmedNo}>
          {secondButtonName}
        </Button1>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationYesNoModal