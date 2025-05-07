import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Stack } from '@mui/material';
import GridRow from 'shared/components/grid-container/grid-row';
import { submitBtnStyle } from 'app';
import UANVerification from './verifications/uan-verification';
import useUANVerification from '../hooks/useUANVerification';
import { imgAndPdfMaxSize, epfoServiceHistoryFileTypeAlias, epfoPassbookFileTypeAlias } from 'shared/constants/constants';
import { hasValue } from 'shared/utils';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const EighthForm = ({
  formElement,
  stepsList,
  handleBack,
  userInfo,
  setUserInfo,
  checkFileUpload,
  fileTypeList,
  openUploadDocInfoModel,
  ...rest
}) => {
  const { t } = useTranslation();
  // Local state for UAN/EPFO
  const [UAN, setUAN] = useState('');
  const [epfoButton, setEpfoButton] = useState(t('Fetch N Verify UAN'));
  const [isEpfoSectionDisabled, setIsEpfoSectionDisabled] = useState(true);
  const loggedInData = useSelector((state) => state.loggedInData);
  const functionSlice = rest.functionSlice || [];
  const uanVerification = useUANVerification({
    userInfo,
    setUserInfo,
    checkFileUpload,
    fileTypeList,
    openUploadDocInfoModel,
    functionSlice,
    ...rest
  });
  useEffect(() => {
    setUAN(userInfo.uanNumber);
  }, [userInfo.uanNumber]);
  // Set epfoButton text based on UAN
  useEffect(() => {
    if (!hasValue(UAN)) {
      setEpfoButton(t('Fetch N Verify UAN'));
    } else {
      setEpfoButton('Auto UAN Verification');
    }
  }, [UAN, t]);
  useEffect(() => {
    if (userInfo?.isAadhaarVarified !== null && userInfo?.isAadhaarVarified === true) {
      setIsEpfoSectionDisabled(false);
    }
  }, [userInfo?.isAadhaarVarified]);

  return (
    <Box sx={{ width: '100%' }}>
      <form ref={formElement}>
        <Grid
          sx={{ paddingLeft: '20px' }}
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 2 }}
        >
          <UANVerification
            t={t}
            stepsList={stepsList}
            UAN={uanVerification.UAN}
            setUAN={uanVerification.setUAN}
            isUanVarified={uanVerification.isUanVarified}
            isUanVerificationProcessManual={uanVerification.isUanVerificationProcessManual}
            handleChangeUanVerification={uanVerification.handleChangeUanVerification}
            handleEpfoButtonClick={uanVerification.handleEpfoButtonClick}
            epfoButton={uanVerification.epfoButton}
            epfostatusMessage={uanVerification.epfostatusMessage}
            uanAadharLink={uanVerification.uanAadharLink}
            isModalOpen={uanVerification.isModalOpen}
            handleOpenModal={uanVerification.handleOpenModal}
            handleCloseModal={uanVerification.handleCloseModal}
            uploadEpfoServiceHistoryFile={uanVerification.uploadEpfoServiceHistoryFile}
            epfoServiceHistoryFile={uanVerification.epfoServiceHistoryFile}
            uploadEpfoPassBookFile={uanVerification.uploadEpfoPassBookFile}
            removeEPFOPassbookFile={uanVerification.removeEPFOPassbookFile}
            epfoPassBookFiles={uanVerification.epfoPassBookFiles}
            handleViewFile={rest.handleViewFile}
            imgAndPdfMaxSize={imgAndPdfMaxSize}
            epfoServiceHistoryFileTypeAlias={epfoServiceHistoryFileTypeAlias}
            epfoPassbookFileTypeAlias={epfoPassbookFileTypeAlias}
            fileUploadSectionContainerStyle={rest.fileUploadSectionContainerStyle}
            lable1CopyStyle={rest.lable1CopyStyle}
            primaryFabStyle={rest.primaryFabStyle}
            responsiveBtnType1Style={rest.responsiveBtnType1Style}
            verificationBtnStyle={rest.verificationBtnStyle}
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
                  {t('Previous')}
                </Button>
                {uanVerification.isUanVerificationProcessManual === 'manual' && (
                  <Button
                    onClick={() => uanVerification.submitDetails(false, true)}
                    sx={submitBtnStyle}
                    variant='contained'
                    color='primary'
                  >
                    {t('Submit')}
                  </Button>
                )}
              </Stack>
            </Grid>
          </GridRow>
        </Grid>
      </form>
    </Box>
  );
};

export default EighthForm;
