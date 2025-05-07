import { Box, Typography } from '@mui/material';
import { heading2, subHeadingContentTextStyle } from 'app';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  stepperDefaultList,
  trustEpfoFileTypeAlias,
  imageFileTypeAlias,
  epfoPassbookFileTypeAlias,
  UANEmptyErrorMsg,
  aadharVerificationErrorMsg,
  passportFilePatternErrorMsg,
  epfoServiceHistoryFileTypeAlias,
  UANPatterErrorMsg,
  docResubmissionSuccessDialogContentText,
} from 'shared/constants/constants';
import {
  CreateStepSequience,
  DateFormatYYYYMMDD,
  hasValue,
  removeFile,
  setLocalStorageItem,
  validationsCheck,
} from 'shared/utils';
import {
  congratulationDialogContentTitle,
  passportSuccessMsg,
  passportVerifyFailedMsg,
  registrationSuccessDialogContentText,
  submitConfirmationMsg,
  toDashboard,
} from 'shared/constants/constants';
import { useTranslation } from 'react-i18next';
import VerificationStatus from '../../../shared/components/verification/verification-status';
import uploadFileMessage from 'shared/utils/associate/upload-file-message';
import UANPrerequisiteInformation from './uan-prerequiestic-info';
import getFileDetails from 'shared/utils/associate/get-file-details';
import LinearStepper from 'shared/components/Stepper/linear-stepper';
import FormContainer from 'shared/components/grid-container/form-container';
import FirstForm from './form-steps/first-form';
import SecondForm from './form-steps/second-form';
import FourthForm from './form-steps/fourth-form';
import FifthForm from './form-steps/fifth-form';
import SixthForm from './form-steps/sixth-form';
import SeventhForm from './form-steps/seventh-form';
import EighthForm from './form-steps/eighth-form';
import ThirdForm from './form-steps/third-form';

import {
  getAppointeeDetails,
  getPassportDetails,
  getUploadedFileDetailsById,
  postAppointeeFileDetails,
} from 'server/apis';
import showSuccessMessage from 'shared/utils/associate/show-success-message';
import showErrorMessage from 'shared/utils/associate/show-error-message';
import { storeCurrentPageNo } from 'store/slices/candidate-page-slice';

import {
  removeAppointeeStatusDetailsData,
  storeAppointeeStatusDetailsData,
} from 'store/slices/appointee-status-details-slice';
import { getAppointeeStatusDetails } from 'server/apis/appointee/appointee-workflow/get-appointee-status-details';

import usePersonalDetails from './hooks/usePersonalDetails';
import useVerificationStatus from './hooks/useVerificationStatus';
import useFileUploads from './hooks/useFileUploads';

