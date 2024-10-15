

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Link,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
  Tooltip,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import {
  activeStepStyle,
  dividerStyle,
  fileUploadSectionContainerStyle,
  genderSectionContainer,
  genderTypeStyle,
  heading2,
  indActiveStepStyle,
  inputFieldStyle,
  lable1Style,
  linkStyle,
  positionRelative,
} from "app";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getHandicapTypeDescription,
  otherFileTypeAlias,
  stepperDefaultList,
  tenthCertificateFileTypeAlias,
} from "shared/constants/constants";
import {
  CardLayout,
  CreateStepSequience,
  DateFormatYYYYMMDD,
  getLocalStorageItem,
  hasValue,
  patternChecking,
  setLocalStorageItem,
  StringToDate,
  trimmedDate,
} from "shared/utils";
import FormHeading from "./form-heading";
import {
  aadharVerifyFailedMsg,
  aadharVerifySuccessMsg,
  congratulationDialogContentTitle,
  emptyAadharMsg,
  emptyShareCodeMsg,
  emptyPanMsg,
  fetchUanConfirmationtMsg,
  genders,
  generateOtpRety,
  generateOtpSucces,
  invalidPanMsg,
  panVerifyFailedMsg,
  passportFileTypeAlias,
  passportSuccessMsg,
  passportVerifyFailedMsg,
  previousButton,
  registrationSuccessDialogContentText,
  saveAndNextbutton,
  saveButton,
  submitButton,
  submitConfirmationMsg,
  toDashboard,
  trustEpfoFileTypeAlias,
  handicapFileTypeAlias,
  uanVerifyFailedMsg,
  uanVerifySuccessMsg,
  uploadSizeErrorMsg,
  duplicateFiles,
  uploadFormatErrorMsg,
  passportExpireddMsg,
} from "shared/constants/constants";
import { DisableSection } from "shared/components/disble-section/disble-section";
import VerificationStatus from "../../../shared/components/verification/verification-status";
import { Autorenew, HelpOutline } from "@mui/icons-material";
import { VerificationStatusSection } from "../../../shared/components/verification/verification-status-section";
import FormDialog from "shared/utils/models/form-dialog";
import FileUploadSection from "shared/components/file-upload-section/file-upload-section";
import removeExtraSpaces from "shared/utils/associate/remove-extra-spaces";
import uploadFileMessage from "shared/utils/associate/upload-file-message";
import selectUANmessage from "shared/utils/associate/select-uan-message";
import VerficationAadharSteps from "shared/components/verification/verfication-aadhar";
import PassportSample from "assets/images/backgrounds/PassportSample2.jpeg";
import PassportFileNoSample from "assets/images/backgrounds/file-number-in-indian-passport.png";
import {
  removeLoggedinData,
  storeLoggedinData,
} from "store/slices/login-slice";
import { Radio, RadioGroup } from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { FILE_SIZE_LIMIT, validFileTypes } from "shared/constants/constants";

