import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import { candidatefileViewContainerStyle, listHeadingStyle, rightMostBtnStyle, submitBtnStyle } from 'app'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import VerificationQuiestions from './verification-quiestions'
import GridContainer from 'shared/components/grid-container/grid-container'
import { validationsCheck } from 'shared/utils'

const FiledetailsSection = ({ verificationType, fileSrc, verificationUpdate, verificationOnChange, verificationQuestionSet, appointeeId }) => {

    const loggedInData = useSelector((state) => state.loggedInData);
    const { userId } = loggedInData[0];
    const [zoom, setZoom] = useState(1);
    // const [verificationUpdate, setverificationUpdate] = useState({
    //     fieldName: false,
    // })


    const zoomIn = () => {
        setZoom((prevZoom) => Math.min(prevZoom + 0.1, 3)); // max zoom level 3x
    };

    const zoomOut = () => {
        setZoom((prevZoom) => Math.max(prevZoom - 0.1, 1)); // min zoom level 1x (original size)
    };

    // useEffect(() => {
    // }, [])
    const handleVerificationSubmit = () => {

        for (let index = 0; index < verificationQuestionSet.length; index++) {
            const {disabled, name} = verificationQuestionSet[index];
            console.log("verificationUpdate[name]", verificationUpdate[name]);
            
            if (disabled === false) {
                if (verificationUpdate[name]) {
                    
                }
            }
        }

        const verificationUpdates = Object.entries(verificationUpdate).map(([key, value]) => ({
            fieldName: key,
            value: value
        }));
        const payload = {
            appointeeId: appointeeId,
            userId: userId,
            verificationCategory: verificationType.value,
            remarks: "",
            verificationUpdates: verificationUpdates
        }
        console.log("payload12", payload);

    }

    return (
        <>
            <GridContainer>
                <Grid
                    item
                    xs={12}
                    md={6}
                >
                    <Typography sx={{ ...listHeadingStyle, fontSize: '1rem', textAlign: "left" }}>
                        {`${verificationType.label} Verification`}
                    </Typography>
                </Grid>
            </GridContainer>
            <GridContainer>
                <Grid item xs={12} md={8}>
                    <Box sx={candidatefileViewContainerStyle}>
                        {
                            fileSrc &&
                            <img style={{
                                transform: `scale(${zoom})`,
                                transition: 'transform 0.3s ease',
                                transformOrigin: 'center',
                                margin: 'auto',
                            }}
                                src={fileSrc}
                            />
                        }
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <VerificationQuiestions
                        verificationUpdate={verificationUpdate}
                        verificationQuestionSet={verificationQuestionSet}
                        verificationOnChange={verificationOnChange}
                    />
                </Grid>
            </GridContainer>
            <GridContainer>
                <Grid item xs={12}>
                    <Stack sx={{ flexDirection: 'row', justifyContent: 'end' }}>
                        <Button
                            //onClick={() => setCurrentPageNo(1)}
                            onClick={handleVerificationSubmit}
                            //sx={{ m: "15px 5px", ml: 3 }}
                            sx={submitBtnStyle}
                            variant="contained"
                            color="primary"
                        >
                            {'Submit'}
                        </Button>
                        <Button
                            //onClick={() => setCurrentPageNo(1)}
                            // onClick={() => submitDetails(false, true)}
                            //sx={{ m: "15px 5px", ml: 3 }}
                            sx={rightMostBtnStyle}
                            variant="contained"
                            color="primary"
                        >
                            {'Close'}
                        </Button>
                    </Stack>
                </Grid>
            </GridContainer>
        </>
    )
}

export default FiledetailsSection