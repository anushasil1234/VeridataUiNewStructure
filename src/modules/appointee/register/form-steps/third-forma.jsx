import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import GridRow from 'shared/components/grid-container/grid-row';
import {
  loginFieldIconStyle,
  submitBtnStyle,
} from 'app';
import {
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import {
  aaddharNumberverify,
} from 'shared/constants/constants';
import { useSelector } from 'react-redux';
import VerficationAadharSteps from 'shared/components/verification/verfication-aadhar';
import { hasValue } from 'shared/utils';
import showErrorMessage from 'shared/utils/associate/show-error-message';
import { useTranslation } from 'react-i18next';
import AadhaarVerification from './verifications/aadhar-verification';
const ThirdForma = ({
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
}) => {
  const functionSlice = useSelector((state) => state.functionSlice);
  const { openInfoModel } = functionSlice[0];
  const [openModal, setOpenModal] = useState(false);
  const [isDLVerificationDisabled, setIsDLVerificationDisabled] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [AADHARVERIFICATION_BY, setAADHARVERIFICATION_BY] = useState('XML');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const [passwordType, setPasswordType] = useState('password');
  const [isPasswordVisibilityOn, setIsPasswordVisibilityOn] = useState(false);
  const [passwordFieldIcon, setPasswordFieldIcon] = useState(
    <VisibilityOff sx={loginFieldIconStyle} />,
  );
  // const [isPreviousSectionDisabled, setIsPreviousSectionDisabled] = useState(false);
  useEffect(() => {
    if (isPasswordVisibilityOn) {
      setPasswordType('text');
      setPasswordFieldIcon(<Visibility sx={loginFieldIconStyle} />);
    } else {
      setPasswordType('password');
      setPasswordFieldIcon(<VisibilityOff sx={loginFieldIconStyle} />);
    }
  }, [isPasswordVisibilityOn]);
 
  return (
    <Box sx={{ width: '100%' }}>
      <form ref={formElement}>
        <Grid
          sx={{ paddingLeft: '20px' }}
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
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
export default ThirdForma;
