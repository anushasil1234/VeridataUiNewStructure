import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import { Box, Container, Typography } from '@mui/material';
import { lable3Style } from 'app';
const VerficationAadharSteps = () => {
    return (
        <Box>
            <Container>

                {/* <Typography>Why does Veridata need your personal data? How to provide personal data required for verification of Aadhar?
An eKYC XML file containing the personal data, required for verification, can be downloaded only by you using your Aadhar credentials. This file contains the name, date of birth and gender, besides other information, that would be extracted to match with the information provided by you. The process would first inspect the authenticity of the eKYC XML file provided by you and then perform the matching and then dispose the file and the contents.
</Typography> */}
                <FormGroup >


                    <Typography sx={lable3Style} >
                        1.	Go to {<Link href="https://myaadhaar.uidai.gov.in/" >{'myaadhaar URL'}</Link>} then log in by entering your Aadhaar Number and OTP (OTP is sent to the UIDAI registered mobile number).
                    </Typography>
                    <Typography sx={lable3Style}>
                        2.	After Logging in to the site, click on the ‘offline eKYC’ widget (bottom left).
                    </Typography>
                    <Typography sx={lable3Style}>
                        3.	A 4-digit  share code of your choice to be entered and then press download.
                    </Typography >

                    <Typography sx={lable3Style}>
                        4.	A zip file would be downloaded in your default download folder.
                    </Typography>
                    <Typography sx={lable3Style}>
                        5.	Please, upload the zip folder and the share code in Veridata .
                    </Typography>

                </FormGroup>
            </Container>
        </Box>

    )
}

export default VerficationAadharSteps