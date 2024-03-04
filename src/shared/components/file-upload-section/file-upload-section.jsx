import { Box, Stack, Typography } from '@mui/material'
import { fileInputboxContainerStyle, fileInputs } from 'app'
import React from 'react'
import { maxUploadSize, defaultUploadFormat } from 'shared/constants/constants'
import UploadButton from '../upload-button.jsx/upload-button'

const FileUploadSection = ({ chooseFile, fileName, accept}) => {
    const fileType =  `Accepted format: ${accept}`;
    return (
        <Stack sx={fileInputboxContainerStyle}>
            <Box sx={fileInputs}>
                <input
                    accept={accept ? accept : "application/pdf, image/png, image/jpeg"}
                    type="file"
                    onClick={(e) => e.target.value = null}
                    onChange={chooseFile}
                />
                <UploadButton />
            </Box>
            <Stack alignItems={"center"}>
                <Typography paddingX={"12px"} fontSize={".7rem"} marginTop={.25}>
                    {fileName ? fileName : maxUploadSize}
                </Typography>
                {
                    !fileName &&
                    <Typography fontSize={".7rem"} marginTop={.25}>
                       {accept ? fileType:  defaultUploadFormat }
                    </Typography>
                }
            </Stack>
        </Stack>
    )
}

export default FileUploadSection