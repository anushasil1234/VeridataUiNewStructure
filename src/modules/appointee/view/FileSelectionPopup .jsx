import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, Chip, Typography } from '@mui/material';
import { popupStyle, buttonStyle, fileNameStyle, useFileChipStyles } from 'app';

const FileSelectionPopup = ({ isPopupOpen, setIsPopupOpen, files, handleFileClick }) => {

  const storedViewedFiles = JSON.parse(localStorage.getItem('viewedFiles')) || [];


  const [viewedFiles, setViewedFiles] = useState(storedViewedFiles);

  useEffect(() => {
    if (viewedFiles.length > 0) {
      localStorage.setItem('viewedFiles', JSON.stringify(viewedFiles));
    }
  }, [viewedFiles]);

  const handleChipClick = (fileOption) => {

    if (!viewedFiles.some(file => file.fileName === fileOption.fileName)) {
      setViewedFiles([...viewedFiles, fileOption]);
    }
    handleFileClick(fileOption);
  };
  const getChipStyles = useFileChipStyles();
  return (
    <Dialog open={isPopupOpen} onClose={() => setIsPopupOpen(false)} maxWidth="sm" fullWidth>
      <DialogTitle>Select any file for view</DialogTitle>
      <DialogContent dividers>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="flex-start"
          spacing={1}
          sx={{...popupStyle}}
        >
          {files.map((fileOption, index) => (
            <Stack
              key={index}
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
              sx={{ cursor: 'pointer', padding: '8px', width: '100%' }}
              onClick={() => handleChipClick(fileOption)}
            >
              <Chip
                label={
                  <Typography variant="body2" sx={{ ...fileNameStyle }}>
                    {fileOption.fileName}
                  </Typography>
                }
                variant="contained"
                sx={getChipStyles(fileOption, viewedFiles)}
              />
            </Stack>
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setIsPopupOpen(false)}
          variant="contained"
          sx={{...buttonStyle}}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FileSelectionPopup;
