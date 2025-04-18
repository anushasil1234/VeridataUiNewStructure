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
  fileInputs,
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
  emptyDLNumberMsg,
  invalidDLMsg,
  dlAvailabilitySuccessMsg,
  dlAvailabilityErrorMsg
} from "shared/constants/constants";
import TextInput from "shared/components/input-fields/text-input";
import FileUploadSection from "shared/components/file-upload-section/file-upload-section";
import { useSelector } from "react-redux";
import PassportFileNoSample from "assets/images/backgrounds/file-number-in-indian-passport.png";
import { DisableSection } from "shared/components/disble-section/disble-section";
import { VerificationStatusSection } from "shared/components/verification/verification-status-section";
import { Link } from "react-router-dom";
import VerficationAadharSteps from "shared/components/verification/verfication-aadhar";
import { hasValue, patternChecking } from "shared/utils";
import myImage from "assets/images/profile/instrucToServiceHistory.png";
import showErrorMessage from "shared/utils/associate/show-error-message";
import showSuccessMessage from "shared/utils/associate/show-success-message";
import { verifyDrivingLicenseDetails } from "server/apis/verify/verify-driving-license";
import removeExtraSpaces from "shared/utils/associate/remove-extra-spaces";
import removeSingleSpaces from "shared/utils/associate/remove-single-spaces";
import generateRemarks from "shared/utils/associate/generate-remarks";
import VerificationStatus from "shared/components/verification/verification-status";
import dayjs from "dayjs";
import CustomeDatePicker from "shared/components/input-fields/custome-date-picker";
import { DDMMYYYY } from "shared/utils";
import { postAppointeeDocAvailibility } from "server/apis/appointee/appointee-workflow/post-appointee-doc-availability";
import { useTranslation } from "react-i18next";
import Tesseract from "tesseract.js";
import { fileInputboxContainerStyle } from "app";
import { SaveAlt } from '@mui/icons-material';
import { driving_license_regex } from "shared/constants/constants";
import { handleImageUpload } from "shared/utils/associate/text-extraction-from-upload-image";

