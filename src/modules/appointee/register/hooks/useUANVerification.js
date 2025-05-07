import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import showErrorMessage from 'shared/utils/associate/show-error-message';
import showSuccessMessage from 'shared/utils/associate/show-success-message';
import { generateUANOtp, getUANNumber } from 'server/apis';
import { submitUANOTP } from 'server/apis/verify/submit-uan-otp';
import removeExtraSpaces from 'shared/utils/associate/remove-extra-spaces';
import generateRemarks from 'shared/utils/associate/generate-remarks';
import VerificationStatus from 'shared/components/verification/verification-status';
import { hasValue, validationsCheck, removeFile } from 'shared/utils';
import { storeCurrentPageNo } from 'store/slices/candidate-page-slice';
import { NA, fetchUanConfirmationtMsg, UANPatterErrorMsg, generateOtpRety, generateOtpSucces, uanVerifySuccessMsg, uanVerifyFailedMsg, UANEmptyErrorMsg, aadharVerificationErrorMsg, submitConfirmationMsg, docResubmissionSuccessDialogContentText, registrationSuccessDialogContentText, congratulationDialogContentTitle, toDashboard, epfoServiceHistoryFileTypeAlias, epfoPassbookFileTypeAlias } from 'shared/constants/constants';
import { postAppointeeFileDetails } from 'server/apis';
import { getAppointeeStatusDetails } from 'server/apis/appointee/appointee-workflow/get-appointee-status-details';
import getFileDetails from 'shared/utils/associate/get-file-details';
import { Typography } from '@mui/material';
import { subHeadingContentTextStyle } from 'app';
import UANPrerequisiteInformation from '../uan-prerequiestic-info';
import { useTranslation } from 'react-i18next';