const AppointeeRegister = () => {
  const steps = ["Step 1", "Step 2", "Step 3"];

  // Function to retrieve saved step from localStorage
  const [activeStep, setActiveStep] = useState(0);
  const dropdownList = useSelector((state) => state.dropdownList);
  const apiSlice = useSelector((state) => state.apiSlice);
  const loggedInData = useSelector((state) => state.loggedInData);
  const commonHooksFunctionSlice = useSelector(
    (state) => state.commonHooksFunctionSlice
  );
  const functionSlice = useSelector((state) => state.functionSlice);
  const popUpSlice = useSelector((state) => state.popUpSlice);
  const {
    openOtpForm,
    closeOtpForm,
    openOtpSubmitionModel,
    closeOtpSubmitionModel,
    openRemarksModel,
    openConfirmationModel,
    openInfoModel,
    setRemarks,
  } = functionSlice[0];
  const { showErrorMessage, showSuccessMessage } = popUpSlice[0];
  const {
    countryList,
    nationalityList,
    relationList,
    qualificationList,
    disabilityList,
    maritalStatusList,
    fileTypeList,
  } = dropdownList && dropdownList.length > 0 && dropdownList[0];
  const genderDropdownList =
    dropdownList &&
    dropdownList.length > 0 &&
    dropdownList[0] &&
    dropdownList[0].genderList;
  const {
    postAppointeeDetails,
    getAppointeeDetails,
    getPassportDetails,
    postAppointeeFileDetails,
    PostUpdatePfUanDetails,
    getUANNumber,
    verifyAadharDetails,
    generateUANOtp,
    submitUANOTP,
    verifyPANDetails,
  } = apiSlice[0];
  const { navigateTo } = commonHooksFunctionSlice[0];
  const { userId, appointeeId, userCode } = loggedInData[0];

  const [genderList, setGenderList] = useState();
  const [companyId, setCompanyId] = useState(0);
  const [defaultCountry, setDefaultCountry] = useState();
  const [passportFileNumber, setPassportFileNumber] = useState("");
  const [UAN, setUAN] = useState("");
  const [memberName, setMemberName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [dateOfJoining, setDateOfJoining] = useState("");
  const [gender, setGender] = useState();
  const [fathersOrHusbandName, setFathersOrHusbandName] = useState("");
  const [relationshipWithMember, setRelationshipWithMember] = useState("");
  const [mobileNo, setMobileNo] = useState(null);
  const [email, setEmail] = useState(null);
  const [nationality, setNationality] = useState("");
  const [EPFWages, setEPFWages] = useState(null);
  const [qualification, setQualification] = useState(" ");
  const [maritalStatus, setMaritalStatus] = useState(" ");
  const [isInterNationalWorker, setisInterNationalWorker] = useState("N");
  const [disabledIsInterNationalWorker, setDisabledIsInterNationalWorker] =
    useState(false);
  const [passportAvailable, setPassportAvailable] = useState("");
  const [countryOfOrigin, setCountryOfOrigin] = useState("");
  const [passportNo, setPassportNo] = useState(null);
  const [passportValidForDate, setPassportValidForDate] = useState("");
  const [passportValidTillDate, setPassportValidTillDate] = useState("");
  const [isPhysicallyHandicap, setIsPhysicallyHandicap] = useState("");
  const [handicapType, setHandicapType] = useState("");
  const [pan, setPan] = useState(null);
  const [nameAsOnPan, setNameAsOnPan] = useState(null);
  const [aadhar, setAadhar] = useState(null);
  const [nameAsOnAadhar, setNameAsOnAadhar] = useState(null);
  const [aadharShareCode, setAadharShareCode] = useState(null);
  const [fetchUanConfirmation, setFetchUanConfirmation] = useState(false);
  const [appointeeDetailsId, setAppointeeDetailsId] = useState(0);
  const [candidteId, setCandidteId] = useState(null);
  const [currentPageNo, setCurrentPageNo] = useState(null);
  const [clickedButton, setClickedButton] = useState(null);
  const [isAppointeeUanAvailable, setIsAppointeeUanAvailable] = useState(null);

  const [uanNumberAvailable, setUanNumberAvailable] = useState("");
  const [isPreviousSectionDisabled, setIsPreviousSectionDisabled] =
    useState(false);
  const [showAdditionalSection, setShowAdditionalSection] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPANModalOpen, setIsPANModalOpen] = useState(false);
  const [isUANModalOpen, setIsUANModalOpen] = useState(false);
  const [isUANAvailableState, setIsUANAvailableState] = useState(false);

  const [epfostatusMessage, setEpfostatusMessage] = useState(
    new VerificationStatus()
  );
  const [aadharstatusMessage, setAadharstatusMessage] = useState(
    new VerificationStatus()
  );
  const [passportstatusMessage, setPassportStatusMessage] = useState(
    new VerificationStatus()
  );
  const [panstatusMessage, setPANStatusMessage] = useState(
    new VerificationStatus()
  );

  const passportNumberInputProps = {
    maxLength: 12,
    ...inputFieldStyle,
  };

  const [isPFVerificatoinReq, setIsPFVerificatoinReq] = useState(null);
  const [isAadhaarVarified, setisAadhaarVarified] = useState(null);
  const [isAadhaarXmlUploaded, setIsAadhaarXmlUploaded] = useState(false);
  const [isOfflineXmlDownloaded, setIsOfflineXmlDownloaded] = useState(false);
  const [isPanVarified, setIsPanVarified] = useState(null);
  const [isPassportVarified, setIsPassportVarified] = useState(false);
  const [isEmployementDataVarified, setIsEmployementDataVarified] =
    useState(null);
  const [isUanVarified, setisUanVarified] = useState(null);
  const [epfoButton, setEpfoButton] = useState(null);
  const [disabledAadharInput, setDisabledAadharInput] = useState(false);
  const [disabledPanInput, setDisabledPanInput] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isPensionApplicable, setIsPensionApplicable] = useState(null);
  const [isEpfoSectionDisabled, setIsEpfoSectionDisabled] = useState(true);
  // const [isPanSectionDisabled, setIsPanSectionDisabled] = useState(true);
  const [isPassportVerifyBtnDisabled, setIsPassportVerifyBtnDisabled] =
    useState(false);
  const [isTrustEpfoAvailable, setIsTrustEpfoAvailable] = useState(true);
  // const [isTrustPensionAvailable, setIsTrustPensionAvailable] = useState(false);
  const [uploadedFile, setUploadedFile] = useState([]);
  const [xmlFileUploaded, setXmlFileUploaded] = useState();
  const [fileDetails, setFileDetails] = useState([]);
  const [trustEpfoFileName, setTrustEpfoFileName] = useState();
  const [handicapFileName, setHandicapFileName] = useState();
  const [aadharXmlFileName, setAadharXmlFileName] = useState();
  const [passportFileName, setPassportFileName] = useState();
  const [tenthCertificateFileName, setTenthCertificateFileName] = useState();
  const [otherFileName, setOtherFileName] = useState();
  const [
    isRelationShipWithMemberDisabled,
    setIsRelationShipWithMemberDisabled,
  ] = useState(false);
  const [isSubmit, setIsSubmit] = useState();
  const [companyName, setCompanyName] = useState();
  const [timeoutTimer, setTimeoutTimer] = useState();
  const [fileUploaded, setFileUploaded] = useState();
  const [isNextVisible, setIsNextVisible] = useState(false);
  const [isthirdNextVisible, setIsThirdNextVisible] = useState(false);
  const [isDraft, setIsDraft] = useState(true);
  const [stepsList, setStepsList] = useState(
    // {personalDetails:, passportDetails:, othersDetails, cerificateFileUpload}
    stepperDefaultList
  );
  const stepCounter = 4;

  const initialTimeOfOtpTimer = () => {
    setTimeoutTimer(10 * 60);
  };
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

  const handleSpacialcharecter = (e) => {
    const char = /^[A-Za-z\s]+$/;
    const allowedKeys = [
      "Backspace",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
    ];
    if (!char.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };
  const handelSpacialCharecterPaste = (e) => {
    const paste = (e.clipboardData || window.clipboardData).getData("text");
    if (!/^[A-Za-z\s]*$/.test(paste)) {
      e.preventDefault();
    }
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
        handicapeType,
        isHandicap,
        passportValidTill,
        passportValidFrom,
        passportNo,
        originCountry,
        isPassportAvailable,
        isInternationalWorker,
        maratialStatus,
        qualification,
        epfWages,
        nationality,
        memberRelation,
        memberName,
        dateOfJoining,
        uanNumber,
        mobileNo,
        gender,
        dateOfBirth,
        passportFileNo,
        isPassportValid,
        isPFverificationReq,
        isUanVarified,
        isAadhaarVarified,
        isEmployementVarified,
        isPanVarified,
        isPensionApplicable,
        saveStep,
        companyName,
        isSubmit,
        fileUploaded,
        isUanAvailable,
        isTrustPassbook,
      } = response.responseInfo;
      setIsSubmit(isSubmit);
      setCompanyName(companyName);
      setCompanyId(companyId);
      hasValue(appointeeDetailsId)
        ? setAppointeeDetailsId(appointeeDetailsId)
        : setAppointeeDetailsId("");
      hasValue(appointeeName)
        ? setMemberName(appointeeName)
        : setMemberName("");

      setIsPensionApplicable(isPensionApplicable);
      hasValue(aadhaarName)
        ? setNameAsOnAadhar(aadhaarName)
        : setNameAsOnAadhar(appointeeName);
      hasValue(aadhaarNumber) ? setAadhar(aadhaarNumber) : setAadhar("");
      hasValue(panName)
        ? setNameAsOnPan(panName)
        : setNameAsOnPan(appointeeName);
      hasValue(panNumber) ? setPan(panNumber) : setPan("");
      hasValue(handicapeType)
        ? setHandicapType(handicapeType)
        : setHandicapType("");
      setIsPhysicallyHandicap(isHandicap);
      hasValue(passportValidTill)
        ? setPassportValidTillDate(trimmedDate(passportValidTill))
        : setPassportValidTillDate("");
      hasValue(passportValidFrom)
        ? setPassportValidForDate(trimmedDate(passportValidFrom))
        : setPassportValidForDate("");
      hasValue(passportNo) ? setPassportNo(passportNo) : setPassportNo("");
      hasValue(originCountry)
        ? setCountryOfOrigin(originCountry)
        : setCountryOfOrigin("");
      setIsPFVerificatoinReq(isPFverificationReq);
      setCandidteId(candidateId);
      setPassportAvailable(isPassportAvailable);
      setisInterNationalWorker(isInternationalWorker);
      hasValue(maratialStatus)
        ? setMaritalStatus(maratialStatus)
        : setMaritalStatus("");
      hasValue(qualification)
        ? setQualification(qualification)
        : setQualification("");
      hasValue(epfWages) ? setEPFWages(epfWages) : setEPFWages("");
      hasValue(memberName)
        ? setFathersOrHusbandName(memberName)
        : setFathersOrHusbandName("");
      hasValue(memberRelation)
        ? setRelationshipWithMember(memberRelation)
        : setRelationshipWithMember("");
      hasValue(nationality) ? setNationality(nationality) : setNationality("");
      hasValue(dateOfJoining)
        ? setDateOfJoining(trimmedDate(dateOfJoining))
        : setDateOfJoining("");
      hasValue(uanNumber) ? setUAN(uanNumber) : setUAN("");
      hasValue(mobileNo) ? setMobileNo(mobileNo) : setMobileNo("");
      hasValue(dateOfBirth)
        ? setDateOfBirth(trimmedDate(dateOfBirth))
        : setDateOfBirth("");
      passportFileNo
        ? setPassportFileNumber(passportFileNo)
        : setPassportFileNumber("");
      hasValue(gender) ? setGender(gender) : setGender("");
      hasValue(appointeeEmailId) ? setEmail(appointeeEmailId) : setEmail("");
      setisAadhaarVarified(isAadhaarVarified);
      setIsPassportVarified(isPassportValid);
      setisUanVarified(isUanVarified);
      setIsPanVarified(isPanVarified);
      setIsEmployementDataVarified(isEmployementVarified);

      if (hasValue(uanNumber) && isEmployementVarified === null) {
        epfostatusMessage.message = "N/A";
        //epfostatusMessage.color = "";
        epfostatusMessage.success = null;
        setEpfostatusMessage(epfostatusMessage);
      } else {
        setEpfostatusMessage(new VerificationStatus(isUanVarified, "V"));
      }
      setAadharstatusMessage(new VerificationStatus(isAadhaarVarified, "V"));
      setIsOfflineXmlDownloaded(isAadhaarVarified);
      setPassportStatusMessage(new VerificationStatus(isPassportValid, "V"));
      setPANStatusMessage(new VerificationStatus(isPanVarified, "V"));
      setIsDraft(saveStep == 0);
      if (hasValue(isUanAvailable)) {
        setCurrentPageNo(saveStep + 2);
        setActiveStep(saveStep + 1);
        setIsThirdNextVisible(true);
      } else {
        setActiveStep(saveStep);
        setCurrentPageNo(saveStep + 1);
      }
      setFileUploaded(fileUploaded);
      setIsAppointeeUanAvailable(isUanAvailable);
      hasValue(isUanAvailable)
        ? setUanNumberAvailable(isUanAvailable ? "yes" : "no")
        : setUanNumberAvailable(null);
      // setUanNumberAvailable(isUanAvailable ? "yes" : "no");
      hasValue(isTrustPassbook)
        ? setIsTrustEpfoAvailable(isTrustPassbook)
        : setIsTrustEpfoAvailable(true);
      updateStep(
        {
          isHandicap: isHandicap,
          isPassportAvailable: isPassportAvailable
        }
      );
    };


  }
  console.log('stepList1', stepsList);
  const updateStep = (param) => {
    const _steps = CreateStepSequience({ ...param, stepCounter })
    setStepsList({ ...stepsList, ..._steps })
  }
  console.log('stepsList', stepsList);

  const selectStep = (currentCode) => {
    console.log('stepsList.find', Object.values(stepsList));

    // return  Object.values(stepsList).find(({ step }) => step === currentCode)?.step
  }

  const fetchUanConfirmationSubmittion = (value) => {
    if (value === "Y") {
      handleGetUANNumber();
    }
    setFetchUanConfirmation(false);
  };

  const openSubmitConfirmationModel = () => {
    const submitconfModelContent = {
      dialogContentText: submitConfirmationMsg,
    };
    openConfirmationModel(submitconfModelContent, handleAppointeeFormPage2Save);
  };

  const checkFileUpload = (fileTypeAlias) => {
    const uploadTypeAlias =
      uploadedFile &&
      uploadedFile.find(({ uploadTypeAlias }) => uploadTypeAlias === fileTypeAlias);
    return hasValue(uploadTypeAlias);
  };

  // Use the generic function for specific file types
  const hasTrustEpfoUpload = () => checkFileUpload(trustEpfoFileTypeAlias);
  const hasHandicapUpload = () => checkFileUpload(handicapFileTypeAlias);
  const hasPassportUpload = () => checkFileUpload(passportFileTypeAlias);
  const hasTenthPassCertificateUpload = () => checkFileUpload(tenthCertificateFileTypeAlias);
  const hasFathersDocCertificateUpload = () => checkFileUpload(otherFileTypeAlias);


  const openUploadDocInfoModel = (dialogContentText) => {
    openInfoModel({ dialogContentText });
  };
  const openOfflineKycInfoModel = () => {
    const offlineKycContent = {
      dialogTitle: "Offline Aadhaar Kyc Steps Info",
      dialogContentText:
        "To complete the offline aadhar kyc process please follow the instructions given below :",
      dialogContentComponent: <VerficationAadharSteps />,
      fullWidth: true,
    };
    openInfoModel(offlineKycContent);
  };

  const submitDetails = (autoSubmit) => {
    if (autoSubmit) {
      handleAppointeeFormPage2Save();
    } else {
      openSubmitConfirmationModel();
    }
  };
  const selectGender = (genderCode) => {
    const selectedGender = genderCode;
    const updatedGender =
      genderDropdownList &&
      genderDropdownList.map((gender, index) => {
        let selected = false;
        if (gender.code === selectedGender) {
          selected = true;
          setGender(gender.code);
        }
        return {
          ...gender,
          selected: selected,
          icon: genders[index].icon,
          selectGender,
        };
      }, genders);
    setGenderList(updatedGender);
  };

  useEffect(() => {
    // Save the active step to localStorage whenever it changes
    localStorage.setItem("activeStep", activeStep);
  }, [activeStep]);

  useEffect(() => {
    if (countryList !== undefined) {
      const defaultCountry =
        countryList &&
        countryList?.find(({ value }) => value?.toUpperCase() === "INDIA")
          ?.value;
      setDefaultCountry(defaultCountry);

      setAppointeeDetails(appointeeId);
    }
  }, [countryList]);


  useEffect(() => {
    if (!hasValue(UAN)) {
      setEpfoButton("Fetch N Verify UAN");
    } else {
      setEpfoButton("Employement Verification");
      setDisabledPanInput(true);
      // setDisabledAadharInput(true);
    }
  }, [UAN]);
  useEffect(() => {
    if (genderDropdownList && gender !== undefined) {
      selectGender(gender);
    }
  }, [genderDropdownList, gender]);

  useEffect(() => {
    if (!isTrustEpfoAvailable) {
      clearFileVaribles(trustEpfoFileTypeAlias, setTrustEpfoFileName);
    }
  }, [isTrustEpfoAvailable]);
  useEffect(() => {
    if (
      isAadhaarVarified === true &&
      isPanVarified === true &&
      isUanVarified !== null &&
      isEmployementDataVarified !== null
    ) {
      setIsSubmitDisabled(false);
    }
    if (isPanVarified) {
      setDisabledPanInput(true);
    }

    if (isPanVarified !== null) {
      setIsEpfoSectionDisabled(false);
    }

    if (isAadhaarVarified !== null) {
      // setIsPanSectionDisabled(false);
    }
    if (isAadhaarVarified) {
      setDisabledAadharInput(true);
    }
    if (isEmployementDataVarified === null && isSubmit === false) {
      if (
        isAadhaarVarified &&
        isPanVarified &&
        isUanVarified &&
        !hasValue(UAN)
      ) {
        submitDetails(true);
      }
    }
    if (
      isAadhaarVarified &&
      isPanVarified &&
      isUanVarified &&
      hasValue(UAN) &&
      isEmployementDataVarified
    ) {
      submitDetails(true);
    }
  }, [
    isAadhaarVarified,
    isPanVarified,
    isEmployementDataVarified,
    isUanVarified,
    UAN,
  ]);

  // useEffect to check if UAN appointee is available on page load
  useEffect(() => {
    if (hasValue(isAppointeeUanAvailable)) {
      setIsPreviousSectionDisabled(true);
    }

  }, [isAppointeeUanAvailable]);
  console.log('isPhysicallyHandicap234234', isPhysicallyHandicap);


  useEffect(() => {
    if (gender === "M") {
      setRelationshipWithMember("F");
      setIsRelationShipWithMemberDisabled(true);
    } else {
      setIsRelationShipWithMemberDisabled(false);
    }
  }, [gender]);

  useEffect(() => {
    if (passportAvailable === "Y") {
      const nationalityLower = nationality?.toLowerCase();
      // determineIsInternationalWorker(nationalityLower, defaultCountry);
      setCountryOfOriginBasedOnNationality(nationalityLower);
    }
  }, [nationality, passportAvailable]);

  useEffect(() => {
    updateStepCounter(isPhysicallyHandicap);
    if (isPhysicallyHandicap === 'N') {
      clearFileVaribles(handicapFileTypeAlias, setHandicapFileName);
    }
    // updateStepList(isPhysicallyHandicap, 'Handicap Verification');
  }, [isPhysicallyHandicap])
  useEffect(() => {
    updateStepCounter(passportAvailable);
    // updateStepList(isPhysicallyHandicap, 'Handicap Verification');
  }, [passportAvailable])
  const updateStepCounter = (value) => {
    // if (value === 'Y') {
    //   setStepCounter(stepCounter + 1);
    // }
    // if (value === 'N') {
    //   setStepCounter(stepCounter - 1);
    // }
  }
  console.log('stepCounter: ', stepCounter);

  // useEffect(() => {
  //   if (!isPhysicallyHandicap) {
  //     clearFileVaribles(handicapFileTypeAlias, setHandicapFileName);
  //   }
  //   if (isPhysicallyHandicap === 'Y') {
  //     // setStepsList([...stepsList, 'Handicap verification']);
  //     setStepCounter(stepCounter + 1);
  //   } else {
  //     // const updatedStepList = stepsList.filter(item => item !== 'Handicap verification');
  //     setStepCounter(stepCounter - 1);
  //     // setStepsList(updatedStepList);
  //   }
  //   // updateStepList(isPhysicallyHandicap, 'Handicap Verification');
  // }, [isPhysicallyHandicap])
  // useEffect(() => {
  //   if (isPassportVarified === 'Y') {
  //     setStepsList([...stepsList, 'Passport Verification']);
  //   } else {
  //     const updatedStepList = stepsList.filter(item => item !== 'Passport Verification');
  //     setStepsList(updatedStepList);
  //   }
  //   // updateStepList(isPassportVarified, 'Passport Verification');
  // }, [isPassportVarified])
  console.log('stepsList outside', stepsList);

  const updateStepList = (stepStatus, stepName) => {
    if (stepStatus === 'Y') {
      setStepsList([...stepsList, stepName]);
    } else {
      const updatedStepList = stepsList.filter(item => item !== stepName);
      setStepsList(updatedStepList);
    }

  }
  const stepsNumber = (code) => {
    console.log('stepsList inside stepnumber', stepsList);
    // console.log('code13', code, stepsList.findIndex((element) => element === code) + 1);
    // // console.log('stepsList.findIndex((element) => element === code) + 1', stepsList.findIndex((element) => element === code) + 1);
    // return stepsList.findIndex((element) => element === code) + 1;
  }

  const generateRemarks = (remarks) => {
    let remarksList = [];
    if (hasValue(remarks)) {
      remarksList = remarks.split(",").map((remark) => {
        return {
          remarksCategory: "NRML",
          remarks: remark,
        };
      });
    }
    return remarksList;
  };
  const uploadFile = ({ files }, uploadTypeAlias, setFileName) => {
    const fileData = files[0];
    const { name, size, type } = fileData;
    const isFileExists = fileDetails.find((currentFileData) => {
      return (
        currentFileData.name === name &&
        currentFileData.size === size &&
        currentFileData.type === type
      );
    });
    if (isFileExists) {
      showErrorMessage(duplicateFiles);
    } else {
      if (size <= FILE_SIZE_LIMIT) {
        setFileName(name);
        const { id } =
          fileTypeList &&
          fileTypeList.length > 0 &&
          fileTypeList.find(({ code }) => code === uploadTypeAlias);
        const file = {
          fileName: name,
          mimeType: type,
          fileLength: size,
          uploadTypeId: id,
          uploadTypeAlias: uploadTypeAlias,
          isFileUploaded: true,
        };
        setUploadedFile([...uploadedFile, file]);
        setFileDetails([...fileDetails, fileData]);
      } else {
        showErrorMessage(uploadSizeErrorMsg);
      }
    }
  };

  const uploadAadharXmlFile = ({ target }) => {
    // uploadFile(target, "ADH", setAadharXmlFileName);
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
      setAadharXmlFileName(name);
      setXmlFileUploaded(fileData);
    }
    setIsAadhaarXmlUploaded(true);
  };

  const handleFileUpload = (fileTypeAlias, setFileName) => ({ target }) => {
    uploadFile(target, fileTypeAlias, setFileName);
  };

  const uploadTrustEPFOFile = handleFileUpload(trustEpfoFileTypeAlias, setTrustEpfoFileName);
  const uploadHandicapFile = handleFileUpload(handicapFileTypeAlias, setHandicapFileName);
  const uploadPassportFile = handleFileUpload(passportFileTypeAlias, setPassportFileName);
  const upload10thCertificateFile = handleFileUpload(tenthCertificateFileTypeAlias, setTenthCertificateFileName);
  const uploadFathersDocFile = handleFileUpload(otherFileTypeAlias, setOtherFileName);

  const verifyAadhar = async () => {
    let formData = new FormData();
    formData.append("appointeeId", appointeeId);
    formData.append("aadharName", nameAsOnAadhar.trim());
    formData.append("userId", userId);
    formData.append("appointeeId", appointeeId);
    formData.append("shareCode", aadharShareCode.trim());
    formData.append("aadharFileDetails", xmlFileUploaded);

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
      // setIsPanSectionDisabled(false);
      closeOtpSubmitionModel();
      setAadharstatusMessage(new VerificationStatus(isVarified, "V"));
    }
  };

  const handleAadharVerifiaction = () => {
    if (!(hasValue(aadharShareCode) && hasValue(nameAsOnAadhar))) {
      if (!hasValue(aadharShareCode)) {
        showErrorMessage(emptyShareCodeMsg);
      } else {
        showErrorMessage(emptyAadharMsg);
      }
    } else {
      verifyAadhar();
      // openOtpForm(aadhar, "Aadhaar Number", validateAadharOtp);
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
      // setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
      setActiveStep(activeStep - 1);
      setCurrentPageNo(currentPageNo - 1);
    }
  };

  // Check if 10th pass certificate is uploaded
  const checkTenthPassCertificateUpload = () => {
    if (!hasTenthPassCertificateUpload()) {
      showUploadMessage("10th pass certificate");
      return false;
    }
    return true;
  };

  // Check if father's doc certificate is uploaded
  const checkFathersDocCertificateUpload = () => {
    if (!hasFathersDocCertificateUpload()) {
      showUploadMessage("father's name attached certificate");
      return false;
    }
    return true;
  };

  // Check if handicap certificate is uploaded (only if applicable)
  const checkHandicapCertificateUpload = () => {
    if (isPhysicallyHandicap === "Y" && !hasHandicapUpload()) {
      showUploadMessage("handicap certificate");
      return false;
    }
    return true;
  };

  // Check if Trust EPFO is uploaded (only if applicable)
  const checkTrustEpfoUpload = () => {
    if (isTrustEpfoAvailable === true && !hasTrustEpfoUpload()) {
      showUploadMessage("trust epfo passbook");
      return false;
    }
    return true;
  };

  // Check if passport is uploaded for specific countries (India, Nepal, Bhutan)
  const checkPassportUploadForSpecificCountries = () => {
    if (
      hasValue(countryOfOrigin) &&
      (countryOfOrigin === "India" || countryOfOrigin === "Nepal" || countryOfOrigin === "Bhutan")
    ) {
      if (passportAvailable === "Y" && !hasPassportUpload()) {
        showUploadMessage("passport file");
        return false;
      }
    }
    return true;
  };

  // Check if passport is uploaded for other countries
  const checkPassportUploadForOtherCountries = () => {
    if (
      hasValue(countryOfOrigin) &&
      (countryOfOrigin !== "India" && countryOfOrigin !== "Nepal" && countryOfOrigin !== "Bhutan")
    ) {
      if (passportAvailable === "Y" && !hasPassportUpload()) {
        showUploadMessage("visa");
        return false;
      }
    }
    return true;
  };

  // Check if UAN number is selected
  const checkUanNumber = () => {
    if (!uanNumberAvailable) {
      showSelectUanMessage();
      return false;
    }
    return true;
  };

  // Function to show upload message
  const showUploadMessage = (docType) => {
    let dialogContentText = (
      <Typography>
        {uploadFileMessage(docType)}, then save the details
      </Typography>
    );
    openUploadDocInfoModel(dialogContentText);
  };

  // Function to show UAN selection message
  const showSelectUanMessage = () => {
    let dialogContentText = (
      <Typography>
        {selectUANmessage("whether you have a UAN number (Yes or No)")}, then save the details
      </Typography>
    );
    openUploadDocInfoModel(dialogContentText);
  };

  const handleSaveClick = () => {

    if (!checkTenthPassCertificateUpload()) return;
    if (!checkFathersDocCertificateUpload()) return;
    if (!checkHandicapCertificateUpload()) return;
    if (!checkTrustEpfoUpload()) return;
    if (!checkPassportUploadForSpecificCountries()) return;
    if (!checkPassportUploadForOtherCountries()) return;
    if (!checkUanNumber()) return;

    // If all conditions are met, open the confirmation modal
    handleOpenModal(); // Trigger "Are you sure" modal
  };


  const handleConfirmSave = async () => {
    // Once the user confirms, save the details
    await saveDetails();
    handleCloseModal(); // Close the confirmation modal after saving
    setIsThirdNextVisible(true);
    //setCurrentPageNo(3);
  };


  const buildFormData = (payLoad) => {
    let formData = new FormData();
    for (const property in payLoad) {
      if (Object.hasOwnProperty.call(payLoad, property)) {
        if (payLoad[property] === "") {
          delete payLoad[property];
        } else {
          if (property === "fileUploaded") {
            formData.append(`${property}`, JSON.stringify(payLoad[property]));
          } else if (property === "FileDetails") {
            if (payLoad?.FileDetails?.length > 0) {
              // If FileDetails is not empty, append the first element
              payLoad?.FileDetails?.forEach((element, index) => {
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
    let isUANAvailable = uanNumberAvailable === "yes" ? true : false;
    setIsUANAvailableState(isUANAvailable);

    // Proceed with the rest of the logic if verification passes
    let payLoad = {
      appointeeId: appointeeId,
      userId: userId,
      appointeeCode: userCode,
      trustPassbookAvailable: isTrustEpfoAvailable,
      IsUanAvailable: isUANAvailable,
      FileDetails: fileDetails,
      fileUploaded: uploadedFile,
    };
    // Use the buildFormData helper function to create the formData
    let formData = buildFormData(payLoad);

    // let formData = new FormData();
    // for (const property in payLoad) {
    //   if (Object.hasOwnProperty.call(payLoad, property)) {
    //     if (payLoad[property] === "") {
    //       delete payLoad[property];
    //     } else {
    //       if (property === "fileUploaded") {
    //         formData.append(`${property}`, JSON.stringify(payLoad[property]));
    //       } else if (property === "FileDetails") {
    //         if (payLoad?.FileDetails?.length > 0) {
    //           // If FileDetails is not empty, append the first element
    //           payLoad?.FileDetails?.forEach((element, index) => {
    //             formData.append(`${property}`, payLoad[property][index]);
    //           });
    //         }
    //       } else {
    //         formData.append(`${property}`, payLoad[property]);
    //       }
    //     }
    //   }
    // }

    // Make the API call
    const response = await PostUpdatePfUanDetails(formData);
    if (response) {
      handleNext();
      setIsPreviousSectionDisabled(true);
      // setShowAdditionalSection(true);

      //setIsUANappointeeAvailable(true)
      clearFileVaribles(trustEpfoFileTypeAlias, setTrustEpfoFileName);
      clearFileVaribles(handicapFileTypeAlias, setHandicapFileName);
      clearFileVaribles(passportFileTypeAlias, setPassportFileName);
    }
  };

  const verifyPAN = async () => {
    const payLoad = {
      appointeeId: appointeeId,
      panNummber: pan,
      panName: hasValue(nameAsOnPan) ? removeExtraSpaces(nameAsOnPan) : null,
      userId: userId,
    };
    const response = await verifyPANDetails(payLoad);
    if (response) {
      const { remarks, isValid } = response.responseInfo;
      setIsPanVarified(isValid);
      if (isValid) {
        setIsEpfoSectionDisabled(false);
        //showSuccessMessage(panSuccessMsg);
        setIsPANModalOpen(true);
        //handleGetUANNumber();
      } else {
        showErrorMessage(panVerifyFailedMsg);
        if (hasValue(remarks)) {
          const generatedRemarks = generateRemarks(remarks);
          openRemarksModel(generatedRemarks);
        }
      }
      setPANStatusMessage(new VerificationStatus(isValid, "V"));
    }
  };

  // Function to handle dialog confirmation
  const handleDialogConfirm = () => {
    setIsPANModalOpen(false); // Close the dialog
    handleGetUANNumber(); // Now call the function to get UAN number
    setCurrentPageNo(3);
  };

  const handleDialogCancel = () => {
    setIsPANModalOpen(false); // Just close the dialog without calling UAN
  };

  const handlePanVerifiaction = () => {
    if (pan === null || nameAsOnPan === null || nameAsOnPan === "") {
      showErrorMessage(emptyPanMsg);
    } else if (!patternChecking(pan, /^[A-Z]{5}[0-9]{4}[A-Z]{1}/)) {
      showErrorMessage(invalidPanMsg);
    } else {
      verifyPAN();
    }
  };

  const handleAppointeeFormPage1Save = async (formElement) => {
    formElement.preventDefault();
    const loginUserData = getLocalStorageItem("pfc-user");
    let payLoad = {
      appointeeDetailsId: appointeeDetailsId,
      appointeeId: appointeeId,
      candidateId: candidteId,
      appointeeCode: userCode,
      companyId: companyId,
      appointeeName: memberName,
      appointeeEmailId: email,
      dateOfBirth: dateOfBirth,
      gender: gender,
      mobileNo: mobileNo,
      uanNumber: UAN,
      dateOfJoining: dateOfJoining,
      memberName: fathersOrHusbandName,
      memberRelation: relationshipWithMember,
      nationality: nationality,
      epfWages: EPFWages,
      qualification: qualification,
      maratialStatus: maritalStatus,
      isPassportAvailable: passportAvailable,
      isInternationalWorker: isInterNationalWorker,
      originCountry: countryOfOrigin,
      passportNo: passportNo,
      passportValidFrom: passportValidForDate,
      passportValidTill: passportValidTillDate,
      isHandicap: isPhysicallyHandicap,
      handicapeType: handicapType,
      IsPFverificationReq: isPFVerificatoinReq,
      panName: nameAsOnPan,
      panNumber: pan,
      isAadhaarVarified,
      isPensionApplicable,
      isUanVarified,
      userId: userId,
      companyName,
      isSubmit: clickedButton === "S" ? false : true,
    };
    for (const key in payLoad) {
      if (Object.hasOwnProperty.call(payLoad, key)) {
        if (payLoad[key] === "") {
          payLoad[key] = null;
        }
      }
    }
    const response = await postAppointeeDetails(payLoad);
    if (response) {
      setLocalStorageItem("pfc-user", {
        ...loginUserData,
        //isSubmit: true,
        status: 'Ongoing'
      });
      dispatch(removeLoggedinData());
      dispatch(storeLoggedinData({
        ...loginUserData,
        //isSubmit: true,
        status: 'Ongoing'
      }))
      if (clickedButton === "N") {
        //setActiveStep((prevActiveStep) => Math.min(prevActiveStep + 1, steps.length - 1));
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setCurrentPageNo(2);
        setIsNextVisible(true);
        setIsDraft(false);
        console.log('passportAvailable', passportAvailable);

        updateStep(
          {
            isHandicap: isPhysicallyHandicap,
            isPassportAvailable: passportAvailable
          }
        );
      }
    }
  };
  const dispatch = useDispatch();

  const handleAppointeeFormPage2Save = async () => {
    const loginUserData = getLocalStorageItem("pfc-user");
    let payLoad = {
      appointeeDetailsId: appointeeDetailsId,
      appointeeId: appointeeId,
      appointeeCode: userCode,
      // trustPassbookAvailable: isTrustEpfoAvailable,
      //trustPensionAvailable: isTrustPensionAvailable,
      isSubmit: true,
      userId: userId,
      FileDetails: fileDetails,
      fileUploaded: uploadedFile,
    };
    // Use the buildFormData helper function to create the formData
    let formData = buildFormData(payLoad);
    // let formData = new FormData();
    // for (const property in payLoad) {
    //   if (Object.hasOwnProperty.call(payLoad, property)) {
    //     if (payLoad[property] === "") {
    //       delete payLoad[property];
    //     } else {
    //       if (property === "fileUploaded") {
    //         formData.append(`${property}`, JSON.stringify(payLoad[property]));
    //       } else if (property === "FileDetails") {
    //         payLoad?.FileDetails.forEach((element) => {
    //           formData.append("FileDetails", element);
    //         });
    //       } else {
    //         formData.append(`${property}`, payLoad[property]);
    //       }
    //     }
    //   }
    // }
    const response = await postAppointeeFileDetails(formData);
    if (response) {
      setLocalStorageItem("pfc-user", {
        ...loginUserData,
        isSubmit: true,
        status: "Submitted",
      });
      dispatch(removeLoggedinData());
      dispatch(
        storeLoggedinData({
          ...loginUserData,
          isSubmit: true,
          status: "Submitted",
        })
      );

      const registrationSuccessContent = {
        dialogContentText: registrationSuccessDialogContentText,
        dialogTitle: congratulationDialogContentTitle,
        maxWidth: "sm",
        btnName: "Go to Dashboard",
      };
      openInfoModel(registrationSuccessContent, () => navigateTo(toDashboard));
    }
    //}
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setCurrentPageNo(3);
  };

  const handleSecondNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setCurrentPageNo(2);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setUanNumberAvailable(value);
  };

  const handleEpfoButtonClick = () => {
    if (!hasValue(UAN)) {
      if (isPanVarified === false || isAadhaarVarified === false) {
        const confirmationModelContent = {
          dialogContentText: fetchUanConfirmationtMsg,
        };
        openConfirmationModel(confirmationModelContent, handleGetUANNumber);
      } else {
        handleGetUANNumber();
      }
    } else handleEpfoVerifiaction();
  };
  const handleGetUANNumber = async () => {
    const payLoad = {
      aaddharNumber: hasValue(aadhar) ? removeExtraSpaces(aadhar) : null,
      appointeeId,
      panNumber: hasValue(pan) ? removeExtraSpaces(pan) : null,
      mobileNumber: hasValue(mobileNo) ? removeExtraSpaces(mobileNo) : null,
      userId,
    };

    const response = await getUANNumber(payLoad);
    if (response) {
      const { isUanAvailable, uanNumber, remarks, isVarified } =
        response.responseInfo;
      if (isVarified) {
        setIsUANModalOpen(true); // Open the dialog when UAN is available
        setUAN(uanNumber); // Save the uanNumber to the existing state
        setisUanVarified(true);
      } else if (
        isUANAvailableState === false &&
        !isUanAvailable &&
        !hasValue(uanNumber)
      ) {
        setisUanVarified(true);
        // setIsEmployementDataVarified(false);
      } else {
        setisUanVarified(false);
        showErrorMessage(remarks);
      }

      setEpfostatusMessage(epfostatusMessage);
    }
  };


  const handleDialogOk = () => {
    setIsUANModalOpen(false); // Close the dialog

    // Perform the below actions using the already existing 'uan' state
    setEpfoButton("Employement Verification");
    epfostatusMessage.message = "N/A";
    //epfostatusMessage.color = "";
    epfostatusMessage.success = null;
    setEpfostatusMessage(epfostatusMessage);

    // Proceed to open OTP form for UAN verification
    openOtpForm(
      UAN,
      "UAN Number",
      () => validateUANOtp(UAN),
      "Generate OTP for PF Verification"
    );
  };

  const handlePassportVerification = async () => {
    const payLoad = {
      appointeeId,
      userId,
      passportFileNo: passportFileNumber,
      dateOfBirth: DateFormatYYYYMMDD(dateOfBirth),
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
      setPassportStatusMessage(new VerificationStatus(isValid, "V"));
    }
  };

  const verifyUAN = async (otp, clientId) => {
    const payLoad = {
      appointeeId: appointeeId,
      otp: otp,
      client_id: clientId,
      userId: userId,
      AppointeeCode: userCode,
    };
    const response = await submitUANOTP(payLoad);
    if (response) {
      const { remarks, isVarified } = response.responseInfo;
      if (isVarified) {
        showSuccessMessage(uanVerifySuccessMsg);
        setIsEmployementDataVarified(true);
      } else {
        showErrorMessage(uanVerifyFailedMsg);
        if (hasValue(remarks)) {
          const generatedRemarks = generateRemarks(remarks);
          openRemarksModel(generatedRemarks);
        }
      }
      setisUanVarified(isVarified);
      closeOtpSubmitionModel();
      setEpfostatusMessage(new VerificationStatus(isVarified, "V"));
    }
  };
  const validateUANOtp = async (uanNumber) => {
    const payLoad = {
      uanNumber,
      appointeeId,
      userId,
    };
    const response = await generateUANOtp(payLoad);
    if (response) {
      const { responseInfo } = response;

      let { otp_sent, client_id } = responseInfo;
      if (!otp_sent) {
        showErrorMessage(generateOtpRety);
      } else {
        initialTimeOfOtpTimer();
        showSuccessMessage(generateOtpSucces);
        closeOtpForm();
        openOtpSubmitionModel({
          otpSubmitionFunction: (otp) => verifyUAN(otp, client_id),
          timeoutTimer: timeoutTimer,
          setTimeoutTimer: setTimeoutTimer,
        });
      }
    }
  };

  const handleEpfoVerifiaction = () => {
    openOtpForm(
      UAN,
      "UAN Number",
      () => validateUANOtp(UAN),
      "Generate OTP for PF Verification"
    );
    setIsEmployementDataVarified(true);
  };

  const formElement = useRef(null);

  const handlePassFileNumberOnChange = (e) => {
    const { value } = e.target;
    setPassportFileNumber(value);
  };
  const handleIsOfflineXmlDownloadedOnChange = (e) => {
    setIsOfflineXmlDownloaded(e.target.checked);
  };
  const handleInternationalWorkerOnChange = (e) => {
    const { value } = e.target;
    setisInterNationalWorker(value);
    if (value === "Y") {
      const nationalityLower = nationality?.toLowerCase();
      const matchedNationality = nationalityList.find(
        (element) => element.value?.toLowerCase() === nationalityLower
      );
      const index = nationalityList.indexOf(matchedNationality);
      setCountryOfOrigin(countryList[index]?.value);
      // setCountryOfOrigin();
    }
    if (value === "N") {
      setCountryOfOrigin(defaultCountry);
    }
  };

  const today = DateFormatYYYYMMDD(new Date());
  const PasswordExpiryValidity = (e) => {
    const expiryDate = e.target.value;
    if (expiryDate > StringToDate(new Date())) {
      setPassportValidTillDate(expiryDate);
    } else {
      const formattedMessage = passportExpireddMsg
        ? passportExpireddMsg.split(". ").map((sentence, index) => (
          <React.Fragment key={index}>
            {`${sentence}.`}
            {index < passportExpireddMsg.split(". ").length - 1 && <br />}
          </React.Fragment>
        ))
        : "";
      showErrorMessage(formattedMessage);
    }
  };

  const setCountryOfOriginBasedOnNationality = (nationalityLower) => {
    const matchedNationality = nationalityList.find(
      (element) => element.value?.toLowerCase() === nationalityLower
    );

    if (matchedNationality) {
      const index = nationalityList.indexOf(matchedNationality);

      if (
        defaultCountry?.toLowerCase() ===
        countryList[index]?.value?.toLowerCase()
      ) {
        setisInterNationalWorker("N");
        setDisabledIsInterNationalWorker(true);
      } else {
        setisInterNationalWorker("Y");
        setDisabledIsInterNationalWorker(false);
      }
      setCountryOfOrigin(countryList[index]?.value || defaultCountry);
    } else {
      setCountryOfOrigin(defaultCountry);
    }
  };


  const resetPassportDetails = () => {
    setisInterNationalWorker("N");
    setCountryOfOrigin("");
    setPassportNo("");
    setPassportValidForDate("");
    setPassportValidTillDate("");
    setDisabledIsInterNationalWorker(false); // Optional: enable the field if "No" is selected
  };

  const handleIsPassportAvailableOnChange = (e) => {
    const { value } = e.target;
    setPassportAvailable(value);

    if (value === "Y") {
      const nationalityLower = nationality?.toLowerCase();

      // determineIsInternationalWorker(nationalityLower, defaultCountry);
      setCountryOfOriginBasedOnNationality(nationalityLower);
    } else if (value === "N") {
      resetPassportDetails();
    }
  };

  const handlePassporNumbertHelp = () => {
    const passportHelpContent = {
      dialogContentText: "",
      dialogTitle: "PASSPORT HELP",
      dialogContentComponent: (
        <img
          src={PassportSample}
          alt="Help"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      ),
      maxWidth: "sm",
      btnName: "Close",
    };
    openInfoModel(passportHelpContent);
  };
  const handlePassporFileNumbertHelp = () => {
    const passportHelpContent = {
      dialogContentText: "",
      dialogTitle: "PASSPORT FILE NO. HELP",
      dialogContentComponent: (
        <img
          src={PassportFileNoSample}
          alt="Help"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      ),
      maxWidth: "sm",
      btnName: "Close",
    };
    openInfoModel(passportHelpContent);
  };



  return (
    <CardLayout>
      {currentPageNo === 2 && (
        <Typography sx={{ ...heading2, mb: 3 }}>
          Your personal details must match with your Aadhaar details
        </Typography>
      )}
      {/* <NonLinearStepper/> */}
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label} completed={activeStep > index}>
              <StepLabel sx={activeStep === index ? activeStepStyle : indActiveStepStyle}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box my={"20px"}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid
              container
              rowSpacing={1}
              columnSpacing={2.5}
              item
              xs={12}
              md={12}
            >
              {currentPageNo === 1 ? (
                <>
                  <Box sx={{ marginTop: "1.8rem" }}>
                    <form onSubmit={handleAppointeeFormPage1Save}>
                      <Grid
                        sx={{ paddingLeft: "20px" }}
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                      >
                        <Grid
                          container
                          rowSpacing={1}
                          columnSpacing={2.5}
                          item
                          xs={12}
                        >
                          <Grid item xs={12}>
                            <FormHeading
                              step={stepsList.PD.step}
                              heading={stepsList.PD.name}
                              info={
                                "Enter all your Personal Details like Gender, DOB to verify with Adhar, PAN, UAN."
                              }
                            />
                          </Grid>
                          {genderList &&
                            genderList.map((gender, index) => {
                              const {
                                value,
                                icon,
                                selected,
                                id,
                                code,
                                selectGender,
                              } = gender;
                              const selectedGenderColor = selected
                                ? "#b049c0"
                                : "#C7C7D2";
                              const bgcolor = selected ? "#f6dff9" : "#F4F6FA";
                              const currentGenderSectionContainer = {
                                ...genderSectionContainer,
                                color: selectedGenderColor,
                                bgcolor: bgcolor,
                                cursor: isAadhaarVarified
                                  ? "cursor"
                                  : "pointer",
                                border: `2px solid ${selectedGenderColor}`,
                              };

                              return (
                                <Grid key={index} item xs={12} md={4}>
                                  {isAadhaarVarified ? (
                                    <Stack
                                      id={id}
                                      sx={currentGenderSectionContainer}
                                    >
                                      {icon}
                                      <Typography
                                        fontSize="2rem"
                                        sx={genderTypeStyle}
                                      >
                                        {value}
                                      </Typography>
                                    </Stack>
                                  ) : (
                                    <Stack
                                      id={id}
                                      sx={currentGenderSectionContainer}
                                      onClick={() => {
                                        selectGender(code);
                                      }}
                                    >
                                      {icon}
                                      <Typography
                                        fontSize="2rem"
                                        sx={genderTypeStyle}
                                      >
                                        {value}
                                      </Typography>
                                    </Stack>
                                  )}
                                </Grid>
                              );
                            })}
                        </Grid>
                        <Grid
                          container
                          rowSpacing={1}
                          columnSpacing={2.5}
                          item
                          xs={12}
                        >
                          <Grid
                            container
                            rowSpacing={2}
                            columnSpacing={2.5}
                            item
                            xs={12}
                            md={12}
                          >
                            <Grid item xs={12} md={6}>
                              <Typography sx={lable1Style}>
                                Name
                                <span className="requiredField">*</span>
                              </Typography>
                              <TextField
                                onChange={(e) => {
                                  setMemberName(e.target.value);
                                }}
                                error={false}
                                style={inputFieldStyle}
                                type="text"
                                className="customeTextField"
                                variant="outlined"
                                defaultValue={" "}
                                value={memberName}
                                disabled
                                inputStyle={{ padding: 0 }}
                                InputProps={{
                                  readOnly: true,
                                  style: {
                                    padding: 0,
                                    color: "#000",
                                  },
                                }}
                              />
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Typography sx={lable1Style}>
                                Date Of Birth
                                <span className="requiredField">*</span>
                              </Typography>

                              <TextField
                                onChange={(e) => {
                                  setDateOfBirth(e.target.value);
                                }}
                                error={false}
                                id="date"
                                className="customeTextField"
                                type="date"
                                defaultValue="yyy-mm-dd"
                                value={dateOfBirth}
                                disabled={isAadhaarVarified}
                                sx={{ ...inputFieldStyle }}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                InputProps={{ inputProps: { max: today } }}
                              />
                            </Grid>

                            <Grid item xs={12} md={6}>
                              <Typography sx={lable1Style}>
                                Father's/ Husband's Name
                                <span className="requiredField">*</span>
                              </Typography>

                              <TextField
                                error={false}
                                style={inputFieldStyle}
                                type="text"
                                className="customeTextField"
                                variant="outlined"
                                onKeyDown={handleSpacialcharecter}
                                onPaste={handelSpacialCharecterPaste}
                                onChange={(e) => {
                                  setFathersOrHusbandName(e.target.value);
                                }}
                                value={fathersOrHusbandName}
                                defaultValue={" "}
                                inputProps={{ maxLength: 50 }}
                              />
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <FormControl fullWidth>
                                <Typography sx={lable1Style}>
                                  Relationship{" "}
                                  <span className="requiredField">*</span>
                                </Typography>
                                {relationshipWithMember !== undefined && (
                                  <Select
                                    error={false}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    className="customeTextField"
                                    disabled={isRelationShipWithMemberDisabled}
                                    sx={inputFieldStyle}
                                    onChange={(e) => {
                                      setRelationshipWithMember(e.target.value);
                                    }}
                                    value={relationshipWithMember}
                                  >
                                    {relationList &&
                                      relationList.map((element) => {
                                        return (
                                          <MenuItem
                                            key={element.id}
                                            value={element.code}
                                          >
                                            {element.value}
                                          </MenuItem>
                                        );
                                      })}
                                  </Select>
                                )}
                              </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Typography sx={lable1Style}>
                                Mobile No
                                <span className="requiredField">*</span>
                              </Typography>
                              <TextField
                                style={inputFieldStyle}
                                type="text"
                                disabled={true}
                                variant="outlined"
                                className="customeTextField"
                                onChange={(e) => {
                                  setMobileNo(e.target.value);
                                }}
                                value={mobileNo}
                                defaultValue={" "}
                                InputProps={{
                                  readOnly: true,
                                }}
                              />
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Typography sx={lable1Style}>
                                Email
                                <span className="requiredField">*</span>
                              </Typography>
                              <TextField
                                style={inputFieldStyle}
                                type="text"
                                disabled={true}
                                variant="outlined"
                                className="customeTextField"
                                onChange={(e) => {
                                  setEmail(e.target.value);
                                }}
                                value={email}
                                defaultValue={" "}
                                InputProps={{
                                  readOnly: true,
                                }}
                              />
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <FormControl fullWidth>
                                <Typography sx={lable1Style}>
                                  Nationality
                                  <span className="requiredField">*</span>
                                </Typography>
                                {nationality !== undefined && (
                                  <Select
                                    error={false}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    sx={inputFieldStyle}
                                    value={nationality}
                                    className="customeTextField"
                                    onChange={(e) => {
                                      setNationality(e.target.value);
                                    }}
                                  >
                                    {nationalityList &&
                                      nationalityList.map((element) => {
                                        return (
                                          <MenuItem
                                            key={element.id}
                                            value={element.code}
                                          >
                                            {element.value}
                                          </MenuItem>
                                        );
                                      })}
                                  </Select>
                                )}
                              </FormControl>
                            </Grid>

                            <Grid item xs={12} md={6}>
                              <FormControl fullWidth>
                                <Typography sx={lable1Style}>
                                  Qualification
                                </Typography>
                                {qualification !== undefined && (
                                  <Select
                                    error={false}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    className="customeTextField"
                                    sx={inputFieldStyle}
                                    onChange={(e) => {
                                      setQualification(e.target.value);
                                    }}
                                    value={qualification}
                                  >
                                    {qualificationList &&
                                      qualificationList.map((element) => {
                                        return (
                                          <MenuItem
                                            key={element.id}
                                            value={element.code}
                                          >
                                            {element.value}
                                          </MenuItem>
                                        );
                                      })}
                                  </Select>
                                )}
                              </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <FormControl fullWidth>
                                <Typography sx={lable1Style}>
                                  Marital status
                                  <span className="requiredField">*</span>
                                </Typography>
                                {maritalStatus !== undefined && (
                                  <Select
                                    error={false}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    sx={inputFieldStyle}
                                    className="customeTextField"
                                    onChange={(e) => {
                                      setMaritalStatus(e.target.value);
                                    }}
                                    value={maritalStatus}
                                  >
                                    {maritalStatusList &&
                                      maritalStatusList.map((element) => {
                                        return (
                                          <MenuItem
                                            key={element.id}
                                            value={element.code}
                                          >
                                            {element.value}
                                          </MenuItem>
                                        );
                                      })}
                                  </Select>
                                )}
                              </FormControl>
                            </Grid>
                            <Grid
                              container
                              rowSpacing={2}
                              columnSpacing={2.5}
                              item
                              xs={12}
                            >
                              <Grid item xs={12}>
                                <FormHeading
                                  step={stepsList.PassD.step}
                                  heading={stepsList.PassD.name}
                                  info={
                                    "Enter your Passport details to verify its authenticity."
                                  }
                                  Children={
                                    <IconButton
                                      onClick={handlePassporNumbertHelp}
                                    >
                                      <HelpOutline />
                                    </IconButton>
                                  }
                                />
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                  <Typography sx={lable1Style}>
                                    Is Passport Available
                                    <span className="requiredField">*</span>
                                  </Typography>
                                  {passportAvailable !== undefined && (
                                    <Select
                                      error={false}
                                      className="customeTextField"
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      sx={inputFieldStyle}
                                      onChange={
                                        handleIsPassportAvailableOnChange
                                      }
                                      value={passportAvailable}
                                    >
                                      <MenuItem value={"Y"}>Yes</MenuItem>
                                      <MenuItem value={"N"}>No</MenuItem>
                                    </Select>
                                  )}
                                </FormControl>
                              </Grid>

                              {passportAvailable === "Y" ? (
                                <>
                                  <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                      <Typography sx={lable1Style}>
                                        Is International Worker
                                        <span className="requiredField">*</span>
                                      </Typography>
                                      {isInterNationalWorker !== undefined && (
                                        <Select
                                          error={false}
                                          className="customeTextField"
                                          labelId="demo-simple-select-label"
                                          id="demo-simple-select"
                                          sx={inputFieldStyle}
                                          disabled={
                                            isPassportVarified ||
                                            disabledIsInterNationalWorker
                                          }
                                          onChange={
                                            handleInternationalWorkerOnChange
                                          }
                                          value={isInterNationalWorker}
                                        >
                                          <MenuItem value={"Y"}>Yes</MenuItem>
                                          <MenuItem value={"N"}>No</MenuItem>
                                        </Select>
                                      )}
                                    </FormControl>
                                  </Grid>
                                </>
                              ) : null}
                              {passportAvailable === "Y" ? (
                                <>
                                  <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                      <Typography sx={lable1Style}>
                                        Country of origin
                                        <span className="requiredField">*</span>
                                      </Typography>

                                      <Select
                                        error={false}
                                        disabled={isInterNationalWorker === "N"}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        className="customeTextField"
                                        sx={inputFieldStyle}
                                        onChange={(e) => {
                                          setCountryOfOrigin(e.target.value);
                                        }}
                                        value={countryOfOrigin}
                                      >
                                        {countryList &&
                                          countryList.map((element) => {
                                            return (
                                              <MenuItem
                                                key={element.id}
                                                value={element.code}
                                              >
                                                {element.value}
                                              </MenuItem>
                                            );
                                          })}
                                      </Select>
                                    </FormControl>
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <Typography sx={lable1Style}>
                                      Passport Number
                                      <span className="requiredField">*</span>
                                    </Typography>
                                    <TextField
                                      error={false}
                                      style={inputFieldStyle}
                                      type="text"
                                      className="customeTextField"
                                      variant="outlined"
                                      onChange={(e) =>
                                        setPassportNo(e.target.value)
                                      }
                                      value={passportNo}
                                      disabled={isPassportVarified}
                                      defaultValue={" "}
                                      inputProps={passportNumberInputProps}
                                    />
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <Typography sx={lable1Style}>
                                      Date of Issue
                                      <span className="requiredField">*</span>
                                    </Typography>
                                    <TextField
                                      error={false}
                                      id="date"
                                      className="customeTextField"
                                      type="date"
                                      defaultValue="2017-05-24"
                                      sx={inputFieldStyle}
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                      disabled={isPassportVarified}
                                      InputProps={{
                                        inputProps: { max: today },
                                      }}
                                      onChange={(e) => {
                                        setPassportValidForDate(e.target.value);
                                      }}
                                      value={passportValidForDate}
                                    />
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <Typography sx={lable1Style}>
                                      Date of Expiry
                                      <span className="requiredField">*</span>
                                    </Typography>
                                    <TextField
                                      error={false}
                                      id="date"
                                      className="customeTextField"
                                      type="date"
                                      defaultValue="2017-05-24"
                                      sx={inputFieldStyle}
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                      disabled={isPassportVarified}
                                      //InputProps={{ inputProps: { min: today } }}
                                      onChange={(e) => {
                                        PasswordExpiryValidity(e);
                                      }}
                                      value={passportValidTillDate}
                                    />
                                  </Grid>
                                </>
                              ) : null}
                            </Grid>
                            <Grid
                              container
                              rowSpacing={2}
                              columnSpacing={2.5}
                              item
                              xs={12}
                            >
                              <Grid item xs={12}>
                                <FormHeading
                                  step={stepsList.OD.step}
                                  heading={stepsList.OD.name}
                                  info={
                                    "Enter your other information like handicap details ."
                                  }
                                />
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Typography sx={lable1Style}>
                                  Date Of Joining
                                  <span className="requiredField">*</span>
                                </Typography>
                                <TextField
                                  onChange={(e) => {
                                    setDateOfJoining(e.target.value);
                                  }}
                                  error={false}
                                  disableFuture={true}
                                  id="date"
                                  className="customeTextField"
                                  type="date"
                                  value={dateOfJoining}
                                  sx={inputFieldStyle}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  InputProps={{
                                    readOnly: true,
                                  }}
                                />
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                  <Typography sx={lable1Style}>
                                    Is Physically Handicap
                                    <span className="requiredField">*</span>
                                  </Typography>
                                  {isPhysicallyHandicap !== undefined && (
                                    <Select
                                      error={false}
                                      className="customeTextField"
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      sx={inputFieldStyle}
                                      onChange={(e) => {
                                        setIsPhysicallyHandicap(e.target.value);
                                      }}
                                      value={isPhysicallyHandicap}
                                    >
                                      <MenuItem value={"Y"}>Yes</MenuItem>
                                      <MenuItem value={"N"}>No</MenuItem>
                                    </Select>
                                  )}
                                </FormControl>
                              </Grid>
                              {isPhysicallyHandicap === "Y" ? (
                                <Grid item xs={12} md={6}>
                                  <FormControl fullWidth>
                                    <Typography sx={lable1Style}>
                                      Handicap type
                                      <span className="requiredField">*</span>
                                    </Typography>
                                    {handicapType !== undefined && (
                                      <Select
                                        error={false}
                                        className="customeTextField"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        sx={inputFieldStyle}
                                        onChange={(e) => {
                                          setHandicapType(e.target.value);
                                        }}
                                        value={handicapType}
                                      >
                                        {disabilityList &&
                                          disabilityList.map((element) => {
                                            return (
                                              <MenuItem
                                                key={element.id}
                                                value={element.code}
                                              >
                                                {element.value}
                                              </MenuItem>
                                            );
                                          })}
                                      </Select>
                                    )}
                                  </FormControl>
                                </Grid>
                              ) : null}
                            </Grid>
                          </Grid>
                        </Grid>

                        <Stack
                          sx={{ marginTop: "16px" }}
                          flexDirection={"row"}
                          ml={"25px"}
                        >
                          <Button
                            xs={12}
                            name="save"
                            onClick={() => setClickedButton("S")}
                            type="submit"
                            sx={{ m: "10px 5px" }}
                            variant="contained"
                            color="primary"
                            disabled={!isDraft} // Hide saveButton when clickedButton is "N"
                          >
                            {saveButton}
                          </Button>
                          <Button
                            name="save_and_next"
                            onClick={() => setClickedButton("N")}
                            type="submit"
                            sx={{ m: "10px 5px" }}
                            variant="contained"
                            color="primary"
                          >
                            {saveAndNextbutton}
                          </Button>

                          <Button
                            onClick={handleSecondNext}
                            sx={{ m: "10px 5px" }}
                            variant="contained"
                            color="primary"
                            disabled={isDraft} // Show Next button only when clickedButton is "N"
                          >
                            Next
                          </Button>
                        </Stack>
                      </Grid>
                    </form>
                  </Box>
                </>
              ) : null}
              {currentPageNo === 2 ? (
                <Box sx={{ width: "100%" }}>
                  <form ref={formElement}>
                    <Grid
                      sx={{ paddingLeft: "20px" }}
                      container
                      rowSpacing={1}
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                      <Grid
                        container
                        rowSpacing={2}
                        columnSpacing={2.5}
                        item
                        xs={12}
                      >
                        <Grid item xs={12}>
                          <Stack
                            sx={{ ...dividerStyle, marginTop: "8px" }}
                          ></Stack>
                          {/* <FormHeading step={""} heading={""} /> */}
                        </Grid>
                        <>
                          <Grid
                            container
                            rowSpacing={1}
                            columnSpacing={2.5}
                            item
                            xs={12}
                          >
                            <Grid item xs={12}>
                              <FormHeading
                                step={stepsList.CF.step}
                                heading={stepsList.CF.name}
                                info={"Upload file details ."}

                              // Children={<IconButton onClick={handlePassporFileNumbertHelp}>
                              //   <HelpOutline />
                              // </IconButton>}
                              />
                            </Grid>
                            <Grid sx={positionRelative} item xs={12}>
                              {/* {isPhysicallyHandicap==='N' && <DisableSection />} */}
                              <Grid
                                mt={3}
                                container
                                rowSpacing={1}
                                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                              >
                                <Grid item xs={12} md={6}>
                                  <Stack
                                    flexDirection={"row"}
                                    justifyContent={"space-between"}
                                    alignItems={"center"}
                                  >
                                    <Box>
                                      <Stack direction="row">
                                        <Typography
                                          sx={{
                                            ...lable1Style,
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          {"10th pass certificate"}
                                        </Typography>
                                        <Tooltip
                                          arrow="bottom"
                                          title="Please upload a clear and legible scanned copy or photo of your 10th pass certificate. The certificate should clearly display your name, school name, and passing year."
                                        >
                                          <IconButton
                                            disabled={isPreviousSectionDisabled}
                                          >
                                            <InfoOutlined />
                                          </IconButton>
                                        </Tooltip>
                                      </Stack>
                                    </Box>
                                  </Stack>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                  <Box>
                                    <Typography
                                      sx={{
                                        ...lable1Style,
                                        textAlign: "center",
                                      }}
                                    >
                                      Please upload 10th pass certificate
                                      <span className="requiredField">*</span>
                                    </Typography>
                                    <Box sx={fileUploadSectionContainerStyle}>
                                      <FileUploadSection
                                        chooseFile={upload10thCertificateFile}
                                        fileName={tenthCertificateFileName}
                                        accept={"image/png, image/jpeg"}
                                        disabled={isPreviousSectionDisabled}
                                      />
                                    </Box>
                                  </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                  <Stack
                                    flexDirection={"row"}
                                    justifyContent={"space-between"}
                                    alignItems={"center"}
                                  >
                                    <Box>
                                      <Stack direction="row">
                                        <Typography
                                          sx={{
                                            ...lable1Style,
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          {
                                            "Document with father's name attached"
                                          }
                                        </Typography>
                                        <Tooltip
                                          arrow="bottom"
                                          title="Upload a copy of the document with your father's name clearly mentioned. Examples of acceptable documents include birth certificates, national IDs, or other legal documents where both your name and your father's name are visible."
                                        >
                                          <IconButton
                                            disabled={isPreviousSectionDisabled}
                                          >
                                            <InfoOutlined />
                                          </IconButton>
                                        </Tooltip>
                                      </Stack>
                                    </Box>
                                  </Stack>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                  <Box>
                                    <Typography
                                      sx={{
                                        ...lable1Style,
                                        textAlign: "center",
                                      }}
                                    >
                                      Please upload a docucment with father's
                                      name attached
                                      <span className="requiredField">*</span>
                                    </Typography>
                                    <Box sx={fileUploadSectionContainerStyle}>
                                      <FileUploadSection
                                        chooseFile={uploadFathersDocFile}
                                        fileName={otherFileName}
                                        accept={"image/png, image/jpeg"}
                                        disabled={isPreviousSectionDisabled}
                                      />
                                    </Box>
                                  </Box>
                                </Grid>
                                {isPhysicallyHandicap === "Y" && (
                                  <>
                                    <Grid item xs={12}>
                                      <FormHeading
                                        step={stepsList?.HV?.step}
                                        heading={stepsList?.HV?.name}
                                        info={"Upload your handicap file details ."}

                                      // Children={<IconButton onClick={handlePassporFileNumbertHelp}>
                                      //   <HelpOutline />
                                      // </IconButton>}
                                      />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                      <Typography sx={lable1Style}>
                                        Handicap Type
                                      </Typography>

                                      <TextField
                                        style={inputFieldStyle}
                                        type="text"
                                        variant="outlined"
                                        className="customeTextField"
                                        value={getHandicapTypeDescription(
                                          handicapType
                                        )}
                                        defaultValue={""}
                                        disabled={isPreviousSectionDisabled}
                                      />
                                    </Grid>
                                  </>
                                )}
                                <Grid item xs={12} md={6}>
                                  {isPhysicallyHandicap === "Y" && (
                                    <>
                                      <Typography
                                        sx={{
                                          ...lable1Style,
                                          textAlign: "center",
                                        }}
                                      >
                                        Please upload your Handicap Certificate
                                        <span className="requiredField">*</span>
                                      </Typography>
                                      <Box sx={fileUploadSectionContainerStyle}>
                                        <FileUploadSection
                                          chooseFile={uploadHandicapFile}
                                          fileName={handicapFileName}
                                          accept={"image/png, image/jpeg"}
                                          disabled={isPreviousSectionDisabled}
                                        />
                                      </Box>
                                    </>
                                  )}
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>

                          {hasValue(countryOfOrigin) &&
                            (countryOfOrigin !== "Nepal" ||
                              countryOfOrigin !== "Bhutan") ? (
                            <Grid
                              container
                              rowSpacing={1}
                              columnSpacing={2.5}
                              item
                              xs={12}
                            >
                              <Grid item xs={12}>
                                <FormHeading
                                  step={stepsList?.PV?.step}
                                  heading={stepsList?.PV?.name}
                                  info={
                                    "Enter your Passport file number to verify also see the help sign (?) to see how to find passport file number ."
                                  }
                                  Children={
                                    <IconButton
                                      onClick={handlePassporFileNumbertHelp}
                                    >
                                      <HelpOutline />
                                    </IconButton>
                                  }
                                />
                              </Grid>
                              <Grid sx={positionRelative} item xs={12}>
                                {!passportAvailable && <DisableSection />}
                                <Grid
                                  mt={3}
                                  container
                                  rowSpacing={1}
                                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                                >
                                  <Grid item xs={12} md={6}>
                                    <Typography sx={lable1Style}>
                                      Passport Number
                                    </Typography>

                                    <TextField
                                      style={inputFieldStyle}
                                      type="text"
                                      variant="outlined"
                                      className="customeTextField"
                                      value={passportNo}
                                      defaultValue={""}
                                      disabled={isPreviousSectionDisabled}
                                    />
                                    {countryOfOrigin === "India" && (
                                      <>
                                        <Button
                                          sx={{ margin: "5px" }}
                                          variant="contained"
                                          disabled={isPassportVerifyBtnDisabled}
                                          onClick={handlePassportVerification}
                                          endIcon={<Autorenew />}
                                        >
                                          Verify
                                        </Button>
                                        <VerificationStatusSection
                                          docType={passportstatusMessage}
                                        />
                                      </>
                                    )}
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    {countryOfOrigin === "India" ? (
                                      <>
                                        <Typography sx={lable1Style}>
                                          Passport File Number
                                        </Typography>
                                        <TextField
                                          style={inputFieldStyle}
                                          type="text"
                                          variant="outlined"
                                          onChange={
                                            handlePassFileNumberOnChange
                                          }
                                          className="customeTextField"
                                          value={passportFileNumber}
                                          defaultValue={""}
                                          disabled={isPreviousSectionDisabled}
                                        />
                                      </>
                                    ) : (
                                      <>
                                        <Typography
                                          sx={{
                                            ...lable1Style,
                                            textAlign: "center",
                                          }}
                                        >
                                          Please upload your Visa Details
                                          <span className="requiredField">
                                            *
                                          </span>
                                        </Typography>
                                        <FileUploadSection
                                          chooseFile={uploadPassportFile}
                                          fileName={passportFileName}
                                          disabled={isPreviousSectionDisabled}
                                        />
                                      </>
                                    )}
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          ) : null}
                          <Grid item xs={12} md={6}>
                            <Stack
                              flexDirection={"row"}
                              justifyContent={"space-between"}
                              alignItems={"center"}
                            >
                              <Box>
                                <Stack direction="row">
                                  <Typography
                                    sx={{
                                      ...lable1Style,
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    {
                                      "Do you have PF under any Trust, in the past or present"
                                    }
                                  </Typography>
                                  <Tooltip
                                    arrow="bottom"
                                    title="Trust PF is privately managed by an employer like Reliance. Normal PF is government-managed like EPFO"
                                  >
                                    <IconButton
                                      disabled={isPreviousSectionDisabled}
                                    >
                                      <InfoOutlined />
                                    </IconButton>
                                  </Tooltip>
                                </Stack>
                                <FormControl sx={{ marginLeft: "17px" }}>
                                  <Stack
                                    direction="row"
                                    spacing={1}
                                    justifyContent={"end"}
                                    alignItems="center"
                                    width={"auto"}
                                  >
                                    <Typography>No</Typography>
                                    <Switch
                                      onChange={({ target }) =>
                                        setIsTrustEpfoAvailable(target.checked)
                                      }
                                      checked={isTrustEpfoAvailable}
                                      color="secondary"
                                      disabled={isPreviousSectionDisabled}
                                      sx={{ borderColor: "2px" }}
                                    />
                                    <Typography>Yes</Typography>
                                  </Stack>
                                </FormControl>
                              </Box>
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            {isTrustEpfoAvailable && (
                              <Box>
                                <Typography
                                  sx={{ ...lable1Style, textAlign: "center" }}
                                >
                                  Please upload Trust PF Details
                                  <span className="requiredField">*</span>
                                </Typography>
                                <Box sx={fileUploadSectionContainerStyle}>
                                  <FileUploadSection
                                    chooseFile={uploadTrustEPFOFile}
                                    fileName={trustEpfoFileName}
                                    accept={"image/png, image/jpeg"}
                                    disabled={isPreviousSectionDisabled}
                                  />
                                </Box>
                              </Box>
                            )}
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <Stack
                              flexDirection={"col"}
                              justifyContent={"space-between"}
                              alignItems={"start"}
                            >
                              <Typography sx={{ ...lable1Style }}>
                                {"Do you have UAN number"}
                              </Typography>
                              <RadioGroup
                                row
                                value={uanNumberAvailable}
                                onChange={handleChange}
                                sx={{ marginLeft: 2 }} // Adjust margin as needed
                              >
                                <FormControlLabel
                                  value="no"
                                  control={<Radio />}
                                  label="No"
                                  disabled={isPreviousSectionDisabled}
                                />
                                <FormControlLabel
                                  value="yes"
                                  control={<Radio />}
                                  label="Yes"
                                  disabled={isPreviousSectionDisabled}
                                />
                              </RadioGroup>
                            </Stack>
                          </Grid>
                          <Dialog
                            open={isModalOpen}
                            onClose={handleCloseModal}
                            aria-labelledby="confirm-save-title"
                            aria-describedby="confirm-save-description"
                          >
                            <DialogTitle id="confirm-save-title">
                              {"Are you sure you want to save the details?"}
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText id="confirm-save-description">
                                Once saved, the details cannot be edited
                                anymore. Do you want to proceed?
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button
                                onClick={handleCloseModal}
                                color="secondary"
                              >
                                No
                              </Button>
                              <Button
                                onClick={handleConfirmSave}
                                color="primary"
                                autoFocus
                              >
                                Yes
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </>
                      </Grid>
                    </Grid>
                  </form>
                </Box>
              ) : null}

              {currentPageNo === 3 ? (
                <Box sx={{ width: "100%" }}>
                  <form ref={formElement}>
                    <Grid
                      sx={{ paddingLeft: "20px" }}
                      container
                      rowSpacing={1}
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                      <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={2.5}
                        item
                        xs={12}
                      >
                        <Grid item xs={12}>
                          <FormHeading
                            step={stepsList?.AV?.step}
                            heading={stepsList?.AV?.name}
                            info={
                              "Enter Adhar data to verify, see more info in the below link."
                            }
                          />
                          <Grid item xs={12} md={12}>
                            <Typography
                              sx={{
                                ...lable1Style,
                                fontWeight: 500,
                                fontSize: 18,
                              }}
                            >
                              As part of onboarding process, Please generate
                              your offline kyc verification file and upload it
                              here. To see the details steps,
                              {/* An eKYC XML file containing the personal data, required for verification, can be downloaded only by you using your Aadhaar credentials. This file contains the name, date of birth and gender, besides other information, that would be extracted to match with the information provided by you. The process would first inspect the authenticity of the eKYC XML file provided by you and then perform the matching and then dispose the file and the contents
                          Aadhaar verification wiil be done using the offline ekyc method of UIDAI. To see the details steps,   */}
                              <Link
                                sx={{ cursor: "pointer" }}
                                onClick={() => openOfflineKycInfoModel()}
                              >
                                {" "}
                                Click here
                              </Link>
                            </Typography>
                            {isAadhaarVarified ? (
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    disabled
                                    checked
                                    inputProps={{ "aria-label": "controlled" }}
                                  />
                                }
                                label="I have downloaded the aadhar offline kyc file"
                              />
                            ) : (
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={isOfflineXmlDownloaded}
                                    onChange={
                                      handleIsOfflineXmlDownloadedOnChange
                                    }
                                    inputProps={{ "aria-label": "controlled" }}
                                  />
                                }
                                label="I have downloaded the aadhar offline kyc file"
                              />
                            )}
                            {/* {<Checkbox  onChange={handleIsOfflineXmlDownloadedOnChange} />}  /> */}
                          </Grid>
                        </Grid>
                        <Grid sx={positionRelative} item xs={12}>
                          <Grid
                            mt={3}
                            container
                            rowSpacing={1}
                            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                          >
                            {!isOfflineXmlDownloaded && <DisableSection />}
                            <Grid item xs={12} md={6}>
                              <Typography sx={lable1Style}>
                                Name On Aadhaar
                              </Typography>
                              <TextField
                                style={inputFieldStyle}
                                type="text"
                                variant="outlined"
                                className="customeTextField"
                                onChange={(e) => {
                                  setNameAsOnAadhar(
                                    e.target.value.toUpperCase()
                                  );
                                }}
                                value={nameAsOnAadhar}
                                //defaultValue={" "}
                                disabled={true}
                              />{" "}
                              <Typography sx={lable1Style}>
                                Share Code (to be provided after uploading)
                              </Typography>
                              <TextField
                                style={inputFieldStyle}
                                type="text"
                                variant="outlined"
                                className="customeTextField"
                                onChange={(e) => {
                                  setAadharShareCode(e.target.value);
                                }}
                                value={aadharShareCode}
                                defaultValue={" "}
                                disabled={
                                  disabledAadharInput || !isAadhaarXmlUploaded
                                }
                              />
                              <Button
                                sx={{ margin: "5px" }}
                                disabled={isAadhaarVarified}
                                variant="contained"
                                onClick={handleAadharVerifiaction}
                                endIcon={<Autorenew />}
                              >
                                Verify
                              </Button>
                              <VerificationStatusSection
                                docType={aadharstatusMessage}
                              />
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <FileUploadSection
                                chooseFile={uploadAadharXmlFile}
                                fileName={aadharXmlFileName}
                                accept={".rar, .zip"}
                                disabled={isAadhaarVarified}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        {/* </Grid> */}
                      </Grid>
                      <Grid
                        container
                        rowSpacing={2}
                        columnSpacing={2.5}
                        item
                        xs={12}
                      >
                        <Grid item xs={12}>
                          <FormHeading
                            step={stepsList?.PAV?.step}
                            heading={stepsList?.PAV?.name}
                            info={"Enter your Pan Numebr to verify."}
                          />
                        </Grid>{" "}
                      </Grid>
                      <Grid
                        container
                        rowSpacing={2}
                        sx={positionRelative}
                        item
                        xs={12}
                      >
                        {/* {isPanSectionDisabled && <DisableSection />} */}
                        <Grid item xs={12} md={6} paddingRight={3}>
                          <Typography sx={lable1Style}>
                            PAN Number
                            <span className="requiredField">*</span>
                          </Typography>
                          <TextField
                            style={inputFieldStyle}
                            type="text"
                            variant="outlined"
                            className="customeTextField"
                            onChange={(e) => {
                              setPan(e.target.value.toUpperCase());
                            }}
                            value={pan}
                            defaultValue={" "}
                            inputProps={{ maxLength: 10 }}
                            disabled={disabledPanInput}
                          />
                          <Button
                            sx={{ margin: "5px" }}
                            disabled={isPanVarified}
                            variant="contained"
                            onClick={handlePanVerifiaction}
                            endIcon={<Autorenew />}
                          >
                            Verify
                          </Button>
                          <Dialog
                            open={isPANModalOpen}
                            onClose={handleDialogCancel}
                          >
                            <DialogTitle>PAN Verified</DialogTitle>
                            <DialogContent>
                              <DialogContentText>
                                Your PAN is successfully verified. To fetch and
                                verify UAN automatically please click on OK.
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button
                                onClick={handleDialogConfirm}
                                color="primary"
                                autoFocus
                              >
                                OK
                              </Button>
                            </DialogActions>
                          </Dialog>
                          <VerificationStatusSection
                            docType={panstatusMessage}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography sx={lable1Style}>
                            Name on PAN
                            <span className="requiredField">*</span>
                          </Typography>
                          <TextField
                            style={inputFieldStyle}
                            type="text"
                            variant="outlined"
                            className="customeTextField"
                            onChange={(e) => {
                              setNameAsOnPan(e.target.value.toUpperCase());
                            }}
                            value={nameAsOnPan}
                            defaultValue={" "}
                            disabled={true}
                          />
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <FormHeading
                          step={stepsList?.UAV?.step}
                          heading={stepsList?.UAV?.name}
                          info={
                            "Enter your Universal Account Number(UAN) to verify."
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Grid
                          item
                          md={6}
                          mt={3}
                          container
                          rowSpacing={1}
                          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        >
                          <Grid sx={positionRelative} item xs={12} md={6}>
                            {isEpfoSectionDisabled && <DisableSection />}
                            <Typography sx={lable1Style}>
                              Universal Account Number(UAN)
                            </Typography>
                            <TextField
                              onChange={(e) => {
                                setUAN(e.target.value);
                              }}
                              style={inputFieldStyle}
                              type="text"
                              className="customeTextField"
                              variant="outlined"
                              defaultValue={" "}
                              value={UAN}
                            />

                            <Dialog
                              open={isUANModalOpen}
                              onClose={() => setIsUANModalOpen(false)}
                            >
                              <DialogTitle>Verification Successful</DialogTitle>
                              <DialogContent>
                                <DialogContentText>
                                  Your data is successfully verified. Please
                                  proceed with employment verification to
                                  complete your process.
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                <Button
                                  onClick={handleDialogOk}
                                  color="primary"
                                >
                                  OK
                                </Button>
                              </DialogActions>
                            </Dialog>
                            <Button
                              sx={{ margin: "5px" }}
                              enabled={isUanVarified}
                              variant="contained"
                              onClick={handleEpfoButtonClick}
                              endIcon={<Autorenew />}
                            >
                              {epfoButton}
                            </Button>
                            <VerificationStatusSection
                              docType={epfostatusMessage}
                            />
                          </Grid>
                        </Grid>
                        {isSubmitDisabled === false ? (
                          <Button
                            name="submit"
                            // disabled={isSubmitDisabled}
                            onClick={() => submitDetails(false)}
                            sx={{ m: "15px 5px" }}
                            variant="contained"
                            color="primary"
                          >
                            {submitButton}
                          </Button>
                        ) : null}
                      </Grid>
                    </Grid>
                    <Typography
                      appointeeId={appointeeId}
                      onClick={() => setRemarks(appointeeId)}
                      sx={{ linkStyle, marginLeft: "25rem" }}
                    >
                      To know the remarks Click here{" "}
                    </Typography>
                  </form>
                </Box>
              ) : null}
              {/* <form ref={formElement}>
                <Grid sx={positionRelative} item xs={12}>
                  <Grid
                    mt={3}
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    paddingLeft={{ xs: 3, md: 'auto' }}
                    item
                  >
                    <Grid item xs={12} md={6}>
                      <Button
                        //onClick={() => setCurrentPageNo(1)}
                        onClick={handleBack}
                        //sx={{ m: "15px 5px", ml: 3 }}
                        sx={{ m: { xs: '10px 0', sm: '15px 0' } }}
                        variant="contained"
                        color="primary"
                      >
                        {previousButton}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>

              </form> */}
              <form ref={formElement}>
                <Grid sx={positionRelative} item xs={12}>
                  <Grid
                    mt={3}
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item xs={12} md={6}></Grid>
                  </Grid>
                </Grid>
                <Grid
                  sx={{ paddingLeft: "20px" }}
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={2.5}
                    item
                    xs={12}
                  >
                    <Box sx={{ m: { xs: "10px 27px", sm: "15px 27px" } }}>
                      {(currentPageNo === 2 || currentPageNo === 3) && (
                        <>
                          <Button
                            //onClick={() => setCurrentPageNo(1)}
                            onClick={handleBack}
                            //sx={{ m: "15px 5px", ml: 3 }}
                            sx={{ m: { xs: "10px 0", sm: "15px 0" } }}
                            variant="contained"
                            color="primary"
                          >
                            {previousButton}
                          </Button>
                        </>
                      )}
                      {currentPageNo === 2 && (
                        <>
                          <Button
                            name="save"
                            // disabled={isSubmitDisabled}
                            onClick={handleSaveClick}
                            //sx={{ m: "15px 25px", ml: 3 }}
                            sx={{ m: { xs: '10px 8px', sm: '15px 8px' }, ml: { sm: 3 } }}
                            variant="contained"
                            color="primary"
                            disabled={isPreviousSectionDisabled}
                          >
                            Save
                          </Button>
                          <Button
                            onClick={handleNext}
                            sx={{ m: { xs: '10px 8px', sm: '15px 8px' }, ml: { sm: 3 } }}
                            //sx={{ m: "15px 25px", ml: 3 }}
                            variant="contained"
                            color="primary"
                            disabled={isthirdNextVisible === false}
                          >
                            Next
                          </Button>
                        </>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Box>
        <FormDialog
          open={fetchUanConfirmation}
          DialogTitle={
            "Your aadhar verification has failed. If you continue you will not be able to change your aadhar. Do you want to continue?"
          }
          shouldTakeAction={fetchUanConfirmationSubmittion}
        />
      </Box>
    </CardLayout>
  );
};

export default AppointeeRegister;
