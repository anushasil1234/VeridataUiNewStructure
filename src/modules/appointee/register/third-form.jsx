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
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import FormHeadingContainer from 'shared/components/grid-container/form-heading-container';
import FormHeading from './form-heading';
import GridRow from 'shared/components/grid-container/grid-row';
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
} from 'app';
import {
  Autorenew,
  HelpOutline,
  Info,
  InfoOutlined,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
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
  aaddharNumberverify,
} from 'shared/constants/constants';
import TextInput from 'shared/components/input-fields/text-input';
import FileUploadSection from 'shared/components/file-upload-section/file-upload-section';
import { useSelector } from 'react-redux';
import PassportFileNoSample from 'assets/images/backgrounds/file-number-in-indian-passport.png';
import { DisableSection } from 'shared/components/disble-section/disble-section';
import { VerificationStatusSection } from 'shared/components/verification/verification-status-section';
import { Link } from 'react-router-dom';
import VerficationAadharSteps from 'shared/components/verification/verfication-aadhar';
import { hasValue } from 'shared/utils';
import myImage from 'assets/images/profile/instrucToServiceHistory.png';
import BankVerification from './bank-verifications';
import DrivingLicenseVerification from './driving-licence-verification';
import showErrorMessage from 'shared/utils/associate/show-error-message';
import { getAppointeeDetails } from 'server/apis';
import { setLocalStorageItem } from 'shared/utils';
import { toAadhaarSuccess, toAadhaarFailure, toRegister } from 'shared/constants/constants';
import { decryptedData } from 'shared/utils';
import CircularIndeterminate from 'shared/utils/loader/circularIndeterminate';
import AadhaarVerification from './aadhar-verification';
import { useTranslation } from 'react-i18next';
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
  setDateOfBirth,
}) => {
  console.log('currentPageNo', currentPageNo);
  console.log('activeStep', activeStep);
  const functionSlice = useSelector((state) => state.functionSlice);
  const loggedInData = useSelector((state) => state.loggedInData);
  const { openInfoModel } = functionSlice[0];
  const { userId, appointeeId, userCode, candidateId } = loggedInData[0];
  const [openModal, setOpenModal] = useState(false);
  const [isDLVerificationDisabled, setIsDLVerificationDisabled] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [AADHARVERIFICATION_BY, setAADHARVERIFICATION_BY] = useState('XML');
  const [loading, setLoading] = useState(false);
  const startLoader = () => setLoading(true);
  const stopLoader = () => setLoading(false);
  const { t } = useTranslation();
  const openOfflineKycInfoModel = () => {
    const offlineKycContent = {
      dialogTitle: 'Offline Aadhaar Kyc Steps Info',
      dialogContentText:
        'To complete the offline Aadhaar KYC process please follow the instructions given below :',
      dialogContentComponent: <VerficationAadharSteps />,
      fullWidth: true,
    };
    openInfoModel(offlineKycContent);
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const [passwordType, setPasswordType] = useState('password');
  const [isPasswordVisibilityOn, setIsPasswordVisibilityOn] = useState(false);
  const [passwordFieldIcon, setPasswordFieldIcon] = useState(
    <VisibilityOff sx={loginFieldIconStyle} />,
  );
  const handleShareCodeVisibility = () => {
    setIsPasswordVisibilityOn(!isPasswordVisibilityOn);
  };
  const handleAadharShareCode = (val) => {
    console.log('sharecode', val);
    if (/^\d{0,4}$/.test(val)) {
      setAadharShareCode(val);
    }
  };
  const [isPreviousSectionDisabled, setIsPreviousSectionDisabled] = useState(false);
  const shareCodeProps = {
    endAdornment: (
      <InputAdornment position='end'>
        <IconButton aria-label='toggle password visibility' onClick={handleShareCodeVisibility}>
          {passwordFieldIcon}
        </IconButton>
      </InputAdornment>
    ),
  };
  useEffect(() => {
    if (isPasswordVisibilityOn) {
      setPasswordType('text');
      setPasswordFieldIcon(<Visibility sx={loginFieldIconStyle} />);
    } else {
      setPasswordType('password');
      setPasswordFieldIcon(<VisibilityOff sx={loginFieldIconStyle} />);
    }
  }, [isPasswordVisibilityOn]);
  useEffect(() => {
    if (hasValue(firstPageForm.isDLAvailable)) {
      setIsPreviousSectionDisabled(true);
    }
  }, [firstPageForm.isDLAvailable]);
  useEffect(() => {
    console.log('isDLVerificationDisabled changed:', isDLVerificationDisabled);
  }, [isDLVerificationDisabled]);
  return (
    <Box sx={{ width: '100%' }}>
      <form ref={formElement}>
        <Grid
          sx={{ paddingLeft: '20px' }}
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {}
          <AadhaarVerification
            stepsList={stepsList}
            isAadhaarVarified={isAadhaarVarified}
            setisAadhaarVarified={setisAadhaarVarified}
            isOfflineXmlDownloaded={isOfflineXmlDownloaded}
            setIsOfflineXmlDownloaded={setIsOfflineXmlDownloaded}
            handleIsOfflineXmlDownloadedOnChange={handleIsOfflineXmlDownloadedOnChange}
            nameAsOnAadhar={nameAsOnAadhar}
            handleChangeNameOnAadhar={handleChangeNameOnAadhar}
            aadharShareCode={aadharShareCode}
            setAadharShareCode={setAadharShareCode}
            disabledAadharInput={disabledAadharInput}
            isAadhaarXmlUploaded={isAadhaarXmlUploaded}
            aadharstatusMessage={aadharstatusMessage}
            setAadharstatusMessage={setAadharstatusMessage}
            uploadAadharXmlFile={uploadAadharXmlFile}
            aadharXmlFileName={aadharXmlFileName}
            xmlFileUploaded={xmlFileUploaded}
            setXmlFileUploaded={setXmlFileUploaded}
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
          {}
          {}
          {}
          {/* <DrivingLicenseVerification
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
          /> */}
          {}
          <GridRow>
            <Grid sx={{ paddingLeft: '0px !important' }} item xs={12}>
              <Stack flexDirection={'row'}>
                <Button
                  onClick={handleBack}
                  sx={submitBtnStyle}
                  variant='contained'
                  color='primary'
                >
                  {}
                  {t('Previous')}
                </Button>
                <Button
                  onClick={() => {
                    if (!isAadhaarVarified) {
                      showErrorMessage(aaddharNumberverify);
                      return;
                    }
                    setCurrentPageNo(4);
                    setActiveStep(3);
                  }}
                  sx={submitBtnStyle}
                  variant='contained'
                  color='primary'
                  disabled={!isAadhaarVarified}
                  // disabled={
                  //   !(
                  //     (isAadhaarVarified
                  //       && (!isLicenseAvailable || isDLVarified)) ||
                  //     !isDLAvailable ||
                  //     isDLVarified
                  //   )
                  // }
                >
                  {t('Next')}
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
