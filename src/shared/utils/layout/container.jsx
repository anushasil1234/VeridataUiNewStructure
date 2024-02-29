import React from 'react'
import { Container } from '@mui/material';
import { containerSx } from 'app';
const CustomContainer = ({ children }) => {
    return (
        <Container maxWidth="xlg" sx={containerSx}>
            {children}
        </Container>
    )
}

export default CustomContainer