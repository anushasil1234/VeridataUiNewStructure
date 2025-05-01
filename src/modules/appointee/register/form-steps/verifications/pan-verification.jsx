import {
  Box,
  Button,
  Grid,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import React, { useState } from 'react';
import FormHeadingContainer from 'shared/components/grid-container/form-heading-container';
import FormHeading from '../../form-heading';
import GridRow from 'shared/components/grid-container/grid-row';
import showErrorMessage from 'shared/utils/associate/show-error-message';
import showSuccessMessage from 'shared/utils/associate/show-success-message';
import { submitBtnStyle, headingType1, fileInputs, positionRelative } from 'app';
import { Autorenew } from '@mui/icons-material';
import {
  emptyPanMsg,
  invalidPanMsg,
  panVerifyFailedMsg,
  panAvailabilitySuccessMsg,
  panAvailabilityErrorMsg,
} from 'shared/constants/constants';
import TextInput from 'shared/components/input-fields/text-input';
import { useSelector, useDispatch } from 'react-redux';
import { VerificationStatusSection } from 'shared/components/verification/verification-status-section';
import { hasValue, patternChecking } from 'shared/utils';
import VerificationStatus from '../../../../../shared/components/verification/verification-status';
import removeExtraSpaces from 'shared/utils/associate/remove-extra-spaces';
import { verifyPANDetails } from 'server/apis';
import { storeCurrentPageNo } from 'store/slices/candidate-page-slice';
import { postAppointeeDocAvailibility } from 'server/apis/appointee/appointee-workflow/post-appointee-doc-availability';
import { useTranslation } from 'react-i18next';
import { fileInputboxContainerStyle } from 'app';
import { SaveAlt } from '@mui/icons-material';
import { pan_regex } from 'shared/constants/constants';
import { handleImageUpload } from 'shared/utils/associate/text-extraction-from-upload-image';
const PANVerification = ({
  stepsList,
  isAadhaarVarified,
  isPANAvailable,
  setIsPANAvailable,
  nameAsOnPan,
  panstatusMessage,
  setPANStatusMessage,
  isPanVarified,
  setIsPanVarified,
  disabledPanInput,
  pan,
  setPan,
}) => {
  const AADHARVERIFICATION_BY = process.env.REACT_APP_AADHARVERIFICATION_BY;
  const { t } = useTranslation();
  console.log('AADHARVERIFICATION_BY', AADHARVERIFICATION_BY);
  const functionSlice = useSelector((state) => state.functionSlice);
  const { openRemarksModel } = functionSlice[0];
  const [panNumberError, setPanNumberError] = useState(false);
  const [isPANModalOpen, setIsPANModalOpen] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const loggedInData = useSelector((state) => state.loggedInData);
  const { userId, appointeeId, userCode, candidateId } = loggedInData[0];
  const dispatch = useDispatch();
  const setCurrentPageNo = (currentPageNo) => {
    dispatch(storeCurrentPageNo(currentPageNo));
  };
  const iconColor = 'none';
  const iconText = (
    <Typography sx={{ fontSize: '16px' }}>
      Choose a file to{' '}
      <Typography component='span' sx={{ color: iconColor, fontWeight: 'bold' }}>
        Upload
      </Typography>
    </Typography>
  );
  const onTextExtracted = (text) => {
    const extracted = extractPanNumber(text);
    if (extracted) {
      setPan(extracted);
    } else {
      showErrorMessage("Can't extract PAN Number. Please enter it manually.");
    }
  };
  const extractPanNumber = (text) => {
    const match = text.match(pan_regex);
    return match ? match[0].replace(/\s/g, '') : '';
  };
  const handelPANNumberChange = (value) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (value !== 'none') {
      if (value.length <= 10) {
        const upperCaseValue = value.trim().toUpperCase();
        setPan(upperCaseValue);
        if (upperCaseValue.length === 10) {
          if (panRegex.test(upperCaseValue)) {
            setPanNumberError(false);
          } else {
            setPanNumberError(true);
            console.log('handelPANNumberChange');
            showErrorMessage('Invalid PAN number format. Please enter a valid PAN.');
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
      showErrorMessage('Invalid PAN number format. Please enter a valid PAN.');
    }
  };
  const displayPanError = (msg) => {
    showErrorMessage(msg);
    setPanNumberError(true);
  };
  const handlePanVerifiaction = () => {
    if (pan === null || nameAsOnPan === null || nameAsOnPan === '') {
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
      const { remarks, IsVarified } = response.responseInfo;
      setIsPanVarified(IsVarified);
      if (IsVarified) {
      } else {
        displayPanError(panVerifyFailedMsg);
        if (hasValue(remarks)) {
          const generatedRemarks = generateRemarks(remarks);
          openRemarksModel(generatedRemarks);
        }
      }
      setPANStatusMessage(new VerificationStatus(IsVarified, 'V'));
    }
  };
  const handleDialogConfirm = () => {
    setIsPANModalOpen(false);
  };
  const handleDialogCancel = () => {
    setIsPANModalOpen(false);
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
  const handleChangePANAvailable = async (event) => {
    const selectedValue = event.target.value === 'Yes';
    setIsPANAvailable(selectedValue);
    const payLoad = {
      appointeeId: appointeeId,
      userId: userId,
      type: 'PAN',
      value: selectedValue,
    };
    try {
      const response = await postAppointeeDocAvailibility(payLoad);
      if (response.responseInfo === 'Success') {
        showSuccessMessage(panAvailabilitySuccessMsg);
      } else {
        showErrorMessage(panAvailabilityErrorMsg);
      }
    } catch (error) {
      showErrorMessage(panAvailabilityErrorMsg);
    }
  };
  return (
    <>
      {}
      <FormHeadingContainer>
        <FormHeading
          step={stepsList?.PAV?.step}
          heading={stepsList?.PAV?.name}
          info={'Enter your PAN Number to verify.'}
        />
      </FormHeadingContainer>
      {
        <>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ ...headingType1, lineHeight: '2.4375em', marginLeft: '34px' }}>
              {t('Do you have PAN Detail?')}
            </Typography>
            <RadioGroup
              row
              value={isPANAvailable ? 'Yes' : 'No'}
              onChange={handleChangePANAvailable}
              sx={{ marginLeft: '24px' }}
            >
              <FormControlLabel
                value='Yes'
                control={<Radio />}
                label={t('Yes')}
                disabled={isPanVarified}
              />
              <FormControlLabel
                value='No'
                control={<Radio />}
                label={t('No')}
                disabled={isPanVarified}
              />
            </RadioGroup>
          </Box>
          {isPANAvailable && (
            <>
              <GridRow sx={positionRelative}>
                <Grid sx={{ paddingLeft: '0px !important' }} item xs={12} md={6}>
                  <TextInput
                    label={t('PAN Number')}
                    value={pan}
                    onChange={handelPANNumberChange}
                    disabled={isPanVarified}
                    error={panNumberError}
                    onBlur={handleBlurPAN}
                  />
                  <TextInput label={t('Name on PAN')} value={nameAsOnPan} disabled={true} />
                  <Button
                    sx={{ ...submitBtnStyle, margin: '5px 0' }}
                    disabled={isPanVarified}
                    variant='contained'
                    onClick={handlePanVerifiaction}
                    endIcon={<Autorenew />}
                  >
                    {t('Verify')}
                  </Button>
                  <VerificationStatusSection docType={panstatusMessage} />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    ...fileInputboxContainerStyle,
                    overflowY: 'auto',
                    position: 'relative',
                    marginBottom: 'auto',
                    paddingLeft: { xs: '0px !important', md: '20px!important' },
                  }}
                >
                  <Box sx={fileInputs}>
                    <input
                      id='hidden-upload'
                      type='file'
                      accept='image/*'
                      onChange={(e) => handleImageUpload(e, setUploadedFileName, onTextExtracted)}
                      style={{ marginBottom: '10px' }}
                      onClick={(e) => (e.target.value = null)}
                    />
                    <Box
                      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                      onClick={() => document.getElementById('hidden-upload')?.click()}
                    >
                      <SaveAlt sx={{ mb: 0.5, color: iconColor }} />
                      <Typography variant='body1' sx={{ color: iconColor }}>
                        {iconText}
                      </Typography>
                      <Typography variant='body2' color='textSecondary'>
                        Upload an image containing the PAN Number.
                      </Typography>
                      {uploadedFileName && (
                        <Typography variant='body2' sx={{ mt: 1 }}>
                          Uploaded File: {uploadedFileName}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Grid>
              </GridRow>
            </>
          )}
        </>
      }
    </>
  );
};
export default PANVerification;