const DrivingLicenseVerification = ({
  // accountNumber,
  // IFSCCode,
  isAadhaarVarified,
  stepsList,
  firstPageForm,
  setFirstPageForm,
  isLicenseAvailable,
  setIsLicenseAvailable,
  isDLVarified,
  setisDLVarified,
  licensestatusMessage,
  setLicenseStatusMessage,
  isDLVerificationDisabled,
  isDLAvailable,
  setIsDLAvailable,
  drivingLicense,
  setDrivingLicense,
  dateOfBirth,
  setDateOfBirth
}) => {
  const dropdownList = useSelector((state) => state.dropdownList);
  const apiSlice = useSelector((state) => state.apiSlice);
  const loggedInData = useSelector((state) => state.loggedInData);
  const { t } = useTranslation();
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
  //const [isLicenseAvailable, setIsLicenseAvailable] = useState(true);
  const [isLicenseVerified, setIsLicenseVerified] = useState();
  // const [licensestatusMessage, setLicenseStatusMessage] = useState(
  //   new VerificationStatus()
  // );
  const [dlNumberError, setDLNumberError] = useState(false);
  const [inputMethod, setInputMethod] = useState("manual"); // "manual" or "upload"
  const [uploadedFileName, setUploadedFileName] = useState(null);

  const handleLicenseNumberChange = (value) => {
    //setDrivingLicense(value);
    setDrivingLicense(value.toUpperCase());

  };


  const iconColor = 'none';
  const iconText = (
    <Typography sx={{ fontSize: "16px" }} >
      Choose a file to <Typography component="span" sx={{ color: iconColor, fontWeight: 'bold' }}>Upload</Typography>
    </Typography>
  )

  const handleDrivingLicenseVerification = async () => {
    // if (!isAadhaarVarified) {
    //   showErrorMessage(aaddharNumberverify);
    //   //setPanNumberError(true);
    //   return;
    // }
    if ( drivingLicense === null) {
      showErrorMessage(emptyDLNumberMsg);
      //  setPanNumberError(true);
    }
    else if (!patternChecking(drivingLicense, /^(?:[A-Z]{2}\d{2}-?|\w{2}-\d{2}|\w{2}\d{2} ?)\d{4}\d{7}$/)) {
      showErrorMessage(invalidDLMsg);
      setDLNumberError(true);
    }
    else {
      verifyDrivingLicense();
    }
  };
  const verifyDrivingLicense = async () => {
    const payLoad = {
      appointeeId: appointeeId,
      dlNumber: hasValue(drivingLicense) ? removeSingleSpaces(drivingLicense) : null,
      userId: userId,
    };

    //console.log("payload", payLoad);
    const response = await verifyDrivingLicenseDetails(payLoad);
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
      setisDLVarified(isValid);
      setLicenseStatusMessage(new VerificationStatus(isValid, "V"));
    }
  };

  const handleChangeLicenseAvailable = async (event) => {
    const selectedValue = event.target.value === "Yes"; // Boolean (true/false)

    //setIsLicenseAvailable(selectedValue); // Update state
    setIsDLAvailable(selectedValue);

    const payLoad = {
      appointeeId: appointeeId,
      userId: userId,
      type: "DL",
      value: selectedValue, // Send as Boolean (true/false)
    };

    try {
      const response = await postAppointeeDocAvailibility(payLoad);
      if (response.responseInfo === "Success") // todo change all success string to statuscode
        {
        showSuccessMessage(dlAvailabilitySuccessMsg);
        //console.log("License availability saved successfully");
      } else {
        showErrorMessage(dlAvailabilityErrorMsg);
        //console.error("Error saving license availability:", response);
      }
    } catch (error) {
      showErrorMessage(dlAvailabilityErrorMsg);
      //console.error("API call failed:", error);
    }
  };

  // useEffect(() => {
  //   console.log("Updated isLicenseAvailable:", isLicenseAvailable);
  // }, [isLicenseAvailable]);
  
  // useEffect(() => {
  //   console.log("Updated isLicenseAvailablef:", firstPageForm.isDLAvailable);
  // }, [firstPageForm.isDLAvailable]);
  
  // const onTextExtracted = (text) => {
  //   const extracted = extractLicenseNumber(text);
  //   setDrivingLicense(extracted);
  // };
  const onTextExtracted = (text) => {
    const extracted = extractLicenseNumber(text);
    if (extracted) {
      setDrivingLicense(extracted);
    }
    else {
      showErrorMessage("Can't extract Driving License Number. Please enter it manually.");
    }
  };
  const extractLicenseNumber = (text) => {
    // Adjust the regex based on your DL format
    const match = text.match(driving_license_regex);
    return match ? match[0].replace(/\s/g, '') : '';
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
          <Typography sx={{ ...headingType1, lineHeight: "2.4375em", marginLeft: '34px' }}>
          {t("Do you have a driving license?")}

            {/* An eKYC XML file containing the personal data, required for verification, can be downloaded only by you using your Aadhaar credentials. This file contains the name, date of birth and gender, besides other information, that would be extracted to match with the information provided by you. The process would first inspect the authenticity of the eKYC XML file provided by you and then perform the matching and then dispose the file and the contents
                        Aadhaar verification wiil be done using the offline ekyc method of UIDAI. To see the details steps,   */}
          </Typography>
          {/* <Typography sx={{ ...lable1CopyStyle }}>
                    {"UAN Verification"}
                  </Typography> */}
          <RadioGroup
            row
            //value={isDLAvailable !== null ? (isDLAvailable ? "Yes" : "No") : (isLicenseAvailable ? "Yes" : "No")}
            value={ (isDLAvailable ? "Yes" : "No")}
            
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
                label={t("Yes")}
                disabled={isDLVerificationDisabled}
              />

              <FormControlLabel
                value="No"
                control={<Radio />}
                label={t("No")}
                disabled={isDLVerificationDisabled}
              />
            </Box>
          </RadioGroup>

          {/* {isEpfoSectionDisabled && <DisableSection />} */}
          { isDLAvailable  && (
            <GridRow>
              <Grid
                item
                xs={12}
                md={6}
                sx={{ paddingLeft: "0px !important" }}
              >
                <TextInput
                 label={t("Driving License Number")}

                  // onChange={(val) => {
                  //   // if (/^\d{0,12}$/.test(val)) {
                  //   setAccountNumber(val);
                  //   // }
                  // }}
                  onChange={handleLicenseNumberChange}
                  disabled={isDLVarified}
                  value={drivingLicense}
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
                <TextInput
                  label={t("Date of Birth")}
                  //value={firstPageForm.dateOfBirth}
                  value={firstPageForm?.dateOfBirth ? DDMMYYYY(firstPageForm?.dateOfBirth) : null}
                  disabled={true}
                />
              </Grid>
              <Grid sx={{ paddingLeft: "0px !important" }} item xs={12} md={6}>
                <Button
                  sx={{ ...submitBtnStyle, margin: "5px 0" }}
                  disabled={isDLVarified}
                  variant="contained"
                  onClick={handleDrivingLicenseVerification}
                  endIcon={<Autorenew />}
                >
                     {t("Verify")}
                </Button>

                <VerificationStatusSection docType={licensestatusMessage} />
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
                        Upload an image containing the Driving License Number.
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
          )}
        </>
      }

    </>
  );
};

export default DrivingLicenseVerification;
