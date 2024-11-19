import { Box, Chip, Grid, Stack, Typography } from '@mui/material';
import { boxStyle, fileInputboxContainerStyle, fileInputs, filenameContainer, fileNameStyle } from 'app';
import React from 'react';
import { maxUploadSize, defaultUploadFormat } from 'shared/constants/constants';
import UploadButton from '../upload-button.jsx/upload-button';

const FileUploadSection = ({ chooseFile, fileName, accept, disabled, maxUploadSize, multiple = false, handleRemoveFile = null, uploadTypeAlias }) => {
    const fileType = `Accepted format: ${accept}`;
    const fileLimitText = multiple
        ? "You can upload multiple file(s) at a time."
        : "You can only upload one file at a time.";

    const handleFileChange = (event) => {
        chooseFile(event, uploadTypeAlias);
    };

    const handleRemove = (filename, event) => {
        event.stopPropagation();
        if (handleRemoveFile) {
            handleRemoveFile(filename);
        }
    };

    return (
        <Stack sx={{ ...fileInputboxContainerStyle, position: 'relative', marginBottom: 'auto' }}>
            <Box sx={fileInputs}>
                <input
                    id={uploadTypeAlias}
                    accept={accept ? accept : "application/pdf, image/png, image/jpeg"}
                    type="file"
                    multiple={multiple}
                    onClick={(e) => (e.target.value = null)}
                   
                    onChange={handleFileChange}
                    disabled={disabled}
                />
                <UploadButton disabled={disabled} fileName={fileName} />
            </Box>
           
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {fileLimitText}
            </Typography>
            {(Array.isArray(fileName)) && fileName.length > 0 ? (
                <Grid container gap={1} sx={{ ...filenameContainer}}>
                    {fileName.map((_filename) => (
                        <Grid item xs={multiple ? 3 : 12} textAlign={'center'} key={_filename}>
                            {
                                multiple ?
                                    <Chip
                                        size='small'
                                        label={_filename}
                                        onDelete={(event) => handleRemove(_filename, event)}
                                    /> :
                                    <Chip
                                        size='small'
                                        label={_filename}
                                    />
                            }
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography sx={fileNameStyle}>
                    {maxUploadSize && `Maximum upload file size: ${maxUploadSize}`}
                    <br />
                    {accept ? fileType : defaultUploadFormat}
                </Typography>
            )}
            <Box
                component="label"
                htmlFor={uploadTypeAlias}
                sx={{...boxStyle}}
            />
        </Stack>
    );
}

export default FileUploadSection;
