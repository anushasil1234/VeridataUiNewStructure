import {
  Box,
  Button,
  Grid,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import React from 'react';
import FormHeadingContainer from 'shared/components/grid-container/form-heading-container';
import FormHeading from '../../form-heading';
import GridRow from 'shared/components/grid-container/grid-row';
import { submitBtnStyle, headingType1, fileInputs, positionRelative } from 'app';
import { Autorenew, SaveAlt } from '@mui/icons-material';
import TextInput from 'shared/components/input-fields/text-input';
import { VerificationStatusSection } from 'shared/components/verification/verification-status-section';
import { fileInputboxContainerStyle } from 'app';
import { handleImageUpload } from 'shared/utils/associate/text-extraction-from-upload-image';
import { useTranslation } from "react-i18next";
const PANVerification = ({
  stepsList,
  isPANAvailable,
  handleChangePANAvailable,
  pan,
  handelPANNumberChange,
  isPanVarified,
  panNumberError,
  handleBlurPAN,
  nameAsOnPan,
  handlePanVerifiaction,
  panstatusMessage,
  uploadedFileName,
  setUploadedFileName,
  onTextExtracted,
}) => {
  const { t } = useTranslation();
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
          step={stepsList?.PAV?.step}
          heading={stepsList?.PAV?.name}
          info={'Enter your PAN Number to verify.'}
        />
      </FormHeadingContainer>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ ...headingType1, lineHeight: '2.4375em', marginLeft: '34px' }}>
        {t("Do you have PAN Detail?")}
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
            label={t("Yes")}
            disabled={isPanVarified}
          />
          <FormControlLabel
            value='No'
            control={<Radio />}
            label={t("No")}
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
                {t("Verify")}
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
  );
};
export default PANVerification;
