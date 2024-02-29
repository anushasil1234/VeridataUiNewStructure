import {Alert,  IconButton, Snackbar } from '@mui/material'
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';

export const AdminPannelAlert = ({ alertMessage, severity }) => {
  const [open, setOpen] = useState(true);

  const [state, setState] = React.useState({

    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal } = state;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(!open);
  };

  const action = (
    <React.Fragment>

      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
   
    <Snackbar action={action} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal} open={open} onClose={handleClose} autoHideDuration={3000} >

      <Alert  severity={severity} variant="filled" sx={{ width: '100%' }}>
  
        {alertMessage}
      </Alert>
    </Snackbar>





  )
}
