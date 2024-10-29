import { Box, Stack, Typography } from '@mui/material'
import { fileInputboxContainerStyle, fileInputs, fileNameStyle } from 'app'
import React from 'react'
import { maxUploadSize, defaultUploadFormat } from 'shared/constants/constants'
import UploadButton from '../upload-button.jsx/upload-button'

const FileUploadSection = ({ chooseFile, fileName, accept, disabled, maxUploadSize }) => {
    const fileType = `Accepted format: ${accept}`;
    return (
        <Stack sx={fileInputboxContainerStyle}>
            <Box sx={fileInputs}>
                <input
                    accept={accept ? accept : "application/pdf, image/png, image/jpeg"}
                    type="file"
                    onClick={(e) => e.target.value = null}
                    onChange={chooseFile}
                    disabled={disabled}
                />
                <UploadButton disabled={disabled} fileName={fileName} />
            </Box>
            <Stack alignItems={"center"}>
                <Typography sx={fileNameStyle}>
                    {fileName ? fileName : maxUploadSize ? `Maximum upload file size: ${maxUploadSize}` : accept ? fileType : defaultUploadFormat}
                </Typography>
                {/* {
                    !fileName &&
                    <Typography sx={fileNameStyle}>
                        
                    </Typography>
                } */}
            </Stack>
        </Stack>
    )
}

export default FileUploadSection