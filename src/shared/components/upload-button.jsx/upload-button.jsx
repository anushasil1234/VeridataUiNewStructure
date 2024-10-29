import { FileUpload } from '@mui/icons-material'
import { Button } from '@mui/material'
import { uploadBtnCommonStyle, uploadBtnStyle } from 'app'
import React from 'react'

const UploadButton = ({ disabled, fileName }) => {

    return (
        disabled ?
            <Button
                sx={uploadBtnCommonStyle}
                disabled={true}
                variant="contained"
                startIcon={<FileUpload />}
            >
                {fileName ? "Reupload" : "Upload"}
            </Button>
            : <Button startIcon={<FileUpload />} sx={uploadBtnStyle}>
                {fileName ? "Reupload" : "Upload"}
            </Button>
    )
}

export default UploadButton