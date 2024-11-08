import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, Chip, Typography } from '@mui/material';
import { popupStyle, buttonStyle, fileNameStyle } from 'app'; 

const FileSelectionPopup = ({ isPopupOpen, setIsPopupOpen, files, handleFileClick }) => {
  
    return (
        <Dialog open={isPopupOpen} onClose={() => setIsPopupOpen(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Select a File for View</DialogTitle>
            <DialogContent dividers>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-start"
                    spacing={1}
                    sx={popupStyle}
                >
                    {files.map((fileOption, index) => (
                        <Stack
                            key={index}
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ cursor: 'pointer', padding: '8px' }}
                            onClick={() => {
                                setIsPopupOpen(false);
                                handleFileClick(fileOption);
                            }}
                        >
                            <Chip
                                label={<Typography variant="body2"  sx={{...fileNameStyle }}>{fileOption.fileName}</Typography>}
                                variant="contained"
                                color="secondary"
                                sx={{ cursor: 'pointer' }}
                            />
                        </Stack>
                    ))}
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => setIsPopupOpen(false)}
                    variant="contained"
                    color="secondary"
                    sx={buttonStyle}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FileSelectionPopup;
