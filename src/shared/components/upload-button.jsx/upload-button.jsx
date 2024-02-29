import { FileUpload } from '@mui/icons-material'
import { Button } from '@mui/material'
import { uploadBtnStyle } from 'app'
import React from 'react'

const UploadButton = () => {

    return (
        <Button startIcon={<FileUpload />} sx={uploadBtnStyle}>
            Upload
        </Button>
    )
}

export default UploadButton