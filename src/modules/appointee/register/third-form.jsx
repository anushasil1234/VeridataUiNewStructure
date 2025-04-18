// import {
//   Box,
//   Button,
//   Checkbox,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Divider,
//   Fab,
//   FormControl,
//   FormControlLabel,
//   Grid,
//   IconButton,
//   InputAdornment,
//   Radio,
//   RadioGroup,
//   Stack,
//   Switch,
//   Tooltip,
//   Typography,
// } from "@mui/material";
// import React, { useState, useEffect } from "react";
// import FormHeadingContainer from "shared/components/grid-container/form-heading-container";
// import FormHeading from "./form-heading";
// import GridRow from "shared/components/grid-container/grid-row";
// import {
//   checkBoxLabelStyle,
//   checkBoxStyle,
//   divederStyle,
//   fileUploadSectionContainerStyle,
//   headingType1,
//   lable1CopyStyle,
//   loginFieldIconStyle,
//   positionRelative,
//   primaryFabStyle,
//   responsiveBtnType1Style,
//   statusBoxstyle,
//   statusstyle,
//   subHeadingContentTextStyle,
//   submitBtnContainerStyle,
//   submitBtnStyle,
//   verificationBtnStyle,
// } from "app";
// import {
//   Autorenew,
//   HelpOutline,
//   Info,
//   InfoOutlined,
//   Visibility,
//   VisibilityOff,
// } from "@mui/icons-material";
// import {
//   aadharFileTypeAlias,
//   epfoPassbookFileTypeAlias,
//   epfoServiceHistoryFileTypeAlias,
//   getHandicapTypeDescription,
//   handicapFileTypeAlias,
//   imgAndPdfMaxSize,
//   otherFileTypeAlias,
//   passportFileTypeAlias,
//   previousButton,
//   tenthCertificateFileTypeAlias,
//   trustEpfoFileTypeAlias,
//   aaddharNumberverify
// } from "shared/constants/constants";
// import TextInput from "shared/components/input-fields/text-input";
// import FileUploadSection from "shared/components/file-upload-section/file-upload-section";
// import { useSelector } from "react-redux";
// import PassportFileNoSample from "assets/images/backgrounds/file-number-in-indian-passport.png";
// import { DisableSection } from "shared/components/disble-section/disble-section";
// import { VerificationStatusSection } from "shared/components/verification/verification-status-section";
// import { Link } from "react-router-dom";
// import VerficationAadharSteps from "shared/components/verification/verfication-aadhar";
// import { hasValue } from "shared/utils";
// import myImage from "assets/images/profile/instrucToServiceHistory.png";
// import BankVerification from "./bank-verifications";
// import DrivingLicenseVerification from "./driving-licence-verification";
// import showErrorMessage from "shared/utils/associate/show-error-message";


// const ThirdForm = ({
//   formElement,
//   stepsList,
//   isAadhaarVarified,
//   isOfflineXmlDownloaded,
//   setIsOfflineXmlDownloaded,
//   handleIsOfflineXmlDownloadedOnChange,
//   nameAsOnAadhar,
//   handleChangeNameOnAadhar,
//   handleChangeAadharNumber,
//   aadharShareCode,
//   setAadharShareCode,
//   disabledAadharInput,
//   isAadhaarXmlUploaded,
//   handleAadharVerifiaction,
//   aadharstatusMessage,
//   uploadAadharXmlFile,
//   aadharXmlFileName,
//   pan,
//   handelPANNumberChange,
//   handleBlurPAN,
//   disabledPanInput,
//   panNumberError,
//   isPanVarified,
//   handlePanVerifiaction,
//   // handleBankAccountVerification,
//   isPANModalOpen,
//   handleDialogCancel,
//   handleDialogConfirm,
//   panstatusMessage,
//   // bankstatusMessage,
//   nameAsOnPan,
//   isEpfoSectionDisabled,
//   setUAN,
//   UAN,
//   // setAccountNumber,
//   // accountNumber,
//   // setIFSCCode,
//   // IFSCCode,
//   isUanVarified,
//   handleEpfoButtonClick,
//   isUanVerificationProcessManual,
//   epfoButton,
//   epfostatusMessage,
//   uanAadharLink,
//   handleChangeUanVerification,
//   uploadEpfoServiceHistoryFile,
//   epfoServiceHistoryFile,
//   uploadEpfoPassBookFile,
//   removeEPFOPassbookFile,
//   epfoPassBookFiles,
//   handleBack,
//   submitDetails,
//   aadharNumber,
//   handleViewFile,
//   otherVerification,
//   currentPageNo,
//   setCurrentPageNo,
//   activeStep,
//   setActiveStep,
//   firstPageForm,
//   setFirstPageForm,
//   isLicenseAvailable,
//   setIsLicenseAvailable,
//   isDLVarified,
//   setisDLVarified,
//   licensestatusMessage,
//   setLicenseStatusMessage,
//   isDLAvailable,
//   setIsDLAvailable,
//   drivingLicense,
//   setDrivingLicense,
//   dateOfBirth,
//   setDateOfBirth

