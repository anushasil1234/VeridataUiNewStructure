import React from 'react'
import { Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import Button1 from '../button/button1';


const InfoModel = ({open, confirmationModelContent}) => {
   const { dialogContentText,dialogTitle,dialogContentComponent ,handleClickOnOk} = confirmationModelContent || "";
console.log(confirmationModelContent)
  return (
    <Dialog open={open} fullWidth={true} maxWidth={"lg"} >
         <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogContentText}
          </DialogContentText>
         
          {dialogContentComponent}

        </DialogContent>
        <DialogActions >
          <Button1 onClick={handleClickOnOk}>
            Ok
          </Button1>
        </DialogActions>
      </Dialog>
  )
}

export default InfoModel