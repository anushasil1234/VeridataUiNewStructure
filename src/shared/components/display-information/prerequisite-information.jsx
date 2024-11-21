import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { Box, Button } from '@mui/material';
import { midiumFontSize, prereqModalShowMoreInfoStyle } from 'app';
import Steps from 'shared/utils/steps/Steps';

const PrerequisiteInformation = () => {
    const functionSlice = useSelector(state => state.functionSlice);
    const { openRemedyModel } = functionSlice[0];
    const stepList = [
        {
            StepNumber: 'Aadhaar',
            primaryHeading: 'Aadhaar Number',
            secondaryText: 'Please have your Addhar and PAN card  before continuing.',
            secondaryComponent:
                <>
                    {' — If you dont have an Addhar please contact with your HR'}
                    <Box >
                        {/* <Button sx={prereqModalShowMoreInfoStyle} onClick={() => openRemedyModel({ remedyType: "OTH", remedySubType: "ADHAR" })}> */}
                        <Button sx={prereqModalShowMoreInfoStyle} onClick={() => openRemedyModel({ remedyType: "OTH", remedySubType: "ADHAR" })}>
                            ...show more info
                        </Button>
                    </Box>
                </>

        },
        {
            StepNumber: 'Mobile Number',
            primaryHeading: 'Mobile Number',
            secondaryText: 'Check if the given mobile is pinned with Aadhaar.',
            secondaryComponent:
                <>
                    {" — Other wise contact with respective hr to update mobile number. "}
                    <Box >
                        {/* <Button sx={prereqModalShowMoreInfoStyle} onClick={() => openRemedyModel({ remedyType: "OTH", remedySubType: "ADHAR" })}> */}
                        <Button sx={prereqModalShowMoreInfoStyle} onClick={() => openRemedyModel({ remedyType: "OTH", remedySubType: "ADHARMBLE" })}>
                            ...show more info
                        </Button>
                    </Box>
                </>

        },
        {
            StepNumber: 'UAN',
            primaryHeading: 'UAN',
            secondaryText: 'If you have a UAN account, make sure you have a activate it.',
            secondaryComponent:
                <>
                    {" — Please login to the EPFO portal at least once and then try verifying you details."}
                    <Box >
                        <Button sx={prereqModalShowMoreInfoStyle} onClick={() => openRemedyModel({ remedyType: "OTH", remedySubType: "INACTUAN" })}
                        >
                            ...show more info
                        </Button>
                    </Box>
                </>

        },
        {
            StepNumber: 'Verification',
            primaryHeading: 'Verify',
            secondaryText: 'All verifications are mandatory.',
            secondaryComponent:
                <>
                    {" — Please complete all of them. Dont leave out any information asked for."}
                    <Box >
                        {/* <Button onClick={() => openRemedyModel({remedyType: "OTH", remedySubType: "INACTUAN" })}
                        > */}
                        <Typography color="#1976d2" sx={midiumFontSize}>
                            To know about the verification process in details, pls go to FAQ" and FAQ will have the above section on verification process
                        </Typography>
                        {/* </Button> */}
                    </Box>
                </>
        },
        {
            StepNumber: 'Tenth Pass Certificate',
            primaryHeading: '10th Pass Certificate',
            secondaryText: ' Please have your 10th Pass Certificate before continuing.',
            secondaryComponent:
                <>
                    {" —  If you dont have an  10th Pass Certificate please contact with your HR."}
                </>
        },
        {
            StepNumber: `Father's name Certificate`,
            primaryHeading: "Father's name Certificate",
            secondaryText: "Please have a certificate which has your Father's name before continuing.",
            secondaryComponent:
                <>
                    {" —  If you dont have an Father's name Certificate please contact with your HR."}
                </>
        }
    ]
    return (
        <Steps stepList={stepList} />
    )
}

export default PrerequisiteInformation