import { FileUpload } from '@mui/icons-material'
import { Button } from '@mui/material'
import { uploadBtnStyle } from 'app'
import React from 'react'

const UploadButton = ({ disabled,fileName }) => {

    return (
        disabled ?
            <Button
                sx={{ margin: "5px" }}
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