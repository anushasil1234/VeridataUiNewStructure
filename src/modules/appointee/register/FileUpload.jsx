import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Stack,
  Switch,
  TextField,
  Typography,
  Tooltip,
} from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';
import {
  dividerStyle,
  fileUploadSectionContainerStyle,
  inputFieldStyle,
  lable1Style,
  positionRelative,
} from 'app';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getHandicapTypeDescription,
  NA,
  otherFileTypeAlias,
  tenthCertificateFileTypeAlias,
  submitConfirmationMsg,
  passportSuccessMsg,
  passportVerifyFailedMsg,
} from 'shared/constants/constants';
import {
  CardLayout,
  DateFormatYYYYMMDD,
  getLocalStorageItem,
  hasValue,
  setLocalStorageItem,
  trimmedDate,
} from 'shared/utils';
import FormHeading from './form-heading';
import {
  congratulationDialogContentTitle,
  genders,
  passportFileTypeAlias,
  imageFileTypeAlias,
  registrationSuccessDialogContentText,
  toDashboard,
  trustEpfoFileTypeAlias,
  handicapFileTypeAlias,
  uploadSizeErrorMsg,
  duplicateFiles,
} from 'shared/constants/constants';
import { DisableSection } from 'shared/components/disble-section/disble-section';
import VerificationStatus from '../../../shared/components/verification/verification-status';
import { Autorenew, HelpOutline } from '@mui/icons-material';
import { VerificationStatusSection } from '../../../shared/components/verification/verification-status-section';
import FileUploadSection from 'shared/components/file-upload-section/file-upload-section';
import uploadFileMessage from 'shared/utils/associate/upload-file-message';
import selectUANmessage from 'shared/utils/associate/select-uan-message';
import PassportFileNoSample from 'assets/images/backgrounds/file-number-in-indian-passport.png';
import { removeLoggedinData, storeLoggedinData } from 'store/slices/login-slice';
import { Radio, RadioGroup } from '@mui/material';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { FILE_SIZE_LIMIT } from 'shared/constants/constants';
import { getAppointeeDetails, getPassportDetails } from 'server/apis';
import showErrorMessage from 'shared/utils/associate/show-error-message';
import showSuccessMessage from 'shared/utils/associate/show-success-message';

