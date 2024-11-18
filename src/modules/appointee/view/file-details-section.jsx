import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import { candidatefileViewContainerStyle, listHeadingStyle, rightMostBtnStyle, submitBtnStyle } from 'app'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import VerificationQuiestions from './verification-quiestions'
import GridContainer from 'shared/components/grid-container/grid-container'
import { hasValue, validationsCheck } from 'shared/utils'
import validateQuestionSet from 'shared/utils/associate/validate-question-set'
import TextAreaInput from 'shared/components/input-fields/text-input'
import { manualSubmitConfirmatonMsg, remarksError } from 'shared/constants/constants'
import createVerificationUpdate from 'shared/utils/associate/create-verification-update'

const FiledetailsSection = ({ verificationType, fileSrc, verificationUpdate,
    verificationOnChange, verificationQuestionSet, appointeeId }) => {
    console.log("verificationUpdate", verificationUpdate);

    const loggedInData = useSelector((state) => state.loggedInData);
    const popUpSlice = useSelector((state) => state.popUpSlice);
    const apiSlice = useSelector((state) => state.apiSlice);
    const functionSlice = useSelector((state) => state.functionSlice);


    const { userId } = loggedInData[0];
    const { showErrorMessage } = popUpSlice[0];
    const {
        UpdateAppointeeManualVerification
    } = apiSlice[0];
    const { openConfirmationModel } = functionSlice[0];


    const [zoom, setZoom] = useState(1);
    const [remarks, setRemarks] = useState("");
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
    const handleRemarksChanged = ({ target }) => {
        setRemarks(target.value);
    }
    const handleVerificationSubmit = async () => {
        const { error } = validateQuestionSet(verificationQuestionSet, verificationUpdate);
        console.log("verificationUpdate", verificationUpdate);

        // if (hasValue(error)) {
        //     showErrorMessage(error);
        //     return
        // }
        // if (remarks.length < 10) {
        //     showErrorMessage(remarksError);
        //     return
        // }
        // const verificationUpdates = Object.entries(verificationUpdate).map(([key, value]) => ({
        //     fieldName: key,
        //     value: value
        // }));

        const submitconfModelContent = {
            dialogContentText: manualSubmitConfirmatonMsg,
        };
        const { VerificationSubCategoryList } = createVerificationUpdate(verificationUpdate);
        // console.log("VerificationSubCategoryList", _verificationUpdates);
        
        const payload = {
            appointeeId: appointeeId,
            userId: userId,
            verificationCategory: verificationType.value,
            remarks: remarks,
            VerificationSubCategoryList: VerificationSubCategoryList
        }
        openConfirmationModel(submitconfModelContent, async () => await UpdateAppointeeManualVerification(payload));
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
                <Grid item xs={12} md={8}>
                    <TextAreaInput
                        label={'Remarks'}
                        value={remarks}
                        onChange={handleRemarksChanged}
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