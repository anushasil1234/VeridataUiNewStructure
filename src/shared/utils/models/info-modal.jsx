import React from 'react'
import { Dialog, DialogActions, DialogContent, DialogContentText} from '@mui/material';
import Button1 from '../button/button1';


const InfoModel = ({open, confirmationModelContent}) => {
   const { dialogContentText, handleClickOnOk} = confirmationModelContent || "";

  return (
    <Dialog open={open} >
        <DialogContent>
          <DialogContentText>
            {dialogContentText}
          </DialogContentText>
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