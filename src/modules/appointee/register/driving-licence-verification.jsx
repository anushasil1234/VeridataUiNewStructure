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
import dayjs from "dayjs";
import CustomeDatePicker from "shared/components/input-fields/custome-date-picker";

const DrivingLicenseVerification = ({
  // accountNumber,
  // IFSCCode,
  isAadhaarVarified,
  stepsList,
  firstPageForm,
  setFirstPageForm
}) => {
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
  const [licenseNumber, setLicenseNumber] = useState(null);
  const [dob, setDob] = useState(null);
  const [isLicenseAvailable, setIsLicenseAvailable] = useState(true);
  const [isLicenseVerified, setIsLicenseVerified] = useState();
  const [bankstatusMessage, setLicenseStatusMessage] = useState(
    new VerificationStatus()
  );

  const handleLicenseNumberChange = (value) => {
    // const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    setLicenseNumber(value);
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
  const handleDOBChange = (value) => {
    // const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    setDob(value);
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
  const handleBankAccountVerification = async () => {
    if (!isAadhaarVarified) {
      showErrorMessage(aaddharNumberverify);
      //setPanNumberError(true);
      return;
    }
    if (licenseNumber === null) {
      showErrorMessage(emptyAccountNumberMsg);
      //  setPanNumberError(true);
    } else if (dob === null) {
      showErrorMessage(emptyIFSCMsg);
      //  setPanNumberError(true);
    }
    // else if (!patternChecking(pan, /^[A-Z]{5}[0-9]{4}[A-Z]{1}/)) {
    //   showErrorMessage(invalidPanMsg);
    //   setPanNumberError(true);
    // }
    else {
      verifyBank();
    }
  };
  const verifyBank = async () => {
    const payLoad = {
      appointeeId: appointeeId,
      //  accountNumber: accountNumber,
      // Ifsc: hasValue(IFSCCode) ? removeExtraSpaces(IFSCCode) : null,
      userId: userId,
    };
    const response = await verifyBankDetails(payLoad);
    if (response) {
      const { remarks, isValid } = response.responseInfo;
      // setIsBankVerified(isValid);
      if (isValid) {
        // setIsEpfoSectionDisabled(false);
        //showSuccessMessage(panSuccessMsg);
        //setIsPANModalOpen(true);
        //console.log('panmodal');
        //handleGetUANNumber();
        // setPanNumberError(false);
      } else {
        // displayPanError(panVerifyFailedMsg);
        if (hasValue(remarks)) {
          const generatedRemarks = generateRemarks(remarks);
          openRemarksModel(generatedRemarks);
        }
      }
      //    / setBankStatusMessage(new VerificationStatus(isValid, "V"));
    }
  };
  const handleChangeLicenseAvailable = (event) => {
    setIsLicenseAvailable(event.target.value === "Yes");
  };
  const handleFirstPageFormInputChange = (value, name) => {
    setFirstPageForm({ ...firstPageForm, [name]: value });
  }
  return (
    <>
      <FormHeadingContainer>
        <FormHeading
          step={stepsList?.DLV?.step}
          heading={stepsList?.DLV?.name}
          info={"Enter your Driving License Details to verify."}
        />
      </FormHeadingContainer>
        {/* {isEpfoSectionDisabled && <DisableSection />} */}

        {
          // AADHARVERIFICATION_BY === "XML" && (
          <>
            <Typography sx={{ ...headingType1, lineHeight: "2.4375em",marginLeft:'34px' }}>
              Do you have Driving License ?
              {/* An eKYC XML file containing the personal data, required for verification, can be downloaded only by you using your Aadhaar credentials. This file contains the name, date of birth and gender, besides other information, that would be extracted to match with the information provided by you. The process would first inspect the authenticity of the eKYC XML file provided by you and then perform the matching and then dispose the file and the contents
                        Aadhaar verification wiil be done using the offline ekyc method of UIDAI. To see the details steps,   */}
            </Typography>
            {/* <Typography sx={{ ...lable1CopyStyle }}>
                    {"UAN Verification"}
                  </Typography> */}
            <RadioGroup
              row
              value={isLicenseAvailable ? "Yes" : "No"}
              //   value={isUanVerificationProcessManual}
              onChange={handleChangeLicenseAvailable}
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

            {/* {isEpfoSectionDisabled && <DisableSection />} */}
            {isLicenseAvailable && (
              <GridRow>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ paddingLeft: "0px !important" }}
                >
                  <TextInput
                    label={"Driving License Number"}
                    // onChange={(val) => {
                    //   // if (/^\d{0,12}$/.test(val)) {
                    //   setAccountNumber(val);
                    //   // }
                    // }}
                    onChange={handleLicenseNumberChange}
                    value={licenseNumber}
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
                  {/* <TextInput
                    label={"Date Of Birth"}
                    // onChange={(val) => {
                    //   // if (/^\d{0,12}$/.test(val)) {
                    //   setIFSCCode(val);
                    //   // }
                    // }}
                    onChange={handleDOBChange}
                    value={dob}
                  /> */}
                  <CustomeDatePicker
                label={"Date Of Birth"}
                value={firstPageForm.dateOfBirth ? dayjs(firstPageForm.dateOfBirth) : null}
                setValue={(newDate, name) => {
                  if (newDate) {
                    handleFirstPageFormInputChange(newDate.format("YYYY-MM-DD"), 'dateOfBirth');
                  } else {
                    handleFirstPageFormInputChange(null, 'dateOfBirth'); // Clear the value if the date is cleared
                  }
                }}
                required={true}
                disableFuture={true}
                maxDate={dayjs()}
                minDate={dayjs().subtract(150, "year")}
              //  disabled={firstPageForm.isAadhaarVarified}
              />
                </Grid>
                <Button
                  sx={{ ...submitBtnStyle, margin: "5px 0" }}
                  // disabled={isPanVarified}
                  variant="contained"
                  onClick={handleBankAccountVerification}
                  endIcon={<Autorenew />}
                >
                  Verify
                </Button>
              </GridRow>
            )}
          </>
        }
    
    </>
  );
};

export default DrivingLicenseVerification;
