import { Typography } from '@mui/material'
import { lable1CopyStyle } from 'app'
import React from 'react'

const Label = ({ children, required=false }) => {
    return (
        <Typography sx={lable1CopyStyle}>
            {children}
            {required === true &&
                <span className="requiredField">*</span>
            }
        </Typography>
    )
}

export default Label