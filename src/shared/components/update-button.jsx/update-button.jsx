import { FileUpload } from '@mui/icons-material'
import { Button } from '@mui/material'
import { uploadBtnStyle } from 'app'
import React from 'react'

const UpdateButton = () => {

    return (
        <Button startIcon={<FileUpload />} sx={uploadBtnStyle}>
            Update
        </Button>
    )
}

export default UpdateButton