const FileUpload = ({ stepsList, mode }) => {
  const [activeStep, setActiveStep] = useState(0);
  const dropdownList = useSelector((state) => state.dropdownList);
  const apiSlice = useSelector((state) => state.apiSlice);
  const loggedInData = useSelector((state) => state.loggedInData);
  const commonHooksFunctionSlice = useSelector((state) => state.commonHooksFunctionSlice);
  const functionSlice = useSelector((state) => state.functionSlice);
  const { openRemarksModel, openInfoModel, openConfirmationModel } = functionSlice[0];
  const { countryList, nationalityList, fileTypeList } =
    dropdownList && dropdownList.length > 0 && dropdownList[0];
  const genderDropdownList =
    dropdownList && dropdownList.length > 0 && dropdownList[0] && dropdownList[0].genderList;
  const { getPassportDetails, PostUpdatePfUanDetails } = apiSlice[0];
  const { navigateTo } = commonHooksFunctionSlice[0];
  const { userId, appointeeId, userCode } = loggedInData[0];

  const [genderList, setGenderList] = useState();
  const [companyId, setCompanyId] = useState(0);
  const [defaultCountry, setDefaultCountry] = useState();
  const [passportFileNumber, setPassportFileNumber] = useState('');
  const [UAN, setUAN] = useState('');
  const [memberName, setMemberName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [dateOfJoining, setDateOfJoining] = useState('');
  const [gender, setGender] = useState();
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
  const [passportAvailable, setPassportAvailable] = useState('');
  const [countryOfOrigin, setCountryOfOrigin] = useState('');
  const [passportNo, setPassportNo] = useState(null);
  const [passportValidForDate, setPassportValidForDate] = useState('');
  const [passportValidTillDate, setPassportValidTillDate] = useState('');
  const [isPhysicallyHandicap, setIsPhysicallyHandicap] = useState('');
  const [handicapType, setHandicapType] = useState('');
  const [pan, setPan] = useState(null);
  const [nameAsOnPan, setNameAsOnPan] = useState(null);
  const [aadhar, setAadhar] = useState(null);
  const [nameAsOnAadhar, setNameAsOnAadhar] = useState(null);
  const [aadharShareCode, setAadharShareCode] = useState(null);
  const [fetchUanConfirmation, setFetchUanConfirmation] = useState(false);
  const [appointeeDetailsId, setAppointeeDetailsId] = useState(0);
  const [candidteId, setCandidteId] = useState(null);
  // const [currentPageNo, setCurrentPageNo] = useState(null);
  const [clickedButton, setClickedButton] = useState(null);
  const [isAppointeeUanAvailable, setIsAppointeeUanAvailable] = useState(null);
  const [uanNumberAvailable, setUanNumberAvailable] = useState('');
  const [isPreviousSectionDisabled, setIsPreviousSectionDisabled] = useState(false);
  const [showAdditionalSection, setShowAdditionalSection] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPANModalOpen, setIsPANModalOpen] = useState(false);
  const [isUANModalOpen, setIsUANModalOpen] = useState(false);
  const [isUANAvailableState, setIsUANAvailableState] = useState(false);
  const [imageFileName, setImageFileName] = useState();
  const [epfostatusMessage, setEpfostatusMessage] = useState(new VerificationStatus());
  const [aadharstatusMessage, setAadharstatusMessage] = useState(new VerificationStatus());
  const [passportstatusMessage, setPassportStatusMessage] = useState(new VerificationStatus());
  const [panstatusMessage, setPANStatusMessage] = useState(new VerificationStatus());
  const [isPFVerificatoinReq, setIsPFVerificatoinReq] = useState(null);
  const [isAadhaarVarified, setisAadhaarVarified] = useState(null);
  const [isAadhaarXmlUploaded, setIsAadhaarXmlUploaded] = useState(false);
  const [isOfflineXmlDownloaded, setIsOfflineXmlDownloaded] = useState(false);
  const [isPanVarified, setIsPanVarified] = useState(null);
  const [isPassportVarified, setIsPassportVarified] = useState(false);
  const [isEmployementDataVarified, setIsEmployementDataVarified] = useState(null);
  const [isUanVarified, setisUanVarified] = useState(null);
  const [epfoButton, setEpfoButton] = useState(null);
  const [disabledAadharInput, setDisabledAadharInput] = useState(false);
  const [disabledPanInput, setDisabledPanInput] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isPensionApplicable, setIsPensionApplicable] = useState(null);
  const [isEpfoSectionDisabled, setIsEpfoSectionDisabled] = useState(true);
  const [isPassportVerifyBtnDisabled, setIsPassportVerifyBtnDisabled] = useState(false);
  const [isTrustEpfoAvailable, setIsTrustEpfoAvailable] = useState(true);
  const [uploadedFile, setUploadedFile] = useState([]);
  const [xmlFileUploaded, setXmlFileUploaded] = useState();
  const [fileDetails, setFileDetails] = useState([]);
  const [trustEpfoFileName, setTrustEpfoFileName] = useState();
  const [handicapFileName, setHandicapFileName] = useState();
  const [aadharXmlFileName, setAadharXmlFileName] = useState();
  const [passportFileName, setPassportFileName] = useState();
  const [tenthCertificateFileName, setTenthCertificateFileName] = useState();
  const [otherFileName, setOtherFileName] = useState();
  const [isRelationShipWithMemberDisabled, setIsRelationShipWithMemberDisabled] = useState(false);
  const [isSubmit, setIsSubmit] = useState();
  const [companyName, setCompanyName] = useState();
  const [timeoutTimer, setTimeoutTimer] = useState();
  const [fileUploaded, setFileUploaded] = useState();
  const [isNextVisible, setIsNextVisible] = useState(false);
  const [isthirdNextVisible, setIsThirdNextVisible] = useState(false);
  const [isDraft, setIsDraft] = useState(true);

  const clearFileVaribles = (fileTypeAllias, setFileName) => {
    let updatedFileDetails = [];
    let updatedFileUploaded = [];
    for (let index = 0; index < uploadedFile.length; index++) {
      const { uploadTypeAlias } = uploadedFile[index];
      if (uploadTypeAlias !== fileTypeAllias) {
        updatedFileUploaded = [...updatedFileUploaded, uploadedFile[index]];
        updatedFileDetails = [...updatedFileDetails, fileDetails[index]];
      }
    }
    setUploadedFile(updatedFileUploaded);
    setFileDetails(updatedFileDetails);
    setFileName();
  };

  const disablePassportVerifyBtn = () => {
    setIsPassportVerifyBtnDisabled(true);
  };

  const setAppointeeDetails = async (appointeeId) => {
    const response = await getAppointeeDetails(appointeeId);
    if (response) {
      let {
        appointeeDetailsId,
        candidateId,
        companyId,
        appointeeName,
        appointeeEmailId,
        aadhaarName,
        aadhaarNumber,
        panName,
        panNumber,
        passportNumber,
        passportFileNumber,
        passportValidForDate,
        passportValidTillDate,
        isPhysicallyHandicap,
        handicapType,
        isInterNationalWorker,
        nationality,
        countryOfOrigin,
        passportAvailable,
        fathersOrHusbandName,
        relationshipWithMember,
        gender,
        dateOfBirth,
        dateOfJoining,
        mobileNo,
        email,
        EPFWages,
        qualification,
        maritalStatus,
        isPensionApplicable,
        isTrustEpfoAvailable,
        isPFVerificatoinReq,
        isAadhaarVarified,
        isAadhaarXmlUploaded,
        isOfflineXmlDownloaded,
        isPanVarified,
        isPassportVarified,
        isEmployementDataVarified,
        isUanVarified,
        UAN,
        companyName,
      } = response.responseInfo;
      setAppointeeDetailsId(appointeeDetailsId);
      setCandidteId(candidateId);
      setCompanyId(companyId);
      setMemberName(appointeeName);
      setEmail(appointeeEmailId);
      setNameAsOnAadhar(aadhaarName);
      setAadhar(aadhaarNumber);
      setNameAsOnPan(panName);
      setPan(panNumber);
      setPassportNo(passportNumber);
      setPassportFileNumber(passportFileNumber);
      setPassportValidForDate(passportValidForDate);
      setPassportValidTillDate(passportValidTillDate);
      setIsPhysicallyHandicap(isPhysicallyHandicap);
      setHandicapType(handicapType);
      setisInterNationalWorker(isInterNationalWorker);
      setNationality(nationality);
      setCountryOfOrigin(countryOfOrigin);
      setPassportAvailable(passportAvailable);
      setFathersOrHusbandName(fathersOrHusbandName);
      setRelationshipWithMember(relationshipWithMember);
      setGender(gender);
      setDateOfBirth(dateOfBirth);
      setDateOfJoining(dateOfJoining);
      setMobileNo(mobileNo);
      setEmail(email);
      setEPFWages(EPFWages);
      setQualification(qualification);
      setMaritalStatus(maritalStatus);
      setIsPensionApplicable(isPensionApplicable);
      setIsTrustEpfoAvailable(isTrustEpfoAvailable);
      setIsPFVerificatoinReq(isPFVerificatoinReq);
      setisAadhaarVarified(isAadhaarVarified);
      setIsAadhaarXmlUploaded(isAadhaarXmlUploaded);
      setIsOfflineXmlDownloaded(isOfflineXmlDownloaded);
      setIsPanVarified(isPanVarified);
      setIsPassportVarified(isPassportVarified);
      setIsEmployementDataVarified(isEmployementDataVarified);
      setisUanVarified(isUanVarified);
      setUAN(UAN);
      setCompanyName(companyName);
    }
  };

  const checkFileUpload = (fileTypeAlias) => {
    return uploadedFile.some((file) => file.uploadTypeAlias === fileTypeAlias);
  };

  const hasTrustEpfoUpload = () => checkFileUpload(trustEpfoFileTypeAlias);
  const hasHandicapUpload = () => checkFileUpload(handicapFileTypeAlias);
  const hasPassportUpload = () => checkFileUpload(passportFileTypeAlias);
  const hasTenthPassCertificateUpload = () => checkFileUpload(tenthCertificateFileTypeAlias);
  const hasFathersDocCertificateUpload = () => checkFileUpload(otherFileTypeAlias);
  const hasImageUpload = () => checkFileUpload(imageFileTypeAlias);

  const openUploadDocInfoModel = (dialogContentText) => {
    openInfoModel({ dialogContentText });
  };

  const selectGender = (genderCode) => {
    setGender(genderCode);
  };

  const generateRemarks = (remarks) => {
    return (
      <Typography>
        {remarks.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </Typography>
    );
  };

  const uploadFile = ({ files }, uploadTypeAlias, setFileName) => {
    const file = files[0];
    if (file.size > FILE_SIZE_LIMIT) {
      showErrorMessage(uploadSizeErrorMsg);
      return;
    }
    if (uploadedFile.some((f) => f.name === file.name)) {
      showErrorMessage(duplicateFiles);
      return;
    }
    const fileDetails = {
      name: file.name,
      size: file.size,
      type: file.type,
      uploadTypeAlias,
    };
    setUploadedFile([...uploadedFile, fileDetails]);
    setFileDetails([...fileDetails, file]);
    setFileName(file.name);
  };

  const handleFileUpload = (fileTypeAlias, setFileName) => ({ target }) => {
    uploadFile({ files: target.files }, fileTypeAlias, setFileName);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const checkTenthPassCertificateUpload = () => {
    const isUploaded = hasTenthPassCertificateUpload() || hasValue(tenthCertificateFileName);
    if (!isUploaded) showErrorMessage('Tenth Pass Certificate file');
    return isUploaded;
  };

  const checkImageUpload = () => {
    const isUploaded = hasImageUpload() || hasValue(imageFileName);
    if (!isUploaded) showErrorMessage('Image file');
    return isUploaded;
  };

  const checkFathersDocCertificateUpload = () => {
    const isUploaded = hasFathersDocCertificateUpload() || hasValue(otherFileName);
    if (!isUploaded) showErrorMessage('Father\'s Document file');
    return isUploaded;
  };

  const checkHandicapCertificateUpload = () => {
    const isUploaded = hasHandicapUpload() || hasValue(handicapFileName);
    if (!isUploaded) showErrorMessage('Handicap Certificate file');
    return isUploaded;
  };

  const checkTrustEpfoUpload = () => {
    const isUploaded = hasTrustEpfoUpload() || hasValue(trustEpfoFileName);
    if (!isUploaded) showErrorMessage('Trust EPFO file');
    return isUploaded;
  };

  const checkPassportUploadForSpecificCountries = () => {
    const isUploaded = hasPassportUpload() || hasValue(passportFileName);
    if (!isUploaded) showErrorMessage('Passport file');
    return isUploaded;
  };

  const checkPassportUploadForOtherCountries = () => {
    const isUploaded = hasPassportUpload() || hasValue(passportFileName);
    if (!isUploaded) showErrorMessage('Passport file');
    return isUploaded;
  };

  const checkUanNumber = () => {
    if (!hasValue(UAN)) {
      showErrorMessage('UAN Number');
      return false;
    }
    return true;
  };

  const showUploadMessage = (docType) => {
    openUploadDocInfoModel(uploadFileMessage(docType));
  };

  const showSelectUanMessage = () => {
    openUploadDocInfoModel(selectUANmessage());
  };

  const handleSaveClick = () => {
    const submitconfModelContent = {
      dialogContentText: submitConfirmationMsg,
    };
    openConfirmationModel(submitconfModelContent, handleConfirmSave);
  };

  const handleConfirmSave = async () => {
    await saveDetails();
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

  const saveDetails = async () => {
    const payLoad = {
      appointeeId,
      appointeeCode: userCode,
      isSubmit: true,
      userId,
      fileDetails,
      fileUploaded,
    };
    const formData = buildFormData(payLoad);
    const response = await PostUpdatePfUanDetails(formData);
    if (response) {
      const registrationSuccessContent = {
        dialogContentText: registrationSuccessDialogContentText,
        dialogTitle: congratulationDialogContentTitle,
        maxWidth: 'sm',
        btnName: 'Go to Dashboard',
      };
      openInfoModel(registrationSuccessContent, () => navigateTo(toDashboard));
    }
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleChange = (event) => {
    setPassportFileNumber(event.target.value);
  };

  const handlePassportVerification = async () => {
    const payLoad = {
      passportNumber: passportNo,
      passportFileNumber: passportFileNumber,
      appointeeId,
      userId,
    };
    const response = await getPassportDetails(payLoad);
    if (response) {
      const { remarks, isVarified } = response.responseInfo;
      if (isVarified) {
        showSuccessMessage(passportSuccessMsg);
        setIsPassportVarified(true);
      } else {
        showErrorMessage(passportVerifyFailedMsg);
        if (hasValue(remarks)) {
          const generatedRemarks = generateRemarks(remarks);
          openRemarksModel(generatedRemarks);
        }
      }
      setPassportStatusMessage(new VerificationStatus(isVarified, 'V'));
    }
  };

  const handlePassFileNumberOnChange = (e) => {
    setPassportFileNumber(e.target.value);
  };

  const setCountryOfOriginBasedOnNationality = (nationalityLower) => {
    const country = countryList.find((country) => country.name.toLowerCase() === nationalityLower);
    if (country) {
      setCountryOfOrigin(country.id);
    }
  };

  const handlePassporFileNumbertHelp = () => {
    const dialogContent = {
      dialogTitle: 'Passport File Number',
      dialogContentText: (
        <Box>
          <Typography>Please enter the file number as shown in the image below:</Typography>
          <img src={PassportFileNoSample} alt="Passport File Number Sample" />
        </Box>
      ),
    };
    openInfoModel(dialogContent);
  };

  return null;
};

export default FileUpload;
