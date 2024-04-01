import * as React from 'react';
import { Box, Container } from '@mui/material';
import HtmlParser from '../html-template-parse/html-parser';
const VerficationAadharSteps = () => {
    const data = { name: 'John Doe' };
    return (
        <Box>
            <Container>

                <HtmlParser data={data} type={"OfflineKyc"} />

            </Container>
        </Box>

    )
}

export default VerficationAadharSteps