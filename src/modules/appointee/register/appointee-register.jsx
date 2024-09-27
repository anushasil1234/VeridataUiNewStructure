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
} from "@mui/material";
import {
  genderSectionContainer,
  genderTypeStyle,
  heading2,
  inputFieldStyle,
  lable1Style,
  linkStyle,
  positionRelative,
} from "app";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CardLayout,
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
  panSuccessMsg,
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
import VerficationAadharSteps from "shared/components/verification/verfication-aadhar";
import PassportSample from 'assets/images/backgrounds/PassportSample2.jpeg';
import PassportFileNoSample from 'assets/images/backgrounds/file-number-in-indian-passport.png';
import { removeLoggedinData, storeLoggedinData } from "store/slices/login-slice";


const AppointeeRegister = () => {

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
  const [disabledIsInterNationalWorker, setDisabledIsInterNationalWorker] = useState(false);
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

  const [isPFVerificatoinReq, setIsPFVerificatoinReq] = useState(null);
  const [isAadhaarVarified, setisAadhaarVarified] = useState(null);
  const [isAadhaarXmlUploaded, setIsAadhaarXmlUploaded] = useState(false);
  const [isOfflineXmlDownloaded, setIsOfflineXmlDownloaded] = useState(false);
  const [isPanVarified, setIsPanVarified] = useState(null);
  const [isPassportVarified, setIsPassportVarified] = useState(false);
  const [isUanVarified, setisUanVarified] = useState(null);
  const [epfoButton, setEpfoButton] = useState(null);
  const [disabledAadharInput, setDisabledAadharInput] = useState(false);
  const [disabledPanInput, setDisabledPanInput] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isPensionApplicable, setIsPensionApplicable] = useState(null);
  const [isEpfoSectionDisabled, setIsEpfoSectionDisabled] = useState(true);
  // const [isPanSectionDisabled, setIsPanSectionDisabled] = useState(true);
  const [isPassportVerifyBtnDisabled, setIsPassportVerifyBtnDisabled] = useState(false);
  const [isTrustEpfoAvailable, setIsTrustEpfoAvailable] = useState(true);
  // const [isTrustPensionAvailable, setIsTrustPensionAvailable] = useState(false);
  const [uploadedFile, setUploadedFile] = useState([]);
  const [xmlFileUploaded, setXmlFileUploaded] = useState();
  const [fileDetails, setFileDetails] = useState([]);
  const [trustEpfoFileName, setTrustEpfoFileName] = useState();
  const [aadharXmlFileName, setAadharXmlFileName] = useState();
  const [passportFileName, setPassportFileName] = useState();
  const [
    isRelationShipWithMemberDisabled,
    setIsRelationShipWithMemberDisabled,
  ] = useState(false);
  const [isSubmit, setIsSubmit] = useState();
  const [companyName, setCompanyName] = useState();
  const [timeoutTimer, setTimeoutTimer] = useState();
  const [fileUploaded, setFileUploaded] = useState();

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
    const allowedKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"];
    if (!char.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  }
  const handelSpacialCharecterPaste=(e)=>{
    const paste = (e.clipboardData || window.clipboardData).getData('text');
    if (!/^[A-Za-z\s]*$/.test(paste)) {
      e.preventDefault();
    }
  }

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
        isPanVarified,
        isPensionApplicable,
        saveStep,
        companyName,
        isSubmit,
        fileUploaded,
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
      hasValue(panName) ? setNameAsOnPan(panName) : setNameAsOnPan(appointeeName);
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
      if (hasValue(uanNumber) && isUanVarified === null) {
        epfostatusMessage.message = "Fetched";
        epfostatusMessage.color = "green";
        epfostatusMessage.success = null;
        setEpfostatusMessage(epfostatusMessage);
      } else {
        setEpfostatusMessage(new VerificationStatus(isUanVarified, "V"));
      }
      setAadharstatusMessage(new VerificationStatus(isAadhaarVarified, "V"));
      setIsOfflineXmlDownloaded(isAadhaarVarified);
      setPassportStatusMessage(new VerificationStatus(isPassportValid, "V"));
      setPANStatusMessage(new VerificationStatus(isPanVarified, "V"));
      setCurrentPageNo(saveStep + 1);
      setFileUploaded(fileUploaded)
    }
  };

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
  const hasTrustEpfoUpload = () => {
    const uploadTypeAlias =
      uploadedFile &&
      uploadedFile.find(
        ({ uploadTypeAlias }) => uploadTypeAlias === trustEpfoFileTypeAlias
      );
    // const uploadedTypeAlias =
    // fileUploaded &&
    // fileUploaded.find(
    //     ({ uploadTypeAlias }) => uploadTypeAlias === trustEpfoFileTypeAlias
    //   );
    return hasValue(uploadTypeAlias);
  };

  const openUploadDocInfoModel = (dialogContentText) => {
    openInfoModel({ dialogContentText });
  };
  const openOfflineKycInfoModel = () => {
    const offlineKycContent = {
      dialogTitle: "Offline Aadhaar Kyc Steps Info",
      dialogContentText: 'To complete the offline aadhar kyc process please follow the instructions given below :',
      dialogContentComponent: <VerficationAadharSteps />,
      fullWidth: true
    }
    openInfoModel(offlineKycContent);
  };

  const submitDetails = (autoSubmit) => {
    let submitVerification = true;
    let dialogContentText = "";
    if (isTrustEpfoAvailable && !hasTrustEpfoUpload()) {
      submitVerification = false;
      dialogContentText = (
        <>
          <Typography>{uploadFileMessage("trust epfo passbook")}, then submit details </Typography>
          {dialogContentText}
        </>
      );
    }
    if (
      hasValue(countryOfOrigin) &&
      (countryOfOrigin !== "India" ||
        countryOfOrigin !== "Nepal" ||
        countryOfOrigin !== "Bhutan") &&
      !passportFileName
    ) {
      submitVerification = false;
      dialogContentText = (
        <>
          <Typography>{uploadFileMessage("visa")} , then submit details</Typography>
          {dialogContentText}
        </>
      );
    }
    if (submitVerification) {
      if (autoSubmit) {
        handleAppointeeFormPage2Save();
      } else {
        openSubmitConfirmationModel();
      }
    } else {
      openUploadDocInfoModel(dialogContentText);
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
    if (countryList !== undefined) {
      const defaultCountry =
        countryList &&
        countryList?.find(({ value }) => value?.toUpperCase() === "INDIA")?.value;
      setDefaultCountry(defaultCountry);

      setAppointeeDetails(appointeeId);
    }
  }, [countryList]);

  useEffect(() => {
    if (!hasValue(UAN)) {
      setEpfoButton("Fetch UAN");
    } else {
      setEpfoButton("Verify");
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
      isUanVarified !== null) {
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
    if (isUanVarified && isSubmit === false) {
      if (isAadhaarVarified && isPanVarified) {
        submitDetails(true);
      }
    }
  }, [isAadhaarVarified, isUanVarified, isPanVarified]);

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
      if (size <= 4000000) {
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
    if (type !== "application/x-zip-compressed" && type !== "application/x-compressed" && type !== "application/zip") {
      showErrorMessage(uploadFormatErrorMsg);
    }
    else if (size > 4000000) {
      showErrorMessage(uploadSizeErrorMsg);
    } else {
      setAadharXmlFileName(name);
      setXmlFileUploaded(fileData);
    }
    setIsAadhaarXmlUploaded(true);
  };
  const uploadTrustEPFOFile = ({ target }) => {
    uploadFile(target, trustEpfoFileTypeAlias, setTrustEpfoFileName);
  };
  const uploadPassportFile = ({ target }) => {
    uploadFile(target, passportFileTypeAlias, setPassportFileName);
  };
  const verifyAadhar = async () => {
    // const payLoad = {
    //   appointeeId: appointeeId,
    //   otp: otp,
    //   client_id: clientId,
    //   aadharName: nameAsOnAadhar,
    //   userId: userId,
    // };
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
  // const validateAadharOtp = async () => {
  //   const payLoad = {
  //     aaddharNumber: aadhar,
  //     appointeeId: appointeeId,
  //     aaddharName: nameAsOnAadhar,
  //     userId,
  //   };
  //   const response = await generateAadharOTP(payLoad);
  //   if (response) {
  //     const { responseInfo } = response;
  //     let { if_number, otp_sent, client_id } = responseInfo;
  //     if (!if_number) {
  //       //
  //       showErrorMessage(aadharNoValidationError);
  //       closeOtpForm();
  //     } else if (!otp_sent) {
  //       showErrorMessage(generateOtpRety);
  //     } else {
  //       initialTimeOfOtpTimer();
  //       showSuccessMessage(generateOtpSucces);
  //       closeOtpForm();
  //       openOtpSubmitionModel({
  //         otpSubmitionFunction: (otp) => verifyAadhar(otp, client_id),
  //         timeoutTimer: timeoutTimer,
  //         setTimeoutTimer: setTimeoutTimer,
  //       });
  //     }
  //   }
  // };
  const handleAadharVerifiaction = () => {
    if (!(hasValue(aadharShareCode) && hasValue(nameAsOnAadhar))) {
      if (!hasValue(aadharShareCode)) {
        showErrorMessage(emptyShareCodeMsg);
      } else {
        showErrorMessage(emptyAadharMsg);
      }
    }
    else {
      verifyAadhar();
      // openOtpForm(aadhar, "Aadhaar Number", validateAadharOtp);
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
        showSuccessMessage(panSuccessMsg);
        handleGetUANNumber();
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
      if (clickedButton === "N") {
        setCurrentPageNo(2);
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
      trustPassbookAvailable: isTrustEpfoAvailable,
      //trustPensionAvailable: isTrustPensionAvailable,
      isSubmit: true,
      userId: userId,
      FileDetails: fileDetails,
      fileUploaded: uploadedFile,
    };
    let formData = new FormData();
    for (const property in payLoad) {
      if (Object.hasOwnProperty.call(payLoad, property)) {
        if (payLoad[property] === "") {
          delete payLoad[property];
        } else {
          if (property === "fileUploaded") {
            formData.append(`${property}`, JSON.stringify(payLoad[property]));
          } else if (property === "FileDetails") {
            payLoad?.FileDetails.forEach((element) => {
              formData.append("FileDetails", element);
            });
          } else {
            formData.append(`${property}`, payLoad[property]);
          }
        }
      }
    }
    const response = await postAppointeeFileDetails(formData);
    if (response) {
      setLocalStorageItem("pfc-user", {
        ...loginUserData,
        isSubmit: true,
        status: 'Submitted'
      });
      dispatch(removeLoggedinData());
      dispatch(storeLoggedinData({
        ...loginUserData,
        isSubmit: true,
        status: 'Submitted'
      }));

      const registrationSuccessContent = {
        dialogContentText: registrationSuccessDialogContentText,
        dialogTitle: congratulationDialogContentTitle,
        maxWidth: 'sm',
        btnName: 'Go to Dashboard'
      };
      openInfoModel(registrationSuccessContent, () => navigateTo(toDashboard));
    }
    //}
  };

  const handleEpfoButtonClick = () => {

    if (epfoButton?.trim() === "Fetch UAN") {
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
      //aaddharName: hasValue(nameAsOnAadhar) ? removeExtraSpaces(nameAsOnAadhar) : null,
      panNumber: hasValue(pan) ? removeExtraSpaces(pan) : null,
      mobileNumber: hasValue(mobileNo) ? removeExtraSpaces(mobileNo) : null,
      userId,
    };
    const response = await getUANNumber(payLoad);
    if (response) {
      const { isUanAvailable, uanNumber, remarks } = response.responseInfo;
      if (isUanAvailable) {
        setUAN(uanNumber);
        setEpfoButton("Verify");
        epfostatusMessage.message = "Fetched";
        epfostatusMessage.color = "green";
        epfostatusMessage.success = null;
        // setDisabledAadharInput(true);
        openOtpForm(uanNumber, "UAN Number", () => validateUANOtp(uanNumber), 'Generate OTP for PF Verification');
      } else {
        setisUanVarified(false);
        showErrorMessage(remarks);
      }
      setEpfostatusMessage(epfostatusMessage);
    }
  };

  const handlePassportVerification = async () => {
    const payLoad = {
      appointeeId,
      userId,
      passportFileNo: passportFileNumber,
      dateOfBirth: dateOfBirth,
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
    openOtpForm(UAN, "UAN Number", () => validateUANOtp(UAN), 'Generate OTP for PF Verification');
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
      const matchedNationality = nationalityList.find((element) =>
        element.value?.toLowerCase() === nationalityLower
      );
      const index = nationalityList.indexOf(matchedNationality);
      setCountryOfOrigin(countryList[index]?.value);
      // setCountryOfOrigin();
    }
    if (value === "N") {
      setCountryOfOrigin(defaultCountry);
    }
  };
  // const handleIsPassportAvailableOnChange = (e) => {
  //   const { value } = e.target;
  //   setPassportAvailable(value);
  //   if (value === "Y") {

  //     // setisInterNationalWorker("N");
  //     // nationalityList &&
  //     //   nationalityList.forEach((element, index) => {
  //     //     console.log("Nation", element.value, nationality)
  //     //     if (element.value?.toLowerCase() === nationality?.toLowerCase) {
  //     //       setCountryOfOrigin(countryList[index].value);
  //     //     } else {
  //     //       setCountryOfOrigin(defaultCountry);
  //     //     }
  //     //   }, countryList);

  //     const nationalityLower = nationality?.toLowerCase();
  //     if (defaultCountry?.toLowerCase() === nationalityLower) {
  //       setisInterNationalWorker("N");
  //       setDisabledIsInterNationalWorker(true)
  //     } else {
  //       setisInterNationalWorker("Y");

  //     }
  //     const matchedNationality = nationalityList.find((element) =>
  //       element.value?.toLowerCase() === nationalityLower
  //     );
  //     console.log("Nation", matchedNationality)
  //     if (matchedNationality) {
  //       const index = nationalityList.indexOf(matchedNationality);
  //       setCountryOfOrigin(countryList[index]?.value);
  //     } else {
  //       setCountryOfOrigin(defaultCountry);
  //     }
  //   }
  //   if (value === "N") {
  //     setisInterNationalWorker("N");
  //     setCountryOfOrigin("");
  //     setPassportNo("");
  //     setPassportValidForDate("");
  //     setPassportValidTillDate("");
  //   }
  // };
  const today = DateFormatYYYYMMDD(new Date());
  const PasswordExpiryValidity = (e) => {
    const expiryDate = e.target.value;
    if (expiryDate > StringToDate(new Date())) {
      setPassportValidTillDate(expiryDate);
    } else {
      const formattedMessage = passportExpireddMsg ? passportExpireddMsg.split('. ').map((sentence, index) => (
        <React.Fragment key={index}>
          {`${sentence}.`}
          {index < passportExpireddMsg.split('. ').length - 1 && <br />}
        </React.Fragment>
      )) : '';
      showErrorMessage(formattedMessage);
    }

  }

  // const determineIsInternationalWorker = (nationalityLower, defaultCountry) => {
  //   if (defaultCountry?.toLowerCase() === nationalityLower) {
  //     setisInterNationalWorker("N");
  //     setDisabledIsInterNationalWorker(true);
  //   } else {
  //     setisInterNationalWorker("Y");
  //     setDisabledIsInterNationalWorker(false);
  //   }
  // };

  const setCountryOfOriginBasedOnNationality = (nationalityLower) => {
    const matchedNationality = nationalityList.find(
      (element) => element.value?.toLowerCase() === nationalityLower
    );

    if (matchedNationality) {
      const index = nationalityList.indexOf(matchedNationality);

      if (defaultCountry?.toLowerCase() === countryList[index]?.value?.toLowerCase()) {
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
      console.log(nationalityLower, defaultCountry)
      // determineIsInternationalWorker(nationalityLower, defaultCountry);
      setCountryOfOriginBasedOnNationality(nationalityLower);
    }
  }, [nationality, passportAvailable]);

  const handlePassporNumbertHelp = () => {
    const passportHelpContent = {
      dialogContentText: "",
      dialogTitle: "PASSPORT HELP",
      dialogContentComponent: <img
        src={PassportSample}
        alt="Help"
        style={{ maxWidth: '100%', maxHeight: '100%' }}
      />,
      maxWidth: 'sm',
      btnName: 'Close'
    };
    openInfoModel(passportHelpContent);

  }
  const handlePassporFileNumbertHelp = () => {
    const passportHelpContent = {
      dialogContentText: "",
      dialogTitle: "PASSPORT FILE NO. HELP",
      dialogContentComponent: <img
        src={PassportFileNoSample}
        alt="Help"
        style={{ maxWidth: '100%', maxHeight: '100%' }}
      />,
      maxWidth: 'sm',
      btnName: 'Close'
    };
    openInfoModel(passportHelpContent);

  }

  const passportNumberInputProps = {
    maxLength: 12,
    ...inputFieldStyle,
    // endAdornment: (
    //   <InputAdornment position="end">
    //     <IconButton onClick={handlePassporNumbertHelp}>
    //       <HelpOutline />
    //     </IconButton>
    //   </InputAdornment>
    // ),
  }

  return (
    <CardLayout>
      <Typography sx={heading2}>
        Your personal details must match with your Aadhaar details
      </Typography>
      <Box my={"20px"}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={2.5}
            item
            xs={12}
            md={10}
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
                            step={"1"}
                            heading={"Personal Details"}
                            info={"Enter all your Personal Details like Gender, DOB to verify with Adhar, PAN, UAN."}
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
                              cursor: isAadhaarVarified ? "cursor" : "pointer",
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
                              onKeyDown={ handleSpacialcharecter}
                              onPaste={handelSpacialCharecterPaste}
                              onChange={(e)=>{setFathersOrHusbandName(e.target.value)}}
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
                                style: inputFieldStyle,
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
                                step={"2"}
                                heading={"Passport Details"}
                                info={"Enter your Passport details to verify its authenticity."}
                                Children={<IconButton onClick={handlePassporNumbertHelp}>
                                  <HelpOutline />
                                </IconButton>}
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
                                    onChange={handleIsPassportAvailableOnChange}
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
                                        disabled={isPassportVarified || disabledIsInterNationalWorker}
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
                                    onChange={(e) => setPassportNo(e.target.value)}
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
                                    InputProps={{ inputProps: { max: today } }}
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
                                step={"3"}
                                heading={"Others Details"}
                                info={"Enter your other information like handicap details ."}
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

                      <Stack flexDirection={"row"} ml={"25px"}>
                        <Button
                          xs={12}
                          name="save"
                          onClick={() => setClickedButton("S")}
                          type="submit"
                          sx={{ m: "10px 5px" }}
                          variant="contained"
                          color="primary"
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
                      </Stack>
                    </Grid>
                  </form>
                </Box>
              </>
            ) : null}
            {currentPageNo === 2 ? (
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
                      <FormHeading step={""} heading={""} />
                    </Grid>
                    <Grid item xs={12} md={12} lg={7}>
                      <Stack
                        flexDirection={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        {/* <Typography sx={lable1Style}>Passport Number</Typography> */}

                        <Typography
                          sx={{ ...lable1Style }}
                        >
                          {"Do you have PF under any Trust, in the past or present"}
                        </Typography>
                        <FormControl >
                          <Stack
                            direction="row"
                            spacing={1}
                            justifyContent={"end"}
                            alignItems="center"
                            width={'auto'}
                          >
                            <Typography>No</Typography>
                            <Switch
                              onChange={({ target }) =>
                                setIsTrustEpfoAvailable(target.checked)
                              }
                              checked={isTrustEpfoAvailable}
                              color="secondary"
                            />
                            <Typography>Yes</Typography>
                          </Stack>
                        </FormControl>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={12} lg={5}>
                      {isTrustEpfoAvailable && (
                        <FileUploadSection
                          chooseFile={uploadTrustEPFOFile}
                          fileName={trustEpfoFileName}
                          accept={"image/png, image/jpeg"}
                        />
                      )}
                    </Grid>
                    {/* <Grid item xs={12} md={7}>
                      <Stack
                        flexDirection={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Typography
                          sx={{ ...lable1Style, whiteSpace: "nowrap" }}
                        >
                          {"Do you have Pension under any Trust, in the past or present"}
                        </Typography>
                        <FormControl fullWidth>
                          <Stack
                            direction="row"
                            spacing={1}
                            justifyContent={"end"}
                            alignItems="center"
                          >
                            <Typography>No</Typography>
                            <Switch
                              onChange={({ target }) =>
                                setIsTrustPensionAvailable(target.checked)
                              }
                              checked={isTrustPensionAvailable}
                              color="secondary"
                            />
                            <Typography>Yes</Typography>
                          </Stack>
                        </FormControl>
                      </Stack>
                    </Grid> */}
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
                          step={"4"}
                          heading={"Passport Verification"}
                          info={"Enter your Passport file number to verify also see the help sign (?) to see how to find passport file number ."}

                          Children={<IconButton onClick={handlePassporFileNumbertHelp}>
                            <HelpOutline />
                          </IconButton>}
                        />
                      </Grid>
                      <Grid sx={positionRelative} item xs={12}>
                        {isPassportVarified && <DisableSection />}
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
                                  onChange={handlePassFileNumberOnChange}
                                  className="customeTextField"
                                  value={passportFileNumber}
                                  defaultValue={""}
                                />
                              </>
                            ) : (
                              <>
                                <Typography
                                  sx={{ ...lable1Style, textAlign: "center" }}
                                >
                                  Visa details
                                  <span className="requiredField">*</span>
                                </Typography>
                                <FileUploadSection
                                  chooseFile={uploadPassportFile}
                                  fileName={passportFileName}
                                />
                              </>
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  ) : null}

                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={2.5}
                    item
                    xs={12}
                  >
                    <Grid item xs={12}>
                      <FormHeading step={"4"}
                        heading={"Aadhaar Verification"}
                        info={"Enter Adhar data to verify, see more info in the below link."}
                      />
                      <Grid item xs={12} md={12}>
                        <Typography sx={{ ...lable1Style, fontWeight: 500, fontSize: 18 }}>
                          As part of onboarding process,
                          Please generate your offline kyc verification file and upload it here.
                          To see the details steps,
                          {/* An eKYC XML file containing the personal data, required for verification, can be downloaded only by you using your Aadhaar credentials. This file contains the name, date of birth and gender, besides other information, that would be extracted to match with the information provided by you. The process would first inspect the authenticity of the eKYC XML file provided by you and then perform the matching and then dispose the file and the contents
                          Aadhaar verification wiil be done using the offline ekyc method of UIDAI. To see the details steps,   */}
                          <Link sx={{ cursor: 'pointer' }} onClick={() => openOfflineKycInfoModel()} > Click here</Link>
                        </Typography>
                        {isAadhaarVarified ?
                          <FormControlLabel control={
                            <Checkbox
                              disabled
                              checked
                              inputProps={{ 'aria-label': 'controlled' }}

                            />
                          } label="I have downloaded the aadhar offline kyc file"
                          />
                          :

                          <FormControlLabel control={
                            <Checkbox
                              checked={isOfflineXmlDownloaded}
                              onChange={handleIsOfflineXmlDownloadedOnChange}
                              inputProps={{ 'aria-label': 'controlled' }}

                            />
                          } label="I have downloaded the aadhar offline kyc file"
                          />
                        }
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
                              setNameAsOnAadhar(e.target.value.toUpperCase());
                            }}
                            value={nameAsOnAadhar}
                            defaultValue={" "}
                            disabled={true}
                          /> <Typography sx={lable1Style}>
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
                            disabled={disabledAadharInput || !isAadhaarXmlUploaded}
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
                            accept={'.rar, .zip'}
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
                      <FormHeading step={"5"} heading={"PAN Verification"} info={"Enter your Pan Numebr to verify."}
                      />
                    </Grid>{" "}
                  </Grid>
                  <Grid
                    container
                    rowSpacing={2}
                    sx={positionRelative}
                    item xs={12}
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
                      <VerificationStatusSection docType={panstatusMessage} />
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
                    <FormHeading step={"6"} heading={"UAN Verification"} info={"Enter your Universal Account Number(UAN) to verify."} />
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
                        <Button
                          sx={{ margin: "5px" }}
                          disabled={isUanVarified}
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
                    <Button
                      onClick={() => setCurrentPageNo(1)}
                      sx={{ m: " 15px 5px" }}
                      variant="contained"
                      color="primary"
                    >
                      {previousButton}
                    </Button>
                    {isSubmitDisabled === false ?
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
                      : null
                    }
                  </Grid>
                </Grid>
              </form>
            ) : null}
          </Grid>
        </Grid>
        {
          <Typography
            appointeeId={appointeeId}
            onClick={() => setRemarks(appointeeId)}
            sx={linkStyle}
          >
            To know the remarks Click here{" "}
          </Typography>
        }
      </Box>
      <FormDialog
        open={fetchUanConfirmation}
        DialogTitle={
          "Your aadhar verification has failed. If you continue you will not be able to change your aadhar. Do you want to continue?"
        }
        shouldTakeAction={fetchUanConfirmationSubmittion}
      />
    </CardLayout>
  );
};

export default AppointeeRegister;
