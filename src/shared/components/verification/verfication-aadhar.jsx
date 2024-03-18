import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import { Box, Container, Typography } from '@mui/material';
import { lable3Style } from 'app';
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