import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Fab,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import FormHeadingContainer from "shared/components/grid-container/form-heading-container";
import FormHeading from "./form-heading";
import GridRow from "shared/components/grid-container/grid-row";
import {
  checkBoxLabelStyle,
  checkBoxStyle,
  divederStyle,
  fileUploadSectionContainerStyle,
  headingType1,
  lable1CopyStyle,
  loginFieldIconStyle,
  positionRelative,
  primaryFabStyle,
  responsiveBtnType1Style,
  statusBoxstyle,
  statusstyle,
  submitBtnContainerStyle,
  submitBtnStyle,
  verificationBtnStyle,
} from "app";
import {
  Autorenew,
  HelpOutline,
  Info,
  InfoOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  aaddharNumberverify,
  aadharFileTypeAlias,
  emptyAccountNumberMsg,
  emptyIFSCMsg,
  invalidIFSCMsg,
  epfoPassbookFileTypeAlias,
  epfoServiceHistoryFileTypeAlias,
  getHandicapTypeDescription,
  handicapFileTypeAlias,
  imgAndPdfMaxSize,
  otherFileTypeAlias,
  passportFileTypeAlias,
  previousButton,
  tenthCertificateFileTypeAlias,
  trustEpfoFileTypeAlias,
} from "shared/constants/constants";
import TextInput from "shared/components/input-fields/text-input";
import FileUploadSection from "shared/components/file-upload-section/file-upload-section";
import { useSelector } from "react-redux";
import PassportFileNoSample from "assets/images/backgrounds/file-number-in-indian-passport.png";
import { DisableSection } from "shared/components/disble-section/disble-section";
import { VerificationStatusSection } from "shared/components/verification/verification-status-section";
import { Link } from "react-router-dom";
import VerficationAadharSteps from "shared/components/verification/verfication-aadhar";
import { hasValue } from "shared/utils";
import myImage from "assets/images/profile/instrucToServiceHistory.png";
import showErrorMessage from "shared/utils/associate/show-error-message";
import { verifyBankDetails } from "server/apis/verify/verify-bank-details";
import removeExtraSpaces from "shared/utils/associate/remove-extra-spaces";
import generateRemarks from "shared/utils/associate/generate-remarks";
import VerificationStatus from "shared/components/verification/verification-status";
import { patternChecking } from "shared/utils";
import { bankVerifyFailedMsg } from "shared/constants/constants";