// }) => {
//   const AADHARVERIFICATION_BY = process.env.REACT_APP_AADHARVERIFICATION_BY;

//   console.log('AADHARVERIFICATION_BY', AADHARVERIFICATION_BY);

//   console.log("currentPageNo", currentPageNo);

//   console.log("activeStep", activeStep);

//   const functionSlice = useSelector((state) => state.functionSlice);
//   const { openInfoModel } = functionSlice[0];
//   const [openModal, setOpenModal] = useState(false);
//   const [isDLVerificationDisabled, setIsDLVerificationDisabled] = useState(false);
//   const [showDialog, setShowDialog] = useState(false);

//   const openOfflineKycInfoModel = () => {
//     const offlineKycContent = {
//       dialogTitle: "Offline Aadhaar Kyc Steps Info",
//       dialogContentText:
//         "To complete the offline Aadhaar KYC process please follow the instructions given below :",
//       dialogContentComponent: <VerficationAadharSteps />,
//       fullWidth: true,
//     };
//     openInfoModel(offlineKycContent);
//   };
//   const handleOpenModal = () => {
//     setOpenModal(true); // Open modal
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false); // Close modal
//   };

//   const [passwordType, setPasswordType] = useState("password");
//   const [isPasswordVisibilityOn, setIsPasswordVisibilityOn] = useState(false);
//   const [passwordFieldIcon, setPasswordFieldIcon] = useState(
//     <VisibilityOff sx={loginFieldIconStyle} />
//   );
//   const handleShareCodeVisibility = () => {
//     setIsPasswordVisibilityOn(!isPasswordVisibilityOn);
//   };
//   const handleAadharShareCode = (val) => {
//     console.log("sharecode", val);
//     if (/^\d{0,4}$/.test(val)) {
//       setAadharShareCode(val);
//     }
//   };

//   const [isPreviousSectionDisabled, setIsPreviousSectionDisabled] =
//     useState(false);

//   const shareCodeProps = {
//     endAdornment: (
//       <InputAdornment position="end">
//         <IconButton
//           aria-label="toggle password visibility"
//           onClick={handleShareCodeVisibility}
//         >
//           {passwordFieldIcon}
//         </IconButton>
//       </InputAdornment>
//     ),
//   };
//   useEffect(() => {
//     if (isPasswordVisibilityOn) {
//       setPasswordType("text");
//       setPasswordFieldIcon(<Visibility sx={loginFieldIconStyle} />);
//     } else {
//       setPasswordType("password");
//       setPasswordFieldIcon(<VisibilityOff sx={loginFieldIconStyle} />);
//     }
//   }, [isPasswordVisibilityOn]);

//   useEffect(() => {
//     if (hasValue(firstPageForm.isDLAvailable)) {
//       setIsPreviousSectionDisabled(true);
//     }
//   }, [firstPageForm.isDLAvailable]);

