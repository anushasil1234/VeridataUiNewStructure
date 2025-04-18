
import {
    Box,
    Button,
    Grid,
    Stack,
} from "@mui/material";
import React, { useState } from "react";
import GridRow from "shared/components/grid-container/grid-row";
import showErrorMessage from "shared/utils/associate/show-error-message";
import {
    submitBtnStyle,
} from "app";

import {
    previousButton,
    aaddharNumberverify,
    emptyPanMsg,
    invalidPanMsg,
    panVerifyFailedMsg,
} from "shared/constants/constants";

import { useSelector,useDispatch } from "react-redux";

import { hasValue,patternChecking } from "shared/utils";
import VerificationStatus from "../../../shared/components/verification/verification-status";
import removeExtraSpaces from "shared/utils/associate/remove-extra-spaces";
import { verifyPANDetails } from "server/apis";
import FIRVerification from "./fir-verifications";
import InsuranceDetails from "./insurance-detail";

import { useTranslation } from "react-i18next";

const FifthForm = ({
    formElement,
    stepsList,
    isAadhaarVarified,
    handleBack,
    currentPageNo,
    setCurrentPageNo,
    activeStep,
    setActiveStep,
    firstPageForm,
    isPANAvailable,
    setIsPANAvailable,
    firstatusMessage,
    isPoliceVarified,
    setisPoliceVarified,
    setFIRStatusMessage,
    firDetails,
    setFIRDetails,
    pan,
    setPan,
    nameAsOnPan,
    dateOfBirth,
    setDateOfBirth
}) => {
    const AADHARVERIFICATION_BY = process.env.REACT_APP_AADHARVERIFICATION_BY;
    const { t } = useTranslation(); // Import the translation function

    console.log('AADHARVERIFICATION_BY', AADHARVERIFICATION_BY);

    const functionSlice = useSelector((state) => state.functionSlice);
    const { openRemarksModel } = functionSlice[0];


    const loggedInData = useSelector((state) => state.loggedInData);
    //console.log("loggedInData",loggedInData[0]);

    const { userId, appointeeId, userCode, candidateId,userName } = loggedInData[0];
    


    return (
        <Box sx={{ width: "100%" }}>
            <form ref={formElement}>
                <Grid
                    sx={{ paddingLeft: "20px" }}
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >


                    {/* ######  FIR Verification Section Start ###### */}
                    <FIRVerification 
                    isAadhaarVarified={isAadhaarVarified} 
                    stepsList={stepsList} 
                    firstPageForm={firstPageForm} 
                    firstatusMessage={firstatusMessage}
                    setFIRStatusMessage={setFIRStatusMessage}
                    isPoliceVarified={isPoliceVarified}
                    setisPoliceVarified={setisPoliceVarified}
                    firDetails= {firDetails}
                    setFIRDetails= {setFIRDetails}
                    dateOfBirth= {dateOfBirth}
                    setDateOfBirth= {setDateOfBirth}

                    />
                    {/* ######  FIR Verification Section End ###### */}

                    {/* ###### Insurance Detail Section Start ###### */}
                    {/* <InsuranceDetails 
                    isAadhaarVarified={isAadhaarVarified} 
                    stepsList={stepsList} 
                    firstPageForm={firstPageForm}
                    isPANAvailable={isPANAvailable}
                    setIsPANAvailable={setIsPANAvailable}   
                    pan= {pan}
                    setPan= {setPan}
                    nameAsOnPan={nameAsOnPan}
                    /> */}
                    {/* ###### Insurance Detail Section End ###### */}

                    <GridRow>
                        <Grid sx={{ paddingLeft: "0px !important" }} item xs={12}>
                            <Stack flexDirection={"row"}>
                                <Button
                                    //onClick={() => setCurrentPageNo(1)}
                                    onClick={handleBack}
                                    //sx={{ m: "15px 5px", ml: 3 }}
                                    sx={submitBtnStyle}
                                    variant="contained"
                                    color="primary"
                                >
                                          {t(previousButton)}
                                </Button>


                                <Button
                                    //onClick={() => setCurrentPageNo(1)}
                                    //onClick={}
                                    //sx={{ m: "15px 5px", ml: 3 }}
                                    onClick={() => {
                                        setCurrentPageNo(6);  // Set currentPageNo to 4
                                        setActiveStep(5);     // Set active step to 3
                                    }}
                                    sx={submitBtnStyle}
                                    variant="contained"
                                    color="primary"
                                >
                                    {t("Next")}
                                </Button>

                            </Stack>
                        </Grid>
                    </GridRow>
                </Grid>
            </form>
        </Box>
    );
};

export default FifthForm;

