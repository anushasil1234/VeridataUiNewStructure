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
            secondaryText: 'Please have your Aadhaar and PAN card  before continuing.',
            secondaryComponent:
                <>
                    {' — If you dont have an Aadhaar please contact with your HR'}
                    {/* <Box >
                        <Button sx={prereqModalShowMoreInfoStyle} onClick={() => openRemedyModel({ remedyType: "OTH", remedySubType: "ADHAR" })}>
                            ...show more info
                        </Button>
                    </Box> */}
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
            secondaryText: 'As per Govt. of India rules, all EPFO subscribers must have an Aadhaar-linked Universal Account Number (UAN) activated by creating a login on the Member Portal. An activated UAN allows access to various facilities, including viewing/downloading PF passbooks, submitting claims, updating details, and tracking claim status in real-time.',
            secondaryComponent:
                <>
                    {" — Please login to the EPFO portal at least once and then try verifying you details. if you don't have UAN, please ignore."}
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
            StepNumber: `Father's Name Certificate`,
            primaryHeading: "Father's Name Certificate",
            secondaryText: "PAN Card and 10th Pass certificate soft copies, to verify your father's name.",
            secondaryComponent:
                <>
                    {" —  If you don't have an Father's name Certificate please contact with your HR."}
                </>
        },
        {
            StepNumber: `Hanicap Certificate`,
            primaryHeading: "Handicap Certificate",
            secondaryText: "Your Handicap Certificate, if you are physically challenged.",
            secondaryComponent:
                <>
                    {" —  keep soft copy in your hand."}
                </>
        }
    ]
    return (
        <Steps stepList={stepList} />
    )
}

export default PrerequisiteInformation