//   useEffect(() => {
//     console.log("isDLVerificationDisabled changed:", isDLVerificationDisabled);
//   }, [isDLVerificationDisabled]);

//   const handleClickOnNext = async () => {
//     // const ConfirmationModelContent = {
//     //   dialogTitle: (
//     //     <div
//     //       style={{
//     //         display: "flex",
//     //         justifyContent: "space-between",
//     //         alignItems: "center",
//     //       }}
//     //     >
//     //       <Typography>Confirmation to save changes?</Typography>
//     //     </div>
//     //   ),
//     //   dialogContentText: (
//     //     <>
//     //       <Typography sx={subHeadingContentTextStyle}>
//     //         {/* {pensionConfirmation} */}
//     //         This won't save the changes you have made. Do you want to proceed
//     //         without saving changes?
//     //       </Typography>
//     //       <Typography> </Typography>
//     //     </>
//     //   ),
//     //   fullWidth: true,
//     //   mxWidth: "md",
//     // };
//     // openConfirmationYesNoModal(ConfirmationModelContent, handleYes, handleNo);
//   };
//   return (
//     <Box sx={{ width: "100%" }}>
//       <form ref={formElement}>
//         <Grid
//           sx={{ paddingLeft: "20px" }}
//           container
//           rowSpacing={1}
//           columnSpacing={{ xs: 1, sm: 2, md: 3 }}
//         >
//           {/* ######  Aadha Verification Section Start ###### */}
//           <FormHeadingContainer>
//             <FormHeading
//               step={stepsList?.AV?.step}
//               heading={stepsList?.AV?.name}
//               info={
//                 "Enter Aadhaar data to verify, see more info in the below link."
//               }
//             />
//           </FormHeadingContainer>
//           {AADHARVERIFICATION_BY === "XML" && (
//             <>
//               <GridRow>
//                 <Typography sx={headingType1}>
//                   As part of onboarding process, Please generate your e-KYC
//                   verification file and upload it here. To see the details
//                   steps,
//                   {/* An eKYC XML file containing the personal data, required for verification, can be downloaded only by you using your Aadhaar credentials. This file contains the name, date of birth and gender, besides other information, that would be extracted to match with the information provided by you. The process would first inspect the authenticity of the eKYC XML file provided by you and then perform the matching and then dispose the file and the contents
//                         Aadhaar verification wiil be done using the offline ekyc method of UIDAI. To see the details steps,   */}
//                 </Typography>
//                 <Typography
//                   sx={{
//                     cursor: "pointer",
//                     color: "#9A208C",
//                     fontWeight: 500,
//                   }}
//                   onClick={() => openOfflineKycInfoModel()}
//                 >
//                   Click here
//                 </Typography>
//               </GridRow>
//               <GridRow>
//                 <FormControl
//                   sx={{
//                     flexDirection: "row",
//                     alignItems: "center",
//                     flexWrap: "wrap",
//                   }}
//                 >
//                   {isAadhaarVarified ? (
//                     <>
//                       <FormControlLabel
//                         sx={checkBoxLabelStyle}
//                         control={
//                           <Checkbox
//                             disabled
//                             checked
//                             inputProps={{ "aria-label": "controlled" }}
//                             sx={checkBoxStyle}
//                           />
//                         }
//                       ></FormControlLabel>
//                       <Typography
//                         onClick={() =>
//                           setIsOfflineXmlDownloaded(!isOfflineXmlDownloaded)
//                         }
//                         sx={checkBoxLabelStyle}
//                       >
//                         I have downloaded the Aadhar e-KYC file
//                       </Typography>
//                     </>
//                   ) : (
//                     <>
//                       <FormControlLabel
//                         control={
//                           <Checkbox
//                             checked={isOfflineXmlDownloaded}
//                             sx={{ paddingLeft: 0 }}
//                             onChange={handleIsOfflineXmlDownloadedOnChange}
//                             inputProps={{ "aria-label": "controlled" }}
//                           />
//                         }
//                       ></FormControlLabel>
//                       <Typography
//                         onClick={() =>
//                           setIsOfflineXmlDownloaded(!isOfflineXmlDownloaded)
//                         }
//                         sx={checkBoxLabelStyle}
//                       >
//                         I have downloaded the Aadhar e-KYC file
//                       </Typography>
//                     </>
//                   )}
//                 </FormControl>
//               </GridRow>
//             </>
//           )}
//           <GridRow sx={positionRelative}>
//             {AADHARVERIFICATION_BY === "XML" && !isOfflineXmlDownloaded && (
//               <DisableSection />
//             )}
//             <Grid sx={{ paddingLeft: "0px !important" }} item xs={12} md={6}>
//               <TextInput
//                 label={"Name On Aadhaar"}
//                 value={nameAsOnAadhar}
//                 onChange={handleChangeNameOnAadhar}
//                 disabled={true}
//               />
//               {AADHARVERIFICATION_BY === "XML" && (
//                 <TextInput
//                   label={"Share Code (to be provided after uploading)"}
//                   onChange={(e) => handleAadharShareCode(e)}
//                   // onChange={(val) => {
//                   //   if (/^\d{0,4}$/.test(val)) {
//                   //     setAadharShareCode(val);
//                   //   }
//                   // }}
//                   onKeyDown={(e) => {
//                     // Allow only digits and restrict any other key presses
//                     // /  const regex = /^[0-4]*$/;
//                     if (!/^\d{0,4}$/.test(e.key) && e.key !== "Backspace") {
//                       e.preventDefault();
//                     }
//                   }}
//                   value={aadharShareCode}
//                   //  onChange={setAadharShareCode}
//                   disabled={disabledAadharInput || !isAadhaarXmlUploaded}
//                   inputProps={shareCodeProps}
//                   type={passwordType}
//                 //maxLength={4}
//                 />
//               )}

