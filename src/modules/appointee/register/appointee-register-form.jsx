import { Box, Typography } from '@mui/material';
import { heading2 } from 'app';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  stepperDefaultList,
  trustEpfoFileTypeAlias,
  imageFileTypeAlias,
  epfoPassbookFileTypeAlias,
  passportFilePatternErrorMsg,
  epfoServiceHistoryFileTypeAlias,
} from 'shared/constants/constants';
import {
  CreateStepSequience,
  DateFormatYYYYMMDD,
  hasValue,
  removeFile,
  validationsCheck,
} from 'shared/utils';
import {
  passportSuccessMsg,
  passportVerifyFailedMsg,
} from 'shared/constants/constants';
import { useTranslation } from 'react-i18next';
import VerificationStatus from '../../../shared/components/verification/verification-status';
import uploadFileMessage from 'shared/utils/associate/upload-file-message';
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
  getCurrentPolicyDetails,
  getPassportDetails,
  getUploadedFileDetailsById,
} from 'server/apis';
import showSuccessMessage from 'shared/utils/associate/show-success-message';
import showErrorMessage from 'shared/utils/associate/show-error-message';
import { storeCurrentPageNo } from 'store/slices/candidate-page-slice';


import usePersonalDetails from './hooks/usePersonalDetails';
import useVerificationStatus from './hooks/useVerificationStatus';
import useFileUploads from './hooks/useFileUploads';