const AppointeeRegisterForm = () => {
  const steps = [
    'Step 1',
    'Step 2',
    'Step 3',
    'Step 4',
    'Step 5',
    'Step 6',
    'Step 7',
    'Final Step',
  ];
  const [activeStep, setActiveStep] = useState(0);
  const dropdownList = useSelector((state) => state.dropdownList);
  const apiSlice = useSelector((state) => state.apiSlice);
  const loggedInData = useSelector((state) => state.loggedInData);
  const { t } = useTranslation();
  const commonHooksFunctionSlice = useSelector((state) => state.commonHooksFunctionSlice);
  const functionSlice = useSelector((state) => state.functionSlice);
  const { openDocumentModel, openUploadedDocumentModal } = functionSlice[0];
  const {
    openRemarksModel,
    openConfirmationModel,
    openInfoModel,
  } = functionSlice[0];
  const { countryList, nationalityList, fileTypeList } =
    dropdownList && dropdownList.length > 0 && dropdownList[0];
  const {} = apiSlice[0];
  const { navigateTo } = commonHooksFunctionSlice[0];
  const { userId, appointeeId, userCode } = loggedInData[0];
  const currentPageNo = useSelector((state) => state.CandidatePageSlice.currentPageNo);
  const setCurrentPageNo = (currentPageNo) => {
    dispatch(storeCurrentPageNo(currentPageNo));
  };
  const [companyId, setCompanyId] = useState(0);
  const [defaultCountry, setDefaultCountry] = useState();
  const [passportFileNumber, setPassportFileNumber] = useState('');
  const [passportFileNumberError, setPassportFileNumberError] = useState(false);
  const [UAN, setUAN] = useState('');
  // const [memberName, setMemberName] = useState('');
  // const [dateOfBirth, setDateOfBirth] = useState('');
  // const [dateOfJoining, setDateOfJoining] = useState('');
  // const [gender, setGender] = useState('');
  // const [appointeeName, setAppointeeName] = useState('');
  // const [fathersOrHusbandName, setFathersOrHusbandName] = useState('');
  // const [relationshipWithMember, setRelationshipWithMember] = useState('');
  // const [mobileNo, setMobileNo] = useState(null);
  // const [email, setEmail] = useState(null);
  // const [nationality, setNationality] = useState('');
  // const [EPFWages, setEPFWages] = useState(null);
  // const [qualification, setQualification] = useState(' ');
  // const [maritalStatus, setMaritalStatus] = useState(' ');
  // const [isInterNationalWorker, setisInterNationalWorker] = useState('N');
  const [disabledIsInterNationalWorker, setDisabledIsInterNationalWorker] = useState(false);
  const [passportAvailable, setPassportAvailable] = useState(null);
  const [countryOfOrigin, setCountryOfOrigin] = useState('');
  const [passportNo, setPassportNo] = useState(null);
  const [isPhysicallyHandicap, setIsPhysicallyHandicap] = useState('');
  // const [handicapType, setHandicapType] = useState('');
  // const [pan, setPan] = useState(null);
  // const [drivingLicense, setDrivingLicense] = useState(null);
  // const [firDetails, setFIRDetails] = useState(null);
  // const [nameAsOnPan, setNameAsOnPan] = useState(null);
  // const [aadhar, setAadhar] = useState(null);
  // const [aadharShareCode, setAadharShareCode] = useState(null);
  // const [fetchUanConfirmation, setFetchUanConfirmation] = useState(false);
  // const [appointeeDetailsId, setAppointeeDetailsId] = useState(0);
  // const [candidteId, setCandidteId] = useState(null);
  const [isAppointeeUanAvailable, setIsAppointeeUanAvailable] = useState(null);
  const [passportNoMaxLength, setPassportNoMaxLength] = useState(null);
  // const [showAdditionalSection, setShowAdditionalSection] = useState(false);
  // const [isPANModalOpen, setIsPANModalOpen] = useState(false);
  const [isUANAvailableState, setIsUANAvailableState] = useState(false);
  // const [isPANAvailable, setIsPANAvailable] = useState(true);
  // const [isLicenseAvailable, setIsLicenseAvailable] = useState(true);
  // const [isDLAvailable, setIsDLAvailable] = useState(true);
  const [isPassportAvailable, setIsPassportAvailable] = useState(false);
   const [epfostatusMessage, setEpfostatusMessage] = useState(new VerificationStatus());
  const [passportstatusMessage, setPassportStatusMessage] = useState(new VerificationStatus());
  // const [panstatusMessage, setPANStatusMessage] = useState(new VerificationStatus());
  // const [bankstatusMessage, setBankStatusMessage] = useState(new VerificationStatus());
  // const [firstatusMessage, setFIRStatusMessage] = useState(new VerificationStatus());
  // const [licensestatusMessage, setLicenseStatusMessage] = useState(new VerificationStatus());
  const [isAadhaarVarified, setisAadhaarVarified] = useState(false);
  const [isPanVarified, setIsPanVarified] = useState(null);
  // const [isBankVarified, setIsBankVarified] = useState(null);
  const [isPassportVarified, setIsPassportVarified] = useState(false);
  // const [isPoliceVarified, setisPoliceVarified] = useState(null);
  const [isUanVarified, setisUanVarified] = useState(null);
  const [epfoButton, setEpfoButton] = useState(null);
  const [disabledAadharInput, setDisabledAadharInput] = useState(false);
  const [disabledPanInput, setDisabledPanInput] = useState(false);
  const [isEpfoSectionDisabled, setIsEpfoSectionDisabled] = useState(true);
  const [isPassportVerifyBtnDisabled, setIsPassportVerifyBtnDisabled] = useState(false);
  const [uploadedFile, setUploadedFile] = useState([]);
  // const [xmlFileUploaded, setXmlFileUploaded] = useState();
  const [fileDetails, setFileDetails] = useState([]);
  const [trustEpfoFileName, setTrustEpfoFileName] = useState([]);
  const [epfoPassBookFiles, setEpfoPassBookFiles] = useState([]);
  const [epfoServiceHistoryFile, setEpfoServiceHistoryFile] = useState();
  const [imageFileName, setImageFileName] = useState([]);
  // const [accountNumber, setAccountNumber] = useState(null);
  // const [IFSCCode, setIFSCCode] = useState(null);
  const [isRelationShipWithMemberDisabled, setIsRelationShipWithMemberDisabled] = useState(false);
  const [isSubmit, setIsSubmit] = useState();
  // const [companyName, setCompanyName] = useState();
  // const [timeoutTimer, setTimeoutTimer] = useState();
  const [fileUploaded, setFileUploaded] = useState();
  // const [isNextVisible, setIsNextVisible] = useState(false);
  const [isthirdNextVisible, setIsThirdNextVisible] = useState(false);
  const [isDraft, setIsDraft] = useState(true);
  const [uanAadharLink, setUanAadharLink] = useState('');
  const [stepsList, setStepsList] = useState(() => stepperDefaultList(t));
  const [isUanVerificationProcessManual, setIsUanVerificationProcessManual] = useState('auto');
  // const [panNumberError, setPanNumberError] = useState(false);
  // const [isPFverificationReq, setIsPFverificationReq] = useState();
  // const [panNumber, setPanNumber] = useState();
  // const [isPensionApplicable, setIsPensionApplicable] = useState();
  const [isPreviousSectionDisabled, setIsPreviousSectionDisabled] = useState(false);

  const stepCounter = 3;
  const [personalDetails, updatePersonalDetail, setPersonalDetails] = usePersonalDetails({
    appointeeName: '',
    mobileNo: '',
    email: '',
    gender: '',
    dateOfBirth: '',
    memberName: '',
    memberRelation: '',
    nationality: '',
    qualification: '',
    maratialStatus: '',
    isPassportAvailable: '',
    isInternationalWorker: '',
    originCountry: '',
    passportNo: '',
    passportValidFrom: '',
    passportValidTill: '',
    isHandicap: '',
    uanNumber: '',
    dateOfJoining: '',
    epfWages: '',
    handicapeType: '',
    isPFverificationReq: '',
    panName: '',
    panNumber: '',
    isAadhaarVarified: '',
    isPensionApplicable: '',
    isUanVarified: '',
    isDLAvailable: '',
    drivingLicense: '',
    firDetails: '',
    isPanAvailable: '',
    isPanVarified: '',
  });
  const [verificationStatus, updateVerificationStatus, setVerificationStatus] = useVerificationStatus();
  const [fileUploads, updateFileUpload, setFileUploads] = useFileUploads();
  const clearFileVaribles = (fileTypeAlias, setFileName, fileNameList) => {
    if (!fileDetails?.length) return;
    const filesToRemove = uploadedFile.filter(
      ({ uploadTypeAlias, uploadDetailsId }) =>
        uploadTypeAlias === fileTypeAlias && uploadDetailsId === 0,
    );
    const updatedUploadedFiles = uploadedFile.filter(
      ({ uploadTypeAlias, uploadDetailsId }) =>
        uploadTypeAlias !== fileTypeAlias || uploadDetailsId !== 0,
    );
    const removeDetailsList = fileDetails.filter(({ name, size }) =>
      filesToRemove.some(({ fileName, fileLength }) => fileName === name && fileLength === size),
    );
    const updatedFileDetails = fileDetails.filter(
      ({ name, size }) =>
        !removeDetailsList.some((removed) => removed.name === name && removed.size === size),
    );
    const removedNames = removeDetailsList?.map(({ name }) => name);
    const updatedFileNameList = fileNameList?.filter((name) => !removedNames.includes(name));
    setUploadedFile(updatedUploadedFiles);
    setFileDetails(updatedFileDetails);
    setFileName(updatedFileNameList);
  };
  const disablePassportVerifyBtn = () => {
    setIsPassportVerifyBtnDisabled(true);
  };
  const setAppointeeDetailsOptimized = async (appointeeIdFromSession) => {
    const response = await getAppointeeDetails(appointeeIdFromSession);
      const {
      appointeeDetailsId: sessionAppointeeDetailsId,
      appointeeId: sessionAppointeeId,
      candidateId: sessionCandidateId,
      userCode: sessionUserCode,
      companyId: sessionCompanyId,
    } = loggedInData[0] || {};
    const companyIdValue = companyId || sessionCompanyId;
    if (response && response.responseInfo) {
      setPersonalDetails(prev => ({
        ...prev,
        ...response.responseInfo,
        appointeeDetailsId: sessionAppointeeDetailsId || response.responseInfo.appointeeDetailsId,
        appointeeId: sessionAppointeeId || response.responseInfo.appointeeId,
        candidateId: sessionCandidateId || response.responseInfo.candidateId,
        appointeeCode: sessionUserCode || response.responseInfo.appointeeCode,
        companyId: companyIdValue || response.responseInfo.companyId,
      }));
      setCurrentPageNo(response.responseInfo.saveStep+1);
      setActiveStep(response.responseInfo.saveStep);
      setisAadhaarVarified(response.responseInfo.isAadhaarVarified)
    }
  };
  console.log('isPassportAvailable',personalDetails.isPassportAvailable,isPhysicallyHandicap)
  useEffect(() => {
    updateStep({});
  }, [t, stepCounter, isPhysicallyHandicap, personalDetails.isPassportAvailable]);
  const updateStep = (param) => {
    const _steps = CreateStepSequience({
      ...param,
      stepCounter,
      t,
      isHandicap: isPhysicallyHandicap,
      isPassportAvailable: personalDetails.isPassportAvailable,
    });
    setStepsList((prevSteps) => ({ ...prevSteps, ..._steps }));
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
  const checkFileUpload = (fileTypeAlias) => {
    const uploadTypeAlias =
      uploadedFile && uploadedFile.find(({ uploadTypeAlias }) => uploadTypeAlias === fileTypeAlias);
    return hasValue(uploadTypeAlias);
  };

 
  const hasEPFOPassbookUpload = () => checkFileUpload(epfoPassbookFileTypeAlias);
  const hasEPFOServiceHistoryUpload = () => checkFileUpload(epfoServiceHistoryFile);
  const openUploadDocInfoModel = (dialogContentText) => {
    openInfoModel({ dialogContentText });
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
  useEffect(() => {
    localStorage.setItem('activeStep', activeStep);
  }, [activeStep]);
  useEffect(() => {
    if (countryList !== undefined) {
      const defaultCountry =
        countryList && countryList?.find(({ name }) => name?.toUpperCase() === 'INDIA')?.name;
      setDefaultCountry(defaultCountry);
      setAppointeeDetailsOptimized(appointeeId);
    }
  }, [countryList]);
  useEffect(() => {
    if (!hasValue(UAN)) {
      setEpfoButton(t('Fetch N Verify UAN'));
    } else {
      setEpfoButton('Auto UAN Verification');
    }
  }, [UAN, t]);

  useEffect(() => {
    if (isAadhaarVarified === true && isUanVarified !== null) {
    }
    if (isPanVarified) {
      setDisabledPanInput(true);
    }
    if (isAadhaarVarified !== null && isAadhaarVarified === true) {
      setIsEpfoSectionDisabled(false);
    }
    if (isAadhaarVarified !== null) {
    }
    if (isAadhaarVarified) {
      setDisabledAadharInput(true);
    }
    if (isSubmit === false) {
      if (isAadhaarVarified && isUanVarified) {
        submitDetails(true, false);
      }
    }
  }, [isAadhaarVarified, isUanVarified]);
  useEffect(() => {
    if (personalDetails.gender === 'M') {
      setPersonalDetails({ ...personalDetails, memberRelation: 'F' });
      setIsRelationShipWithMemberDisabled(true);
    } else {
      setIsRelationShipWithMemberDisabled(false);
    }
  }, [personalDetails.gender]);
  useEffect(() => {
    if (personalDetails.isPassportAvailable === 'Y') {
      const nationalityLower = personalDetails.nationality?.toLowerCase();
      setCountryOfOriginBasedOnNationality(nationalityLower);
    }
  }, [personalDetails.nationality, personalDetails.isPassportAvailable]);
  useEffect(() => {
    if (isUanVerificationProcessManual === 'auto') {
      clearFileVaribles(epfoPassbookFileTypeAlias, setEpfoPassBookFiles, epfoPassBookFiles);
      clearFileVaribles(
        epfoServiceHistoryFileTypeAlias,
        setEpfoServiceHistoryFile,
        epfoServiceHistoryFile,
      );
    }
    setUploadedFile([]);
    setFileDetails([]);
  }, [isUanVerificationProcessManual]);
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
  const uploadFile = ({
    files,
    uploadTypeAlias,
    setFileName,
    _filenameList = [],
    uploadType = 'single',
  }) => {
    const { error, updatedUploadedFileList, updatedFileDetails, fileNameList } = getFileDetails({
      files,
      uploadTypeAlias,
      setFileName,
      _filenameList,
      uploadType,
      fileTypeList,
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
  const removeEPFOPassbookFile = (currentFileName) => {
    const {
      fileNameList: _fileNameList,
      updatedUploadedFileList: _updatedUploadedFileList,
      updatedFileDetails: _updatedFileDetails,
    } = removeFile({
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
  const removeEPFOFile = (currentFileName) => {
    const {
      fileNameList: _fileNameList,
      updatedUploadedFileList: _updatedUploadedFileList,
      updatedFileDetails: _updatedFileDetails,
    } = removeFile({
      uploadedFile: uploadedFile,
      fileDetails: fileDetails,
      uploadTypeAlias: trustEpfoFileTypeAlias,
      fileNameList: trustEpfoFileName,
      currentFileName: currentFileName,
      uploadType: 'multiple',
    });
    setTrustEpfoFileName(_fileNameList);
    setUploadedFile(_updatedUploadedFileList);
    setFileDetails(_updatedFileDetails);
  };
  const handleFileUpload =
    (fileTypeAlias, setFileName, fileNameList = [], uploadType) =>
    ({ target }) => {
      uploadFile({
        files: target.files,
        uploadTypeAlias: fileTypeAlias,
        setFileName,
        _filenameList: fileNameList,
        uploadType,
      });
    };
  
  
  const uploadEpfoPassBookFile = handleFileUpload(
    epfoPassbookFileTypeAlias,
    setEpfoPassBookFiles,
    epfoPassBookFiles,
    'multiple',
  );
  const uploadEpfoServiceHistoryFile = handleFileUpload(
    epfoServiceHistoryFileTypeAlias,
    setEpfoServiceHistoryFile,
    epfoServiceHistoryFile,
    'single',
  );
  
  const uploadImageFile = handleFileUpload(imageFileTypeAlias, setImageFileName);

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
      setCurrentPageNo(currentPageNo - 1);
    }
  };
 
  const checkEPFOPassbookDocCertificateUpload = () => {
    const isUploaded = hasEPFOPassbookUpload() || hasValue(epfoPassBookFiles);
    if (!isUploaded) showUploadMessage('EPFO Passbook file');
    return isUploaded;
  };
  const checkEPFOServiceHistoryDocCertificateUpload = () => {
    const isUploaded = hasEPFOServiceHistoryUpload() || hasValue(epfoServiceHistoryFile);
    if (!isUploaded) showUploadMessage('EPFO Service History file');
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
    if (isAadhaarVarified !== true) {
      showErrorMessage(aadharVerificationErrorMsg);
      return false;
    }
    return true;
  };
  const showUploadMessage = (docType) => {
    let dialogContentText = (
      <Typography>{uploadFileMessage(docType)}, then save the details</Typography>
    );
    openUploadDocInfoModel(dialogContentText);
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
  const dispatch = useDispatch();
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
      setLocalStorageItem('candidate-status-details', updatedAppointeeStatusResponse?.responseInfo);
      dispatch(removeAppointeeStatusDetailsData());
      dispatch(storeAppointeeStatusDetailsData(updatedAppointeeStatusResponse?.responseInfo));
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
  const handleAppointeeFormPage3Save = () => {
    if (!checkAadharVerification()) {
      return;
    }
    if (!checkUANVerificationRequiredDoc()) {
      return;
    }
    openSubmitConfirmationModel();
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setCurrentPageNo(3);
  };
  const handleSecondNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setCurrentPageNo(2);
  };

  const handlePassportVerification = async () => {
    if (!validationsCheck(passportFileNumber, 'indPassportFile')) {
      showErrorMessage(passportFilePatternErrorMsg);
      setPassportFileNumberError(true);
      return;
    }
    const payLoad = {
      appointeeId,
      userId,
      passportFileNo: passportFileNumber,
      dateOfBirth: DateFormatYYYYMMDD(personalDetails.dateOfBirth),
    };
    const response = await getPassportDetails(payLoad);
    if (response) {
      const { remarks, isValid } = response.responseInfo;
      setIsPassportVarified(isValid);
      if (isValid) {
        showSuccessMessage(passportSuccessMsg);
        disablePassportVerifyBtn();
      } else {
        showErrorMessage(passportVerifyFailedMsg);
        if (hasValue(remarks)) {
          const generatedRemarks = generateRemarks(remarks);
          openRemarksModel(generatedRemarks);
        }
      }
      setPassportStatusMessage(new VerificationStatus(isValid, 'V'));
    }
  };
  const setPassPortMaxLength = (nationality) => {
    if (!hasValue(nationality)) {
      return;
    }
    if (nationality.toLowerCase() === 'indian') {
      setPassportNoMaxLength(12);
    } else {
      setPassportNoMaxLength(20);
    }
  };
  const formElement = useRef(null);
  const handlePassFileNumberOnChange = (value) => {
    setPassportFileNumber(value);
    setPassportFileNumberError(false);
  };
  const setCountryOfOriginBasedOnNationality = (nationalityLower) => {
    const matchedNationality = nationalityList.find(
      (element) => element.name?.toLowerCase() === nationalityLower,
    );
    let _firstPageForm;
    if (matchedNationality) {
      const index = nationalityList.indexOf(matchedNationality);
      if (defaultCountry?.toLowerCase() === countryList[index]?.name?.toLowerCase()) {
        _firstPageForm = { ...personalDetails, isInternationalWorker: 'N' };
        setDisabledIsInterNationalWorker(true);
      } else {
        _firstPageForm = { ...personalDetails };
        setDisabledIsInterNationalWorker(false);
      }
      _firstPageForm = {
        ..._firstPageForm,
        originCountry: countryList[index]?.name || defaultCountry,
      };
    } else {
      _firstPageForm = { ..._firstPageForm, originCountry: defaultCountry };
    }
    setPersonalDetails(_firstPageForm);
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
  const handleViewFile = async (fileName) => {
    const file = fileUploaded?.find((f) => f.fileName === fileName);
    const fileUnsaved = uploadedFile?.filter((file) => file.uploadDetailsId === 0);
    if (!file) {
      fileUnsaved
        ?.map((file) => {
          let previewURL = null;
          const matchedFile = fileDetails.find((fileDetail) => file.fileName === fileDetail.name);
          if (matchedFile) {
            previewURL = window.URL.createObjectURL(matchedFile);
          }
          return {
            previewURL,
            fileName: file.fileName,
            uploadTypeAlias: file.uploadTypeAlias,
            mimeType: file.mimeType,
          };
        })
        .filter((file) => file.previewURL)
        .map((fileWithDetail) => {
        if (fileWithDetail.fileName === fileName) {
          openUploadedDocumentModal(
            fileWithDetail.previewURL,
            fileWithDetail.fileName,
            fileWithDetail.uploadTypeAlias,
            fileWithDetail.mimeType,
          );
        }
      });
    } else {
      const payload = {
        appointeeId: appointeeId,
        fileCategory: file?.uploadTypeAlias,
        fileId: file?.uploadDetailsId,
      };
      const response = await getUploadedFileDetailsById(payload);
      if (response && response.responseInfo) {
        const { mimeType, fileData } = response.responseInfo;
        const fileDetails = `data:${mimeType};base64,${fileData}`;
        openDocumentModel(fileDetails, file?.fileName, file?.uploadTypeAlias);
      }
    }
  };
  const handleChangeDateofIssue = (value, name) => {
    let _firstPageForm;
    if (value) {
      _firstPageForm = { ...personalDetails, [name]: value.format('YYYY-MM-DD') };
      const expiryDate = value.add(10, 'year').subtract(1, 'day').format('YYYY-MM-DD');
      _firstPageForm = { ..._firstPageForm, passportValidTillDate: expiryDate };
    } else {
      _firstPageForm = { ...personalDetails, passportValidFrom: null };
    }
    setPersonalDetails(_firstPageForm);
  };
  const handleChangeinDateofexpiry = (value, name) => {
    let _firstPageForm;
    if (value) {
      _firstPageForm = { ...personalDetails, [name]: value.format('YYYY-MM-DD') };
    } else {
      _firstPageForm = { ...personalDetails, [name]: null };
    }
    setPersonalDetails(_firstPageForm);
  };

  const secondFormFileProps = useMemo(() => ({
    handleFileUpload ,

    removeEPFOFile,
    trustEpfoFileName,
    fileDetails,
    uploadedFile,
    setTrustEpfoFileName,
    clearFileVaribles,
    handleViewFile,
  }), [
     
       
    handleFileUpload , removeEPFOFile, trustEpfoFileName, fileDetails, uploadedFile,
    setTrustEpfoFileName,   clearFileVaribles, handleViewFile
  ]);

  const secondFormStatusProps = useMemo(() => ({
    updatePersonalDetail,
    isPreviousSectionDisabled,
    setIsPreviousSectionDisabled,
    isPhysicallyHandicap,
    passportAvailable,
    passportNo,
    countryOfOrigin,
    isPassportVerifyBtnDisabled,
    handlePassportVerification,
    passportstatusMessage,
    handlePassFileNumberOnChange,
    passportFileNumberError,
    handleBack,
    handleNext,
    isthirdNextVisible,
    passportFileNumber,
    isAppointeeUanAvailable,
    setIsUANAvailableState,
    setIsThirdNextVisible,
    checkFileUpload,
    showUploadMessage,
    openUploadDocInfoModel,
  }), [
    updatePersonalDetail, isPreviousSectionDisabled, setIsPreviousSectionDisabled, isPhysicallyHandicap, passportAvailable,
    passportNo, countryOfOrigin, isPassportVerifyBtnDisabled, handlePassportVerification,
    passportstatusMessage, handlePassFileNumberOnChange, passportFileNumberError,
      handleBack, handleNext, isthirdNextVisible, passportFileNumber,
     isAppointeeUanAvailable, setIsUANAvailableState, setIsThirdNextVisible,
    checkFileUpload, showUploadMessage, openUploadDocInfoModel
  ]);

  return (
    <>
      {currentPageNo === 2 && (
        <Typography sx={{ ...heading2, mb: 3 }}>
          Your personal details must match with your Aadhaar details
        </Typography>
      )}
      <Box sx={{ width: '100%' }}>
        <LinearStepper steps={steps} activeStep={activeStep} />
        <Box my={'20px'}>
          <FormContainer>
            {currentPageNo === 1 ? (
              <>
                <FirstForm
                  stepsList={stepsList}
                  isRelationShipWithMemberDisabled={isRelationShipWithMemberDisabled}
                  passportAvailable={passportAvailable}
                  setPassportAvailable={setPassportAvailable}
                  isAadhaarVarified={isAadhaarVarified}
                  isPassportVarified={isPassportVarified}
                  disabledIsInterNationalWorker={disabledIsInterNationalWorker}
                  isDraft={isDraft}
                  handleSecondNext={handleSecondNext}
                  firstPageForm={personalDetails}
                  setFirstPageForm={setPersonalDetails}
                  handleChangeDateofIssue={handleChangeDateofIssue}
                  handleChangeinDateofexpiry={handleChangeinDateofexpiry}
                  setActiveStep={setActiveStep}
                  setCurrentPageNo={setCurrentPageNo}
                  setIsDraft={setIsDraft}
                  updateStep={updateStep}
                  defaultCountry={defaultCountry}
                  setPassPortMaxLength={setPassPortMaxLength}
                  passportNoMaxLength={passportNoMaxLength}
                  imageFileName={imageFileName}
                  uploadImageFile={uploadImageFile}
                  handleViewFile={handleViewFile}
                />
              </>
            ) : null}
            {currentPageNo === 2 ? (
              <>
                <SecondForm
                  stepsList={stepsList}
                  firstPageForm={personalDetails}
                  {...secondFormFileProps}
                  {...secondFormStatusProps}
                />
              </>
            ) : null}
            {currentPageNo === 3 ? (
              <ThirdForm t={t} stepsList={stepsList} 
                  onAadhaarVerified={setisAadhaarVarified} 
              userInfo={personalDetails}
                  handleBack={handleBack}
                  setCurrentPageNo={setCurrentPageNo}
                  setActiveStep={setActiveStep}
              />
            ) : null}
            {currentPageNo === 4 ? (
              <>
                <FourthForm
                  formElement={formElement}
                  stepsList={stepsList}
                  isAadhaarVarified={isAadhaarVarified}
                  handleBack={handleBack}
                  setCurrentPageNo={setCurrentPageNo}
                  setActiveStep={setActiveStep}
                  userInfo={personalDetails}
                  setUserInfo={setPersonalDetails}
                  updateUserInfo={updatePersonalDetail}
                />
              </>
            ) : null}

            {currentPageNo === 5 ? (
              <>
                <FifthForm
                  formElement={formElement}
                  stepsList={stepsList}
                  handleBack={handleBack}
                  setCurrentPageNo={setCurrentPageNo}
                  setActiveStep={setActiveStep}
                  userInfo={personalDetails}
                  setUserInfo={setPersonalDetails}
                />
              </>
            ) : null}

            {currentPageNo === 6 ? (
              <>
                <SixthForm
                  isAadhaarVarified={isAadhaarVarified}
                  formElement={formElement}
                  stepsList={stepsList}
                  // currentPageNo={currentPageNo}
                  setCurrentPageNo={setCurrentPageNo}
                  handleBack={handleBack}
                  // activeStep={activeStep}
                  setActiveStep={setActiveStep}
                  userInfo={personalDetails}
                  setUserInfo={setPersonalDetails}
                  // setBankStatusMessage={setBankStatusMessage}
                  // isPanVarified={isPanVarified}
                  // setIsPanVarified={setIsPanVarified}
                  // setIsBankVarified={setIsBankVarified}
                  // isBankVarified={isBankVarified}
                  // pan={pan}
                  // setPan={setPan}
                  // accountNumber={accountNumber}
                  // setAccountNumber={setAccountNumber}
                  // IFSCCode={IFSCCode}
                  // setIFSCCode={setIFSCCode}
                />
              </>
            ) : null}
            {currentPageNo === 7 ? (
              <>
                <SeventhForm
                  // isAadhaarVarified={isAadhaarVarified}
                  formElement={formElement}
                  stepsList={stepsList}
                  // currentPageNo={currentPageNo}
                  setCurrentPageNo={setCurrentPageNo}
                  handleBack={handleBack}
                  // activeStep={activeStep}
                  setActiveStep={setActiveStep}
                  userInfo={personalDetails}
                  setUserInfo={setPersonalDetails}
                  // isPANAvailable={isPANAvailable}
                  // setIsPANAvailable={setIsPANAvailable}
                  // firstatusMessage={firstatusMessage}
                  // setFIRStatusMessage={setFIRStatusMessage}
                  // isPoliceVarified={isPoliceVarified}
                  // setisPoliceVarified={setisPoliceVarified}
                  // firDetails={firDetails}
                  // setFIRDetails={setFIRDetails}
                  // pan={pan}
                  // setPan={setPan}
                  // nameAsOnPan={nameAsOnPan}
                  // dateOfBirth={dateOfBirth}
                  // setDateOfBirth={setDateOfBirth}
                />
              </>
            ) : null}
            {currentPageNo === 8 ? (
              <>
                <EighthForm
                  isAadhaarVarified={isAadhaarVarified}
                  formElement={formElement}
                  stepsList={stepsList}
                  handleBack={handleBack}
                  handleViewFile={handleViewFile}
                  userInfo={personalDetails}
                  setUserInfo={setPersonalDetails}
                  checkFileUpload={checkFileUpload}
                  openUploadDocInfoModel={openUploadDocInfoModel}
                  functionSlice={functionSlice}
                />
              </>
            ) : null}
          </FormContainer>
        </Box>
      </Box>
    </>
  );
};
export default AppointeeRegisterForm;
