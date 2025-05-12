import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Chip,
  Typography,
} from '@mui/material';
import { popupStyle, buttonStyle, fileNameStyle, useFileChipStyles } from 'app';
import Button1 from 'shared/utils/button/button1';
const FileSelectionPopup = ({ isPopupOpen, setIsPopupOpen, files, handleFileClick }) => {
  const storedViewedFiles = JSON.parse(localStorage.getItem('viewedFiles')) || [];
  const [viewedFiles, setViewedFiles] = useState(storedViewedFiles);
  useEffect(() => {
    if (viewedFiles.length > 0) {
      localStorage.setItem('viewedFiles', JSON.stringify(viewedFiles));
    }
  }, [viewedFiles]);
  const handleChipClick = (fileOption) => {
    if (!viewedFiles.some((file) => file.fileName === fileOption.fileName)) {
      setViewedFiles([...viewedFiles, fileOption]);
    }
    handleFileClick(fileOption);
  };
  const getChipStyles = useFileChipStyles();
  return (
    <Dialog open={isPopupOpen} onClose={() => setIsPopupOpen(false)} maxWidth='sm' fullWidth>
      <DialogTitle
        style={{
          fontSize: '0.9rem',
          backgroundColor: '#9A208C',
          color: '#FFFFFF',
          fontWeight: 700,
        }}
      >
        Select Any File To View
      </DialogTitle>
      <DialogContent dividers>
        <Stack
          direction='column'
          alignItems='center'
          justifyContent='flex-start'
          spacing={1}
          sx={{ ...popupStyle }}
        >
          {files.map((fileOption, index) => (
            <Stack
              key={index}
              direction='row'
              alignItems='center'
              justifyContent='flex-start'
              sx={{ cursor: 'pointer', padding: '8px', width: '100%' }}
              onClick={() => handleChipClick(fileOption)}
            >
              <Chip
                label={
                  <Typography variant='body2' sx={{ ...fileNameStyle }}>
                    {fileOption.fileName}
                  </Typography>
                }
                variant='contained'
                sx={getChipStyles(fileOption, viewedFiles)}
              />
            </Stack>
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button1 onClick={() => setIsPopupOpen(false)} variant='contained' sx={{ ...buttonStyle }}>
          Close
        </Button1>
      </DialogActions>
    </Dialog>
  );
};
export default FileSelectionPopup;
