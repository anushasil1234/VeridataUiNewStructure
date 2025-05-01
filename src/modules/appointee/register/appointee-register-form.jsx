import { Box, Typography } from '@mui/material';
import { heading2, subHeadingContentTextStyle } from 'app';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  otherFileTypeAlias,
  stepperDefaultList,
  tenthCertificateFileTypeAlias,
  passportFileTypeAlias,
  handicapFileTypeAlias,
  trustEpfoFileTypeAlias,
  imageFileTypeAlias,
  epfoPassbookFileTypeAlias,
  UANEmptyErrorMsg,
  aadharVerificationErrorMsg,
  passportFilePatternErrorMsg,
  epfoServiceHistoryFileTypeAlias,
  UANPatterErrorMsg,
  emptyAadharNoMsg,
  aadharPatternErrorMsg,
  docResubmissionSuccessDialogContentText,
  NA,
} from 'shared/constants/constants';
import {
  CreateStepSequience,
  DateFormatYYYYMMDD,
  getLocalStorageItem,
  hasValue,
  removeFile,
  setLocalStorageItem,
  trimmedDate,
  validationsCheck,
} from 'shared/utils';
import {
  aadharVerifyFailedMsg,
  aadharVerifySuccessMsg,
  congratulationDialogContentTitle,
  emptyAadharMsg,
  emptyShareCodeMsg,
  passportSuccessMsg,
  passportVerifyFailedMsg,
  registrationSuccessDialogContentText,
  submitConfirmationMsg,
  toDashboard,
  uanVerifyFailedMsg,
  uanVerifySuccessMsg,
  uploadSizeErrorMsg,
  uploadFormatErrorMsg,
} from 'shared/constants/constants';
import { useTranslation } from 'react-i18next';
import VerificationStatus from '../../../shared/components/verification/verification-status';
import uploadFileMessage from 'shared/utils/associate/upload-file-message';
import selectUANmessage from 'shared/utils/associate/select-uan-message';
import { FILE_SIZE_LIMIT, validFileTypes } from 'shared/constants/constants';
import UANPrerequisiteInformation from './uan-prerequiestic-info';
import getFileDetails from 'shared/utils/associate/get-file-details';
import getFilenames from 'shared/utils/associate/get-filenames';
import createFileUploadedData from 'shared/utils/associate/create-file-uploaded-data';
import LinearStepper from 'shared/components/Stepper/linear-stepper';
import FormContainer from 'shared/components/grid-container/form-container';
import FirstForm from './first-form';
import SecondForm from './second-form';
import ThirdForm from './third-form';
import FourthForm from './fourth-form';

import {
  GenerateAadharOtp,
  getAppointeeDetails,
  getPassportDetails,
  getUploadedFileDetailsById,
  PostAadharOtp,
  postAppointeeFileDetails,
  verifyAadharDetails,
} from 'server/apis';
import { submitUANOTP } from 'server/apis/verify/submit-uan-otp';
import showSuccessMessage from 'shared/utils/associate/show-success-message';
import showErrorMessage from 'shared/utils/associate/show-error-message';
import { storeCurrentPageNo } from 'store/slices/candidate-page-slice';

