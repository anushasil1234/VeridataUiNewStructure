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
import showSuccessMessage from "shared/utils/associate/show-success-message";
import {
    submitBtnStyle,
    headingType1,
    fileInputs,
    positionRelative,
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
    panAvailabilitySuccessMsg,
    panAvailabilityErrorMsg
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
import { postAppointeeDocAvailibility } from "server/apis/appointee/appointee-workflow/post-appointee-doc-availability";
import { useTranslation } from "react-i18next";
import { fileInputboxContainerStyle } from "app";
import { SaveAlt } from '@mui/icons-material';
import { pan_regex } from "shared/constants/constants";
import { handleImageUpload } from "shared/utils/associate/text-extraction-from-upload-image";

const PANVerification = ({
    stepsList,
    isAadhaarVarified,
    isPANAvailable,
    setIsPANAvailable,
    nameAsOnPan,
    panstatusMessage,
    setPANStatusMessage,
    isPanVarified,
    setIsPanVarified,
    disabledPanInput,
    pan,
    setPan
}) => {
    const AADHARVERIFICATION_BY = process.env.REACT_APP_AADHARVERIFICATION_BY;
    const { t } = useTranslation();
    console.log('AADHARVERIFICATION_BY', AADHARVERIFICATION_BY);

    const functionSlice = useSelector((state) => state.functionSlice);
    const { openRemarksModel } = functionSlice[0];

    //const [pan, setPan] = useState(null);
    const [panNumberError, setPanNumberError] = useState(false);
    // const [disabledPanInput, setDisabledPanInput] = useState(false);
    //const [isPanVarified, setIsPanVarified] = useState(null);
    const [isPANModalOpen, setIsPANModalOpen] = useState(false);
    const [uploadedFileName, setUploadedFileName] = useState(null);

    // const [panstatusMessage, setPANStatusMessage] = useState(
    //     new VerificationStatus()
    // );
    // const [nameAsOnPan, setNameAsOnPan] = useState(null);
    const loggedInData = useSelector((state) => state.loggedInData);
    const { userId, appointeeId, userCode, candidateId } = loggedInData[0];
    //const [isPANAvailable, setIsPANAvailable] = useState(true);
    const dispatch = useDispatch();
    const setCurrentPageNo = (currentPageNo) => {
        dispatch(storeCurrentPageNo(currentPageNo));
    }
    const iconColor = 'none';
    const iconText = (
        <Typography sx={{ fontSize: "16px" }} >
          Choose a file to <Typography component="span" sx={{ color: iconColor, fontWeight: 'bold' }}>Upload</Typography>
        </Typography>
      )
      const onTextExtracted = (text) => {
        //console.log("Extracted Text:", text);
        const extracted = extractPanNumber(text);
        //console.log("Extracted PAN Number:", extracted);
        if (extracted) {
            setPan(extracted);
        }
        else {
            showErrorMessage("Can't extract PAN Number. Please enter it manually.");
        }
      };
    
      const extractPanNumber = (text) => {
        // Adjust the regex based on your DL format
        const match = text.match(pan_regex);
        return match ? match[0].replace(/\s/g, '') : '';
      };
    const handelPANNumberChange = (value) => {
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

        if (value !== "none") {
            if (value.length <= 10) {
                const upperCaseValue = value.trim().toUpperCase();
                setPan(upperCaseValue);
                if (upperCaseValue.length === 10) {
                    if (panRegex.test(upperCaseValue)) {
                        setPanNumberError(false);
                        // if (isAadhaarVarified) {
                        //     setPan(upperCaseValue);
                        // } else {
                        //     showErrorMessage(aaddharNumberverify);
                        // }
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
        // if (!isAadhaarVarified) {
        //     showErrorMessage(aaddharNumberverify);
        //     setPanNumberError(true);
        //     return;
        // }
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
                //setIsPANModalOpen(true);
                //console.log('panmodal');

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
       // setCurrentPageNo(3);
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

    // const handleChangePANAvailable = (event) => {
    //     setIsPANAvailable(event.target.value === "Yes");
    // };

    const handleChangePANAvailable = async (event) => {
        const selectedValue = event.target.value === "Yes"; // Boolean (true/false)
      
        setIsPANAvailable(selectedValue); // Update state
      
        const payLoad = {
          appointeeId: appointeeId,
          userId: userId,
          type: "PAN",
          value: selectedValue, // Send as Boolean (true/false)
        };
      
        try {
          const response = await postAppointeeDocAvailibility(payLoad);
          //console.log("response",response);
          if (response.responseInfo === "Success") { //todo
            showSuccessMessage(panAvailabilitySuccessMsg);
            //console.log("License availability saved successfully");
          } else {
            showErrorMessage(panAvailabilityErrorMsg);
            //console.error("Error saving license availability:", response);
          }
        } catch (error) {
            showErrorMessage(panAvailabilityErrorMsg);
          //console.error("API call failed:", error);
        }
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
            {
                <>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography sx={{ ...headingType1, lineHeight: "2.4375em", marginLeft: '34px' }}>
                            {t("Do you have PAN Detail?")}

                        </Typography>

                        <RadioGroup
                            row
                            value={isPANAvailable ? "Yes" : "No"}
                            //   value={isUanVerificationProcessManual}
                            onChange={handleChangePANAvailable}
                            sx={{ marginLeft: '24px' }}
                        >

                            <FormControlLabel
                                value="Yes"
                                control={<Radio />}
                                label={t("Yes")}
                                disabled={isPanVarified}
                            />

                            <FormControlLabel
                                value="No"
                                control={<Radio />}
                                label={t("No")}
                                disabled={isPanVarified}
                            />

                        </RadioGroup>
                    </Box>
                    {isPANAvailable && (
                        <>
                            <GridRow sx={positionRelative}>
                                <Grid sx={{ paddingLeft: "0px !important" }} item xs={12} md={6}>
                                    <TextInput
                                        label={t("PAN Number")}
                                        value={pan}
                                        onChange={handelPANNumberChange}
                                        disabled={isPanVarified}
                                        error={panNumberError}
                                        onBlur={handleBlurPAN}

                                    />
                                    <TextInput
                                        label={t("Name on PAN")}
                                        value={nameAsOnPan}
                                        disabled={true}
                                    />
                                    <Button
                                        sx={{ ...submitBtnStyle, margin: "5px 0" }}
                                        disabled={isPanVarified}
                                        variant="contained"
                                        onClick={handlePanVerifiaction}
                                        endIcon={<Autorenew />}
                                    >
                                        {t("Verify")}
                                    </Button>
                                    <VerificationStatusSection docType={panstatusMessage} />
                                </Grid>
                                <Grid item
                                    xs={12}
                                    md={6}
                                    sx={{
                                        ...fileInputboxContainerStyle,
                                        overflowY: "auto",
                                        position: "relative",
                                        marginBottom: "auto",
                                        paddingLeft: { xs: "0px !important", md: "20px!important" }
                                    }}

                                >

                                    <Box sx={fileInputs}>
                                        <input
                                            id="hidden-upload"
                                            type="file"
                                            accept="image/*"
                                            // onChange={handleImageUpload}
                                            onChange={(e) => handleImageUpload(e, setUploadedFileName, onTextExtracted)}
                                            style={{ marginBottom: '10px' }}
                                            onClick={(e) => (e.target.value = null)}

                                        />
                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}
                                            onClick={() => document.getElementById('hidden-upload')?.click()}>

                                            <SaveAlt sx={{ mb: 0.5, color: iconColor }} />
                                            <Typography variant="body1" sx={{ color: iconColor }}>{iconText}</Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Upload an image containing the PAN Number.
                                            </Typography>
                                            {uploadedFileName && (
                                                <Typography variant="body2" sx={{ mt: 1 }}>
                                                    Uploaded File: {uploadedFileName}
                                                </Typography>
                                            )}
                                        </Box>

                                    </Box>
                                </Grid>
                            </GridRow>
                        </>
                    )}
                </>
            }
            
        </>
    );
};

export default PANVerification;
