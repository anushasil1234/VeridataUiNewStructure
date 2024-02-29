import * as React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from '@mui/material';

export default function FormDialog(props) {

  return (
    <div>
      <Dialog open={props.open} >
        <DialogTitle fontSize={props.fontSize}>{props.DialogTitle}</DialogTitle>
        {props.dialogComponent}
        <DialogContent>
          <DialogContentText>
            {props.DialogContentText}
          </DialogContentText>
          {props.label ?
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label={props.label}
              type="email"
              fullWidth
              variant="standard"
              multiline
              rows={2}
              maxRows={3}
              onChange={props.sendComment}
            />
            : null}
        </DialogContent>
        <DialogActions >
              <Button sx={{fontSize: "1.3rem"}} value="Y" onClick={(e) => props.shouldTakeAction("Y")}>Yes</Button>
              <Button sx={{fontSize: "1.3rem"}} value="N" onClick={(e) => props.shouldTakeAction("N")}>No</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}