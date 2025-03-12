import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Stack,
} from "@mui/material";
import React, { useState } from "react";
import FormHeadingContainer from "shared/components/grid-container/form-heading-container";
import FormHeading from "./form-heading";
import GridRow from "shared/components/grid-container/grid-row";
import showErrorMessage from "shared/utils/associate/show-error-message";
import {
    submitBtnStyle,
} from "app";
import {
    Autorenew,
} from "@mui/icons-material";
import {
    previousButton,
    aaddharNumberverify,
    emptyPanMsg,
    invalidPanMsg,
    panVerifyFailedMsg,
} from "shared/constants/constants";
import TextInput from "shared/components/input-fields/text-input";
import { useSelector, useDispatch } from "react-redux";
import { VerificationStatusSection } from "shared/components/verification/verification-status-section";
import { hasValue, patternChecking } from "shared/utils";
import BankVerification from "./bank-verifications";
import VerificationStatus from "../../../shared/components/verification/verification-status";
import removeExtraSpaces from "shared/utils/associate/remove-extra-spaces";
import { verifyPANDetails } from "server/apis";
import { storeCurrentPageNo } from "store/slices/candidate-page-slice";
import { DDMMYYYY } from "shared/utils";

const InsuranceDetails = ({
    stepsList,
    isAadhaarVarified,
    firstPageForm,
    isPANAvailable,
    setIsPANAvailable
}) => {
    const AADHARVERIFICATION_BY = process.env.REACT_APP_AADHARVERIFICATION_BY;

    console.log('AADHARVERIFICATION_BY', AADHARVERIFICATION_BY);

    const functionSlice = useSelector((state) => state.functionSlice);
    const { openRemarksModel } = functionSlice[0];

    console.log("stepsList", stepsList);



    const loggedInData = useSelector((state) => state.loggedInData);
    const { userId, appointeeId, userCode, candidateId, userName } = loggedInData[0];
    const dispatch = useDispatch();
    const setCurrentPageNo = (currentPageNo) => {
        dispatch(storeCurrentPageNo(currentPageNo));
    }

    const [insurancestatusMessage, setInsuranceStatusMessage] = useState(
        new VerificationStatus()
    );




    return (

        <>

            {/* ######  PAN Verification Section Start ###### */}
            {isPANAvailable && (
                <>

                    < FormHeadingContainer >
                        <FormHeading
                            step={stepsList?.ID?.step}
                            heading={stepsList?.ID?.name}
                        //info={"Enter your PAN Number to verify."}
                        />
                    </FormHeadingContainer >


                    <GridRow>
                        <Grid sx={{ paddingLeft: "0px !important" }} item xs={12} md={6}>
                            <TextInput
                                label={"PAN Number"}
                                value={firstPageForm.panNummber}
                                //onChange={handelPANNumberChange}
                                // required={true}
                                disabled={true}
                            //error={panNumberError}
                            //onBlur={handleBlurPAN}
                            //  maxLength={10}
                            />
                            <Button
                                sx={{ ...submitBtnStyle, margin: "5px 0" }}
                                //disabled={isPanVarified}
                                variant="contained"
                                //onClick={handlePanVerifiaction}
                                endIcon={<Autorenew />}
                            >
                                Check
                            </Button>
                            {/* <Dialog open={isPANModalOpen} onClose={handleDialogCancel}>
                        <DialogTitle>PAN Verified</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Your PAN is successfully verified. To fetch and verify UAN
                                automatically please click on OK.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={handleDialogConfirm}
                                variant="contained"
                                color="primary"
                                sx={submitBtnStyle}
                                autoFocus
                            >
                                OK
                            </Button>
                        </DialogActions>
                    </Dialog> */}
                            <VerificationStatusSection docType={insurancestatusMessage} />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={6}
                            sx={{
                                paddingLeft: { xs: "0px !important", md: "20px!important" },
                            }}
                        >
                            <TextInput
                                label={"Name on PAN"}
                                value={firstPageForm.panName}
                                //value={firstPageForm.dateOfBirth ? DDMMYYYY(firstPageForm.dateOfBirth) : null}
                                disabled={true}
                            />
                        </Grid>
                    </GridRow>



                </>
            )}
        </>

    );
};

export default InsuranceDetails;
