import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { Autorenew, Info } from '@mui/icons-material';
import FormHeadingContainer from 'shared/components/grid-container/form-heading-container';
import FormHeading from '../../form-heading';
import GridRow from 'shared/components/grid-container/grid-row';
import TextInput from 'shared/components/input-fields/text-input';
import { VerificationStatusSection } from 'shared/components/verification/verification-status-section';
import FileUploadSection from 'shared/components/file-upload-section/file-upload-section';
import { fileUploadSectionContainerStyle, lable1CopyStyle, positionRelative, primaryFabStyle, responsiveBtnType1Style, statusBoxstyle, statusstyle, verificationBtnStyle } from 'app';

const UANVerification = ({
  t,
  stepsList,
  UAN,
  setUAN,
  isUanVarified,
  isUanVerificationProcessManual,
  handleChangeUanVerification,
  handleEpfoButtonClick,
  epfoButton,
  epfostatusMessage,
  uanAadharLink,
  isModalOpen,
  handleOpenModal,
  handleCloseModal,
  uploadEpfoServiceHistoryFile,
  epfoServiceHistoryFile,
  uploadEpfoPassBookFile,
  removeEPFOPassbookFile,
  epfoPassBookFiles,
  handleViewFile,
  imgAndPdfMaxSize,
  epfoServiceHistoryFileTypeAlias,
  epfoPassbookFileTypeAlias,
  fileUploadSectionContainerStyle,
  lable1CopyStyle,
  // primaryFabStyle,
  responsiveBtnType1Style,
  verificationBtnStyle,
}) => {
  return (
    <>
      <FormHeadingContainer>
        <FormHeading
          step={stepsList?.UAV?.step}
          heading={stepsList?.UAV?.name}
          info={'Enter your Universal Account Number(UAN) to verify.'}
        />
      </FormHeadingContainer>
      {/* <GridRow sx={positionRelative}> */}
              {/* <Box sx={{ display: 'flex', alignItems: 'center' }}> */}
        <GridRow sx={positionRelative}>
          <Grid item xs={12} md={6} sx={{ paddingLeft: '0px !important' }}>
            <TextInput
              label={t('Universal Account Number(UAN)')}
              onChange={(val) => {
                if (/^\d{0,12}$/.test(val)) {
                  setUAN(val);
                }
              }}
              value={UAN}
              disabled={isUanVarified}
            />
            <Button
              sx={verificationBtnStyle}
              variant='contained'
              onClick={handleEpfoButtonClick}
              endIcon={<Autorenew />}
              disabled={isUanVerificationProcessManual === 'manual' || isUanVarified}
            >
              {epfoButton}
            </Button>
            <VerificationStatusSection docType={epfostatusMessage} />
            <Stack direction={'row'} alignItems={'center'}>
              <Typography sx={{ margin: '5px 0', color: '#000' }}>
                {t('UAN Aadhar Link')}
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
                xs: '0px !important',
                md: '20px!important',
                ...positionRelative,
              },
            }}
          >
            <Grid item xs={12} sx={{ paddingLeft: '0px !important' }}>
              <Stack flexDirection='column' justifyContent='space-between' alignItems='start'>
                <Typography sx={{ ...lable1CopyStyle }}>{t('UAN Verification')}</Typography>
                <RadioGroup
                  row
                  value={isUanVerificationProcessManual}
                  onChange={handleChangeUanVerification}
                >
                  <FormControlLabel
                    value='auto'
                    control={<Radio />}
                    label={t('Automatic')}
                    disabled={!UAN || isUanVarified}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FormControlLabel
                      value='manual'
                      control={<Radio />}
                      label={t('Manual')}
                      disabled={!UAN || isUanVarified}
                    />
                    <Tooltip
                      arrow
                      title={
                        <Box sx={{ ...statusBoxstyle }}>
                          <Typography variant='body2' sx={{...statusstyle, fontSize: '16px' }}>
                            It is mandatory for EPFO members to upload all PF passbooks 2005 onwards (if applicable).
                          </Typography>
                        </Box>
                      }
                    >
                      <Fab
                        variant='contained'
                        size='small'
                        sx={{ ...primaryFabStyle, ml: 1 }}
                        onClick={handleOpenModal}
                      >
                        <Info width={18} sx={{ color: '#fff' }} />
                      </Fab>
                    </Tooltip>
                    <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth='lg' fullWidth>
                      <DialogTitle>How To Access Service History</DialogTitle>
                      <DialogContent
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        {/* Add your image or instructions here */}
                      </DialogContent>
                      <DialogContent
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'left',
                          alignItems: 'flex-start',
                        }}
                      >
                        <Typography variant='subtitle2'>Notes :</Typography>
                        <Typography variant='subtitle2' sx={{ mt: 1 }}>
                          1. Upload your EPFO service history to provide accurate details about your employment contributions.
                        </Typography>
                        <Typography variant='subtitle2' sx={{ mt: 1 }}>
                          {`2. Log in to the EPFO Member Portal. Navigate to 'View' -> 'Service History'. Download the service history file.`}
                        </Typography>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          variant='contained'
                          color='primary'
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
            {isUanVerificationProcessManual === 'manual' && (
              <Grid>
                <Grid item xs={12} sx={{ paddingLeft: '0px !important' }}>
                  <Typography sx={{ ...lable1CopyStyle, textAlign: 'center' }}>
                    {t('Please upload your EPFO Service History')}
                    <span className='requiredField'>*</span>
                  </Typography>
                  <Box sx={fileUploadSectionContainerStyle}>
                    <FileUploadSection
                      chooseFile={uploadEpfoServiceHistoryFile}
                      fileName={epfoServiceHistoryFile}
                      accept={'application/pdf'}
                      maxUploadSize={imgAndPdfMaxSize}
                      uploadTypeAlias={epfoServiceHistoryFileTypeAlias}
                      handleViewFile={handleViewFile}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sx={{ paddingLeft: '0px !important' }}>
                  <Typography sx={{ ...lable1CopyStyle, textAlign: 'center' }}>
                    {t('Please upload your EPFO passbook')}
                    <span className='requiredField'>*</span>
                  </Typography>
                  <Box sx={fileUploadSectionContainerStyle}>
                    <FileUploadSection
                      chooseFile={uploadEpfoPassBookFile}
                      handleRemoveFile={removeEPFOPassbookFile}
                      fileName={epfoPassBookFiles}
                      accept={'application/pdf'}
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
        </GridRow>
      {/* </Box> */}
      {/* </GridRow> */}
    </>
  );
};

export default UANVerification; 