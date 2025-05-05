import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import React from 'react';
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
  SaveAlt,
} from '@mui/icons-material';
import TextInput from 'shared/components/input-fields/text-input';
import { VerificationStatusSection } from 'shared/components/verification/verification-status-section';
import { DDMMYYYY } from 'shared/utils';
import { fileInputboxContainerStyle } from 'app';
import { handleImageUpload } from 'shared/utils/associate/text-extraction-from-upload-image';

const DrivingLicenseVerification = ({
  stepsList,
  isDLAvailable,
  isDLVerificationDisabled,
  handleChangeLicenseAvailable,
  drivingLicense,
  handleLicenseNumberChange,
  isDLVarified,
  handleDrivingLicenseVerification,
  licensestatusMessage,
  userInfo,
  uploadedFileName,
  onTextExtracted,
  setUploadedFileName,
}) => {
  const iconColor = 'none';
  const iconText = (
    <Typography sx={{ fontSize: '16px' }}>
      Choose a file to{' '}
      <Typography component='span' sx={{ color: iconColor, fontWeight: 'bold' }}>
        Upload
      </Typography>
    </Typography>
  );

  return (
    <>
      <FormHeadingContainer>
        <FormHeading
          step={stepsList?.DLV?.step}
          heading={stepsList?.DLV?.name}
          info={'Enter your Driving License Details to verify.'}
        />
      </FormHeadingContainer>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ ...headingType1, lineHeight: '2.4375em', marginLeft: '34px' }}>
          Do you have a driving license?
        </Typography>
        <RadioGroup
          row
          value={isDLAvailable ? 'Yes' : 'No'}
          onChange={handleChangeLicenseAvailable}
          sx={{ marginLeft: '24px' }}
        >
          <FormControlLabel
            value='Yes'
            control={<Radio />}
            label={'Yes'}
            disabled={isDLVerificationDisabled}
          />
          <FormControlLabel
            value='No'
            control={<Radio />}
            label={'No'}
            disabled={isDLVerificationDisabled}
          />
        </RadioGroup>
      </Box>
      {isDLAvailable && (
        <GridRow sx={positionRelative}>
          <Grid item xs={12} md={6} sx={{ paddingLeft: '0px !important' }}>
            <TextInput
              label={'Driving License Number'}
              onChange={handleLicenseNumberChange}
              disabled={isDLVarified}
              value={drivingLicense}
            />
            <TextInput
              label={'Date of Birth'}
              value={userInfo?.dateOfBirth ? DDMMYYYY(userInfo?.dateOfBirth) : null}
              disabled={true}
            />
            <Button
              sx={{ ...submitBtnStyle, margin: '5px 0' }}
              disabled={isDLVarified}
              variant='contained'
              onClick={handleDrivingLicenseVerification}
              endIcon={<Autorenew />}
            >
              Verify
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
  );
};
export default DrivingLicenseVerification;
