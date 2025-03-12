
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
import { useSelector,useDispatch } from "react-redux";
import { VerificationStatusSection } from "shared/components/verification/verification-status-section";
import { hasValue,patternChecking } from "shared/utils";
import BankVerification from "./bank-verifications";
import VerificationStatus from "../../../shared/components/verification/verification-status";
import removeExtraSpaces from "shared/utils/associate/remove-extra-spaces";
import { verifyPANDetails } from "server/apis";
import { storeCurrentPageNo } from "store/slices/candidate-page-slice";
import PANVerification from "./pan-verification";

const FourthForm = ({
    formElement,
    stepsList,
    isAadhaarVarified,
    handleBack,
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
    const dispatch = useDispatch();
    const setCurrentPageNo = (currentPageNo)=>{
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
    


    return (
        <Box sx={{ width: "100%" }}>
            <form ref={formElement}>
                <Grid
                    sx={{ paddingLeft: "20px" }}
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >


                    {/* ######  PAN Verification Section Start ###### */}
                    <PANVerification isAadhaarVarified={isAadhaarVarified} stepsList={stepsList} />
                    {/* ######  PAN Verification Section End ###### */}

                    {/* ###### Bank Verification Section End ###### */}
                    <BankVerification isAadhaarVarified={isAadhaarVarified} stepsList={stepsList} />


                    {/* ###### Bank Verification Section End ###### */}

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
                                    {previousButton}
                                </Button>


                                <Button
                                    //onClick={() => setCurrentPageNo(1)}
                                    //onClick={}
                                    //sx={{ m: "15px 5px", ml: 3 }}
                                    sx={submitBtnStyle}
                                    variant="contained"
                                    color="primary"
                                >
                                    {"Next"}
                                </Button>

                            </Stack>
                        </Grid>
                    </GridRow>
                </Grid>
            </form>
        </Box>
    );
};

export default FourthForm;