import {
  removeAppointeeStatusDetailsData,
  storeAppointeeStatusDetailsData,
} from 'store/slices/appointee-status-details-slice';
import { getAppointeeStatusDetails } from 'server/apis/appointee/appointee-workflow/get-appointee-status-details';
import FifthForm from './fifth-form';
import SixthForm from './sixth-form';
import SeventhForm from './seventh-form';
import EighthForm from './eighth-form';
const AppointeeRegisterForm = () => {
  const AADHARVERIFICATION_BY = process.env.REACT_APP_AADHARVERIFICATION_BY;
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
  console.log('loggedInData', loggedInData);
  const { t } = useTranslation();
  const commonHooksFunctionSlice = useSelector((state) => state.commonHooksFunctionSlice);
  const functionSlice = useSelector((state) => state.functionSlice);
  const { openDocumentModel, openUploadedDocumentModal } = functionSlice[0];
  const {
    openOtpSubmitionModel,
    closeOtpSubmitionModel,
    openRemarksModel,
    openConfirmationModel,
    openInfoModel,
  } = functionSlice[0];
  const { countryList, nationalityList, fileTypeList } =
    dropdownList && dropdownList.length > 0 && dropdownList[0];
  console.log('countrylist', countryList, fileTypeList);
  const {} = apiSlice[0];
  const { navigateTo } = commonHooksFunctionSlice[0];
  const { userId, appointeeId, userCode, candidateId } = loggedInData[0];
  console.log('userId', userId);
  console.log('loggedInData', loggedInData[0]);
  const currentPageNo = useSelector((state) => state.CandidatePageSlice.currentPageNo);
  const setCurrentPageNo = (currentPageNo) => {
    dispatch(storeCurrentPageNo(currentPageNo));
  };
  const [companyId, setCompanyId] = useState(0);
  const [defaultCountry, setDefaultCountry] = useState();
  const [passportFileNumber, setPassportFileNumber] = useState('');
  const [passportFileNumberError, setPassportFileNumberError] = useState(false);
  const [UAN, setUAN] = useState('');
  const [memberName, setMemberName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [dateOfJoining, setDateOfJoining] = useState('');
  const [gender, setGender] = useState('');
  const [appointeeName, setAppointeeName] = useState('');
  const [fathersOrHusbandName, setFathersOrHusbandName] = useState('');
  const [relationshipWithMember, setRelationshipWithMember] = useState('');
  const [mobileNo, setMobileNo] = useState(null);
  const [email, setEmail] = useState(null);
  const [nationality, setNationality] = useState('');
  const [EPFWages, setEPFWages] = useState(null);
  const [qualification, setQualification] = useState(' ');
  const [maritalStatus, setMaritalStatus] = useState(' ');
  const [isInterNationalWorker, setisInterNationalWorker] = useState('N');
  const [disabledIsInterNationalWorker, setDisabledIsInterNationalWorker] = useState(false);
  const [passportAvailable, setPassportAvailable] = useState(null);
  const [countryOfOrigin, setCountryOfOrigin] = useState('');
  const [passportNo, setPassportNo] = useState(null);
  const [isPhysicallyHandicap, setIsPhysicallyHandicap] = useState('');
  const [handicapType, setHandicapType] = useState('');
  const [pan, setPan] = useState(null);
  const [drivingLicense, setDrivingLicense] = useState(null);
  const [firDetails, setFIRDetails] = useState(null);
  const [nameAsOnPan, setNameAsOnPan] = useState(null);
  const [aadhar, setAadhar] = useState(null);
  const [nameAsOnAadhar, setNameAsOnAadhar] = useState(null);
  const [aadharShareCode, setAadharShareCode] = useState(null);
  const [fetchUanConfirmation, setFetchUanConfirmation] = useState(false);
  const [appointeeDetailsId, setAppointeeDetailsId] = useState(0);
  const [candidteId, setCandidteId] = useState(null);
  const [isAppointeeUanAvailable, setIsAppointeeUanAvailable] = useState(null);
  const [passportNoMaxLength, setPassportNoMaxLength] = useState(null);
  const [uanNumberAvailable, setUanNumberAvailable] = useState('');
  const [showAdditionalSection, setShowAdditionalSection] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPANModalOpen, setIsPANModalOpen] = useState(false);
  const [isUANAvailableState, setIsUANAvailableState] = useState(false);
  const [isPANAvailable, setIsPANAvailable] = useState(true);
  const [isLicenseAvailable, setIsLicenseAvailable] = useState(true);
  const [isDLAvailable, setIsDLAvailable] = useState(true);
  const [isPassportAvailable, setIsPassportAvailable] = useState(false);
  const [epfostatusMessage, setEpfostatusMessage] = useState(new VerificationStatus());
  const [aadharstatusMessage, setAadharstatusMessage] = useState(new VerificationStatus());
  const [passportstatusMessage, setPassportStatusMessage] = useState(new VerificationStatus());
  const [panstatusMessage, setPANStatusMessage] = useState(new VerificationStatus());
  const [bankstatusMessage, setBankStatusMessage] = useState(new VerificationStatus());
  const [firstatusMessage, setFIRStatusMessage] = useState(new VerificationStatus());
  const [licensestatusMessage, setLicenseStatusMessage] = useState(new VerificationStatus());
  const [isAadhaarVarified, setisAadhaarVarified] = useState(false);
  const [isDLVarified, setisDLVarified] = useState(false);
  const [isAadhaarXmlUploaded, setIsAadhaarXmlUploaded] = useState(false);
  const [isOfflineXmlDownloaded, setIsOfflineXmlDownloaded] = useState(false);
  const [isPanVarified, setIsPanVarified] = useState(null);
  const [isBankVarified, setIsBankVarified] = useState(null);
  const [isPassportVarified, setIsPassportVarified] = useState(false);
  const [isPoliceVarified, setisPoliceVarified] = useState(null);
  const [isUanVarified, setisUanVarified] = useState(null);
  const [epfoButton, setEpfoButton] = useState(null);
  const [disabledAadharInput, setDisabledAadharInput] = useState(false);
  const [disabledPanInput, setDisabledPanInput] = useState(false);
  const [isEpfoSectionDisabled, setIsEpfoSectionDisabled] = useState(true);
  const [isPassportVerifyBtnDisabled, setIsPassportVerifyBtnDisabled] = useState(false);
  const [isTrustEpfoAvailable, setIsTrustEpfoAvailable] = useState(true);
  const [uploadedFile, setUploadedFile] = useState([]);
  const [xmlFileUploaded, setXmlFileUploaded] = useState();
  const [fileDetails, setFileDetails] = useState([]);
  const [trustEpfoFileName, setTrustEpfoFileName] = useState([]);
  const [handicapFileName, setHandicapFileName] = useState();
  const [epfoPassBookFiles, setEpfoPassBookFiles] = useState([]);
  const [epfoServiceHistoryFile, setEpfoServiceHistoryFile] = useState();
  const [aadharXmlFileName, setAadharXmlFileName] = useState([]);
  const [passportFileName, setPassportFileName] = useState([]);
  const [tenthCertificateFileName, setTenthCertificateFileName] = useState([]);
  const [imageFileName, setImageFileName] = useState([]);
  const [accountNumber, setAccountNumber] = useState(null);
  const [IFSCCode, setIFSCCode] = useState(null);
  const [otherFileName, setOtherFileName] = useState([]);
  const [isRelationShipWithMemberDisabled, setIsRelationShipWithMemberDisabled] = useState(false);
  const [isSubmit, setIsSubmit] = useState();
  const [companyName, setCompanyName] = useState();
  const [timeoutTimer, setTimeoutTimer] = useState();
  const [fileUploaded, setFileUploaded] = useState();
  const [isNextVisible, setIsNextVisible] = useState(false);
  const [isthirdNextVisible, setIsThirdNextVisible] = useState(false);
  const [isDraft, setIsDraft] = useState(true);
  const [uanAadharLink, setUanAadharLink] = useState('');
  const [stepsList, setStepsList] = useState(() => stepperDefaultList(t));
  const [isUanVerificationProcessManual, setIsUanVerificationProcessManual] = useState('auto');
  const [panNumberError, setPanNumberError] = useState(false);
  const [isPFverificationReq, setIsPFverificationReq] = useState();
  const [panNumber, setPanNumber] = useState();
  const [isPensionApplicable, setIsPensionApplicable] = useState();
  const [isPreviousSectionDisabled, setIsPreviousSectionDisabled] = useState(false);
  const defaultFirstPageForm = {
    gender: '',
    appointeeName: '',
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
    mobileNo: '',
    appointeeEmailId: '',
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
  };
  const [firstPageForm, setFirstPageForm] = useState(defaultFirstPageForm);
  const stepCounter = 3;
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
    const removedNames = removeDetailsList.map(({ name }) => name);
    const updatedFileNameList = fileNameList.filter((name) => !removedNames.includes(name));
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
      setFirstPageForm(prev => ({
        ...prev,
        ...response.responseInfo,
        appointeeDetailsId: sessionAppointeeDetailsId || response.responseInfo.appointeeDetailsId,
        appointeeId: sessionAppointeeId || response.responseInfo.appointeeId,
        candidateId: sessionCandidateId || response.responseInfo.candidateId,
        appointeeCode: sessionUserCode || response.responseInfo.appointeeCode,
        companyId: companyIdValue || response.responseInfo.companyId,
      }));
    }
  };
  useEffect(() => {
    updateStep({});
  }, [t, stepCounter, isPhysicallyHandicap, isPassportAvailable]);
  const updateStep = (param) => {
    const _steps = CreateStepSequience({
      ...param,
      stepCounter,
      t,
      isHandicap: isPhysicallyHandicap,
      isPassportAvailable: isPassportAvailable,
    });
    setStepsList((prevSteps) => ({ ...prevSteps, ..._steps }));
  };
  console.log('uploadedFile fileDetails', uploadedFile, fileDetails);
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
  const hasTrustEpfoUpload = () => checkFileUpload(trustEpfoFileTypeAlias);
  const hasHandicapUpload = () => checkFileUpload(handicapFileTypeAlias);
  const hasPassportUpload = () => checkFileUpload(passportFileTypeAlias);
  const hasTenthPassCertificateUpload = () => checkFileUpload(tenthCertificateFileTypeAlias);
  const hasFathersDocCertificateUpload = () => checkFileUpload(otherFileTypeAlias);
  const hasEPFOPassbookUpload = () => checkFileUpload(epfoPassbookFileTypeAlias);
  const hasEPFOServiceHistoryUpload = () => checkFileUpload(epfoServiceHistoryFile);
  const hasImageUpload = () => checkFileUpload(imageFileTypeAlias);
  const openUploadDocInfoModel = (dialogContentText) => {
    openInfoModel({ dialogContentText });
  };
  const submitDetails = (autoSubmit, isManual) => {
    console.log('submitsixthform', autoSubmit, isManual);
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
      console.log('firstPageForm1111', firstPageForm);
    }
  }, [countryList]);
  useEffect(() => {
    if (hasValue(isAppointeeUanAvailable)) {
      setIsPreviousSectionDisabled(true);
    }
  }, [isAppointeeUanAvailable]);
  useEffect(() => {
    if (!hasValue(UAN)) {
      setEpfoButton(t('Fetch N Verify UAN'));
    } else {
      setEpfoButton('Auto UAN Verification');
    }
  }, [UAN, t]);
  useEffect(() => {
    if (!isTrustEpfoAvailable) {
      clearFileVaribles(trustEpfoFileTypeAlias, setTrustEpfoFileName, trustEpfoFileName);
    }
  }, [isTrustEpfoAvailable]);
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
    if (firstPageForm.gender === 'M') {
      setFirstPageForm({ ...firstPageForm, memberRelation: 'F' });
      setIsRelationShipWithMemberDisabled(true);
    } else {
      setIsRelationShipWithMemberDisabled(false);
    }
  }, [firstPageForm.gender]);
  useEffect(() => {
    if (firstPageForm.isPassportAvailable === 'Y') {
      const nationalityLower = firstPageForm.nationality?.toLowerCase();
      setCountryOfOriginBasedOnNationality(nationalityLower);
    }
  }, [firstPageForm.nationality, firstPageForm.isPassportAvailable]);
  useEffect(() => {
    if (firstPageForm.isHandicap === 'N') {
      clearFileVaribles(handicapFileTypeAlias, setHandicapFileName, handicapFileName);
    }
  }, [firstPageForm.isHandicap]);
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
  const uploadTrustEPFOFile = handleFileUpload(
    trustEpfoFileTypeAlias,
    setTrustEpfoFileName,
    trustEpfoFileName,
    'multiple',
  );
  const uploadHandicapFile = handleFileUpload(handicapFileTypeAlias, setHandicapFileName);
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
  const uploadPassportFile = handleFileUpload(passportFileTypeAlias, setPassportFileName);
  const upload10thCertificateFile = handleFileUpload(
    tenthCertificateFileTypeAlias,
    setTenthCertificateFileName,
  );
  const uploadFathersDocFile = handleFileUpload(otherFileTypeAlias, setOtherFileName);
  const uploadImageFile = handleFileUpload(imageFileTypeAlias, setImageFileName);
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
      setisAadhaarVarified(isVarified);
      setIsOfflineXmlDownloaded(true);
      closeOtpSubmitionModel();
      setAadharstatusMessage(new VerificationStatus(isVarified, 'V'));
    }
  };
  const handleAadharotpSubmition = async (otp, client_id) => {
    const payload = {
      appointeeId: appointeeId,
      userId: userId,
      client_id: client_id,
      otp: otp,
      aadharNumber: aadhar.trim(),
      aadharName: nameAsOnAadhar,
      shareCode: '',
    };
    const response = await PostAadharOtp(payload);
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
      setisAadhaarVarified(isVarified);
      setIsOfflineXmlDownloaded(true);
      closeOtpSubmitionModel();
      setAadharstatusMessage(new VerificationStatus(isVarified, 'V'));
    }
  };
  const verifAadharByNumber = async () => {
    console.log('VerifAadharByNumber');
    const payload = {
      appointeeId: appointeeId,
      userId: userId,
      aadharNumber: aadhar.trim(),
      aadharName: nameAsOnAadhar,
    };
    const response = await GenerateAadharOtp(payload);
    if (response) {
      const { otp_sent, client_id, valid_aadhaar } = response?.responseInfo;
      if (otp_sent && valid_aadhaar) {
        openOtpSubmitionModel({
          otpSubmitionFunction: async (otp) => await handleAadharotpSubmition(otp, client_id),
          timeoutTimer: timeoutTimer,
          setTimeoutTimer: setTimeoutTimer,
        });
      }
    }
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
      setCurrentPageNo(currentPageNo - 1);
    }
  };
  const checkTenthPassCertificateUpload = () => {
    const isUploaded = hasTenthPassCertificateUpload() || hasValue(tenthCertificateFileName);
    if (!isUploaded) showUploadMessage('10th pass certificate');
    return isUploaded;
  };
  const checkFathersDocCertificateUpload = () => {
    const isUploaded = hasFathersDocCertificateUpload() || hasValue(otherFileName);
    if (!isUploaded) showUploadMessage('PAN Card');
    return isUploaded;
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
  const checkHandicapCertificateUpload = () => {
    if (isPhysicallyHandicap != 'Y') {
      return true;
    } else {
      const isUploaded = hasHandicapUpload() || hasValue(handicapFileName);
      if (!isUploaded) showUploadMessage('handicap certificate');
      return isUploaded;
    }
  };
  const checkTrustEpfoUpload = () => {
    if (isTrustEpfoAvailable != true) {
      return true;
    } else {
      const isUploaded = hasTrustEpfoUpload() || hasValue(trustEpfoFileName);
      if (!isUploaded) showUploadMessage('trust EPFO passbook');
      return isUploaded;
    }
  };
  const checkPassportUploadForOtherCountries = () => {
    if (
      hasValue(countryOfOrigin) &&
      countryOfOrigin !== 'India' &&
      countryOfOrigin !== 'Nepal' &&
      countryOfOrigin !== 'Bhutan'
    ) {
      if (passportAvailable !== 'Y') {
        return true;
      } else {
        const isUploaded = hasPassportUpload() || hasValue(passportFileName);
        if (!isUploaded) showUploadMessage('visa');
        return isUploaded;
      }
    }
    return true;
  };
  const checkUanNumber = () => {
    if (!uanNumberAvailable) {
      showSelectUanMessage();
      return false;
    }
    return true;
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
  const showSelectUanMessage = () => {
    let dialogContentText = (
      <Typography>
        {selectUANmessage('whether you have a UAN number (Yes or No)')}, then save the details
      </Typography>
    );
    openUploadDocInfoModel(dialogContentText);
  };
  const handleSaveClick = () => {
    if (process.env.REACT_APP_VARIABLE_CERITIFICATE_10TH === 'true')
      if (!checkTenthPassCertificateUpload()) return;
    if (!checkFathersDocCertificateUpload()) return;
    if (!checkHandicapCertificateUpload()) return;
    if (!checkTrustEpfoUpload()) return;
    if (!checkPassportUploadForOtherCountries()) return;
    if (!checkUanNumber()) return;
    handleOpenModal();
  };
  const buildFormData = (payLoad) => {
    let formData = new FormData();
    console.log('buildFormData');
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
                console.log('payLoad[property][index]', payLoad[property][index]);
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
  const handleDialogConfirm = () => {
    setIsPANModalOpen(false);
  };
  const handleDialogCancel = () => {
    setIsPANModalOpen(false);
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
  const handleThirdNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setCurrentPageNo(4);
  };
  const handleChange = (event) => {
    const value = event.target.value;
    setUanNumberAvailable(value);
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
      dateOfBirth: DateFormatYYYYMMDD(firstPageForm.dateOfBirth),
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
  const handleIsOfflineXmlDownloadedOnChange = (e) => {
    setIsOfflineXmlDownloaded(e.target.checked);
  };
  const setCountryOfOriginBasedOnNationality = (nationalityLower) => {
    const matchedNationality = nationalityList.find(
      (element) => element.name?.toLowerCase() === nationalityLower,
    );
    let _firstPageForm;
    if (matchedNationality) {
      const index = nationalityList.indexOf(matchedNationality);
      console.log(
        'defaultww',
        defaultCountry?.toLowerCase() === countryList[index]?.name?.toLowerCase(),
      );
      if (defaultCountry?.toLowerCase() === countryList[index]?.name?.toLowerCase()) {
        _firstPageForm = { ...firstPageForm, isInternationalWorker: 'N' };
        setDisabledIsInterNationalWorker(true);
      } else {
        _firstPageForm = { ...firstPageForm };
        setDisabledIsInterNationalWorker(false);
      }
      _firstPageForm = {
        ..._firstPageForm,
        originCountry: countryList[index]?.name || defaultCountry,
      };
    } else {
      _firstPageForm = { ..._firstPageForm, originCountry: defaultCountry };
    }
    setFirstPageForm(_firstPageForm);
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
  const handleChangeNameOnAadhar = (value) => {
    setNameAsOnAadhar(value.toUpperCase());
  };
  const handleChangeAadharNumber = (value) => {
    setAadhar(value);
  };
  const handleViewFile = async (fileName) => {
    const file = fileUploaded?.find((f) => f.fileName === fileName);
    const fileUnsaved = uploadedFile?.filter((file) => file.uploadDetailsId === 0);
    if (!file) {
      console.log('File not found from api');
      const fileWithDetails = fileUnsaved
        ?.map((file) => {
          let previewURL = null;
          const matchedFile = fileDetails.find((fileDetail) => file.fileName === fileDetail.name);
          console.log('matched', matchedFile);
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
        .filter((file) => file.previewURL);
      console.log('fileWithDetails', fileWithDetails);
      fileWithDetails.map((fileWithDetail) => {
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
      console.log('Uploaded file details', response);
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
      _firstPageForm = { ...firstPageForm, [name]: value.format('YYYY-MM-DD') };
      const expiryDate = value.add(10, 'year').subtract(1, 'day').format('YYYY-MM-DD');
      _firstPageForm = { ..._firstPageForm, passportValidTillDate: expiryDate };
    } else {
      _firstPageForm = { ...firstPageForm, passportValidFrom: null };
    }
    setFirstPageForm(_firstPageForm);
  };
  const handleChangeinDateofexpiry = (value, name) => {
    let _firstPageForm;
    if (value) {
      _firstPageForm = { ...firstPageForm, [name]: value.format('YYYY-MM-DD') };
    } else {
      _firstPageForm = { ...firstPageForm, [name]: null };
    }
    setFirstPageForm(_firstPageForm);
  };
  console.log('firstpageform', firstPageForm);
  return (
    <>
      {}
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
                  firstPageForm={firstPageForm}
                  setFirstPageForm={setFirstPageForm}
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
                  isPreviousSectionDisabled={isPreviousSectionDisabled}
                  setIsPreviousSectionDisabled={setIsPreviousSectionDisabled}
                  upload10thCertificateFile={upload10thCertificateFile}
                  tenthCertificateFileName={tenthCertificateFileName}
                  uploadFathersDocFile={uploadFathersDocFile}
                  otherFileName={otherFileName}
                  firstPageForm={firstPageForm}
                  isPhysicallyHandicap={isPhysicallyHandicap}
                  uploadHandicapFile={uploadHandicapFile}
                  handicapFileName={handicapFileName}
                  passportAvailable={passportAvailable}
                  passportNo={passportNo}
                  countryOfOrigin={countryOfOrigin}
                  isPassportVerifyBtnDisabled={isPassportVerifyBtnDisabled}
                  handlePassportVerification={handlePassportVerification}
                  passportstatusMessage={passportstatusMessage}
                  handlePassFileNumberOnChange={handlePassFileNumberOnChange}
                  passportFileNumberError={passportFileNumberError}
                  uploadPassportFile={uploadPassportFile}
                  passportFileName={passportFileName}
                  isTrustEpfoAvailable={isTrustEpfoAvailable}
                  uploadTrustEPFOFile={uploadTrustEPFOFile}
                  removeEPFOFile={removeEPFOFile}
                  trustEpfoFileName={trustEpfoFileName}
                  uanNumberAvailable={uanNumberAvailable}
                  handleChange={handleChange}
                  handleBack={handleBack}
                  handleSaveClick={handleSaveClick}
                  handleNext={handleNext}
                  isthirdNextVisible={isthirdNextVisible}
                  isModalOpen={isModalOpen}
                  handleCloseModal={handleCloseModal}
                  passportFileNumber={passportFileNumber}
                  setIsTrustEpfoAvailable={setIsTrustEpfoAvailable}
                  handleViewFile={handleViewFile}
                  isAppointeeUanAvailable={isAppointeeUanAvailable}
                  setIsUANAvailableState={setIsUANAvailableState}
                  fileDetails={fileDetails}
                  uploadedFile={uploadedFile}
                  setTrustEpfoFileName={setTrustEpfoFileName}
                  setHandicapFileName={setHandicapFileName}
                  setPassportFileName={setPassportFileName}
                  setIsThirdNextVisible={setIsThirdNextVisible}
                  clearFileVaribles={clearFileVaribles}
                />
              </>
            ) : null}
            {}
            {currentPageNo === 3 ? (
              <>
                <ThirdForm
                  formElement={formElement}
                  stepsList={stepsList}
                  isAadhaarVarified={isAadhaarVarified}
                  setisAadhaarVarified={setisAadhaarVarified}
                  isOfflineXmlDownloaded={isOfflineXmlDownloaded}
                  setIsOfflineXmlDownloaded={setIsOfflineXmlDownloaded}
                  handleIsOfflineXmlDownloadedOnChange={handleIsOfflineXmlDownloadedOnChange}
                  nameAsOnAadhar={nameAsOnAadhar}
                  handleChangeNameOnAadhar={handleChangeNameOnAadhar}
                  aadharShareCode={aadharShareCode}
                  setAadharShareCode={setAadharShareCode}
                  disabledAadharInput={disabledAadharInput}
                  isAadhaarXmlUploaded={isAadhaarXmlUploaded}
                  aadharstatusMessage={aadharstatusMessage}
                  setAadharstatusMessage={setAadharstatusMessage}
                  uploadAadharXmlFile={uploadAadharXmlFile}
                  aadharXmlFileName={aadharXmlFileName}
                  handleDialogCancel={handleDialogCancel}
                  handleDialogConfirm={handleDialogConfirm}
                  xmlFileUploaded={xmlFileUploaded}
                  setXmlFileUploaded={setXmlFileUploaded}
                  handleBack={handleBack}
                  submitDetails={submitDetails}
                  aadharNumber={aadhar}
                  handleChangeAadharNumber={handleChangeAadharNumber}
                  handleViewFile={handleViewFile}
                  handleChangeinDateofexpiry={handleChangeinDateofexpiry}
                  currentPageNo={currentPageNo}
                  setCurrentPageNo={setCurrentPageNo}
                  handleThirdNext={handleThirdNext}
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                  firstPageForm={firstPageForm}
                  setFirstPageForm={setFirstPageForm}
                  isLicenseAvailable={isLicenseAvailable}
                  setIsLicenseAvailable={setIsLicenseAvailable}
                  isDLVarified={isDLVarified}
                  setisDLVarified={setisDLVarified}
                  licensestatusMessage={licensestatusMessage}
                  setLicenseStatusMessage={setLicenseStatusMessage}
                  isDLAvailable={isDLAvailable}
                  setIsDLAvailable={setIsDLAvailable}
                  drivingLicense={drivingLicense}
                  setDrivingLicense={setDrivingLicense}
                  dateOfBirth={dateOfBirth}
                  setDateOfBirth={setDateOfBirth}
                />
              </>
            ) : null}

            {currentPageNo === 4 ? (
              <>
                <FourthForm
                  formElement={formElement}
                  stepsList={stepsList}
                  isAadhaarVarified={isAadhaarVarified}
                  setisAadhaarVarified={setisAadhaarVarified}
                  handleBack={handleBack}
                  submitDetails={submitDetails}
                  handleViewFile={handleViewFile}
                  handleChangeinDateofexpiry={handleChangeinDateofexpiry}
                  currentPageNo={currentPageNo}
                  setCurrentPageNo={setCurrentPageNo}
                  handleThirdNext={handleThirdNext}
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                  firstPageForm={firstPageForm}
                  setFirstPageForm={setFirstPageForm}
                  isLicenseAvailable={isLicenseAvailable}
                  setIsLicenseAvailable={setIsLicenseAvailable}
                  isDLVarified={isDLVarified}
                  setisDLVarified={setisDLVarified}
                  licensestatusMessage={licensestatusMessage}
                  setLicenseStatusMessage={setLicenseStatusMessage}
                  isDLAvailable={isDLAvailable}
                  setIsDLAvailable={setIsDLAvailable}
                  drivingLicense={drivingLicense}
                  setDrivingLicense={setDrivingLicense}
                  dateOfBirth={dateOfBirth}
                  setDateOfBirth={setDateOfBirth}
                />
              </>
            ) : null}

            {currentPageNo === 5 ? (
              <>
                <FifthForm
                  isAadhaarVarified={isAadhaarVarified}
                  formElement={formElement}
                  stepsList={stepsList}
                  currentPageNo={currentPageNo}
                  setCurrentPageNo={setCurrentPageNo}
                  handleBack={handleBack}
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                  isPANAvailable={isPANAvailable}
                  setIsPANAvailable={setIsPANAvailable}
                  nameAsOnPan={nameAsOnPan}
                  panstatusMessage={panstatusMessage}
                  setPANStatusMessage={setPANStatusMessage}
                  setIsPanVarified={setIsPanVarified}
                  pan={pan}
                  setPan={setPan}
                />
              </>
            ) : null}

            {currentPageNo === 6 ? (
              <>
                <SixthForm
                  isAadhaarVarified={isAadhaarVarified}
                  formElement={formElement}
                  stepsList={stepsList}
                  currentPageNo={currentPageNo}
                  setCurrentPageNo={setCurrentPageNo}
                  handleBack={handleBack}
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                  bankstatusMessage={bankstatusMessage}
                  setBankStatusMessage={setBankStatusMessage}
                  isPanVarified={isPanVarified}
                  setIsPanVarified={setIsPanVarified}
                  setIsBankVarified={setIsBankVarified}
                  isBankVarified={isBankVarified}
                  pan={pan}
                  setPan={setPan}
                  accountNumber={accountNumber}
                  setAccountNumber={setAccountNumber}
                  IFSCCode={IFSCCode}
                  setIFSCCode={setIFSCCode}
                />
              </>
            ) : null}
            {currentPageNo === 7 ? (
              <>
                <SeventhForm
                  isAadhaarVarified={isAadhaarVarified}
                  formElement={formElement}
                  stepsList={stepsList}
                  currentPageNo={currentPageNo}
                  setCurrentPageNo={setCurrentPageNo}
                  handleBack={handleBack}
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                  firstPageForm={firstPageForm}
                  isPANAvailable={isPANAvailable}
                  setIsPANAvailable={setIsPANAvailable}
                  firstatusMessage={firstatusMessage}
                  setFIRStatusMessage={setFIRStatusMessage}
                  isPoliceVarified={isPoliceVarified}
                  setisPoliceVarified={setisPoliceVarified}
                  firDetails={firDetails}
                  setFIRDetails={setFIRDetails}
                  pan={pan}
                  setPan={setPan}
                  nameAsOnPan={nameAsOnPan}
                  dateOfBirth={dateOfBirth}
                  setDateOfBirth={setDateOfBirth}
                />
              </>
            ) : null}
            {currentPageNo === 8 ? (
              <>
                <EighthForm
                  isAadhaarVarified={isAadhaarVarified}
                  formElement={formElement}
                  stepsList={stepsList}
                  currentPageNo={currentPageNo}
                  setCurrentPageNo={setCurrentPageNo}
                  handleBack={handleBack}
                  handleViewFile={handleViewFile}
                  firstPageForm={firstPageForm}
                  aadhar={aadhar}
                  setAadhar={setAadhar}
                  epfoButton={epfoButton}
                  setEpfoButton={setEpfoButton}
                  epfostatusMessage={epfostatusMessage}
                  setEpfostatusMessage={setEpfostatusMessage}
                  uanAadharLink={uanAadharLink}
                  handleChangeUanVerification={handleChangeUanVerification}
                  uploadEpfoServiceHistoryFile={uploadEpfoServiceHistoryFile}
                  setIsUanVerificationProcessManual={setIsUanVerificationProcessManual}
                  isUanVerificationProcessManual={isUanVerificationProcessManual}
                  epfoServiceHistoryFile={epfoServiceHistoryFile}
                  uploadEpfoPassBookFile={uploadEpfoPassBookFile}
                  removeEPFOPassbookFile={removeEPFOPassbookFile}
                  epfoPassBookFiles={epfoPassBookFiles}
                  isUANAvailableState={isUANAvailableState}
                  setisUanVarified={setisUanVarified}
                  isUanVarified={isUanVarified}
                  submitDetails={submitDetails}
                  setUAN={setUAN}
                  UAN={UAN}
                />
              </>
            ) : null}
           
          </FormContainer>
        </Box>
 {/* <FormDialog
          open={fetchUanConfirmation}
          DialogTitle={
            'Your Aadhaar verification has failed. If you continue you will not be able to change your Aadhaar. Do you want to continue?'
          }
          shouldTakeAction={fetchUanConfirmationSubmittion}
        /> */}      </Box>
      {}
    </>
  );
};
export default AppointeeRegisterForm;
