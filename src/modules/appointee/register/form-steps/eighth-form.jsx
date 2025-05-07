import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Stack } from '@mui/material';
import GridRow from 'shared/components/grid-container/grid-row';
import { submitBtnStyle } from 'app';
import UANVerification from './verifications/uan-verification';
import useUANVerification from '../hooks/useUANVerification';
import { imgAndPdfMaxSize, epfoServiceHistoryFileTypeAlias, epfoPassbookFileTypeAlias, UANEmptyErrorMsg, UANPatterErrorMsg, aadharVerificationErrorMsg, submitConfirmationMsg, docResubmissionSuccessDialogContentText, registrationSuccessDialogContentText, congratulationDialogContentTitle, toDashboard } from 'shared/constants/constants';
import { hasValue, validationsCheck, removeFile } from 'shared/utils';
import showErrorMessage from 'shared/utils/associate/show-error-message';
import { useTranslation } from 'react-i18next';
import getFileDetails from 'shared/utils/associate/get-file-details';
import { useSelector } from 'react-redux';
import { postAppointeeFileDetails } from 'server/apis';
import { getAppointeeStatusDetails } from 'server/apis/appointee/appointee-workflow/get-appointee-status-details';

const EighthForm = ({
  formElement,
  stepsList,
  handleBack,
  userInfo,
  setUserInfo,
  checkFileUpload,
  openUploadDocInfoModel,
  ...rest
}) => {
  const { t } = useTranslation();
  // Local state for UAN/EPFO
  const [UAN, setUAN] = useState('');
  const [epfoButton, setEpfoButton] = useState(t('Fetch N Verify UAN'));
  // const [epfostatusMessage, setEpfostatusMessage] = useState({});
  // const [epfoPassBookFiles, setEpfoPassBookFiles] = useState([]);
  // const [epfoServiceHistoryFile, setEpfoServiceHistoryFile] = useState();
  // const [isUanVarified, setisUanVarified] = useState(null);
  // const [isUANAvailableState, setIsUANAvailableState] = useState(false);
  // const [uanAadharLink, setUanAadharLink] = useState('');
  // const [uploadedFile, setUploadedFile] = useState([]);
  // const [fileDetails, setFileDetails] = useState([]);
  const [isEpfoSectionDisabled, setIsEpfoSectionDisabled] = useState(true);

  const loggedInData = useSelector((state) => state.loggedInData);
  // const { userId, appointeeId, userCode } = loggedInData[0] || {};
  // const commonHooksFunctionSlice = useSelector((state) => state.commonHooksFunctionSlice);
  // const { navigateTo } = commonHooksFunctionSlice[0];

  // File upload logic
  // const uploadFile = ({ files, uploadTypeAlias, setFileName, _filenameList = [], uploadType = 'single' }) => {
  //   const { error, updatedUploadedFileList, updatedFileDetails, fileNameList } = getFileDetails({
  //     files,
  //     uploadTypeAlias,
  //     setFileName,
  //     _filenameList,
  //     uploadType,
  //     fileTypeList: [], // TODO: Pass fileTypeList here if you have global validation rules
  //     uploadedFile,
  //     fileDetails,
  //   });
  //   if (hasValue(error)) {
  //     showErrorMessage(error);
  //   }
  //   setUploadedFile([...updatedUploadedFileList]);
  //   setFileDetails([...updatedFileDetails]);
  //   setFileName([...fileNameList]);
  // };
  // const handleFileUpload = (fileTypeAlias, setFileName, fileNameList = [], uploadType) => ({ target }) => {
  //   uploadFile({
  //     files: target.files,
  //     uploadTypeAlias: fileTypeAlias,
  //     setFileName,
  //     _filenameList: fileNameList,
  //     uploadType,
  //   });
  // };
  // const uploadEpfoPassBookFile = handleFileUpload(
  //   epfoPassbookFileTypeAlias,
  //   setEpfoPassBookFiles,
  //   epfoPassBookFiles,
  //   'multiple',
  // );
  // const uploadEpfoServiceHistoryFile = handleFileUpload(
  //   epfoServiceHistoryFileTypeAlias,
  //   setEpfoServiceHistoryFile,
  //   epfoServiceHistoryFile,
  //   'single',
  // );
  // const removeEPFOPassbookFile = (currentFileName) => {
  //   const { fileNameList: _fileNameList, updatedUploadedFileList: _updatedUploadedFileList, updatedFileDetails: _updatedFileDetails } = removeFile({
  //     uploadedFile: uploadedFile,
  //     fileDetails: fileDetails,
  //     uploadTypeAlias: epfoPassbookFileTypeAlias,
  //     fileNameList: epfoPassBookFiles,
  //     currentFileName: currentFileName,
  //     uploadType: 'multiple',
  //   });
  //   setEpfoPassBookFiles(_fileNameList);
  //   setUploadedFile(_updatedUploadedFileList);
  //   setFileDetails(_updatedFileDetails);
  // };
  // const hasEPFOPassbookUpload = () => checkFileUpload(epfoPassbookFileTypeAlias);
  // const hasEPFOServiceHistoryUpload = () => checkFileUpload(epfoServiceHistoryFile);
  // Validation logic
  // const checkEPFOPassbookDocCertificateUpload = () => {
  //   const isUploaded = hasEPFOPassbookUpload() || hasValue(epfoPassBookFiles);
  //   if (!isUploaded) showErrorMessage('EPFO Passbook file');
  //   return isUploaded;
  // };
  // const checkEPFOServiceHistoryDocCertificateUpload = () => {
  //   const isUploaded = hasEPFOServiceHistoryUpload() || hasValue(epfoServiceHistoryFile);
  //   if (!isUploaded) showErrorMessage('EPFO Service History file');
  //   return isUploaded;
  // };
  // const checkUANVerificationRequiredDoc = () => {
  //   if (!hasValue(UAN)) {
  //     showErrorMessage(UANEmptyErrorMsg);
  //     return false;
  //   }
  //   if (hasValue(UAN) && !validationsCheck(UAN, 'UAN')) {
  //     showErrorMessage(UANPatterErrorMsg);
  //     return false;
  //   }
  //   if (!checkEPFOServiceHistoryDocCertificateUpload()) {
  //     return false;
  //   }
  //   if (!checkEPFOPassbookDocCertificateUpload()) {
  //     return false;
  //   }
  //   return true;
  // };
  // const checkAadharVerification = () => {
  //   if (!userInfo?.isAadhaarVarified) {
  //     showErrorMessage(aadharVerificationErrorMsg);
  //     return false;
  //   }
  //   return true;
  // };
  // const submitDetails = (autoSubmit, isManual) => {
  //   if (autoSubmit) {
  //     handleAppointeeFormPage2Save({
  //       isUanManualUpload: isManual,
  //       status: 'Verified',
  //     });
  //   } else {
  //     handleAppointeeFormPage3Save();
  //   }
  // };
  // const openSubmitConfirmationModel = () => {
  //   const submitconfModelContent = {
  //     dialogContentText: submitConfirmationMsg,
  //   };
  //   openConfirmationModel(submitconfModelContent, () =>
  //     handleAppointeeFormPage2Save({
  //       isUanManualUpload: true,
  //       status: 'Submitted',
  //     }),
  //   );
  // };
  // const handleAppointeeFormPage3Save = () => {
  //   if (!checkAadharVerification()) {
  //     return;
  //   }
  //   if (!checkUANVerificationRequiredDoc()) {
  //     return;
  //   }
  //   openSubmitConfirmationModel();
  // };
  // UAN verification logic (custom hook)
  const functionSlice = rest.functionSlice || [];
  const {
    openRemarksModel,
    openOtpForm,
    closeOtpForm,
    openOtpSubmitionModel,
    closeOtpSubmitionModel,
    openConfirmationModel,
    openInfoModel,
  } = functionSlice[0] || {};
  // const buildFormData = (payLoad) => {
  //   let formData = new FormData();
  //   for (const property in payLoad) {
  //     if (Object.hasOwnProperty.call(payLoad, property)) {
  //       if (payLoad[property] === '') {
  //         delete payLoad[property];
  //       } else {
  //         if (property === 'fileUploaded') {
  //           formData.append(`${property}`, JSON.stringify(payLoad[property]));
  //         } else if (property === 'fileDetails') {
  //           if (payLoad?.fileDetails?.length > 0) {
  //             payLoad?.fileDetails?.forEach((element, index) => {
  //               formData.append(`${property}`, payLoad[property][index]);
  //             });
  //           }
  //         } else {
  //           formData.append(`${property}`, payLoad[property]);
  //         }
  //       }
  //     }
  //   }
  //   return formData;
  // };
  // const handleAppointeeFormPage2Save = async ({ isUanManualUpload }) => {
  //   let payLoad = {
  //     appointeeId: appointeeId,
  //     appointeeCode: userCode,
  //     isSubmit: true,
  //     userId: userId,
  //     fileDetails: fileDetails,
  //     fileUploaded: uploadedFile,
  //     isManualPassbookUploaded: isUanManualUpload,
  //   };
  //   let formData = buildFormData(payLoad);
  //   const response = await postAppointeeFileDetails(formData);
  //   if (response) {
  //     const updatedAppointeeStatusResponse = await getAppointeeStatusDetails(appointeeId);
  //     const registrationSuccessContent = {
  //       dialogContentText:
  //         isUanManualUpload === true
  //           ? docResubmissionSuccessDialogContentText
  //           : registrationSuccessDialogContentText,
  //       dialogTitle: congratulationDialogContentTitle,
  //       maxWidth: 'sm',
  //       btnName: 'Go to Dashboard',
  //     };
  //     openInfoModel(registrationSuccessContent, () => navigateTo(toDashboard));
  //   }
  // };

  const uanVerification = useUANVerification({
    userInfo,
    setUserInfo,
    checkFileUpload,
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
