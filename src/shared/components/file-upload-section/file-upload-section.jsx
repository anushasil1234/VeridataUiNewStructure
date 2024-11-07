import { Box, Chip, Grid, Stack, Typography } from '@mui/material'
import { fileInputboxContainerStyle, fileInputs, filenameContainer, fileNameStyle } from 'app'
import React from 'react'
import { maxUploadSize, defaultUploadFormat } from 'shared/constants/constants'
import UploadButton from '../upload-button.jsx/upload-button'

const FileUploadSection = ({ chooseFile, fileName, accept, disabled, maxUploadSize, multiple = false, handleRemoveFile = null }) => {
    const fileType = `Accepted format: ${accept}`;

    return (
        <Stack sx={fileInputboxContainerStyle}>
            <Box sx={fileInputs}>
                <input
                    accept={accept ? accept : "application/pdf, image/png, image/jpeg"}
                    type="file"
                    multiple={multiple}
                    onClick={(e) => e.target.value = null}
                    onChange={chooseFile}
                    disabled={disabled}
                />
                <UploadButton disabled={disabled} fileName={fileName} />
            </Box>
            {
                (Array.isArray(fileName)) && fileName.length > 0 ?
                    <Grid container gap={1} sx={filenameContainer}>
                        {
                            fileName.map((_filename) => {
                                return (
                                    <Grid item xs={multiple ? 3 : 12} textAlign={'center'}>
                                        {
                                            multiple ?
                                                <Chip
                                                    size='small'
                                                    label={_filename}
                                                    onDelete={() => handleRemoveFile && handleRemoveFile(_filename)}
                                                /> :
                                                <Chip
                                                    size='small'
                                                    label={_filename}
                                                />
                                        }
                                    </Grid>
                                )
                            })}
                    </Grid>
                    :
                    <Typography sx={fileNameStyle}>
                        {maxUploadSize ? `Maximum upload file size: ${maxUploadSize}` : accept ? fileType : defaultUploadFormat}
                    </Typography>
            }
            {/* <Stack sx={filenameContainer}>
                {
                    (Array.isArray(fileName)) ?
                        fileName.map((_filename) => {
                            return (
                                <Chip size='small' label={_filename} onDelete={handleDelete} />
                            )
                        }) :
                        <Typography sx={fileNameStyle}>
                            {maxUploadSize ? `Maximum upload file size: ${maxUploadSize}` : accept ? fileType : defaultUploadFormat}
                        </Typography>
                }
            </Stack> */}
        </Stack>
    )
}

export default FileUploadSection