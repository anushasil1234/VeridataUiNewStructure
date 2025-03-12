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
  subHeadingContentTextStyle,
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
  aadharFileTypeAlias,
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
import BankVerification from "./bank-verifications";
import DrivingLicenseVerification from "./driving-licence-verification";

const ThirdForm = ({
  formElement,
  stepsList,
  isAadhaarVarified,
  isOfflineXmlDownloaded,
  setIsOfflineXmlDownloaded,
  handleIsOfflineXmlDownloadedOnChange,
  nameAsOnAadhar,
  handleChangeNameOnAadhar,
  handleChangeAadharNumber,
  aadharShareCode,
  setAadharShareCode,
  disabledAadharInput,
  isAadhaarXmlUploaded,
  handleAadharVerifiaction,
  aadharstatusMessage,
  uploadAadharXmlFile,
  aadharXmlFileName,
  pan,
  handelPANNumberChange,
  handleBlurPAN,
  disabledPanInput,
  panNumberError,
  isPanVarified,
  handlePanVerifiaction,
  // handleBankAccountVerification,
  isPANModalOpen,
  handleDialogCancel,
  handleDialogConfirm,
  panstatusMessage,
  // bankstatusMessage,
  nameAsOnPan,
  isEpfoSectionDisabled,
  setUAN,
  UAN,
  // setAccountNumber,
  // accountNumber,
  // setIFSCCode,
  // IFSCCode,
  isUanVarified,
  handleEpfoButtonClick,
  isUanVerificationProcessManual,
  epfoButton,
  epfostatusMessage,
  uanAadharLink,
  handleChangeUanVerification,
  uploadEpfoServiceHistoryFile,
  epfoServiceHistoryFile,
  uploadEpfoPassBookFile,
  removeEPFOPassbookFile,
  epfoPassBookFiles,
  handleBack,
  submitDetails,
  aadharNumber,
  handleViewFile,
  otherVerification,
  currentPageNo,
  setCurrentPageNo,
  activeStep,
  setActiveStep,
  firstPageForm,
  setFirstPageForm,
  isLicenseAvailable,
  setIsLicenseAvailable
}) => {
  const AADHARVERIFICATION_BY = process.env.REACT_APP_AADHARVERIFICATION_BY;

  console.log('AADHARVERIFICATION_BY', AADHARVERIFICATION_BY);

  console.log("currentPageNo", currentPageNo);

  console.log("activeStep", activeStep);

  const functionSlice = useSelector((state) => state.functionSlice);
  const { openInfoModel } = functionSlice[0];
  const [openModal, setOpenModal] = useState(false);

  const openOfflineKycInfoModel = () => {
    const offlineKycContent = {
      dialogTitle: "Offline Aadhaar Kyc Steps Info",
      dialogContentText:
        "To complete the offline Aadhaar KYC process please follow the instructions given below :",
      dialogContentComponent: <VerficationAadharSteps />,
      fullWidth: true,
    };
    openInfoModel(offlineKycContent);
  };
  const handleOpenModal = () => {
    setOpenModal(true); // Open modal
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Close modal
  };

  const [passwordType, setPasswordType] = useState("password");
  const [isPasswordVisibilityOn, setIsPasswordVisibilityOn] = useState(false);
  const [passwordFieldIcon, setPasswordFieldIcon] = useState(
    <VisibilityOff sx={loginFieldIconStyle} />
  );
  const handleShareCodeVisibility = () => {
    setIsPasswordVisibilityOn(!isPasswordVisibilityOn);
  };
  const handleAadharShareCode = (val) => {
    console.log("sharecode", val);
    if (/^\d{0,4}$/.test(val)) {
      setAadharShareCode(val);
    }
  };
  const shareCodeProps = {
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleShareCodeVisibility}
        >
          {passwordFieldIcon}
        </IconButton>
      </InputAdornment>
    ),
  };
  useEffect(() => {
    if (isPasswordVisibilityOn) {
      setPasswordType("text");
      setPasswordFieldIcon(<Visibility sx={loginFieldIconStyle} />);
    } else {
      setPasswordType("password");
      setPasswordFieldIcon(<VisibilityOff sx={loginFieldIconStyle} />);
    }
  }, [isPasswordVisibilityOn]);
    const handleClickOnNext = async () => {
      // const ConfirmationModelContent = {
      //   dialogTitle: (
      //     <div
      //       style={{
      //         display: "flex",
      //         justifyContent: "space-between",
      //         alignItems: "center",
      //       }}
      //     >
      //       <Typography>Confirmation to save changes?</Typography>
      //     </div>
      //   ),
      //   dialogContentText: (
      //     <>
      //       <Typography sx={subHeadingContentTextStyle}>
      //         {/* {pensionConfirmation} */}
      //         This won't save the changes you have made. Do you want to proceed
      //         without saving changes?
      //       </Typography>
      //       <Typography> </Typography>
      //     </>
      //   ),
      //   fullWidth: true,
      //   mxWidth: "md",
      // };
      // openConfirmationYesNoModal(ConfirmationModelContent, handleYes, handleNo);
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
          {/* ######  Aadha Verification Section Start ###### */}
          <FormHeadingContainer>
            <FormHeading
              step={stepsList?.AV?.step}
              heading={stepsList?.AV?.name}
              info={
                "Enter Aadhaar data to verify, see more info in the below link."
              }
            />
          </FormHeadingContainer>
          {AADHARVERIFICATION_BY === "XML" && (
            <>
              <GridRow>
                <Typography sx={headingType1}>
                  As part of onboarding process, Please generate your e-KYC
                  verification file and upload it here. To see the details
                  steps,
                  {/* An eKYC XML file containing the personal data, required for verification, can be downloaded only by you using your Aadhaar credentials. This file contains the name, date of birth and gender, besides other information, that would be extracted to match with the information provided by you. The process would first inspect the authenticity of the eKYC XML file provided by you and then perform the matching and then dispose the file and the contents
                        Aadhaar verification wiil be done using the offline ekyc method of UIDAI. To see the details steps,   */}
                </Typography>
                <Typography
                  sx={{
                    cursor: "pointer",
                    color: "#9A208C",
                    fontWeight: 500,
                  }}
                  onClick={() => openOfflineKycInfoModel()}
                >
                  Click here
                </Typography>
              </GridRow>
              <GridRow>
                <FormControl
                  sx={{
                    flexDirection: "row",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {isAadhaarVarified ? (
                    <>
                      <FormControlLabel
                        sx={checkBoxLabelStyle}
                        control={
                          <Checkbox
                            disabled
                            checked
                            inputProps={{ "aria-label": "controlled" }}
                            sx={checkBoxStyle}
                          />
                        }
                      ></FormControlLabel>
                      <Typography
                        onClick={() =>
                          setIsOfflineXmlDownloaded(!isOfflineXmlDownloaded)
                        }
                        sx={checkBoxLabelStyle}
                      >
                        I have downloaded the Aadhar e-KYC file
                      </Typography>
                    </>
                  ) : (
                    <>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={isOfflineXmlDownloaded}
                            sx={{ paddingLeft: 0 }}
                            onChange={handleIsOfflineXmlDownloadedOnChange}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        }
                      ></FormControlLabel>
                      <Typography
                        onClick={() =>
                          setIsOfflineXmlDownloaded(!isOfflineXmlDownloaded)
                        }
                        sx={checkBoxLabelStyle}
                      >
                        I have downloaded the Aadhar e-KYC file
                      </Typography>
                    </>
                  )}
                </FormControl>
              </GridRow>
            </>
          )}
          <GridRow sx={positionRelative}>
            {AADHARVERIFICATION_BY === "XML" && !isOfflineXmlDownloaded && (
              <DisableSection />
            )}
            <Grid sx={{ paddingLeft: "0px !important" }} item xs={12} md={6}>
              <TextInput
                label={"Name On Aadhaar"}
                value={nameAsOnAadhar}
                onChange={handleChangeNameOnAadhar}
                disabled={true}
              />
              {AADHARVERIFICATION_BY === "XML" && (
                <TextInput
                  label={"Share Code (to be provided after uploading)"}
                  onChange={(e) => handleAadharShareCode(e)}
                  // onChange={(val) => {
                  //   if (/^\d{0,4}$/.test(val)) {
                  //     setAadharShareCode(val);
                  //   }
                  // }}
                  onKeyDown={(e) => {
                    // Allow only digits and restrict any other key presses
                    // /  const regex = /^[0-4]*$/;
                    if (!/^\d{0,4}$/.test(e.key) && e.key !== "Backspace") {
                      e.preventDefault();
                    }
                  }}
                  value={aadharShareCode}
                  //  onChange={setAadharShareCode}
                  disabled={disabledAadharInput || !isAadhaarXmlUploaded}
                  inputProps={shareCodeProps}
                  type={passwordType}
                  //maxLength={4}
                />
              )}

              {/* <TextInput
                label={"Share Code (to be provided after uploading)"}
                value={aadharShareCode}
                onChange={setAadharShareCode}
                disabled={disabledAadharInput || !isAadhaarXmlUploaded}
                //maxLength={4}
              /> */}

              <Button
                sx={{ ...submitBtnStyle, margin: "5px 0" }}
                disabled={isAadhaarVarified}
                variant="contained"
                onClick={handleAadharVerifiaction}
                endIcon={<Autorenew />}
              >
                Verify
              </Button>
              <VerificationStatusSection docType={aadharstatusMessage} />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                paddingLeft: { xs: "0px !important", md: "20px!important" },
              }}
            >
              {AADHARVERIFICATION_BY === "OTP" && (
                <TextInput
                  label={"Aadhar Number"}
                  value={aadharNumber}
                  onChange={handleChangeAadharNumber}
                  disabled={isAadhaarVarified}
                />
              )}
              {AADHARVERIFICATION_BY === "XML" && (
                <FileUploadSection
                  chooseFile={uploadAadharXmlFile}
                  fileName={aadharXmlFileName}
                  accept={".rar, .zip"}
                  disabled={isAadhaarVarified}
                  uploadTypeAlias={aadharFileTypeAlias}
                />
              )}
            </Grid>
          </GridRow>
          {/* ######  Aadhar Verification Section End ###### */}

          {/* ###### Driving license Verification Section End ###### */}
          {/* <BankVerification isAadhaarVarified={isAadhaarVarified} stepsList = {stepsList}/> */}
          <DrivingLicenseVerification
            isAadhaarVarified={isAadhaarVarified}
            stepsList={stepsList}
            firstPageForm={firstPageForm}
            setFirstPageForm = {setFirstPageForm}
            isLicenseAvailable={isLicenseAvailable}
            setIsLicenseAvailable={setIsLicenseAvailable}
          />

          {/* ###### Driving license Verification Section End ###### */}

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
                  onClick={() => {
                    setCurrentPageNo(4);  // Set currentPageNo to 4
                    setActiveStep(3);     // Set active step to 3
                  }}
                  sx={submitBtnStyle}
                  variant="contained"
                  color="primary"
                >
                  {"Next"}
                </Button>

                {isUanVerificationProcessManual === "manual" && (
                  <>
                    <Button
                      //onClick={() => setCurrentPageNo(1)}
                      onClick={() => submitDetails(false, true)}
                      //sx={{ m: "15px 5px", ml: 3 }}
                      sx={submitBtnStyle}
                      variant="contained"
                      color="primary"
                    >
                      {"Submit"}
                    </Button>
                  </>
                )} 
              </Stack>
            </Grid>
          </GridRow>
        </Grid>
      </form>
    </Box>
  );
};

export default ThirdForm;
