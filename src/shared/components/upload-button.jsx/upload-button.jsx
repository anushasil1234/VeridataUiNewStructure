import { FileUpload } from '@mui/icons-material'
import { Button } from '@mui/material'
import { uploadBtnStyle } from 'app'
import React from 'react'

const UploadButton = ({ disabled }) => {

    return (
        disabled ?
            <Button
                sx={{ margin: "5px" }}
                disabled={true}
                variant="contained"
                startIcon={<FileUpload />}
            >
                Upload
            </Button>
            : <Button startIcon={<FileUpload />} sx={uploadBtnStyle}>
                Upload
            </Button>
    )
}

export default UploadButton