
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
    submitBtnStyle,
    verificationBtnStyle,
} from "app";
import {
    Autorenew,
    Info,
} from "@mui/icons-material";
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
} from "shared/constants/constants";
import TextInput from "shared/components/input-fields/text-input";
import { useSelector,useDispatch } from "react-redux";
import { VerificationStatusSection } from "shared/components/verification/verification-status-section";
import { hasValue,patternChecking, validationsCheck } from "shared/utils";
import BankVerification from "./bank-verifications";
import VerificationStatus from "../../../shared/components/verification/verification-status";
import removeExtraSpaces from "shared/utils/associate/remove-extra-spaces";
import { verifyPANDetails } from "server/apis";
import { storeCurrentPageNo } from "store/slices/candidate-page-slice";
import PANVerification from "./pan-verification";
import FileUploadSection from "shared/components/file-upload-section/file-upload-section";

const SixthForm = ({
    formElement,
    stepsList,
    isAadhaarVarified,
    handleBack,
    handleViewFile,
    isUanVarified,
   // handleEpfoButtonClick,
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
    firstPageForm
}) => {
    const AADHARVERIFICATION_BY = process.env.REACT_APP_AADHARVERIFICATION_BY;

    console.log('AADHARVERIFICATION_BY', AADHARVERIFICATION_BY);

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
    const [pan, setPan] = useState(null);
    const [UAN, setUAN] = useState("");
    
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
      const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
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
    

        const handleEpfoButtonClick = () => {
            if (!hasValue(UAN)) {
              if (isPanVarified === false || isAadhaarVarified === false) {
                const confirmationModelContent = {
                  dialogContentText: fetchUanConfirmationtMsg,
                };
              //  openConfirmationModel(confirmationModelContent, handleGetUANNumber);
              } else {
             //   handleGetUANNumber();
              }
            } else if (hasValue(UAN) && !validationsCheck(UAN, "UAN")) {
              showErrorMessage(UANPatterErrorMsg);
            } else handleEpfoVerifiaction();
          };
          const handleEpfoVerifiaction = () => {
            const mobileNumber = hasValue(firstPageForm.mobileNo)
              ? removeExtraSpaces(firstPageForm.mobileNo)
              : null;
            // openOtpForm(
            //   UAN,
            //   mobileNumber,
            //   "UAN Number",
            //   () => validateUANOtp(UAN, mobileNumber),
            //   "Generate OTP for PF Verification"
            // );
            //setIsEmployementDataVarified(true);
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
                  label={"Universal Account Number(UAN)"}
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
                    {"UAN Aadhar Link"}
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
                      {"UAN Verification"}
                    </Typography>
                    <RadioGroup
                      row
                      value={isUanVerificationProcessManual}
                      onChange={handleChangeUanVerification}
                    >
                      <FormControlLabel
                        value="auto"
                        control={<Radio />}
                        label="Automatic"
                        disabled={!hasValue(UAN)}
                      />
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <FormControlLabel
                          value="manual"
                          control={<Radio />}
                          label="Manual"
                          disabled={!hasValue(UAN)}
                        />
                        <Tooltip
                          arrow
                          title={
                            <Box sx={{ ...statusBoxstyle }}>
                              <Typography variant="body2" sx={{ ...statusstyle, fontSize: "16px" }}>
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
                        Please upload your EPFO Service History
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
                        Please upload your EPFO passbook
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
            </GridRow>
          
                </Grid>
            </form>
        </Box>
    );
};

export default SixthForm;
