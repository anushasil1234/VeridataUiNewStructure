import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, FormControlLabel,
  Grid, IconButton, Radio, RadioGroup, Stack, Switch, Tooltip, Typography
} from "@mui/material";
import React, { useEffect } from "react";
import FormHeadingContainer from "shared/components/grid-container/form-heading-container";
import FormHeading from "./form-heading";
import GridRow from "shared/components/grid-container/grid-row";
import { divederStyle, fileUploadSectionContainerStyle, lable1CopyStyle, positionRelative, submitBtnContainerStyle, submitBtnStyle } from "app";
import { Autorenew, HelpOutline, InfoOutlined } from "@mui/icons-material";
import {
  formSaveSuccess,
  formSubmitionSuccess,
  getHandicapTypeDescription,
  handicapFileTypeAlias,
  imgAndPdfMaxSize,
  otherFileTypeAlias,
  passportFileTypeAlias,
  previousButton,
  tenthCertificateFileTypeAlias,
  toHelp,
  trustEpfoFileTypeAlias,
} from "shared/constants/constants";
import TextInput from "shared/components/input-fields/text-input";
import FileUploadSection from "shared/components/file-upload-section/file-upload-section";
import { useSelector } from "react-redux";
import PassportFileNoSample from "assets/images/backgrounds/file-number-in-indian-passport.png";
import { DisableSection } from "shared/components/disble-section/disble-section";
import { VerificationStatusSection } from "shared/components/verification/verification-status-section";
import { useMsal } from "@azure/msal-react";
import { useState } from "react";
import { hasValue } from "shared/utils";
import buildFormData from "shared/utils/associate/build-form-data";
import { postUpdatePfUanDetails } from "server/apis";