//               {/* <TextInput
//                 label={"Share Code (to be provided after uploading)"}
//                 value={aadharShareCode}
//                 onChange={setAadharShareCode}
//                 disabled={disabledAadharInput || !isAadhaarXmlUploaded}
//                 //maxLength={4}
//               /> */}

//               <Button
//                 sx={{ ...submitBtnStyle, margin: "5px 0" }}
//                 disabled={isAadhaarVarified}
//                 variant="contained"
//                 onClick={handleAadharVerifiaction}
//                 endIcon={<Autorenew />}
//               >
//                 Verify
//               </Button>
//               <VerificationStatusSection docType={aadharstatusMessage} />
//             </Grid>
//             <Grid
//               item
//               xs={12}
//               md={6}
//               sx={{
//                 paddingLeft: { xs: "0px !important", md: "20px!important" },
//               }}
//             >
//               {AADHARVERIFICATION_BY === "OTP" && (
//                 <TextInput
//                   label={"Aadhar Number"}
//                   value={aadharNumber}
//                   onChange={handleChangeAadharNumber}
//                   disabled={isAadhaarVarified}
//                 />
//               )}
//               {AADHARVERIFICATION_BY === "XML" && (
//                 <FileUploadSection
//                   chooseFile={uploadAadharXmlFile}
//                   fileName={aadharXmlFileName}
//                   accept={".rar, .zip"}
//                   disabled={isAadhaarVarified}
//                   uploadTypeAlias={aadharFileTypeAlias}
//                 />
//               )}
//             </Grid>
//           </GridRow>
//           {/* ######  Aadhar Verification Section End ###### */}

//           {/* ###### Driving license Verification Section End ###### */}
//           {/* <BankVerification isAadhaarVarified={isAadhaarVarified} stepsList = {stepsList}/> */}
//           <DrivingLicenseVerification
//             isAadhaarVarified={isAadhaarVarified}
//             stepsList={stepsList}
//             firstPageForm={firstPageForm}
//             setFirstPageForm={setFirstPageForm}
//             isLicenseAvailable={isLicenseAvailable}
//             setIsLicenseAvailable={setIsLicenseAvailable}
//             isDLVarified={isDLVarified}
//             setisDLVarified={setisDLVarified}
//             licensestatusMessage={licensestatusMessage}
//             setLicenseStatusMessage={setLicenseStatusMessage}
//             isDLVerificationDisabled={isDLVerificationDisabled}
//             isDLAvailable={isDLAvailable}
//             setIsDLAvailable={setIsDLAvailable}
//             drivingLicense={drivingLicense}
//             setDrivingLicense={setDrivingLicense}
//             dateOfBirth={dateOfBirth}
//             setDateOfBirth={setDateOfBirth}
//           />

