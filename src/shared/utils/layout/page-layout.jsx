import { Box, Typography } from '@mui/material'
import { heading1, pageHeadingContainer } from 'app'
import React from 'react'
import ContentWrapper from './content-wrapper'

const PageLayout = ({ children, pageName }) => {
    return (
        <ContentWrapper>
            <Box sx={pageHeadingContainer}>
                <Typography variant="h5" sx={heading1} component="h1">
                    {pageName}
                </Typography>
            </Box>
            <Box>
                {children}
            </Box>
        </ContentWrapper>
    )
}

export { PageLayout }