const AppointeeRegisterForm = () => {
  // const [steps, setSteps] = useState([]);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const dropdownList = useSelector((state) => state.dropdownList);
  const apiSlice = useSelector((state) => state.apiSlice);
  const loggedInData = useSelector((state) => state.loggedInData);
  const { t } = useTranslation();
  const commonHooksFunctionSlice = useSelector((state) => state.commonHooksFunctionSlice);
  const functionSlice = useSelector((state) => state.functionSlice);
  const { openDocumentModel, openUploadedDocumentModal } = functionSlice[0];
  const {
    openRemarksModel,
    openInfoModel,
  } = functionSlice[0];
  const { countryList, nationalityList, fileTypeList } =
    dropdownList && dropdownList.length > 0 && dropdownList[0];
  const { navigateTo } = commonHooksFunctionSlice[0];
  const { userId, appointeeId } = loggedInData[0];
  const [companyId, setCompanyId] = useState(0);
  const [defaultCountry, setDefaultCountry] = useState();
  const [passportFileNumber, setPassportFileNumber] = useState('');
  const [passportFileNumberError, setPassportFileNumberError] = useState(false);
  const [UAN, setUAN] = useState('');
  const [disabledIsInterNationalWorker, setDisabledIsInterNationalWorker] = useState(false);
  const [passportAvailable, setPassportAvailable] = useState(null);
  const [countryOfOrigin, setCountryOfOrigin] = useState('');
  const [passportNo, setPassportNo] = useState(null);
  const [isPhysicallyHandicap, setIsPhysicallyHandicap] = useState('');
  const [isAppointeeUanAvailable, setIsAppointeeUanAvailable] = useState(null);
  const [passportNoMaxLength, setPassportNoMaxLength] = useState(null);
  const [isUANAvailableState, setIsUANAvailableState] = useState(false);
  const [passportstatusMessage, setPassportStatusMessage] = useState(new VerificationStatus());
  const [isAadhaarVarified, setisAadhaarVarified] = useState(false);
  const [isPassportVarified, setIsPassportVarified] = useState(false);
  const [epfoButton, setEpfoButton] = useState(null);
  const [isPassportVerifyBtnDisabled, setIsPassportVerifyBtnDisabled] = useState(false);
  const [uploadedFile, setUploadedFile] = useState([]);
  const [fileDetails, setFileDetails] = useState([]);
  const [trustEpfoFileName, setTrustEpfoFileName] = useState([]);
  const [epfoPassBookFiles, setEpfoPassBookFiles] = useState([]);
  const [epfoServiceHistoryFile, setEpfoServiceHistoryFile] = useState();
  const [imageFileName, setImageFileName] = useState([]);
  const [isRelationShipWithMemberDisabled, setIsRelationShipWithMemberDisabled] = useState(false);
  const [isSubmit, setIsSubmit] = useState();
  const [fileUploaded, setFileUploaded] = useState();
  const [isthirdNextVisible, setIsThirdNextVisible] = useState(false);
  const [isDraft, setIsDraft] = useState(true);
  const [stepsList, setStepsList] = useState(() => stepperDefaultList(t));
  const [isUanVerificationProcessManual, setIsUanVerificationProcessManual] = useState('auto');
  const [isPreviousSectionDisabled, setIsPreviousSectionDisabled] = useState(false);
  const [activePolicy, setActivePolicy] = useState(null);

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
  const disablePassportVerifyBtn = () => { setIsPassportVerifyBtnDisabled(true); };
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
      setCurrentStageIndex(response.responseInfo.saveStep);
      setisAadhaarVarified(response.responseInfo.isAadhaarVarified)
    }
  };
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
  const checkFileUpload = (fileTypeAlias) => {
    const uploadTypeAlias =
      uploadedFile && uploadedFile.find(({ uploadTypeAlias }) => uploadTypeAlias === fileTypeAlias);
    return hasValue(uploadTypeAlias);
  };

  const openUploadDocInfoModel = (dialogContentText) => {
    openInfoModel({ dialogContentText });
  };

  useEffect(() => {
    localStorage.setItem('activeStep', currentStageIndex);
  }, [currentStageIndex]);
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
  const handleFileUpload = (fileTypeAlias, setFileName, fileNameList = [], uploadType) =>
    ({ target }) => {
      uploadFile({
        files: target.files,
        uploadTypeAlias: fileTypeAlias,
        setFileName,
        _filenameList: fileNameList,
        uploadType,
      });
    };

  const fetchActivePolicy = async () => {
    try {
      console.log('Fetching active policy...');
      const response = await getCurrentPolicyDetails();
      console.log('Policy response:', response);
      if (response) {
        const { responseInfo, statusCode } = response;
        console.log('Setting active policy:', responseInfo);
        setActivePolicy(responseInfo);
      } else {
        throw new Error('Failed to fetch policy');
      }
    } catch (err) {
      console.error('Error fetching policy:', err);
      // setError(err.message);
      // enqueueSnackbar('Failed to fetch policy', { variant: 'error' });
    } finally {
      // setLoading(false);
    }
  };

  const isStageActive = (stageStep) => {
    if (!activePolicy?.stages) {
      return false;
    }
    const stage = activePolicy.stages.find(s => s.stageStep === stageStep);
    // Check if stage is active and has at least one active process
    return stage?.isActive === true &&
      stage?.processes?.some(process => process.activeStatus === true);
  };

  useEffect(() => {
    fetchActivePolicy();
  }, []);

  // Add effect to monitor activePolicy changes
  useEffect(() => {
  }, [activePolicy]);

  const uploadImageFile = handleFileUpload(imageFileTypeAlias, setImageFileName);

  // Function to get active stages up to and including the stage with processId 850
  const getActiveStages = () => {
    if (!activePolicy?.stages) return [];
    const stages = activePolicy.stages;
    const finalStageIndex = stages.findIndex(stage =>
      stage.processes?.some(process => process.processId === 850)
    );
    return stages
      .filter((stage, index) => {
        const isStageActive = stage.isActive && 
          stage.processes?.some(process => process.activeStatus === true);
        const hasValidProcess = stage.processes?.some(process => process.processId <= 850);
        return isStageActive && hasValidProcess && stage.stepper >= 0 &&
          (finalStageIndex === -1 || index <= finalStageIndex);
      })
      .sort((a, b) => a.stepper - b.stepper);
  };

  // Get the filtered active stages and the current stage
  const activeStages = getActiveStages();
  const currentStage = activeStages[currentStageIndex];
  const currentStepper = currentStage?.stageId;

  // Build the stepper steps from the filtered active stages
  const stepNamesSequential = [
    'Personal Information',
    'Document Upload',
    'Aadhaar Verification',
    'Driving License Verification',
    'PAN Verification',
    'Bank Verification',
    'Police Verification',
    'UAN/EPFO Verification',
  ];
  const steps = activeStages.map((stage, idx) => `${stage.stageId + 1}. ${stepNamesSequential[stage.stageId] || `Step ${idx + 1}`}`);
  console.log('steps Stages:', steps);

  // Navigation handlers
  const handleNext = () => {
    if (currentStageIndex < activeStages.length - 1) {
      setCurrentStageIndex(currentStageIndex + 1);
    }
  };
  const handleBack = () => {
    if (currentStageIndex > 0) {
      setCurrentStageIndex(currentStageIndex - 1);
    }
  };

  // Reset index if out of bounds when active stages change
  React.useEffect(() => {
    if (currentStageIndex >= activeStages.length) {
      setCurrentStageIndex(0);
    }
  }, [activeStages.length]);

  const showUploadMessage = (docType) => {
    let dialogContentText = (
      <Typography>{uploadFileMessage(docType)}, then save the details</Typography>
    );
    openUploadDocInfoModel(dialogContentText);
  };

  const handleSecondNext = () => {
    setCurrentStageIndex(2);
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
    handleFileUpload,
    removeEPFOFile,
    trustEpfoFileName,
    fileDetails,
    uploadedFile,
    setTrustEpfoFileName,
    clearFileVaribles,
    handleViewFile,
  }), [


    handleFileUpload, removeEPFOFile, trustEpfoFileName, fileDetails, uploadedFile,
    setTrustEpfoFileName, clearFileVaribles, handleViewFile
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
      {currentStageIndex === 1 && (
        <Typography sx={{ ...heading2, mb: 3 }}>
          Your personal details must match with your Aadhaar details
        </Typography>
      )}
      <Box sx={{ width: '100%' }}>
        <LinearStepper steps={steps} activeStep={currentStageIndex} />
        <Box my={'20px'}>
          <FormContainer>
            {currentStepper === 0 ? (
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
                setCurrentStageIndex={setCurrentStageIndex}
                setIsDraft={setIsDraft}
                updateStep={updateStep}
                defaultCountry={defaultCountry}
                setPassPortMaxLength={setPassPortMaxLength}
                passportNoMaxLength={passportNoMaxLength}
                imageFileName={imageFileName}
                uploadImageFile={uploadImageFile}
                handleViewFile={handleViewFile}
                handleNext={handleNext}
              />
            ) : null}
            {currentStepper === 1 ? (
              <SecondForm
                stepsList={stepsList}
                firstPageForm={personalDetails}
                {...secondFormFileProps}
                {...secondFormStatusProps}
              />
            ) : null}
            {currentStepper === 2 ? (
              <ThirdForm t={t} stepsList={stepsList}
                onAadhaarVerified={setisAadhaarVarified}
                userInfo={personalDetails}
                setUserInfo={setPersonalDetails}
                handleBack={handleBack}
                handleNext={handleNext}
              />
            ) : null}
            {currentStepper === 3 ? (
              <FourthForm
                formElement={formElement}
                stepsList={stepsList}
                isAadhaarVarified={isAadhaarVarified}
                handleBack={handleBack}
                handleNext={handleNext}
                userInfo={personalDetails}
                setUserInfo={setPersonalDetails}
                updateUserInfo={updatePersonalDetail}
              />
            ) : null}
            {currentStepper === 4 ? (
              <FifthForm
                formElement={formElement}
                stepsList={stepsList}
                handleBack={handleBack}
                handleNext={handleNext}
                userInfo={personalDetails}
                setUserInfo={setPersonalDetails}
              />
            ) : null}
            {currentStepper === 5 ? (
              <SixthForm
                isAadhaarVarified={isAadhaarVarified}
                formElement={formElement}
                stepsList={stepsList}
                handleBack={handleBack}
                handleNext={handleNext}
                userInfo={personalDetails}
                setUserInfo={setPersonalDetails}
              />
            ) : null}
            {currentStepper === 6 ? (
              <SeventhForm
                formElement={formElement}
                stepsList={stepsList}
                handleBack={handleBack}
                handleNext={handleNext}
                userInfo={personalDetails}
                setUserInfo={setPersonalDetails}
              />
            ) : null}
            {currentStepper === 7 ? (
              <EighthForm
                isAadhaarVarified={isAadhaarVarified}
                formElement={formElement}
                stepsList={stepsList}
                handleBack={handleBack}
                fileTypeList={fileTypeList}
                handleViewFile={handleViewFile}
                userInfo={personalDetails}
                setUserInfo={setPersonalDetails}
                checkFileUpload={checkFileUpload}
                openUploadDocInfoModel={openUploadDocInfoModel}
                functionSlice={functionSlice}
              />
            ) : null}
          </FormContainer>
        </Box>
      </Box>
    </>
  );
};
export default AppointeeRegisterForm;
