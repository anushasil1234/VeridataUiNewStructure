import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import myImage from "assets/images/profile/instrucToServiceHistory.png";

import React, { useState } from "react";
import FormHeadingContainer from "shared/components/grid-container/form-heading-container";
import FormHeading from "./form-heading";
import GridRow from "shared/components/grid-container/grid-row";
import showErrorMessage from "shared/utils/associate/show-error-message";
import {
  fileUploadSectionContainerStyle,
  lable1CopyStyle,
  positionRelative,
  primaryFabStyle,
  responsiveBtnType1Style,
  statusBoxstyle,
  statusstyle,
  subHeadingContentTextStyle,
  submitBtnStyle,
  verificationBtnStyle,
} from "app";
import { Autorenew, Info } from "@mui/icons-material";
import {
  previousButton,
  aaddharNumberverify,
  emptyPanMsg,
  invalidPanMsg,
  panVerifyFailedMsg,
  fetchUanConfirmationtMsg,
  epfoPassbookFileTypeAlias,
  imgAndPdfMaxSize,
  UANPatterErrorMsg,
  epfoServiceHistoryFileTypeAlias,
  generateOtpRety,
  NA,
  generateOtpSucces,
  uanVerifySuccessMsg,
  uanVerifyFailedMsg,
} from "shared/constants/constants";
import TextInput from "shared/components/input-fields/text-input";
import { useSelector, useDispatch } from "react-redux";
import { VerificationStatusSection } from "shared/components/verification/verification-status-section";
import { hasValue, validationsCheck } from "shared/utils";
import VerificationStatus from "../../../shared/components/verification/verification-status";
import removeExtraSpaces from "shared/utils/associate/remove-extra-spaces";
import { generateUANOtp, getUANNumber } from "server/apis";
import { storeCurrentPageNo } from "store/slices/candidate-page-slice";
import FileUploadSection from "shared/components/file-upload-section/file-upload-section";
import { submitUANOTP } from "server/apis/verify/submit-uan-otp";
import generateRemarks from "shared/utils/associate/generate-remarks";
import showSuccessMessage from "shared/utils/associate/show-success-message";
import UANPrerequisiteInformation from "./uan-prerequiestic-info";
import { useTranslation } from "react-i18next";