//           {/* ###### Driving license Verification Section End ###### */}

//           <GridRow>
//             <Grid sx={{ paddingLeft: "0px !important" }} item xs={12}>
//               <Stack flexDirection={"row"}>
//                 <Button
//                   //onClick={() => setCurrentPageNo(1)}
//                   onClick={handleBack}
//                   //sx={{ m: "15px 5px", ml: 3 }}
//                   sx={submitBtnStyle}
//                   variant="contained"
//                   color="primary"
//                 >
//                   {previousButton}
//                 </Button>

//                 <Button
//                   onClick={() => {
//                     // if (!isAadhaarVarified) {
//                     //   showErrorMessage(aaddharNumberverify);
//                     //   return; // Stop further execution if Aadhaar is not verified
//                     // }

//                     setCurrentPageNo(4);  // Set currentPageNo to 4
//                     setActiveStep(3);  // Set active step to 3
//                   }}
//                   //onClick={() => setShowDialog(true)}
//                   sx={submitBtnStyle}
//                   variant="contained"
//                   color="primary"
//                  // disabled={!(isAadhaarVarified && (!isLicenseAvailable || isDLVarified) || (!isDLAvailable || isDLVarified))}
//                 >
//                   {"Next"}
//                 </Button>

//                 {/* {showDialog && (
//                   <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
//                     <DialogTitle>Confirmation</DialogTitle>
//                     <DialogContent>
//                       <Typography>
//                         Once you proceed, Driving License Verification details cannot be modified.
//                       </Typography>
//                     </DialogContent>
//                     <DialogActions>
//                       <Button onClick={() => setShowDialog(false)} color="secondary">
//                         Cancel
//                       </Button>
//                       <Button
//                         onClick={() => {
//                           setIsDLVerificationDisabled(true); // Disable DrivingLicenseVerification
//                           setShowDialog(false);
//                           setCurrentPageNo(4);
//                           setActiveStep(3);
//                         }}
//                         color="primary"
//                         variant="contained"
//                       >
//                         Confirm
//                       </Button>
//                     </DialogActions>
//                   </Dialog>
//                 )} */}

//                 {isUanVerificationProcessManual === "manual" && (
//                   <>
//                     <Button
//                       //onClick={() => setCurrentPageNo(1)}
//                       onClick={() => submitDetails(false, true)}
//                       //sx={{ m: "15px 5px", ml: 3 }}
//                       sx={submitBtnStyle}
//                       variant="contained"
//                       color="primary"
//                     >
//                       {"Submit"}
//                     </Button>
//                   </>
//                 )}
//               </Stack>
//             </Grid>
//           </GridRow>
//         </Grid>
//       </form>
//     </Box>
//   );
// };