const BankVerification = ({
  // accountNumber,
  // IFSCCode,
  bankstatusMessage,
  setBankStatusMessage,
  isAadhaarVarified,
  isBankVarified,
  setIsBankVarified,
  accountNumber,
  setAccountNumber,
  IFSCCode,
  setIFSCCode,
stepsList}) => {
  const dropdownList = useSelector((state) => state.dropdownList);
  const apiSlice = useSelector((state) => state.apiSlice);
  const loggedInData = useSelector((state) => state.loggedInData);
    const commonHooksFunctionSlice = useSelector(
      (state) => state.commonHooksFunctionSlice
    );
    const functionSlice = useSelector((state) => state.functionSlice);
  const {
    openOtpForm,
    closeOtpForm,
    openOtpSubmitionModel,
    closeOtpSubmitionModel,
    openRemarksModel,
    openConfirmationModel,
    openInfoModel,
  } = functionSlice[0];
  const { userId, appointeeId, userCode, candidateId } = loggedInData[0];
  //const [accountNumber, setAccountNumber] = useState(null);
  //const [IFSCCode, setIFSCCode] = useState(null);
  const [ifscCodeError, setIFSCCodeError] = useState(false);
  // const [isBankVerified,setIsBankVerified] = useState();

  const handleAccountNumberChange = (value) => {
    // const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    setAccountNumber(value);
    // if (value !== "none") {
    //   if (value.length <= 10) {
    //     const upperCaseValue = value.trim().toUpperCase();
    //     setPan(upperCaseValue);
    //     if (upperCaseValue.length === 10) {
    //       if (panRegex.test(upperCaseValue)) {
    //         setPanNumberError(false);
    //         if (isAadhaarVarified) {
    //           setPan(upperCaseValue);
    //         } else {
    //           showErrorMessage(aaddharNumberverify);
    //         }
    //       }
    //       else {
    //         setPanNumberError(true);
    //         console.log('handelPANNumberChange');
    //         showErrorMessage("Invalid PAN number format. Please enter a valid PAN.");
    //       }
    //     } 
    //     else {
    //       setPanNumberError(false);
    //     }
    //   }
    // }
  };
  const handleIFSCCodeChange = (value) => {
    // const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    setIFSCCode(value);
    // if (value !== "none") {
    //   if (value.length <= 10) {
    //     const upperCaseValue = value.trim().toUpperCase();
    //     setPan(upperCaseValue);
    //     if (upperCaseValue.length === 10) {
    //       if (panRegex.test(upperCaseValue)) {
    //         setPanNumberError(false);
    //         if (isAadhaarVarified) {
    //           setPan(upperCaseValue);
    //         } else {
    //           showErrorMessage(aaddharNumberverify);
    //         }
    //       }
    //       else {
    //         setPanNumberError(true);
    //         console.log('handelPANNumberChange');
    //         showErrorMessage("Invalid PAN number format. Please enter a valid PAN.");
    //       }
    //     } 
    //     else {
    //       setPanNumberError(false);
    //     }
    //   }
    // }
  };

  const displayBankError = (msg) => {
    showErrorMessage(msg);
    //setPanNumberError(true);
};
  const handleBankAccountVerification = async () => {
    if (!isAadhaarVarified) {
      showErrorMessage(aaddharNumberverify);
      //setPanNumberError(true);
      return;
    }
    if (accountNumber === null) {
      showErrorMessage(emptyAccountNumberMsg);
    //  setPanNumberError(true);
    } 
    else if (IFSCCode === null) {
      showErrorMessage(emptyIFSCMsg);
    //  setPanNumberError(true);
    } 
    else if (!patternChecking(IFSCCode, /^[A-Z]{4}0[A-Z0-9]{6}$/)) {
      showErrorMessage(invalidIFSCMsg);
      setIFSCCodeError(true);
    } 
    else {
      verifyBank();
    }
  }
  const verifyBank = async () => {
    const payLoad = {
      appointeeId: appointeeId,
      accountNumber: accountNumber,
      Ifsc: hasValue(IFSCCode) ? removeExtraSpaces(IFSCCode) : null,
      userId: userId,
    };
    const response = await verifyBankDetails(payLoad);
    if (response) {
      const { remarks, isValid } = response.responseInfo;
      
      if (isValid) {
        setIsBankVarified(isValid);
       // setIsEpfoSectionDisabled(false);
        //showSuccessMessage(panSuccessMsg);
        //setIsPANModalOpen(true);
        //console.log('panmodal');

        //handleGetUANNumber();
        // setPanNumberError(false);
      } else {
        displayBankError(bankVerifyFailedMsg);
        if (hasValue(remarks)) {
          const generatedRemarks = generateRemarks(remarks);
          openRemarksModel(generatedRemarks);
        }
      }
      setBankStatusMessage(new VerificationStatus(isValid, "V"));
    }
  } 
  return (
    <>
      <FormHeadingContainer>
        <FormHeading
          step={stepsList?.BAV?.step}
          heading={stepsList?.BAV?.name}
          info={"Enter your Bank Account Details to verify."}
        />
      </FormHeadingContainer>
      <GridRow sx={positionRelative}>
        {/* {isEpfoSectionDisabled && <DisableSection />} */}

        <Grid item xs={12} md={6} sx={{ paddingLeft: "0px !important" }}>
          <TextInput
            label={"Bank Account Number"}
            // onChange={(val) => {
            //   // if (/^\d{0,12}$/.test(val)) {
            //   setAccountNumber(val);
            //   // }
            // }}
            onKeyDown={(e) => {
              // Allow only digits and restrict any other key presses
              // /  const regex = /^[0-4]*$/;
              if (!/^\d+$/.test(e.key) && e.key !== "Backspace") {
                e.preventDefault();
              }
            }}
            onChange={handleAccountNumberChange}
            value={accountNumber}
            disabled={isBankVarified}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            paddingLeft: {
              xs: "0px !important",
              md: "20px!important",
              ...positionRelative,
            },
          }}
        >
          {/* <Grid item xs={12} sx={{ paddingLeft: "0px !important" }}> */}
          <TextInput
            label={"IFSC Code"}
            // onChange={(val) => {
            //   // if (/^\d{0,12}$/.test(val)) {
            //   setIFSCCode(val);
            //   // }
            // }}
            onChange={handleIFSCCodeChange}

            value={IFSCCode}
            disabled={isBankVarified}
          />
        </Grid>
        
        <Grid sx={{ paddingLeft: "0px !important" }} item xs={12} md={6}>

        <Button
          sx={{ ...submitBtnStyle, margin: "5px 0" }}
          disabled={isBankVarified}
          variant="contained"
          onClick={handleBankAccountVerification}
          endIcon={<Autorenew />}
        >
          Verify
        </Button>

        
        <VerificationStatusSection docType={bankstatusMessage} />
        </Grid>
        
      </GridRow>
    </>
  );
};

export default BankVerification;
