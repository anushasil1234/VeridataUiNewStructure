import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import FormHeadingContainer from 'shared/components/grid-container/form-heading-container';
import FormHeading from '../../form-heading';
import GridRow from 'shared/components/grid-container/grid-row';
import {
  fileInputs,
  headingType1,
  positionRelative,
  submitBtnStyle,
} from 'app';
import {
  Autorenew,
} from '@mui/icons-material';
import {
  emptyDLNumberMsg,
  invalidDLMsg,
  dlAvailabilitySuccessMsg,
  dlAvailabilityErrorMsg,
} from 'shared/constants/constants';
import TextInput from 'shared/components/input-fields/text-input';
import { useSelector } from 'react-redux';
import { VerificationStatusSection } from 'shared/components/verification/verification-status-section';
import { hasValue, patternChecking } from 'shared/utils';
import showErrorMessage from 'shared/utils/associate/show-error-message';
import showSuccessMessage from 'shared/utils/associate/show-success-message';
import { verifyDrivingLicenseDetails } from 'server/apis/verify/verify-driving-license';
import removeSingleSpaces from 'shared/utils/associate/remove-single-spaces';
import generateRemarks from 'shared/utils/associate/generate-remarks';
import VerificationStatus from 'shared/components/verification/verification-status';
import { DDMMYYYY } from 'shared/utils';
import { postAppointeeDocAvailibility } from 'server/apis/appointee/appointee-workflow/post-appointee-doc-availability';
import { useTranslation } from 'react-i18next';
import { fileInputboxContainerStyle } from 'app';
import { SaveAlt } from '@mui/icons-material';
import { driving_license_regex } from 'shared/constants/constants';
import { handleImageUpload } from 'shared/utils/associate/text-extraction-from-upload-image';
const DrivingLicenseVerification = ({
  isAadhaarVarified,
  stepsList,
  firstPageForm,
  setFirstPageForm,
  isLicenseAvailable,
  setIsLicenseAvailable,
  isDLVarified,
  setisDLVarified,
  licensestatusMessage,
  setLicenseStatusMessage,
  isDLVerificationDisabled,
  isDLAvailable,
  setIsDLAvailable,
  drivingLicense,
  setDrivingLicense,
  dateOfBirth,
  setDateOfBirth,
}) => {
  const dropdownList = useSelector((state) => state.dropdownList);
  const apiSlice = useSelector((state) => state.apiSlice);
  const loggedInData = useSelector((state) => state.loggedInData);
  const { t } = useTranslation();
  const commonHooksFunctionSlice = useSelector((state) => state.commonHooksFunctionSlice);
  const functionSlice = useSelector((state) => state.functionSlice);
  const {
    openOtpForm,
    closeOtpForm,
    openOtpSubmitionModel,
    closeOtpSubmitionModel,
    openRemarksModel,
    openConfirmationModel,
    openInfoModel,
  } = functionSlice[0];
  const { userId, appointeeId, userCode, candidateId } = loggedInData[0];
  const [licenseNumber, setLicenseNumber] = useState(null);
  const [dob, setDob] = useState(null);
  const [isLicenseVerified, setIsLicenseVerified] = useState();
  const [dlNumberError, setDLNumberError] = useState(false);
  const [inputMethod, setInputMethod] = useState('manual');
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const handleLicenseNumberChange = (value) => {
    setDrivingLicense(value.toUpperCase());
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
  const handleDrivingLicenseVerification = async () => {
    if (drivingLicense === null) {
      showErrorMessage(emptyDLNumberMsg);
    } else if (
      !patternChecking(drivingLicense, /^(?:[A-Z]{2}\d{2}-?|\w{2}-\d{2}|\w{2}\d{2} ?)\d{4}\d{7}$/)
    ) {
      showErrorMessage(invalidDLMsg);
      setDLNumberError(true);
    } else {
      verifyDrivingLicense();
    }
  };
  const verifyDrivingLicense = async () => {
    const payLoad = {
      appointeeId: appointeeId,
      dlNumber: hasValue(drivingLicense) ? removeSingleSpaces(drivingLicense) : null,
      userId: userId,
    };
    const response = await verifyDrivingLicenseDetails(payLoad);
    if (response) {
      const { remarks, IsVarified } = response.responseInfo;
      if (IsVarified) {
      } else {
        if (hasValue(remarks)) {
          const generatedRemarks = generateRemarks(remarks);
          openRemarksModel(generatedRemarks);
        }
      }
      setisDLVarified(IsVarified);
      setLicenseStatusMessage(new VerificationStatus(IsVarified, 'V'));
    }
  };
  const handleChangeLicenseAvailable = async (event) => {
    const selectedValue = event.target.value === 'Yes';
    setIsDLAvailable(selectedValue);
    const payLoad = {
      appointeeId: appointeeId,
      userId: userId,
      type: 'DL',
      value: selectedValue,
    };
    try {
      const response = await postAppointeeDocAvailibility(payLoad);
      if (response.responseInfo === 'Success') {
        showSuccessMessage(dlAvailabilitySuccessMsg);
      } else {
        showErrorMessage(dlAvailabilityErrorMsg);
      }
    } catch (error) {
      showErrorMessage(dlAvailabilityErrorMsg);
    }
  };
  const onTextExtracted = (text) => {
    const extracted = extractLicenseNumber(text);
    if (extracted) {
      setDrivingLicense(extracted);
    } else {
      showErrorMessage("Can't extract Driving License Number. Please enter it manually.");
    }
  };
  const extractLicenseNumber = (text) => {
    const match = text.match(driving_license_regex);
    return match ? match[0].replace(/\s/g, '') : '';
  };
  const handleFirstPageFormInputChange = (value, name) => {
    setFirstPageForm({ ...firstPageForm, [name]: value });
  };
  return (
    <>
      <FormHeadingContainer>
        <FormHeading
          step={stepsList?.DLV?.step}
          heading={stepsList?.DLV?.name}
          info={'Enter your Driving License Details to verify.'}
        />
      </FormHeadingContainer>
      {}
      {
        <>
          <Typography sx={{ ...headingType1, lineHeight: '2.4375em', marginLeft: '34px' }}>
            {t('Do you have a driving license?')}
            {}
          </Typography>
          {}
          <RadioGroup
            row
            value={isDLAvailable ? 'Yes' : 'No'}
            onChange={handleChangeLicenseAvailable}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '20px',
              }}
            >
              <FormControlLabel
                value='Yes'
                control={<Radio />}
                label={t('Yes')}
                disabled={isDLVerificationDisabled}
              />
              <FormControlLabel
                value='No'
                control={<Radio />}
                label={t('No')}
                disabled={isDLVerificationDisabled}
              />
            </Box>
          </RadioGroup>
          {}
          {isDLAvailable && (
            <GridRow>
              <Grid item xs={12} md={6} sx={{ paddingLeft: '0px !important' }}>
                <TextInput
                  label={t('Driving License Number')}
                  onChange={handleLicenseNumberChange}
                  disabled={isDLVarified}
                  value={drivingLicense}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  paddingLeft: {
                    xs: '0px !important',
                    md: '20px!important',
                    ...positionRelative,
                  },
                }}
              >
                <TextInput
                  label={t('Date of Birth')}
                  value={firstPageForm?.dateOfBirth ? DDMMYYYY(firstPageForm?.dateOfBirth) : null}
                  disabled={true}
                />
              </Grid>
              <Grid sx={{ paddingLeft: '0px !important' }} item xs={12} md={6}>
                <Button
                  sx={{ ...submitBtnStyle, margin: '5px 0' }}
                  disabled={isDLVarified}
                  variant='contained'
                  onClick={handleDrivingLicenseVerification}
                  endIcon={<Autorenew />}
                >
                  {t('Verify')}
                </Button>
                <VerificationStatusSection docType={licensestatusMessage} />
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
                      Upload an image containing the Driving License Number.
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
          )}
        </>
      }
    </>
  );
};
export default DrivingLicenseVerification;
