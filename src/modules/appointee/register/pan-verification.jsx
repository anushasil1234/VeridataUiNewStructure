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
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel
} from "@mui/material";
import React, { useState } from "react";
import FormHeadingContainer from "shared/components/grid-container/form-heading-container";
import FormHeading from "./form-heading";
import GridRow from "shared/components/grid-container/grid-row";
import showErrorMessage from "shared/utils/associate/show-error-message";
import {
    submitBtnStyle,
    headingType1
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

const PANVerification = ({
    stepsList,
    isAadhaarVarified,
    isPANAvailable,
    setIsPANAvailable

}) => {
    const AADHARVERIFICATION_BY = process.env.REACT_APP_AADHARVERIFICATION_BY;

    console.log('AADHARVERIFICATION_BY', AADHARVERIFICATION_BY);

    const functionSlice = useSelector((state) => state.functionSlice);
    const { openRemarksModel } = functionSlice[0];

    const [pan, setPan] = useState(null);
    const [panNumberError, setPanNumberError] = useState(false);
    const [disabledPanInput, setDisabledPanInput] = useState(false);
    const [isPanVarified, setIsPanVarified] = useState(null);
    const [isPANModalOpen, setIsPANModalOpen] = useState(false);
    const [panstatusMessage, setPANStatusMessage] = useState(
        new VerificationStatus()
    );
    const [nameAsOnPan, setNameAsOnPan] = useState(null);
    const loggedInData = useSelector((state) => state.loggedInData);
    const { userId, appointeeId, userCode, candidateId } = loggedInData[0];
    //const [isPANAvailable, setIsPANAvailable] = useState(true);
    const dispatch = useDispatch();
    const setCurrentPageNo = (currentPageNo) => {
        dispatch(storeCurrentPageNo(currentPageNo));
    }

    const handelPANNumberChange = (value) => {
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

        if (value !== "none") {
            if (value.length <= 10) {
                const upperCaseValue = value.trim().toUpperCase();
                setPan(upperCaseValue);
                if (upperCaseValue.length === 10) {
                    if (panRegex.test(upperCaseValue)) {
                        setPanNumberError(false);
                        if (isAadhaarVarified) {
                            setPan(upperCaseValue);
                        } else {
                            showErrorMessage(aaddharNumberverify);
                        }
                    }
                    else {
                        setPanNumberError(true);
                        console.log('handelPANNumberChange');
                        showErrorMessage("Invalid PAN number format. Please enter a valid PAN.");
                    }
                } else {
                    setPanNumberError(false);
                }
            }
        }
    };

    const handleBlurPAN = () => {
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

        if (pan?.length === 10 && !panRegex.test(pan)) {
            setPanNumberError(true);
            showErrorMessage("Invalid PAN number format. Please enter a valid PAN.");
        }
    };

    const displayPanError = (msg) => {
        showErrorMessage(msg);
        setPanNumberError(true);
    };
    const handlePanVerifiaction = () => {
        if (!isAadhaarVarified) {
            showErrorMessage(aaddharNumberverify);
            setPanNumberError(true);
            return;
        }
        if (pan === null || nameAsOnPan === null || nameAsOnPan === "") {
            showErrorMessage(emptyPanMsg);
            setPanNumberError(true);
        } else if (!patternChecking(pan, /^[A-Z]{5}[0-9]{4}[A-Z]{1}/)) {
            showErrorMessage(invalidPanMsg);
            setPanNumberError(true);
        } else {
            verifyPAN();
        }
    };

    const verifyPAN = async () => {
        const payLoad = {
            appointeeId: appointeeId,
            panNummber: pan,
            panName: hasValue(nameAsOnPan) ? removeExtraSpaces(nameAsOnPan) : null,
            userId: userId,
        };
        const response = await verifyPANDetails(payLoad);
        if (response) {
            const { remarks, isValid } = response.responseInfo;
            setIsPanVarified(isValid);
            if (isValid) {
                //setIsEpfoSectionDisabled(false);
                //showSuccessMessage(panSuccessMsg);
                setIsPANModalOpen(true);
                console.log('panmodal');

                //handleGetUANNumber();
                // setPanNumberError(false);
            } else {
                displayPanError(panVerifyFailedMsg);
                if (hasValue(remarks)) {
                    const generatedRemarks = generateRemarks(remarks);
                    openRemarksModel(generatedRemarks);
                }
            }
            setPANStatusMessage(new VerificationStatus(isValid, "V"));
        }
    };

    // Function to handle dialog confirmation
    const handleDialogConfirm = () => {
        setIsPANModalOpen(false); // Close the dialog
        //handleGetUANNumber(); // Now call the function to get UAN number
        setCurrentPageNo(3);
    };

    const handleDialogCancel = () => {
        setIsPANModalOpen(false); // Just close the dialog without calling UAN
    };

    const generateRemarks = (remarks) => {
        let remarksList = [];
        if (hasValue(remarks)) {
            remarksList = remarks.split(",").map((remark) => {
                return {
                    remarksCategory: "NRML",
                    remarks: remark,
                };
            });
        }
        return remarksList;
    };

    const handleChangePANAvailable = (event) => {
        setIsPANAvailable(event.target.value === "Yes");
    };
    return (

        <>

            {/* ######  PAN Verification Section Start ###### */}
            < FormHeadingContainer >
                <FormHeading
                    step={stepsList?.PAV?.step}
                    heading={stepsList?.PAV?.name}
                    info={"Enter your PAN Number to verify."}
                />
            </FormHeadingContainer >
            <>
                <Typography sx={{ ...headingType1, lineHeight: "2.4375em", marginLeft: '34px' }}>
                    Do you have PAN Detail ?
                    {/* An eKYC XML file containing the personal data, required for verification, can be downloaded only by you using your Aadhaar credentials. This file contains the name, date of birth and gender, besides other information, that would be extracted to match with the information provided by you. The process would first inspect the authenticity of the eKYC XML file provided by you and then perform the matching and then dispose the file and the contents
                        Aadhaar verification wiil be done using the offline ekyc method of UIDAI. To see the details steps,   */}
                </Typography>
                {/* <Typography sx={{ ...lable1CopyStyle }}>
                    {"UAN Verification"}
                  </Typography> */}
                <RadioGroup
                    row
                    value={isPANAvailable ? "Yes" : "No"}
                    //   value={isUanVerificationProcessManual}
                    onChange={handleChangePANAvailable}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            paddingLeft: "20px",
                        }}
                    >
                        <FormControlLabel
                            value="Yes"
                            control={<Radio />}
                            label="Yes"
                        // disabled={!hasValue(UAN)}
                        />

                        <FormControlLabel
                            value="No"
                            control={<Radio />}
                            label="No"
                        //disabled={!hasValue(UAN)}
                        />
                    </Box>
                </RadioGroup>
                {isPANAvailable && (
                    <GridRow>
                        <Grid sx={{ paddingLeft: "0px !important" }} item xs={12} md={6}>
                            <TextInput
                                label={"PAN Number"}
                                value={pan}
                                onChange={handelPANNumberChange}
                                // required={true}
                                disabled={disabledPanInput}
                                error={panNumberError}
                                onBlur={handleBlurPAN}
                            //  maxLength={10}
                            />
                            <Button
                                sx={{ ...submitBtnStyle, margin: "5px 0" }}
                                disabled={isPanVarified}
                                variant="contained"
                                onClick={handlePanVerifiaction}
                                endIcon={<Autorenew />}
                            >
                                Verify
                            </Button>
                            <Dialog open={isPANModalOpen} onClose={handleDialogCancel}>
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
                            </Dialog>
                            <VerificationStatusSection docType={panstatusMessage} />
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
                                value={nameAsOnPan}
                                disabled={true}
                            />
                        </Grid>
                    </GridRow>
                )}
            </>
            {/* ######  PAN Verification Section End ###### */}

        </>
    );
};

export default PANVerification;
