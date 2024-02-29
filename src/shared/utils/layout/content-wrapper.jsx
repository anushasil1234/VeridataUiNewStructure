import { Box } from '@mui/material'
import React from 'react'

const ContentWrapper = ({ children, sx }) => {
    return (
        <Box sx={{px: "8px", ...sx}}>
            {children}
        </Box>
    )
}

export default ContentWrapper