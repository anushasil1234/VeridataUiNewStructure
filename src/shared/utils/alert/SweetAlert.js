import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box } from '@mui/system';
export default function SweetAlert({ alertDialogProps }) {
    const { open, setOpen, handleClickOk, dialogTitle, dialogContentText } = alertDialogProps

    const handleClose = () => {
        setOpen(false);
    };
    const iconContainer = {
        display: "flex",
        justifyContent: "center"
    }
    return (
        <div>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Box padding={4}>
                    <Box sx={iconContainer}>
                        <CheckCircleOutlineIcon textAlign={"center"} sx={{ fontSize: "5.5rem" }} color={"success"} />
                    </Box>
                    <DialogTitle id="alert-dialog-title" py={0}>

                        <Typography py={0} textAlign={"center"} fontSize={30}>

                            {dialogTitle}
                        </Typography>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText fontSize={18} id="alert-dialog-description">
                            {dialogContentText}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions >
                        <Box margin={"auto"}>

                            <Button variant="contained" onClick={() => handleClickOk()} autoFocus>

                                Ok
                            </Button>
                        </Box>
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    );
}