export default function useUANVerification({
  userInfo,
  setUserInfo,
  checkFileUpload,
  openUploadDocInfoModel,
  functionSlice,
  fileTypeList,
  ...rest
}) {
  const { t } = useTranslation();
  const [UAN, setUAN] = useState('');
  const [epfoButton, setEpfoButton] = useState('Fetch N Verify UAN');
  const [epfostatusMessage, setEpfostatusMessage] = useState(new VerificationStatus(null, ''));
  const [epfoPassBookFiles, setEpfoPassBookFiles] = useState([]);
  const [epfoServiceHistoryFile, setEpfoServiceHistoryFile] = useState();
  const [isUanVarified, setisUanVarified] = useState(null);
  const [isUanVerificationProcessManual, setIsUanVerificationProcessManual] = useState('auto');
  const [isUANAvailableState, setIsUANAvailableState] = useState(false);
  const [uanAadharLink, setUanAadharLink] = useState(NA);
  const [uploadedFile, setUploadedFile] = useState([]);
  const [fileDetails, setFileDetails] = useState([]);
  const [isEpfoSectionDisabled, setIsEpfoSectionDisabled] = useState(true);
  const [timeoutTimer, setTimeoutTimer] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loggedInData = useSelector((state) => state.loggedInData);
  const { userId, appointeeId, userCode } = loggedInData[0] || {};
  const commonHooksFunctionSlice = useSelector((state) => state.commonHooksFunctionSlice);
  const { navigateTo } = commonHooksFunctionSlice[0];
  const dispatch = useDispatch();
  // const functionSlice = useSelector((state) => state.functionSlice);
  const {
    openRemarksModel,
    openConfirmationModel,
    openInfoModel,
    openOtpForm,
    closeOtpForm,
    openOtpSubmitionModel,
    closeOtpSubmitionModel,
  } = functionSlice[0];

  useEffect(() => {
    if (!hasValue(UAN)) {
      setEpfoButton(t('Fetch N Verify UAN'));
    } else {
      setEpfoButton('Auto UAN Verification');
    }
  }, [UAN, t]);

  const uploadFile = ({ files, uploadTypeAlias, setFileName, _filenameList = [], uploadType = 'single' }) => {
    const { error, updatedUploadedFileList, updatedFileDetails, fileNameList } = getFileDetails({
      files,
      uploadTypeAlias,
      setFileName,
      _filenameList,
      uploadType,
      fileTypeList: fileTypeList,
      uploadedFile,
      fileDetails,
    });
    if (hasValue(error)) {
      showErrorMessage(error);
    }
    setUploadedFile([...updatedUploadedFileList]);
    setFileDetails([...updatedFileDetails]);
    setFileName([...fileNameList]);
  };

   const handleFileUpload = (fileTypeAlias, setFileName, fileNameList = [], uploadType) => ({ target }) => {
    uploadFile({
       files: target.files,
       uploadTypeAlias: fileTypeAlias,
       setFileName,
     _filenameList: fileNameList,
      uploadType,
     });
   };

  const uploadEpfoPassBookFile = handleFileUpload(epfoPassbookFileTypeAlias, setEpfoPassBookFiles, epfoPassBookFiles, 'multiple');
  const uploadEpfoServiceHistoryFile = handleFileUpload(epfoServiceHistoryFileTypeAlias, setEpfoServiceHistoryFile, epfoServiceHistoryFile, 'single');

  const removeEPFOPassbookFile = (currentFileName) => {
    const { fileNameList: _fileNameList, updatedUploadedFileList: _updatedUploadedFileList, updatedFileDetails: _updatedFileDetails } = removeFile({
      uploadedFile: uploadedFile,
      fileDetails: fileDetails,
      uploadTypeAlias: epfoPassbookFileTypeAlias,
      fileNameList: epfoPassBookFiles,
      currentFileName: currentFileName,
      uploadType: 'multiple',
    });
    setEpfoPassBookFiles(_fileNameList);
    setUploadedFile(_updatedUploadedFileList);
    setFileDetails(_updatedFileDetails);
  };

  const hasEPFOPassbookUpload = () => checkFileUpload(epfoPassbookFileTypeAlias);
  const hasEPFOServiceHistoryUpload = () => checkFileUpload(epfoServiceHistoryFile);

  const checkEPFOPassbookDocCertificateUpload = () => {
    const isUploaded = hasEPFOPassbookUpload() || hasValue(epfoPassBookFiles);
    if (!isUploaded) showErrorMessage('EPFO Passbook file');
    return isUploaded;
  };

  const checkEPFOServiceHistoryDocCertificateUpload = () => {
    const isUploaded = hasEPFOServiceHistoryUpload() || hasValue(epfoServiceHistoryFile);
    if (!isUploaded) showErrorMessage('EPFO Service History file');
    return isUploaded;
  };

  const checkUANVerificationRequiredDoc = () => {
    if (!hasValue(UAN)) {
      showErrorMessage(UANEmptyErrorMsg);
      return false;
    }
    if (hasValue(UAN) && !validationsCheck(UAN, 'UAN')) {
      showErrorMessage(UANPatterErrorMsg);
      return false;
    }
    if (!checkEPFOServiceHistoryDocCertificateUpload()) {
      return false;
    }
    if (!checkEPFOPassbookDocCertificateUpload()) {
      return false;
    }
    return true;
  };

  const checkAadharVerification = () => {
    if (!userInfo?.isAadhaarVarified) {
      showErrorMessage(aadharVerificationErrorMsg);
      return false;
    }
    return true;
  };

  const buildFormData = (payLoad) => {
    let formData = new FormData();
    for (const property in payLoad) {
      if (Object.hasOwnProperty.call(payLoad, property)) {
        if (payLoad[property] === '') {
          delete payLoad[property];
        } else {
          if (property === 'fileUploaded') {
            formData.append(`${property}`, JSON.stringify(payLoad[property]));
          } else if (property === 'fileDetails') {
            if (payLoad?.fileDetails?.length > 0) {
              payLoad?.fileDetails?.forEach((element, index) => {
                formData.append(`${property}`, payLoad[property][index]);
              });
            }
          } else {
            formData.append(`${property}`, payLoad[property]);
          }
        }
      }
    }
    return formData;
  };

  const handleAppointeeFormPage2Save = async ({ isUanManualUpload }) => {
    let payLoad = {
      appointeeId: appointeeId,
      appointeeCode: userCode,
      isSubmit: true,
      userId: userId,
      fileDetails: fileDetails,
      fileUploaded: uploadedFile,
      isManualPassbookUploaded: isUanManualUpload,
    };
    let formData = buildFormData(payLoad);
    const response = await postAppointeeFileDetails(formData);
    if (response) {
      const updatedAppointeeStatusResponse = await getAppointeeStatusDetails(appointeeId);
      const registrationSuccessContent = {
        dialogContentText:
          isUanManualUpload === true
            ? docResubmissionSuccessDialogContentText
            : registrationSuccessDialogContentText,
        dialogTitle: congratulationDialogContentTitle,
        maxWidth: 'sm',
        btnName: 'Go to Dashboard',
      };
      openInfoModel(registrationSuccessContent, () => navigateTo(toDashboard));
    }
  };

  const openSubmitConfirmationModel = () => {
    const submitconfModelContent = {
      dialogContentText: submitConfirmationMsg,
    };
    openConfirmationModel(submitconfModelContent, () =>
      handleAppointeeFormPage2Save({
        isUanManualUpload: true,
        status: 'Submitted',
      }),
    );
  };

  const handleAppointeeFormPage3Save = () => {
    if (!checkAadharVerification()) {
      return;
    }
    if (!checkUANVerificationRequiredDoc()) {
      return;
    }
    openSubmitConfirmationModel();
  };

  const submitDetails = (autoSubmit, isManual) => {
    if (autoSubmit) {
      handleAppointeeFormPage2Save({
        isUanManualUpload: isManual,
        status: 'Verified',
      });
    } else {
      handleAppointeeFormPage3Save();
    }
  };

  const handleGetUANNumber = async () => {
    const payLoad = {
      aaddharNumber: userInfo.aadhar,
      appointeeId,
      panNumber: userInfo.pan,
      mobileNumber: hasValue(userInfo.mobileNo)
        ? removeExtraSpaces(userInfo.mobileNo)
        : null,
      userId,
    };
    const response = await getUANNumber(payLoad);
    if (response) {
      const { isUanAvailable, uanNumber, remarks } = response.responseInfo;
      setUserInfo((prevState) => ({
        ...prevState,
        isUanAvailable: isUanAvailable,
      }));
      if (uanNumber) {
        setUAN(uanNumber);
        generateUANOTPDialog(uanNumber, userInfo.mobileNo);
      } else if (isUANAvailableState === false && !isUanAvailable && !hasValue(uanNumber)) {
        setUAN(null);
        setisUanVarified(true);
      } else {
        showErrorMessage(remarks);
      }
      setEpfostatusMessage(epfostatusMessage);
    }
  };

  const handleChangeUanVerification = ({ target }) => {
    const value = target.value;
    setIsUanVerificationProcessManual(value);
    if (value === 'manual') {
      const prerequisiteModelContent = {
        dialogTitle: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography>Prerequisite Informatiton for mannual upload</Typography>
          </div>
        ),
        dialogContentText: (
          <>
            <Typography sx={subHeadingContentTextStyle}>
              Before verification there are some prerequisites, thats needs to be done...
            </Typography>
            <Typography> </Typography>
          </>
        ),
        dialogContentComponent: <UANPrerequisiteInformation />,
        fullWidth: false,
      };
      openInfoModel(prerequisiteModelContent);
    }
  };

  const handleEpfoButtonClick = () => {
    if (!hasValue(UAN)) {
      if (!userInfo.isAadhaarVarified || !userInfo.isPanVarified) {
        const confirmationModelContent = {
          dialogContentText: fetchUanConfirmationtMsg,
        };
        openConfirmationModel(confirmationModelContent, handleGetUANNumber);
      } else {
        handleGetUANNumber();
      }
    } else if (hasValue(UAN) && !validationsCheck(UAN, 'UAN')) {
      showErrorMessage(UANPatterErrorMsg);
    } else handleEpfoVerifiaction();
  };

  const handleEpfoVerifiaction = () => {
    const mobileNumber = hasValue(userInfo.mobileNo)
      ? removeExtraSpaces(userInfo.mobileNo)
      : null;
    openOtpForm(
      UAN,
      mobileNumber,
      'UAN Number',
      () => validateUANOtp(UAN, mobileNumber),
      'Generate OTP for PF Verification',
    );
  };

  const generateUANOTPDialog = (UAN, mobileNo) => {
    setEpfoButton('Auto UAN Verification');
    epfostatusMessage.message = NA;
    epfostatusMessage.success = null;
    setEpfostatusMessage(epfostatusMessage);
    const mobileNumber = hasValue(mobileNo) ? removeExtraSpaces(mobileNo) : null;
    openOtpForm(
      UAN,
      mobileNumber,
      'UAN Number',
      () => validateUANOtp(UAN, mobileNumber),
      'Generate OTP for PF Verification',
    );
  };

  const validateUANOtp = async (uanNumber, mobileNumber) => {
    const payLoad = {
      uanNumber,
      mobileNumber,
      appointeeId,
      userId,
    };
    const response = await generateUANOtp(payLoad);
    if (response) {
      const { responseInfo } = response;
      let { otpSent, clientId } = responseInfo;
      if (!otpSent) {
        showErrorMessage(generateOtpRety);
      } else {
        initialTimeOfOtpTimer();
        showSuccessMessage(generateOtpSucces);
        closeOtpForm();
        openOtpSubmitionModel({
          otpSubmitionFunction: (otp) => verifyUAN(otp, clientId),
          timeoutTimer: timeoutTimer,
          setTimeoutTimer: setTimeoutTimer,
        });
      }
    }
  };

  const initialTimeOfOtpTimer = () => {
    setTimeoutTimer(10 * 60);
  };

  const verifyUAN = async (otp, clientId) => {
    const payLoad = {
      appointeeId: appointeeId,
      otp: otp,
      clientId: clientId,
      userId: userId,
      appointeeCode: userCode,
    };
    const response = await submitUANOTP(payLoad);
    if (response) {
      const { remarks, isVarified } = response.responseInfo;
      if (isVarified) {
        showSuccessMessage(uanVerifySuccessMsg);
        setisUanVarified(true);
      } else {
        showErrorMessage(uanVerifyFailedMsg);
        if (hasValue(remarks)) {
          const generatedRemarks = generateRemarks(remarks);
          openRemarksModel(generatedRemarks);
        }
      }
      setUserInfo((prevState) => ({
        ...prevState,
        isUanVarified: isVarified,
      }));
      closeOtpSubmitionModel();
      setEpfostatusMessage(new VerificationStatus(isVarified, 'V'));
    }
  };

  useEffect(() => {
    setUAN(userInfo.uanNumber);
    setUanAadharLink(userInfo?.isUanLinkWithAadhar ?? NA);
  }, [userInfo.uanNumber, userInfo?.isUanLinkWithAadhar]);

  useEffect(() => {
    if (userInfo?.isAadhaarVarified !== null && userInfo?.isAadhaarVarified === true) {
      setIsEpfoSectionDisabled(false);
    }
  }, [userInfo?.isAadhaarVarified]);
  useEffect(() => {
    // if (isAadhaarVarified === true && isUanVarified !== null) {
    // }
    // if (isPanVarified) {
    //   setDisabledPanInput(true);
    // }
    // if (isAadhaarVarified !== null && isAadhaarVarified === true) {
    //   setIsEpfoSectionDisabled(false);
    // }
    // if (isAadhaarVarified !== null) {
    // }
    // if (isAadhaarVarified) {
    //   setDisabledAadharInput(true);
    // }
    if (userInfo?.isSubmit === false) {
      if (userInfo?.isAadhaarVarified && isUanVarified) {
        submitDetails(true, false);
      }
    }
  }, [userInfo?.isAadhaarVarified, isUanVarified]);
  return {
    UAN,
    setUAN,
    epfoButton,
    setEpfoButton,
    epfostatusMessage,
    setEpfostatusMessage,
    epfoPassBookFiles,
    setEpfoPassBookFiles,
    epfoServiceHistoryFile,
    setEpfoServiceHistoryFile,
    isUanVarified,
    setisUanVarified,
    isUanVerificationProcessManual,
    setIsUanVerificationProcessManual,
    isUANAvailableState,
    setIsUANAvailableState,
    uanAadharLink,
    setUanAadharLink,
    uploadedFile,
    setUploadedFile,
    fileDetails,
    setFileDetails,
    isEpfoSectionDisabled,
    uploadEpfoPassBookFile,
    uploadEpfoServiceHistoryFile,
    removeEPFOPassbookFile,
    submitDetails,
    handleChangeUanVerification,
    handleEpfoButtonClick,
    handleOpenModal: () => setIsModalOpen(true),
    handleCloseModal: () => setIsModalOpen(false),
    isModalOpen,
    handleViewFile: rest.handleViewFile,
    timeoutTimer,
    setTimeoutTimer,
    setCurrentPageNo: (currentPageNo) => dispatch(storeCurrentPageNo(currentPageNo)),
    handleGetUANNumber,
  };
} 