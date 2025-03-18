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
    Table, TableHead, TableBody, TableRow, TableCell, TableContainer,
    AppBar,
    IconButton,
    Toolbar,
} from "@mui/material";
import { modelToolbar } from "app";
import { Close } from "@mui/icons-material";
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
    firVerifyFailedMsg
} from "shared/constants/constants";
import TextInput from "shared/components/input-fields/text-input";
import { useSelector, useDispatch } from "react-redux";
import { VerificationStatusSection } from "shared/components/verification/verification-status-section";
import { hasValue, patternChecking } from "shared/utils";
import BankVerification from "./bank-verifications";
import VerificationStatus from "../../../shared/components/verification/verification-status";
import removeExtraSpaces from "shared/utils/associate/remove-extra-spaces";
import { checkFIRDetails } from "server/apis/verify/check-fir-details";
import { storeCurrentPageNo } from "store/slices/candidate-page-slice";
import { DDMMYYYY } from "shared/utils";

const FIRVerification = ({
    stepsList,
    isAadhaarVarified,
    firstPageForm,
    firstatusMessage,
    isPoliceVarified,
    setisPoliceVarified,
    setFIRStatusMessage,
    firDetails,
    setFIRDetails,
    dateOfBirth,
    setDateOfBirth
}) => {
    const AADHARVERIFICATION_BY = process.env.REACT_APP_AADHARVERIFICATION_BY;

    console.log('AADHARVERIFICATION_BY', AADHARVERIFICATION_BY);

    const functionSlice = useSelector((state) => state.functionSlice);
    const { openRemarksModel } = functionSlice[0];

    console.log("stepsList", stepsList);

    const [pan, setPan] = useState(null);
    const [panNumberError, setPanNumberError] = useState(false);
    const [disabledPanInput, setDisabledPanInput] = useState(false);
    //const [isFIRVarified, setIsFIRVarified] = useState(null);
    const [isFIRModalOpen, setIsFIRModalOpen] = useState(false);
    //const [firDetails, setFIRDetails] = useState([]);
    // const [firDetails, setFIRDetails] = useState([
    //     {
    //         FirNumber: "FIR2025001",
    //         Date: "2025-03-10",
    //         PoliceStation: "Mumbai Central Police Station",
    //         CrimeType: "Fraud",
    //         Status: "Under Investigation"
    //     },
    //     {
    //         FirNumber: "FIR2025002",
    //         Date: "2025-02-28",
    //         PoliceStation: "Delhi Cantt Police Station",
    //         CrimeType: "Theft",
    //         Status: "Closed"
    //     }
    // ]);
    const [isViewFIREnabled, setIsViewFIREnabled] = useState(false);
    // const [firstatusMessage, setFIRStatusMessage] = useState(
    //     new VerificationStatus()
    // );
    const [nameAsOnPan, setNameAsOnPan] = useState(null);
    const loggedInData = useSelector((state) => state.loggedInData);
    const { userId, appointeeId, userCode, candidateId, userName } = loggedInData[0];
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

    const displayFirError = (msg) => {
        showErrorMessage(msg);
        //setPanNumberError(true);
    };
    // const handlePanVerifiaction = () => {
    //     if (!isAadhaarVarified) {
    //         showErrorMessage(aaddharNumberverify);
    //         setPanNumberError(true);
    //         return;
    //     }
    //     if (pan === null || nameAsOnPan === null || nameAsOnPan === "") {
    //         showErrorMessage(emptyPanMsg);
    //         setPanNumberError(true);
    //     } else if (!patternChecking(pan, /^[A-Z]{5}[0-9]{4}[A-Z]{1}/)) {
    //         showErrorMessage(invalidPanMsg);
    //         setPanNumberError(true);
    //     } else {
    //         checkFIR();
    //     }
    // };

    const handleFIRChecking = () => {
        checkFIR();
    };

    const checkFIR = async () => {
        const payLoad = {
            appointeeId: appointeeId,
            userId: userId,
        };
        const response = await checkFIRDetails(payLoad);

        // const response = {
        //     "policeFirDetails": [
        //         {
        //             "FirNumber": "FIR2025001",
        //             "Date": "2025-03-10",
        //             "PoliceStation": "Mumbai Central Police Station",
        //             "CrimeType": "Fraud",
        //             "Status": "Under Investigation"
        //         },
        //         {
        //             "FirNumber": "FIR2025002",
        //             "Date": "2025-02-28",
        //             "PoliceStation": "Delhi Cantt Police Station",
        //             "CrimeType": "Theft",
        //             "Status": "Closed"
        //         }
        //     ],
        //     "isValid": false,
        //     "remarks": "No serious offenses found."
        // }


        if (response) {
            const { policeFirDetails, isValid, remarks } = response.responseInfo;
            //const { policeFirDetails, isValid, remarks } = response;


            setisPoliceVarified(isValid);
            setFIRDetails(policeFirDetails); // Store FIR details
            setIsViewFIREnabled(policeFirDetails?.length > 0); // Enable "View FIR" button if details exist

            if (isValid) {
                //setIsFIRModalOpen(true);
                //setIsFIRModalOpen(true);
            } else {
                displayFirError(firVerifyFailedMsg);

                // if (hasValue(remarks)) {
                //     const generatedRemarks = generateRemarks(remarks);
                //     openRemarksModel(generatedRemarks);
                // }

                if (hasValue(policeFirDetails)) {
                    //const generatedRemarks = generateRemarks(remarks);
                    setIsFIRModalOpen(true);
                }

            }
            setIsFIRModalOpen(true);
            setFIRStatusMessage(new VerificationStatus(isValid, "V"));
        }
    };

    //console.log("isViewFIREnabled", isViewFIREnabled);

    const parsedFIRDetails = typeof firDetails === "string" ? JSON.parse(firDetails) : firDetails || [];


    // Function to handle dialog confirmation
    const handleDialogConfirm = () => {
        setIsFIRModalOpen(false); // Close the dialog
        //handleGetUANNumber(); // Now call the function to get UAN number
        //setCurrentPageNo(3);
    };

    const handleDialogCancel = () => {
        setIsFIRModalOpen(false); // Just close the dialog without calling UAN
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
    return (

        <>

            {/* ######  FIR Verification Section Start ###### */}
            < FormHeadingContainer >
                <FormHeading
                    step={stepsList?.FIRV?.step}
                    heading={stepsList?.FIRV?.name}
                    info={"Check if any FIR is filed against you."}
                />
            </FormHeadingContainer >

            <GridRow>
                <Grid sx={{ paddingLeft: "0px !important" }} item xs={12} md={6}>
                    <TextInput
                        label={"Candidate Name"}
                        value={userName}
                        //onChange={handelPANNumberChange}
                        // required={true}
                        disabled={true}
                    //error={panNumberError}
                    //onBlur={handleBlurPAN}
                    //  maxLength={10}
                    />
                    <Button
                        sx={{ ...submitBtnStyle, margin: "5px 10px 5px 0" }}
                        //disabled={isPanVarified}
                        disabled={isPoliceVarified}
                        variant="contained"
                        onClick={handleFIRChecking}
                        endIcon={<Autorenew />}
                    >
                        Check
                    </Button>
                    {
                        isViewFIREnabled &&
                        (
                            <Button
                                sx={{ ...submitBtnStyle, margin: "5px 0" }}
                                variant="contained"
                                onClick={() => setIsFIRModalOpen(true)}
                            >
                                FIR Details
                            </Button>
                        )}
                    {parsedFIRDetails.length > 0 && (
                        <Dialog open={isFIRModalOpen} onClose={handleDialogCancel}>
                            <AppBar sx={{ ...modelToolbar, position: 'sticky', top: '0' }}>
                                <Toolbar>
                                    <IconButton edge="start" onClick={handleDialogCancel} aria-label="close">
                                        <Close sx={{ color: "#fff" }} />
                                    </IconButton>
                                </Toolbar>
                            </AppBar>

                            <DialogTitle>FIR Details</DialogTitle>

                            <DialogContent>
                                {parsedFIRDetails.length > 0 && (
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell><strong>FIR Number</strong></TableCell>
                                                <TableCell><strong>Date</strong></TableCell>
                                                <TableCell><strong>Police Station</strong></TableCell>
                                                <TableCell><strong>Crime Type</strong></TableCell>
                                                <TableCell><strong>Status</strong></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {parsedFIRDetails.map((fir, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{fir.FirNumber}</TableCell>
                                                    <TableCell>{fir.Date}</TableCell>
                                                    <TableCell>{fir.PoliceStation}</TableCell>
                                                    <TableCell>{fir.CrimeType}</TableCell>
                                                    <TableCell>{fir.Status}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                )}
                            </DialogContent>

                        </Dialog>
                    )}


                    {/* <Dialog open={isFIRModalOpen} onClose={handleDialogCancel}>
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
                    <VerificationStatusSection docType={firstatusMessage} />
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
                        label={"Date of Birth"}
                        //value={firstPageForm.dateOfBirth}
                        value={firstPageForm?.dateOfBirth ? DDMMYYYY(firstPageForm?.dateOfBirth) : null}
                        disabled={true}
                    />
                </Grid>
            </GridRow>
            {/* ######  FIR Verification Section End ###### */}

        </>
    );
};

export default FIRVerification;