const SecondForm = ({
  // formElement,
  stepsList,
  // isPreviousSectionDisabled,
  upload10thCertificateFile,
  tenthCertificateFileName,
  uploadFathersDocFile,
  otherFileName,
  // isPhysicallyHandicap,
  // handicapType,
  firstPageForm,
  uploadHandicapFile,
  handicapFileName,
  passportAvailable,
  passportNo,
  countryOfOrigin,
  isPassportVerifyBtnDisabled,
  handlePassportVerification,
  passportstatusMessage,
  handlePassFileNumberOnChange,
  passportFileNumberError,
  uploadPassportFile,
  passportFileName,
  isTrustEpfoAvailable,
  uploadTrustEPFOFile,
  removeEPFOFile,
  trustEpfoFileName,
  uanNumberAvailable,
  handleChange,
  handleBack,
  // DraftSave,
  handleSaveClick,
  handleNext,
  isthirdNextVisible,
  isModalOpen,
  handleCloseModal,
  // handleConfirmSave,
  passportFileNumber,
  setIsTrustEpfoAvailable,
  handleViewFile,
  isAppointeeUanAvailable,
  setIsUANAvailableState,
  fileDetails,
  uploadedFile,
  clearFileVaribles,
  setTrustEpfoFileName,
  setHandicapFileName,
  setPassportFileName,
  setIsThirdNextVisible
}) => {
  const functionSlice = useSelector((state) => state.functionSlice);
  const loggedInData = useSelector((state) => state.loggedInData);

  const { openInfoModel } = functionSlice[0];
  const { userId, appointeeId, userCode } = loggedInData[0];
  // const { accounts } = useMsal();
  // const loggedInData = useSelector((state) => state.loggedInData)
  // const { isDefaultPassword, isPasswordExpire } = loggedInData.length > 0 && loggedInData[0];
  // const loggedInTokendData = useSelector((state) => state.loggedinTokenData);

  const [isPreviousSectionDisabled, setIsPreviousSectionDisabled] =
    useState(false);


  const handlePassporFileNumbertHelp = () => {
    const passportHelpContent = {
      dialogContentText: "",
      dialogTitle: "PASSPORT FILE NO. HELP",
      dialogContentComponent: (
        <img
          src={PassportFileNoSample}
          alt="Help"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      ),
      maxWidth: "sm",
      btnName: "Close",
    };
    openInfoModel(passportHelpContent);
  };
  const saveDetails = async (IsFinalSubmit) => {
    let isUANAvailable = uanNumberAvailable === "yes" ? true : false;
    setIsUANAvailableState(isUANAvailable);

    // Proceed with the rest of the logic if verification passes
    let payLoad = {
      appointeeId: appointeeId,
      userId: userId,
      appointeeCode: userCode,
      trustPassbookAvailable: isTrustEpfoAvailable,
      IsUanAvailable: isUANAvailable,
      fileDetails: fileDetails,
      fileUploaded: uploadedFile,
      IsFinalSubmit: IsFinalSubmit,
    };
    // Use the buildFormData helper function to create the formData
    let formData = buildFormData(payLoad);

    // Make the API call
    const response = await postUpdatePfUanDetails(
      formData,
      formSubmitionSuccess
    );
    if (response) {
      handleNext();
      setIsPreviousSectionDisabled(true);
      // setShowAdditionalSection(true);

      //setIsUANappointeeAvailable(true)
      clearFileVaribles(
        trustEpfoFileTypeAlias,
        setTrustEpfoFileName,
        trustEpfoFileName
      );
      clearFileVaribles(
        handicapFileTypeAlias,
        setHandicapFileName,
        handicapFileName
      );
      clearFileVaribles(
        passportFileTypeAlias,
        setPassportFileName,
        passportFileName
      );
    }
  };
  const DraftSave = async () => {
    let isUANAvailable = uanNumberAvailable === "yes" ? true : false;
    setIsUANAvailableState(isUANAvailable);

    // Proceed with the rest of the logic if verification passes
    let payLoad = {
      appointeeId: appointeeId,
      userId: userId,
      appointeeCode: userCode,
      IsUanAvailable: isUANAvailable,
      trustPassbookAvailable: isTrustEpfoAvailable,
      fileDetails: fileDetails,
      fileUploaded: uploadedFile,
      IsFinalSubmit: false,
    };
    console.log('payLoad21', payLoad);

    // Use the buildFormData helper function to create the formData

    let formData = buildFormData(payLoad);
    console.log('formData', formData);

    // Make the API call
    const response = await postUpdatePfUanDetails(formData, formSaveSuccess);
    // if (response) {
    //   clearFileVaribles(trustEpfoFileTypeAlias, setTrustEpfoFileName);
    //   clearFileVaribles(handicapFileTypeAlias, setHandicapFileName);
    //   clearFileVaribles(passportFileTypeAlias, setPassportFileName);
    // }
  };
  const handleConfirmSave = async () => {
    // Once the user confirms, save the details
    await saveDetails(true);
    handleCloseModal(); // Close the confirmation modal after saving
    setIsThirdNextVisible(true);
    //setCurrentPageNo(3);
  };
  const handleNavigationToHelpPage = () => {
    // const channel = new BroadcastChannel('auth-channel');
    // const authData = {
    //     accounts: accounts,
    //     isDefaultPassword: isDefaultPassword,
    //     isPasswordExpire: isPasswordExpire,
    //     loggedInTokendData: loggedInTokendData
    // }
    // channel.postMessage({ type: 'AUTH_DATA', data: authData });
    // window.open(toHelp, '_blank', 'noopener,noreferrer');
  };
  useEffect(() => {
    if (hasValue(isAppointeeUanAvailable)) {
      setIsPreviousSectionDisabled(true);
    }
  }, [isAppointeeUanAvailable]);
  return (
    <Box sx={{ width: "100%" }}>
      {/* <form ref={formElement}> */}
      <form >
        <Grid
          sx={{ paddingLeft: "20px" }}
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >

          {/* ######  Passport upload Section Start ###### */}
          {firstPageForm.isPassportAvailable === "Y" ? (
            <>
              <FormHeadingContainer>
                <FormHeading
                  step={stepsList?.PV?.step}
                  heading={stepsList?.PV?.name}
                  info={
                    "Enter your Passport file number to verify also see the help sign (?) to see how to find passport file number ."
                  }
                  Children={
                    <IconButton onClick={handlePassporFileNumbertHelp}>
                      <HelpOutline />
                    </IconButton>
                  }
                />
              </FormHeadingContainer>

              <GridRow sx={positionRelative}>
                <Grid sx={{ ...positionRelative }} item xs={12} md={12}>
                  {!firstPageForm.isPassportAvailable && <DisableSection />}
                </Grid>

                <Grid
                  sx={{ paddingLeft: "0px !important" }}
                  item
                  xs={12}
                  md={6}
                >
                  <TextInput
                    label={"Passport Number"}
                    value={firstPageForm.passportNo}
                    disabled={isPreviousSectionDisabled}
                  />
                  {firstPageForm.originCountry === "India" && (
                    <>
                      <Button
                        sx={{
                          ...submitBtnStyle,
                          margin: "5px 5px 5px 0px",
                          width: "fit-content",
                        }}
                        variant="contained"
                        color="primary"
                        disabled={isPassportVerifyBtnDisabled}
                        onClick={handlePassportVerification}
                        endIcon={<Autorenew />}
                      >
                        Verify
                      </Button>
                      <VerificationStatusSection
                        docType={passportstatusMessage}
                      />
                    </>
                  )}
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    paddingLeft: { xs: "0px !important", md: "20px!important" },
                  }}
                >
                  {firstPageForm.originCountry === "India" ? (
                    <>
                      <TextInput
                        label={"Passport File Number"}
                        value={passportFileNumber}
                        onChange={handlePassFileNumberOnChange}
                        disabled={isPassportVerifyBtnDisabled}
                        error={passportFileNumberError}
                      />
                    </>
                  ) : (
                    <>
                      <Typography
                        sx={{
                          ...lable1CopyStyle,
                          textAlign: "center",
                        }}
                      >
                        Please upload your Visa Details
                        <span className="requiredField">*</span>
                      </Typography>
                      <FileUploadSection
                        chooseFile={uploadPassportFile}
                        // fileName={
                        //   fileUploaded.some(file => file.uploadTypeAlias === "VISA")
                        //     ? fileUploaded.find(file => file.uploadTypeAlias === "VISA").fileName
                        //     : passportFileName
                        // }
                        fileName={passportFileName}
                        disabled={isPreviousSectionDisabled}
                        maxUploadSize={imgAndPdfMaxSize}
                        uploadTypeAlias={passportFileTypeAlias}
                        handleViewFile={handleViewFile}

                      />
                    </>
                  )}
                </Grid>
              </GridRow>
            </>
          ) : null}
          {/* ######  Passport Section End ###### */}

          {/* ######  Certificate Upload Section Start ###### */}
          <FormHeadingContainer>
            <FormHeading
              step={stepsList?.CF?.step}
              heading={stepsList?.CF?.name}
              info={"Upload file details ."}
            />
          </FormHeadingContainer>

          {process.env.REACT_APP_VARIABLE_CERITIFICATE_10TH === 'true' &&
            <GridRow>
              <Grid sx={{ paddingLeft: "0px !important" }} item xs={12} md={6}>
                <Stack
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Stack direction="row">
                    <Typography
                      sx={{
                        ...lable1CopyStyle,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {"10th pass Certificate"}
                    </Typography>
                    {/* <Tooltip
                    arrow="bottom"
                    title={
                      <div>
                        <p>
                          {
                            "Please upload a clear and legible scanned copy or photo of your 10th pass certificate. The certificate should clearly display your name, school name, and passing year."
                          }
                        </p>
                        <a
                          href={toHelp}
                          // onClick={handleNavigationToHelpPage}
                          // target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "#F57264",
                            // textDecoration: "underline",
                            cursor: "pointer",
                          }}
                        >
                          Read More
                        </a>
                      </div>
                    }
                  >
                    <IconButton disabled={isPreviousSectionDisabled}>
                      <InfoOutlined />
                    </IconButton>
                  </Tooltip> */}
                    <Tooltip
                      arrow
                      placement="bottom"
                      title={
                        <div style={{ fontSize: "16px" }}>
                          {" "}

                          <p>
                            {
                              "Please upload a clear and legible scanned copy or photo of your 10th pass certificate. The certificate should clearly display your name, school name, and passing year."
                            }
                          </p>
                          <a
                            href={toHelp}
                            rel="noopener noreferrer"
                            style={{
                              color: "#F57264",
                              cursor: "pointer",
                            }}
                          >
                            Read More
                          </a>
                        </div>
                      }
                    >
                      <IconButton 
                      //disabled={isPreviousSectionDisabled}
                      >
                        <InfoOutlined />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Stack>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  paddingLeft: { xs: "0px !important", md: "20px!important" },
                }}
              >
                <Typography
                  sx={{
                    ...lable1CopyStyle,
                    textAlign: "center",
                  }}
                >
                  Please upload 10th pass certificate
                  <span className="requiredField">*</span>
                </Typography>
                <Box sx={fileUploadSectionContainerStyle}>
                  <FileUploadSection
                    chooseFile={upload10thCertificateFile}
                    // fileName={
                    //   fileUploaded.some(file => file.uploadTypeAlias === "10THCERT")
                    //     ? fileUploaded.find(file => file.uploadTypeAlias === "10THCERT").fileName
                    //     : tenthCertificateFileName
                    // }
                    fileName={tenthCertificateFileName}
                    accept={"image/png, image/jpeg,application/pdf"}
                    //disabled={isPreviousSectionDisabled}
                    maxUploadSize={imgAndPdfMaxSize}
                    uploadTypeAlias={tenthCertificateFileTypeAlias}
                    // handleRemoveFile={remove10thPassCertificate}
                    handleViewFile={handleViewFile}

                  />
                </Box>
              </Grid>
            </GridRow>}
          <GridRow>
            <Grid sx={{ paddingLeft: "0px !important" }} item xs={12} md={6}>
              <Stack direction="row">
                <Typography
                  sx={{
                    ...lable1CopyStyle,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {"PAN Card"}
                </Typography>
                <Tooltip
                  arrow="bottom"
                  title={
                    <div style={{ fontSize: '16px' }}>
                      <p>
                        {
                          "Please upload a clear and legible scanned copy or photo of your PAN card. The image should clearly display your PAN number, name, and date of birth as mentioned on the card."
                        }
                      </p>
                      <a
                        href={toHelp}
                        // target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#F57264",
                          // textDecoration: "underline",
                          cursor: "pointer",
                        }}
                      >
                        Read More
                      </a>
                    </div>
                  }
                >
                  <IconButton
                    //disabled={isPreviousSectionDisabled}
                    sx={{
                      marginLeft: "-5px", // Moves the icon a bit to the left
                      marginTop: "-5px", // Moves the icon a bit upwards
                    }}
                  >
                    <InfoOutlined />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                paddingLeft: { xs: "0px !important", md: "20px!important" },
              }}
            >
              <Typography
                sx={{
                  ...lable1CopyStyle,
                  textAlign: "center",
                }}
              >
                Please upload PAN Card
                <span className="requiredField">*</span>
              </Typography>
              <Box sx={fileUploadSectionContainerStyle}>
                <FileUploadSection
                  chooseFile={uploadFathersDocFile}
                  // fileName={
                  //   fileUploaded.some(file => file.uploadTypeAlias === "OTHID")
                  //     ? fileUploaded.find(file => file.uploadTypeAlias === "OTHID").fileName
                  //     : otherFileName
                  // }
                  fileName={otherFileName}
                  accept={"image/png, image/jpeg,application/pdf"}
                  //disabled={isPreviousSectionDisabled}
                  maxUploadSize={imgAndPdfMaxSize}
                  uploadTypeAlias={otherFileTypeAlias}
                  handleViewFile={handleViewFile}

                // handleRemoveFile={removeFathersDocCertificate}
                />
              </Box>
            </Grid>
          </GridRow>
          {/* ######  Certificate Upload Section End ###### */}

          {/* ######  Handicaped Section Start ###### */}
          {firstPageForm.isHandicap === "Y" && (
            <>
              <FormHeadingContainer>
                <FormHeading
                  step={stepsList?.HV?.step}
                  heading={stepsList?.HV?.name}
                  info={"Upload your handicap file details ."}
                />
              </FormHeadingContainer>
              <GridRow>
                <Grid
                  sx={{ paddingLeft: "0px !important" }}
                  item
                  xs={12}
                  md={6}
                >
                  <TextInput
                    label={"Handicap Type"}
                    value={getHandicapTypeDescription(firstPageForm.handicapeType)}
                    disabled={isPreviousSectionDisabled}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    paddingLeft: { xs: "0px !important", md: "20px!important" },
                  }}
                >
                  <Typography
                    sx={{
                      ...lable1CopyStyle,
                      textAlign: "center",
                    }}
                  >
                    Please upload your Handicap Certificate
                    <span className="requiredField">*</span>
                  </Typography>
                  <Box sx={fileUploadSectionContainerStyle}>
                    <FileUploadSection
                      chooseFile={uploadHandicapFile}
                      // fileName={
                      //   fileUploaded.some(file => file.uploadTypeAlias === "HANDCERT")
                      //     ? fileUploaded.find(file => file.uploadTypeAlias === "HANDCERT").fileName
                      //     : handicapFileName
                      // }
                      fileName={handicapFileName}
                      accept={"image/png, image/jpeg,application/pdf"}
                      //disabled={isPreviousSectionDisabled}
                      maxUploadSize={imgAndPdfMaxSize}
                      uploadTypeAlias={handicapFileTypeAlias}
                      handleViewFile={handleViewFile}

                    />
                  </Box>
                </Grid>
              </GridRow>
            </>
          )}
          {/* ######  Handicaped Section End ###### */}


          {/* ######  PF Verification Section Start ###### */}
          <FormHeadingContainer>
            <FormHeading
              step={stepsList?.PFD?.step}
              heading={stepsList?.PFD?.name}
              info={"Upload file details ."}
            />
          </FormHeadingContainer>
          <GridRow>
            <Grid sx={{ paddingLeft: "0px !important" }} item xs={12} md={6}>
              <Stack
                flexDirection={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Box>
                  <Stack direction="row">
                    <Typography
                      sx={{
                        ...lable1CopyStyle,
                        display: "flex",
                        alignItems: "center",
                        marginRight: "-5px",
                      }}
                    >
                      {"Do you have PF under any Trust/Private, i.e non-EPFO PF, in the past or present"}
                    </Typography>
                    <Tooltip
                      arrow="bottom"
                      title={
                        <div style={{ fontSize: '16px' }}>
                          <p>
                            {
                              "Trust PF is privately managed by an employer like Reliance. Normal PF is government-managed like EPFO"
                            }
                          </p>
                          <a
                            href={toHelp}
                            // target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: "#F57264",
                              // textDecoration: "underline",
                              cursor: "pointer",
                            }}
                          >
                            Read More
                          </a>
                        </div>
                      }
                    >
                      <IconButton
                        disabled={isPreviousSectionDisabled}
                        sx={{
                          marginLeft: "-5px", // Moves the icon a bit to the left
                          marginTop: "-5px", // Moves the icon a bit upwards
                        }}
                      >
                        <InfoOutlined />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                  <FormControl sx={{ marginLeft: "17px" }}>
                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent={"end"}
                      alignItems="center"
                      width={"auto"}
                    >
                      <Typography>No</Typography>
                      <Switch
                        onChange={({ target }) =>
                          setIsTrustEpfoAvailable(target.checked)
                        }
                        checked={isTrustEpfoAvailable}
                        color="secondary"
                        disabled={isPreviousSectionDisabled}
                        sx={{ borderColor: "2px" }}
                      />
                      <Typography>Yes</Typography>
                    </Stack>
                  </FormControl>
                </Box>
              </Stack>
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              sx={{
                paddingLeft: { xs: "0px !important", md: "20px!important" },
              }}
            >
              {isTrustEpfoAvailable && (
                <Box>
                  <Typography sx={{ ...lable1CopyStyle, textAlign: "center" }}>
                    Please upload Trust/Private, i.e non-EPFO PF Details
                    <span className="requiredField">*</span>
                  </Typography>
                  <Box sx={fileUploadSectionContainerStyle}>
                    <FileUploadSection
                      chooseFile={uploadTrustEPFOFile}
                      handleRemoveFile={removeEPFOFile}
                      // fileName={
                      //   fileUploaded.some(file => file.uploadTypeAlias === "EPFPSBKTRUST")
                      //     ? fileUploaded.find(file => file.uploadTypeAlias === "EPFPSBKTRUST").fileName
                      //     : trustEpfoFileName
                      // }
                      fileName={trustEpfoFileName}
                      accept={"image/png, image/jpeg,application/pdf"}
                      disabled={isPreviousSectionDisabled}
                      maxUploadSize={imgAndPdfMaxSize}
                      uploadTypeAlias={trustEpfoFileTypeAlias}
                      multiple={true}
                      handleViewFile={handleViewFile}

                    />
                  </Box>
                </Box>
              )}
            </Grid>
          </GridRow>
          <Divider sx={{ ...divederStyle }} />
          {/* ######  PF Verification Section End ###### */}
          {/* ######  UAN number Section Start ###### */}
          <GridRow>
            <Grid sx={{ paddingLeft: "0px !important" }} item xs={12} md={6}>
              <Stack
                flexDirection={"col"}
                justifyContent={"space-between"}
                alignItems={"start"}
              >
                <Typography sx={{ ...lable1CopyStyle }}>
                  {"Do you have UAN number"}
                </Typography>
                <RadioGroup
                  row
                  value={uanNumberAvailable}
                  onChange={handleChange}
                  sx={{ marginLeft: 2 }} // Adjust margin as needed
                >
                  <FormControlLabel
                    value="no"
                    control={<Radio />}
                    label="No"
                    disabled={isPreviousSectionDisabled}
                  />
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                    disabled={isPreviousSectionDisabled}
                  />
                </RadioGroup>
              </Stack>
            </Grid>
          </GridRow>
          {/* ######  UAN number Section End ###### */}
          <GridRow>
            <Grid sx={{ paddingLeft: "0px !important" }} item xs={12}>
              <Stack sx={submitBtnContainerStyle}>
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
                    name="save"
                    // disabled={isSubmitDisabled}
                    onClick={DraftSave}
                    sx={submitBtnStyle}
                    variant="contained"
                    color="primary"
                    disabled={isPreviousSectionDisabled}
                  >
                    Save as Draft
                  </Button>
                </Stack>
                <Stack flexDirection={"row"}>
                  <Button
                    name="save"
                    // disabled={isSubmitDisabled}
                    onClick={handleSaveClick}
                    //sx={{ m: "15px 25px", ml: 3 }}
                    sx={submitBtnStyle}
                    variant="contained"
                    color="primary"
                    //disabled={isPreviousSectionDisabled}
                  >
                    Save
                  </Button>
                  <Button
                    onClick={handleNext}
                    sx={submitBtnStyle}
                    variant="contained"
                    color="primary"
                    disabled={isthirdNextVisible === false}
                  >
                    Next
                  </Button>
                </Stack>
              </Stack>
            </Grid>
          </GridRow>
        </Grid>
        <Dialog
          open={isModalOpen}
          onClose={handleCloseModal}
          aria-labelledby="confirm-save-title"
          aria-describedby="confirm-save-description"
        >
          <DialogTitle id="confirm-save-title">
            {`Are you sure you want to "save" the details?`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="confirm-save-description">
              Once saved, the details cannot be edited anymore. Do you want to
              proceed?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseModal}
              variant="contained"
              color="primary"
              sx={submitBtnStyle}
            >
              No
            </Button>
            <Button
              onClick={handleConfirmSave}
              variant="contained"
              color="primary"
              autoFocus
              sx={submitBtnStyle}
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </Box>
  );
};

export default SecondForm;
