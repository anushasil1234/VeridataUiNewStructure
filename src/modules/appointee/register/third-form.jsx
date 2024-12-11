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
  Radio,
  RadioGroup,
  Stack,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
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

const ThirdForm = ({
  formElement,
  stepsList,
  isAadhaarVarified,
  isOfflineXmlDownloaded,
  setIsOfflineXmlDownloaded,
  handleIsOfflineXmlDownloadedOnChange,
  nameAsOnAadhar,
  handleChangeNameOnAadhar,
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
  disabledPanInput,
  panNumberError,
  isPanVarified,
  handlePanVerifiaction,
  isPANModalOpen,
  handleDialogCancel,
  handleDialogConfirm,
  panstatusMessage,
  nameAsOnPan,
  isEpfoSectionDisabled,
  setUAN,
  UAN,
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
}) => {
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

          <GridRow>
            <Typography sx={headingType1}>
              As part of onboarding process, Please generate your offline KYC
              verification file and upload it here. To see the details steps,
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

            <FormControl sx={{ flexDirection: "row" }}>
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
                    I have downloaded the Aadhar offline KYC file
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
                    I have downloaded the Aadhar offline KYC file
                  </Typography>
                </>
              )}
            </FormControl>
          </GridRow>
          <GridRow sx={positionRelative}>
            {!isOfflineXmlDownloaded && <DisableSection />}
            <Grid sx={{ paddingLeft: "0px !important" }} item xs={12} md={6}>
              <TextInput
                label={"Name On Aadhaar"}
                value={nameAsOnAadhar}
                onChange={handleChangeNameOnAadhar}
                disabled={true}
              />
              <TextInput
                label={"Share Code (to be provided after uploading)"}
                value={aadharShareCode}
                onChange={setAadharShareCode}
                disabled={disabledAadharInput || !isAadhaarXmlUploaded}
              />
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
              <FileUploadSection
                chooseFile={uploadAadharXmlFile}
                fileName={aadharXmlFileName}
                accept={".rar, .zip"}
                disabled={isAadhaarVarified}
                uploadTypeAlias={aadharFileTypeAlias}
              />
            </Grid>
          </GridRow>
          {/* ######  Aadhar Verification Section End ###### */}
          {/* ######  PAN Verification Section Start ###### */}
          <FormHeadingContainer>
            <FormHeading
              step={stepsList?.PAV?.step}
              heading={stepsList?.PAV?.name}
              info={"Enter your PAN Numebr to verify."}
            />
          </FormHeadingContainer>

          <GridRow>
            <Grid sx={{ paddingLeft: "0px !important" }} item xs={12} md={6}>
              <TextInput
                label={"PAN Number"}
                value={pan}
                onChange={handelPANNumberChange}
                required={true}
                disabled={disabledPanInput}
                error={panNumberError}
                maxLength={10}
              />
              <Button
                sx={{ ...submitBtnStyle, margin: "5px 0" }}
                disabled={isPanVarified}
                variant="contained"
                onClick={handlePanVerifiaction}
                endIcon={<Autorenew />}
              >
                Verify
              </Button>
              <Dialog open={isPANModalOpen} onClose={handleDialogCancel}>
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
              </Dialog>
              <VerificationStatusSection docType={panstatusMessage} />
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
                label={"Name on PAN"}
                value={nameAsOnPan}
                disabled={true}
              />
            </Grid>
          </GridRow>
          {/* ######  PAN Verification Section End ###### */}
          {/* ######  UAN Verification Section Start ###### */}
          <FormHeadingContainer>
            <FormHeading
              step={stepsList?.UAV?.step}
              heading={stepsList?.UAV?.name}
              info={"Enter your Universal Account Number(UAN) to verify."}
            />
          </FormHeadingContainer>
          <GridRow sx={positionRelative}>
            {isEpfoSectionDisabled && <DisableSection />}

            <Grid item xs={12} md={6} sx={{ paddingLeft: "0px !important" }}>
              <TextInput
                label={"Universal Account Number(UAN)"}
                onChange={setUAN}
                value={UAN}
              />
              <Button
                sx={verificationBtnStyle}
                enabled={isUanVarified}
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
                  {"UAN Aadhar Link : "}{" "}
                </Typography>
                <Typography>{uanAadharLink}</Typography>
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
                            <Typography variant="body2" sx={{ ...statusstyle }}>
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
                        open={openModal}
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
                            accurate details about your employment contributions.
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
                      />
                    </Box>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </GridRow>
          {/* ######  UAN Verification Section End ###### */}
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
