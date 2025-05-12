import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import FormHeadingContainer from 'shared/components/grid-container/form-heading-container';
import FormHeading from '../../form-heading';
import GridRow from 'shared/components/grid-container/grid-row';
import {
  checkBoxLabelStyle,
  checkBoxStyle,
  headingType1,
  loginFieldIconStyle,
  positionRelative,
  submitBtnStyle,
} from 'app';
import {
  Autorenew,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import {
  aadharFileTypeAlias,
} from 'shared/constants/constants';
import TextInput from 'shared/components/input-fields/text-input';
import FileUploadSection from 'shared/components/file-upload-section/file-upload-section';
import { useSelector } from 'react-redux';
import { DisableSection } from 'shared/components/disble-section/disble-section';
import { VerificationStatusSection } from 'shared/components/verification/verification-status-section';
import VerficationAadharSteps from 'shared/components/verification/verfication-aadhar';
import { hasValue } from 'shared/utils';
import showErrorMessage from 'shared/utils/associate/show-error-message';
import { setLocalStorageItem } from 'shared/utils';
import { toAadhaarSuccess, toAadhaarFailure } from 'shared/constants/constants';
import CircularIndeterminate from 'shared/utils/loader/circularIndeterminate';
import { verifyAadharDetails } from 'server/apis';
import showSuccessMessage from 'shared/utils/associate/show-success-message';
import {
  aadharVerifySuccessMsg,
  aadharVerifyFailedMsg,
  emptyAadharMsg,
  emptyShareCodeMsg,
} from 'shared/constants/constants';
import VerificationStatus from '../../../../../shared/components/verification/verification-status';
import { useLocation } from 'react-router-dom';
import { GetDigilockerUrl } from 'server/apis/verify/get-digilocker-url';
import { useTranslation } from 'react-i18next';
import { FILE_SIZE_LIMIT, validFileTypes,uploadFormatErrorMsg,uploadSizeErrorMsg } from 'shared/constants/constants';

const AadhaarVerification = ({ stepsList,isAadhaarVarified, onVerified ,userInfo,setUserInfo}) => {
  const { t } = useTranslation();
  const functionSlice = useSelector((state) => state.functionSlice);
  const loggedInData = useSelector((state) => state.loggedInData);
  const { userId, appointeeId, candidateId } = loggedInData[0];
  const [isOfflineXmlDownloaded, setIsOfflineXmlDownloaded] = useState(false);
  const [nameAsOnAadhar, setNameAsOnAadhar] = useState(userInfo.appointeeName);
  const [aadharShareCode, setAadharShareCode] = useState('');
  const [aadharstatusMessage, setAadharstatusMessage] = useState(new VerificationStatus(null, ''));
  const [xmlFileUploaded, setXmlFileUploaded] = useState(null);
  const [aadharXmlFileName, setAadharXmlFileName] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [disabledAadharInput, setDisabledAadharInput] = useState(false);
  const [isAadhaarXmlUploaded, setIsAadhaarXmlUploaded] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [AADHARVERIFICATION_BY, setAADHARVERIFICATION_BY] = useState('XML');
  const [loading, setLoading] = useState(false);
  const startLoader = () => setLoading(true);
  const stopLoader = () => setLoading(false);
  const {
    closeOtpSubmitionModel,
    openRemarksModel,
    openInfoModel,
  } = functionSlice[0];
  const location = useLocation();
  const responseInfo = location.state?.responseInfo;
  const remarks = responseInfo?.remarks || null;

  const handleChangeNameOnAadhar = (e) => setNameAsOnAadhar(e.target.value);
  const handleChangeAadharNumber = (e) => setAadharNumber(e.target.value);
  const handleAadharShareCode = (val) => {
    if (/^\d{0,4}$/.test(val)) setAadharShareCode(val);
  };
  const handleIsOfflineXmlDownloadedOnChange = (e) => setIsOfflineXmlDownloaded(e.target.checked);
  const uploadAadharXmlFile = ({ target }) => {
    setXmlFileUploaded();
    setAadharXmlFileName();
    const { files } = target;
    const fileData = files[0];
    const { name, size, type } = fileData;
    if (!validFileTypes.includes(type)) {
      showErrorMessage(uploadFormatErrorMsg);
    } else if (size > FILE_SIZE_LIMIT) {
      showErrorMessage(uploadSizeErrorMsg);
    } else {
      setAadharXmlFileName([name]);
      setXmlFileUploaded(fileData);
    }
    setIsAadhaarXmlUploaded(true);
  };

  useEffect(() => {
    if (isAadhaarVarified && onVerified) onVerified(true);
    setAadharstatusMessage(new VerificationStatus(isAadhaarVarified, ''));
    
  }, [isAadhaarVarified, onVerified]);

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
  const handleConfirmFetchAadhaar = () => {
    setOpenModal(false);
    handleFetchAadhaar();
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const generateRemarks = (remarks) => {
    let remarksList = [];
    if (hasValue(remarks)) {
      remarksList = remarks.split(',').map((remark) => {
        return {
          remarksCategory: 'NRML',
          remarks: remark,
        };
      });
    }
    return remarksList;
  };
  if (hasValue(remarks)) {
    const generatedRemarks = generateRemarks(remarks);
    openRemarksModel(generatedRemarks);
  }
  const [passwordType, setPasswordType] = useState('password');
  const [isPasswordVisibilityOn, setIsPasswordVisibilityOn] = useState(false);
  const [passwordFieldIcon, setPasswordFieldIcon] = useState(
    <VisibilityOff sx={loginFieldIconStyle} />,
  );
  const handleShareCodeVisibility = () => {
    setIsPasswordVisibilityOn(!isPasswordVisibilityOn);
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
  const baseURL = window.location.origin;
  const handleFetchAadhaar = async () => {
    startLoader();
    try {
      const successUrl = `${baseURL}${toAadhaarSuccess.replace(':appointeeId', candidateId)}`;
      const failureUrl = `${baseURL}${toAadhaarFailure.replace(':appointeeId', candidateId)}`;
      const payload = {
        appointeeId: appointeeId,
        userId: userId,
        successRedirectUrl: successUrl,
        failureRedirectUrl: failureUrl,
      };
      const response = await GetDigilockerUrl(payload);
      if (response) {
        const { digilockerUrl, requestId } = response.responseInfo;
        setLocalStorageItem('aadhaar_request_id', requestId);
        window.location.href = digilockerUrl;
      }
    } catch (error) {
      console.error('Error fetching Aadhaar:', error);
    }
    stopLoader();
  };
  const verifyAadharByXML = async () => {
    let formData = new FormData();
    formData.append('AppointeeId', appointeeId);
    formData.append('AadhaarName', nameAsOnAadhar.trim());
    formData.append('UserId', userId);
    formData.append('ShareCode', aadharShareCode.trim());
    formData.append('AadhaarFileDetails', xmlFileUploaded);
    const response = await verifyAadharDetails(formData);
    if (response) {
      const { remarks, isVarified } = response.responseInfo;
      if (isVarified) {
        showSuccessMessage(aadharVerifySuccessMsg);
      } else {
        showErrorMessage(aadharVerifyFailedMsg);
        if (hasValue(remarks)) {
          const generatedRemarks = generateRemarks(remarks);
          openRemarksModel(generatedRemarks);
        }
      }
      setUserInfo && setUserInfo((prev) => ({ ...prev, isAadhaarVarified: isVarified }));
      onVerified(isVarified);
      setIsOfflineXmlDownloaded(true);
      closeOtpSubmitionModel();
      setAadharstatusMessage(new VerificationStatus(isVarified, 'V'));
    }
  };
  const handleAadharVerifiaction = () => {
    if (AADHARVERIFICATION_BY === 'XML') {
      if (!(hasValue(aadharShareCode) && hasValue(nameAsOnAadhar))) {
        if (!hasValue(aadharShareCode)) {
          showErrorMessage(emptyShareCodeMsg);
        } else {
          showErrorMessage(emptyAadharMsg);
        }
      } else {
        verifyAadharByXML();
      }
    }
  };
  return (
    <>
      {loading && <CircularIndeterminate />}
      {}
      <FormHeadingContainer>
        <FormHeading
          step={stepsList?.AV?.step}
          heading={stepsList?.AV?.name}
          info={'Enter Aadhaar data to verify, see more info in the below link.'}
        />
      </FormHeadingContainer>
      <>
        {}
        <Grid item xs={12}>
          <Typography sx={{ ...headingType1, lineHeight: '2.4375em', marginLeft: '34px' }}>
            {t('Aadhaar verification by XML or External Source?')}
          </Typography>
          <RadioGroup
            row
            value={AADHARVERIFICATION_BY}
            onChange={(event) => setAADHARVERIFICATION_BY(event.target.value)}
            sx={{ marginLeft: '34px' }}
          >
            <FormControlLabel value='XML' control={<Radio />} label='XML' />
            <FormControlLabel value='Thirdparty' control={<Radio />} label='Digilocker' />
          </RadioGroup>
        </Grid>
        {AADHARVERIFICATION_BY === 'XML' && (
          <>
            <GridRow>
              <Typography sx={headingType1}>
                {t(
                  'As part of onboarding process Please generate your e-KYC verification file and upload it here. To see the details steps',
                )}
                {}
              </Typography>
              <Typography
                sx={{
                  cursor: 'pointer',
                  color: '#9A208C',
                  fontWeight: 500,
                }}
                onClick={() => openOfflineKycInfoModel()}
              >
                {t('Click here')}
              </Typography>
            </GridRow>
            <GridRow>
              <FormControl
                sx={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flexWrap: 'wrap',
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
                          inputProps={{ 'aria-label': 'controlled' }}
                          sx={checkBoxStyle}
                        />
                      }
                    ></FormControlLabel>
                    <Typography
                      onClick={() => setIsOfflineXmlDownloaded(!isOfflineXmlDownloaded)}
                      sx={checkBoxLabelStyle}
                    >
                      {t('I have downloaded the Aadhar e-KYC file')}
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
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      }
                    ></FormControlLabel>
                    <Typography
                      onClick={() => setIsOfflineXmlDownloaded(!isOfflineXmlDownloaded)}
                      sx={checkBoxLabelStyle}
                    >
                      {t('I have downloaded the Aadhar e-KYC file')}
                    </Typography>
                  </>
                )}
              </FormControl>
            </GridRow>
          </>
        )}
        <GridRow sx={positionRelative}>
          {AADHARVERIFICATION_BY === 'XML' && !isOfflineXmlDownloaded && <DisableSection />}
          {AADHARVERIFICATION_BY === 'XML' && (
            <Grid sx={{ paddingLeft: '0px !important' }} item xs={12} md={6}>
              <TextInput
                label={t('Name On Aadhaar')}
                value={nameAsOnAadhar}
                onChange={handleChangeNameOnAadhar}
                disabled={true}
              />
              <TextInput
                label={t('Share Code (to be provided after uploading)')}
                onChange={(e) => handleAadharShareCode(e)}
                onKeyDown={(e) => {
                  if (!/^\d{0,4}$/.test(e.key) && e.key !== 'Backspace') {
                    e.preventDefault();
                  }
                }}
                value={aadharShareCode}
                disabled={disabledAadharInput || !isAadhaarXmlUploaded}
                inputProps={shareCodeProps}
                type={passwordType}
              />
              <Button
                sx={{ ...submitBtnStyle, margin: '5px 0' }}
                disabled={isAadhaarVarified}
                variant='contained'
                onClick={handleAadharVerifiaction}
                endIcon={<Autorenew />}
              >
                {t('Verify')}
              </Button>
              <VerificationStatusSection docType={aadharstatusMessage} />
            </Grid>
          )}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              paddingLeft: { xs: '0px !important', md: '20px!important' },
            }}
          >
            {AADHARVERIFICATION_BY === 'OTP' && (
              <TextInput
                label={'Aadhar Number'}
                value={aadharNumber}
                onChange={handleChangeAadharNumber}
                disabled={isAadhaarVarified}
              />
            )}
            {AADHARVERIFICATION_BY === 'XML' && (
              <FileUploadSection
                chooseFile={uploadAadharXmlFile}
                fileName={aadharXmlFileName}
                accept={'.rar, .zip'}
                disabled={isAadhaarVarified}
                uploadTypeAlias={aadharFileTypeAlias}
              />
            )}
            {AADHARVERIFICATION_BY === 'Thirdparty' && (
              <>
                <Button
                  sx={{ ...submitBtnStyle, margin: '5px 0' }}
                  disabled={isAadhaarVarified}
                  variant='contained'
                  onClick={handleOpenModal}
                  endIcon={<Autorenew />}
                >
                  {t('Fetch Aadhaar Details')}
                </Button>
                <VerificationStatusSection docType={aadharstatusMessage} />
              </>
            )}
            <Dialog
              open={openModal}
              onClose={handleCloseModal}
              aria-labelledby='confirm-save-title'
              aria-describedby='confirm-save-description'
            >
              {}
              <DialogContent>
                <DialogContentText id='confirm-save-description'>
                  This will verify Aadhaar without checking your registered mobile number with
                  Aadhaar linked number. Continue?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleCloseModal}
                  variant='contained'
                  color='primary'
                  sx={submitBtnStyle}
                >
                  No
                </Button>
                <Button
                  onClick={handleConfirmFetchAadhaar}
                  variant='contained'
                  color='primary'
                  autoFocus
                  sx={submitBtnStyle}
                >
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </GridRow>
        {}
      </>
    </>
  );
};
export default AadhaarVerification;
