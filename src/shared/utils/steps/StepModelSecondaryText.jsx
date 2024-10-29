import { Typography } from '@mui/material'
import React from 'react'

const StepModelSecondaryText = ({children}) => {
    return (
        <Typography
            sx={{ display: 'inline' }}
            component="span"
            variant="body2"
            color="text.primary"
        >
            {children}
        </Typography>
    )
}

export default StepModelSecondaryText