const SixthForm = ({
  UAN,
  setUAN,
  formElement,
  stepsList,
  isAadhaarVarified,
  isPanVarified,
  handleBack,
  handleViewFile,
  isUanVarified,
  // handleEpfoButtonClick,
  isUanVerificationProcessManual,
  setIsUanVerificationProcessManual,
  epfoButton,
  setEpfoButton,
  epfostatusMessage,
  setEpfostatusMessage,
  uanAadharLink,
//   handleChangeUanVerification,
  uploadEpfoServiceHistoryFile,
  epfoServiceHistoryFile,
  uploadEpfoPassBookFile,
  removeEPFOPassbookFile,
  epfoPassBookFiles,
  firstPageForm,
  isUANAvailableState,
  setisUanVarified,
  submitDetails,
  aadhar,
  setAadhar,
  pan,
  setPan
}) => {
  const AADHARVERIFICATION_BY = process.env.REACT_APP_AADHARVERIFICATION_BY;
  const { t } = useTranslation(); // Import the translation function

  console.log("AADHARVERIFICATION_BY", AADHARVERIFICATION_BY);

  //console.log("aadhaarNumber", aadhaarNumber);

  const functionSlice = useSelector((state) => state.functionSlice);
  const { openRemarksModel } = functionSlice[0];
  const {
    openOtpForm,
    closeOtpForm,
    openOtpSubmitionModel,
    closeOtpSubmitionModel,
    // openRemarksModel,
    openConfirmationModel,
    openInfoModel,
  } = functionSlice[0];
    //    const [UAN, setUAN] = useState("");
  const [timeoutTimer, setTimeoutTimer] = useState();

  const loggedInData = useSelector((state) => state.loggedInData);
  const { userId, appointeeId, userCode, candidateId } = loggedInData[0];
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const setCurrentPageNo = (currentPageNo) => {
    dispatch(storeCurrentPageNo(currentPageNo));
  };

  // Function to handle dialog confirmation
  const handleDialogConfirm = () => {
    // setIsPANModalOpen(false); // Close the dialog
    //handleGetUANNumber(); // Now call the function to get UAN number
    setCurrentPageNo(3);
  };

  const handleDialogCancel = () => {
    //setIsPANModalOpen(false); // Just close the dialog without calling UAN
  };

  // const generateRemarks = (remarks) => {
  // let remarksList = [];
  // if (hasValue(remarks)) {
  //     remarksList = remarks.split(",").map((remark) => {
  //     return {
  //         remarksCategory: "NRML",
  //         remarks: remark,
  //     };
  //     });
  // }
  // return remarksList;
  // };
  const handleGetUANNumber = async () => {
    const payLoad = {
      aaddharNumber: aadhar,
      appointeeId,
      panNumber: pan,
      mobileNumber: hasValue(firstPageForm.mobileNo)
        ? removeExtraSpaces(firstPageForm.mobileNo)
        : null,
      userId,
    };

    const response = await getUANNumber(payLoad);
    if (response) {
      const { isUanAvailable, uanNumber, remarks } = response.responseInfo;
      if (uanNumber) {
        // setIsUANModalOpen(true); // Open the dialog when UAN is available
        setUAN(uanNumber); // Save the uanNumber to the existing state
        //setisUanVarified(true);
        generateUANOTPDialog(uanNumber,firstPageForm.mobileNo);
      } else if (
        isUANAvailableState === false &&
        !isUanAvailable &&
        !hasValue(uanNumber)
      ) {
        setUAN(null);
        setisUanVarified(true);
        // setIsEmployementDataVarified(false);
      } else {
        //setisUanVarified(false);
        showErrorMessage(remarks);
      }
      setEpfostatusMessage(epfostatusMessage);
    }
  };
  const handleChangeUanVerification = ({ target }) => {
    const value = target.value;
    setIsUanVerificationProcessManual(value);
    if (value === "manual") {
      const prerequisiteModelContent = {
        dialogTitle: (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>
              Prerequisite Informatiton for mannual upload
            </Typography>
          </div>
        ),
        dialogContentText: (
          <>
            <Typography sx={subHeadingContentTextStyle}>
              Before verification there are some prerequisites, thats needs to
              be done...
            </Typography>
            <Typography> </Typography>
          </>
        ),
        dialogContentComponent: <UANPrerequisiteInformation />,
        fullWidth: false,
      };
      openInfoModel(prerequisiteModelContent);
    }
  };
  const handleEpfoButtonClick = () => {
    if (!hasValue(UAN)) {
      if (isPanVarified === false || isAadhaarVarified === false) {
        const confirmationModelContent = {
          dialogContentText: fetchUanConfirmationtMsg,
        };
        openConfirmationModel(confirmationModelContent, handleGetUANNumber);
      } else {
        handleGetUANNumber();
      }
    } else if (hasValue(UAN) && !validationsCheck(UAN, "UAN")) {
      showErrorMessage(UANPatterErrorMsg);
    } else handleEpfoVerifiaction();
  };
  const handleEpfoVerifiaction = () => {
    const mobileNumber = hasValue(firstPageForm.mobileNo)
      ? removeExtraSpaces(firstPageForm.mobileNo)
      : null;
    openOtpForm(
      UAN,
      mobileNumber,
      "UAN Number",
      () => validateUANOtp(UAN, mobileNumber),
      "Generate OTP for PF Verification"
    );
    //setIsEmployementDataVarified(true);
  };
  const generateUANOTPDialog = (UAN, mobileNo) => {
    // Perform the below actions using the already existing 'uan' state
    setEpfoButton("Auto UAN Verification");
    // setDisabledPanInput(true);
    epfostatusMessage.message = NA;
    //epfostatusMessage.color = "";
    epfostatusMessage.success = null;
    setEpfostatusMessage(epfostatusMessage);
    const mobileNumber = hasValue(mobileNo)
      ? removeExtraSpaces(mobileNo)
      : null;

    // Proceed to open OTP form for UAN verification
    openOtpForm(
      UAN,
      mobileNumber,
      "UAN Number",
      () => validateUANOtp(UAN, mobileNumber),
      "Generate OTP for PF Verification"
    );
  };
  const validateUANOtp = async (uanNumber, mobileNumber) => {
    const payLoad = {
      uanNumber,
      mobileNumber,
      appointeeId,
      userId,
    };
    const response = await generateUANOtp(payLoad);
    if (response) {
      const { responseInfo } = response;

      let { otp_sent, client_id } = responseInfo;
      if (!otp_sent) {
        showErrorMessage(generateOtpRety);
      } else {
        initialTimeOfOtpTimer();
        showSuccessMessage(generateOtpSucces);
        closeOtpForm();
        openOtpSubmitionModel({
          otpSubmitionFunction: (otp) => verifyUAN(otp, client_id),
          timeoutTimer: timeoutTimer,
          setTimeoutTimer: setTimeoutTimer,
        });
      }
    }
  };
  const initialTimeOfOtpTimer = () => {
    setTimeoutTimer(10 * 60);
  };
  const verifyUAN = async (otp, clientId) => {
    const payLoad = {
      appointeeId: appointeeId,
      otp: otp,
      client_id: clientId,
      userId: userId,
      AppointeeCode: userCode,
    };
    const response = await submitUANOTP(payLoad);
    if (response) {
      const { remarks, isVarified } = response.responseInfo;
      if (isVarified) {
        showSuccessMessage(uanVerifySuccessMsg);
        //setIsEmployementDataVarified(true);
        setisUanVarified(true);
      } else {
        showErrorMessage(uanVerifyFailedMsg);
        if (hasValue(remarks)) {
          const generatedRemarks = generateRemarks(remarks);
          openRemarksModel(generatedRemarks);
        }
      }

      closeOtpSubmitionModel();
      setEpfostatusMessage(new VerificationStatus(isVarified, "V"));
    }
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
          <FormHeadingContainer>
            <FormHeading
              step={stepsList?.UAV?.step}
              heading={stepsList?.UAV?.name}
              info={"Enter your Universal Account Number(UAN) to verify."}
            />
          </FormHeadingContainer>
          <GridRow sx={positionRelative}>
            {/* {isEpfoSectionDisabled && <DisableSection />} */}

            <Grid item xs={12} md={6} sx={{ paddingLeft: "0px !important" }}>
              <TextInput
                label={t("Universal Account Number(UAN)")}
                onChange={(val) => {
                  if (/^\d{0,12}$/.test(val)) {
                    setUAN(val);
                  }
                }}
                value={UAN}
              />
              <Button
                sx={verificationBtnStyle}
                //  enabled={isUanVarified}
                variant="contained"
                onClick={handleEpfoButtonClick}
                endIcon={<Autorenew />}
                disabled={isUanVerificationProcessManual === "manual"}
              >
                {epfoButton}
              </Button>
              <VerificationStatusSection docType={epfostatusMessage} />
              <Stack direction={"row"} alignItems={"center"}>
                <Typography sx={{ margin: "5px 0", color: "#000" }}>
                  {t("UAN Aadhar Link")}
                </Typography>
                <Typography>{`: ${uanAadharLink}`}</Typography>
              </Stack>
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
              <Grid item xs={12} sx={{ paddingLeft: "0px !important" }}>
                <Stack
                  flexDirection="column"
                  justifyContent="space-between"
                  alignItems="start"
                >
                  <Typography sx={{ ...lable1CopyStyle }}>
                    {t("UAN Verification")}
                  </Typography>
                  <RadioGroup
                    row
                    value={isUanVerificationProcessManual}
                    onChange={handleChangeUanVerification}
                  >
                    <FormControlLabel
                      value="auto"
                      control={<Radio />}
                      label={t("Automatic")}
                      disabled={!hasValue(UAN)}
                    />
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <FormControlLabel
                        value="manual"
                        control={<Radio />}
                        label={t("Manual")}
                        disabled={!hasValue(UAN)}
                      />
                      <Tooltip
                        arrow
                        title={
                          <Box sx={{ ...statusBoxstyle }}>
                            <Typography
                              variant="body2"
                              sx={{ ...statusstyle, fontSize: "16px" }}
                            >
                              It is mandatory for EPFO members to upload all PF
                              passbooks 2005 onwards (if applicable).
                            </Typography>
                          </Box>
                        }
                      >
                        <Fab
                          variant="contained"
                          size="small"
                          sx={{ ...primaryFabStyle, ml: 1 }}
                          onClick={handleOpenModal} // Open modal on click
                        >
                          <Info width={18} sx={{ color: "#fff" }} />
                        </Fab>
                      </Tooltip>

                      <Dialog
                        open={isModalOpen}
                        onClose={handleCloseModal}
                        maxWidth="lg"
                        fullWidth
                      >
                        <DialogTitle>How To Access Service History</DialogTitle>
                        <DialogContent
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src={myImage}
                            alt="Description"
                            style={{ maxWidth: "100%", maxHeight: "100%" }}
                          />
                        </DialogContent>
                        <DialogContent
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "left",
                            alignItems: "flex-start",
                          }}
                        >
                          <Typography variant="subtitle2">Notes :</Typography>
                          <Typography variant="subtitle2" sx={{ mt: 1 }}>
                            1. Upload your EPFO service history to provide
                            accurate details about your employment
                            contributions.
                          </Typography>
                          <Typography variant="subtitle2" sx={{ mt: 1 }}>
                            {`2. Log in to the EPFO Member Portal. Navigate to ‘View’ -> ‘Service History’. Download the service history file.`}
                          </Typography>
                        </DialogContent>

                        <DialogActions>
                          <Button
                            variant="contained"
                            color="primary"
                            sx={{ ...responsiveBtnType1Style }}
                            onClick={handleCloseModal}
                          >
                            CLOSE
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </Box>
                  </RadioGroup>
                </Stack>
              </Grid>

              {isUanVerificationProcessManual === "manual" && (
                <Grid>
                  <Grid item xs={12} sx={{ paddingLeft: "0px !important" }}>
                    <Typography
                      sx={{
                        ...lable1CopyStyle,
                        textAlign: "center",
                      }}
                    >
                    {t("Please upload your EPFO Service History")}

                      <span className="requiredField">*</span>
                    </Typography>
                    <Box sx={fileUploadSectionContainerStyle}>
                      <FileUploadSection
                        chooseFile={uploadEpfoServiceHistoryFile}
                        // fileName={
                        //   fileUploaded.some(file => file.uploadTypeAlias === "EPFPSSBKMNL")
                        //     ? fileUploaded.find(file => file.uploadTypeAlias === "EPFPSSBKMNL").fileName
                        //     : handicapFileName
                        // }
                        fileName={epfoServiceHistoryFile}
                        accept={"application/pdf"}
                        maxUploadSize={imgAndPdfMaxSize}
                        uploadTypeAlias={epfoServiceHistoryFileTypeAlias}
                        // handleRemoveFile={removeEPFOServiceHistory}
                        handleViewFile={handleViewFile}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sx={{ paddingLeft: "0px !important" }}>
                    <Typography
                      sx={{
                        ...lable1CopyStyle,
                        textAlign: "center",
                      }}
                    >
                     {t("Please upload your EPFO passbook")} 
                      <span className="requiredField">*</span>
                    </Typography>
                    <Box sx={fileUploadSectionContainerStyle}>
                      <FileUploadSection
                        chooseFile={uploadEpfoPassBookFile}
                        handleRemoveFile={removeEPFOPassbookFile}
                        // fileName={
                        //   fileUploaded.some(file => file.uploadTypeAlias === "EPFPSSBKMNL")
                        //     ? fileUploaded.find(file => file.uploadTypeAlias === "EPFPSSBKMNL").fileName
                        //     : handicapFileName
                        // }
                        fileName={epfoPassBookFiles}
                        accept={"application/pdf"}
                        maxUploadSize={imgAndPdfMaxSize}
                        multiple={true}
                        uploadTypeAlias={epfoPassbookFileTypeAlias}
                        handleViewFile={handleViewFile}
                      />
                    </Box>
                  </Grid>
                </Grid>
              )}
            </Grid>
            {/* <Button
              //onClick={() => setCurrentPageNo(1)}
              onClick={handleBack}
              //sx={{ m: "15px 5px", ml: 3 }}
              sx={submitBtnStyle}
              variant="contained"
              color="primary"
            >
              {previousButton}
            </Button> */}
          </GridRow>
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
                     {t("Previous")}
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
                      {t("Submit")}
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

export default SixthForm;