// export default ThirdForm;



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
  aaddharNumberverify
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
import showErrorMessage from "shared/utils/associate/show-error-message";
import { getAppointeeDetails } from "server/apis";
import { setLocalStorageItem } from "shared/utils";
// import { GetDigilockerUrl } from "server/apis/aadhaar/get-digilocker-url";
import { toAadhaarSuccess, toAadhaarFailure, toRegister } from "shared/constants/constants";
import { decryptedData } from "shared/utils";
import CircularIndeterminate from "shared/utils/loader/circularIndeterminate";
import AadhaarVerification from "./aadhar-verification";
// import AadhaarVerification from "./aadhaar-verification";
import { useTranslation } from "react-i18next";
const ThirdForm = ({
  formElement,
  stepsList,
  isAadhaarVarified,
  setisAadhaarVarified,
  handleDialogCancel,
  handleDialogConfirm,
  handleViewFile,
  handleChangeinDateofexpiry,
  handleThirdNext,
  isOfflineXmlDownloaded,
  setIsOfflineXmlDownloaded,
  xmlFileUploaded,
  setXmlFileUploaded,
  handleIsOfflineXmlDownloadedOnChange,
  nameAsOnAadhar,
  handleChangeNameOnAadhar,
  handleChangeAadharNumber,
  aadharShareCode,
  setAadharShareCode,
  disabledAadharInput,
  isAadhaarXmlUploaded,
  //handleAadharVerifiaction,
  aadharstatusMessage,
  setAadharstatusMessage,
  uploadAadharXmlFile,
  aadharXmlFileName,
  handleBack,
  submitDetails,
  aadharNumber,
  currentPageNo,
  setCurrentPageNo,
  activeStep,
  setActiveStep,
  firstPageForm,
  setFirstPageForm,
  isLicenseAvailable,
  setIsLicenseAvailable,
  isDLVarified,
  setisDLVarified,
  licensestatusMessage,
  setLicenseStatusMessage,
  isDLAvailable,
  setIsDLAvailable,
  drivingLicense,
  setDrivingLicense,
  dateOfBirth,
  setDateOfBirth

}) => {
  // const AADHARVERIFICATION_BY = process.env.REACT_APP_AADHARVERIFICATION_BY;

  // console.log('AADHARVERIFICATION_BY', AADHARVERIFICATION_BY);

  console.log("currentPageNo", currentPageNo);

  console.log("activeStep", activeStep);

  const functionSlice = useSelector((state) => state.functionSlice);
  const loggedInData = useSelector((state) => state.loggedInData);
  const { openInfoModel } = functionSlice[0];
  const { userId, appointeeId, userCode, candidateId } = loggedInData[0];
  const [openModal, setOpenModal] = useState(false);
  const [isDLVerificationDisabled, setIsDLVerificationDisabled] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [AADHARVERIFICATION_BY, setAADHARVERIFICATION_BY] = useState("XML");
  const [loading, setLoading] = useState(false);
  const startLoader = () => setLoading(true);
  const stopLoader = () => setLoading(false);

  //const [isAadhaarVarified, setisAadhaarVarified] = useState(false);

  const { t } = useTranslation();

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

  const [isPreviousSectionDisabled, setIsPreviousSectionDisabled] =
    useState(false);

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

  useEffect(() => {
    if (hasValue(firstPageForm.isDLAvailable)) {
      setIsPreviousSectionDisabled(true);
    }
  }, [firstPageForm.isDLAvailable]);

  useEffect(() => {
    console.log("isDLVerificationDisabled changed:", isDLVerificationDisabled);
  }, [isDLVerificationDisabled]);


  // const baseURL = window.location.origin;
  // //console.log("baseURL",baseURL);  

  // const handleFetchAadhaar = async () => {
  //   //startLoader();
  //   try {

  //     const successUrl = `${baseURL}${toAadhaarSuccess.replace(":appointeeId", candidateId)}`;
  //     const failureUrl = `${baseURL}${toAadhaarFailure.replace(":appointeeId", candidateId)}`;


  //     const payload = {
  //       appointeeId: appointeeId,
  //       userId: userId,
  //       successRedirectUrl: successUrl,
  //       failureRedirectUrl: failureUrl
  //     };

  //     console.log("payload", payload);
  //     const response = await GetDigilockerUrl(payload);
  //     if (response) {
  //       const { digilockerUrl, requestId } = response.responseInfo;
  //       setLocalStorageItem("aadhaar_request_id", requestId);

  //       // Redirect user to the third-party verification URL
  //       window.location.href = digilockerUrl;
  //       //stopLoader();
  //     }


  //   } catch (error) {
  //     console.error("Error fetching Aadhaar:", error);
  //   }
  // };

  // const verifyAadharByXML = async () => {
  //   let formData = new FormData();
  //   formData.append("appointeeId", appointeeId);
  //   formData.append("aadharName", nameAsOnAadhar.trim());
  //   formData.append("userId", userId);
  //   formData.append("appointeeId", appointeeId);
  //   formData.append("shareCode", aadharShareCode.trim());
  //   formData.append("aadharFileDetails", xmlFileUploaded);

  //   const response = await verifyAadharDetails(formData);

  //   if (response) {
  //     const { remarks, isVarified } = response.responseInfo;
  //     if (isVarified) {
  //       showSuccessMessage(aadharVerifySuccessMsg);
  //     } else {
  //       showErrorMessage(aadharVerifyFailedMsg);
  //       if (hasValue(remarks)) {
  //         const generatedRemarks = generateRemarks(remarks);
  //         openRemarksModel(generatedRemarks);
  //       }
  //     }
  //     setisAadhaarVarified(isVarified);
  //     setIsOfflineXmlDownloaded(true);
  //     closeOtpSubmitionModel();
  //     setAadharstatusMessage(new VerificationStatus(isVarified, "V"));
  //   }
  // };

  // const handleAadharotpSubmition = async (otp, client_id) => {
  //   const payload = {
  //     appointeeId: appointeeId,
  //     userId: userId,
  //     client_id: client_id,
  //     otp: otp,
  //     aadharNumber: aadharNumber.trim(),
  //     aadharName: nameAsOnAadhar,
  //     shareCode: '',
  //   }
  //   const response = await PostAadharOtp(payload);
  //   if (response) {
  //     const { remarks, isVarified } = response.responseInfo;
  //     if (isVarified) {
  //       showSuccessMessage(aadharVerifySuccessMsg);
  //     } else {
  //       showErrorMessage(aadharVerifyFailedMsg);
  //       if (hasValue(remarks)) {
  //         const generatedRemarks = generateRemarks(remarks);
  //         openRemarksModel(generatedRemarks);
  //       }
  //     }
  //     setisAadhaarVarified(isVarified);
  //     setIsOfflineXmlDownloaded(true);
  //     closeOtpSubmitionModel();
  //     setAadharstatusMessage(new VerificationStatus(isVarified, "V"));
  //   }
  // }
  // const verifAadharByNumber = async () => {
  //   console.log('VerifAadharByNumber');
  //   const payload = {
  //     appointeeId: appointeeId,
  //     userId: userId,
  //     aadharNumber: aadharNumber.trim(),
  //     aadharName: nameAsOnAadhar,
  //   }
  //   const response = await GenerateAadharOtp(payload);
  //   if (response) {
  //     const { if_number, otp_sent, client_id, valid_aadhaar } = response?.responseInfo
  //     if (otp_sent && valid_aadhaar) {

  //       openOtpSubmitionModel({
  //         otpSubmitionFunction: async (otp) => await handleAadharotpSubmition(otp, client_id),
  //         timeoutTimer: timeoutTimer,
  //         setTimeoutTimer: setTimeoutTimer,
  //       });

  //     }
  //   }

  // }

  // const handleAadharVerifiaction = () => {

  //   if (AADHARVERIFICATION_BY === "XML") {
  //     if (!(hasValue(aadharShareCode) && hasValue(nameAsOnAadhar))) {
  //       if (!hasValue(aadharShareCode)) {
  //         showErrorMessage(emptyShareCodeMsg);
  //       } else {
  //         showErrorMessage(emptyAadharMsg);
  //       }
  //     } else {
  //       verifyAadharByXML();
  //     }
  //   }

  //   if (AADHARVERIFICATION_BY === "OTP") {
  //     if (!hasValue(aadharNumber)) {
  //       showErrorMessage(emptyAadharNoMsg);
  //       return;
  //     }
  //     if (hasValue(aadharNumber) && !validationsCheck(aadharNumber, "AADHAR")) {
  //       showErrorMessage(aadharPatternErrorMsg);
  //       return;
  //     }
  //     verifAadharByNumber();
  //   }
  // };

  return (

    <Box sx={{ width: "100%" }}>
      <form ref={formElement}>
        <Grid
          sx={{ paddingLeft: "20px" }}
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {/* ######  Aadhar Verification Section Start ###### */}


          <AadhaarVerification
            stepsList={stepsList}
            isAadhaarVarified={isAadhaarVarified}
            setisAadhaarVarified={setisAadhaarVarified}
            isOfflineXmlDownloaded={isOfflineXmlDownloaded}
            setIsOfflineXmlDownloaded={setIsOfflineXmlDownloaded}
            handleIsOfflineXmlDownloadedOnChange={
              handleIsOfflineXmlDownloadedOnChange
            }
            nameAsOnAadhar={nameAsOnAadhar}
            handleChangeNameOnAadhar={handleChangeNameOnAadhar}
            aadharShareCode={aadharShareCode}
            setAadharShareCode={setAadharShareCode}
            disabledAadharInput={disabledAadharInput}
            isAadhaarXmlUploaded={isAadhaarXmlUploaded}
            //handleAadharVerifiaction={handleAadharVerifiaction}
            aadharstatusMessage={aadharstatusMessage}
            setAadharstatusMessage={setAadharstatusMessage}
            uploadAadharXmlFile={uploadAadharXmlFile}
            aadharXmlFileName={aadharXmlFileName}
            xmlFileUploaded = {xmlFileUploaded}
            setXmlFileUploaded = {setXmlFileUploaded}
            handleDialogCancel={handleDialogCancel}
            handleDialogConfirm={handleDialogConfirm}
            handleBack={handleBack}
            submitDetails={submitDetails}
            aadharNumber={aadharNumber}
            handleChangeAadharNumber={handleChangeAadharNumber}
            handleViewFile={handleViewFile}
            handleChangeinDateofexpiry={handleChangeinDateofexpiry}
            currentPageNo={currentPageNo}
            setCurrentPageNo={setCurrentPageNo}
            handleThirdNext={handleThirdNext}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            firstPageForm={firstPageForm}
            setFirstPageForm={setFirstPageForm}

          />
          {/* ######  Aadhar Verification Section End ###### */}

          {/* ###### Driving license Verification Section End ###### */}
          {/* <BankVerification isAadhaarVarified={isAadhaarVarified} stepsList = {stepsList}/> */}
          <DrivingLicenseVerification
            isAadhaarVarified={isAadhaarVarified}
            stepsList={stepsList}
            firstPageForm={firstPageForm}
            setFirstPageForm={setFirstPageForm}
            isLicenseAvailable={isLicenseAvailable}
            setIsLicenseAvailable={setIsLicenseAvailable}
            isDLVarified={isDLVarified}
            setisDLVarified={setisDLVarified}
            licensestatusMessage={licensestatusMessage}
            setLicenseStatusMessage={setLicenseStatusMessage}
            isDLVerificationDisabled={isDLVerificationDisabled}
            isDLAvailable={isDLAvailable}
            setIsDLAvailable={setIsDLAvailable}
            drivingLicense={drivingLicense}
            setDrivingLicense={setDrivingLicense}
            dateOfBirth={dateOfBirth}
            setDateOfBirth={setDateOfBirth}
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
              {/* {previousButton} */}
              {t("Previous")}
                </Button>

                <Button
                  onClick={() => {
                    if (!isAadhaarVarified) {
                      showErrorMessage(aaddharNumberverify);
                      return; // Stop further execution if Aadhaar is not verified
                    }

                    setCurrentPageNo(4);  // Set currentPageNo to 4
                    setActiveStep(3);  // Set active step to 3
                  }}
                  //onClick={() => setShowDialog(true)}
                  sx={submitBtnStyle}
                  variant="contained"
                  color="primary"
                  disabled={!(isAadhaarVarified && (!isLicenseAvailable || isDLVarified) || (!isDLAvailable || isDLVarified))}
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

export default ThirdForm;

