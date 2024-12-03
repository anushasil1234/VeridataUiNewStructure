

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
    Divider,
    Fab,
} from "@mui/material";
import { Info, InfoOutlined } from "@mui/icons-material";
import {
    activeStepStyle,
    candidateRegistrationFormContainerStyle,
    checkBoxLabelStyle,
    checkBoxStyle,
    datePickerinputFieldStyle2,
    divederStyle,
    fileUploadSectionContainerStyle,
    formHeadingContainerStyle,
    formHeadingGridContainerStyle,
    genderSectionContainer,
    genderTypeStyle,
    heading2,
    headingType1,
    indActiveStepStyle,
    inputFieldStyle,
    inputFieldStyle2,
    lable1CopyStyle,
    lable1Style,
    positionRelative,
    primaryFabStyle,
    statusBoxstyle,
    statusstyle,
    subHeadingContentTextStyle,
    submitBtnContainerStyle,
    submitBtnStyle,
    verificationBtnStyle,
} from "app";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getHandicapTypeDescription,
    otherFileTypeAlias,
    stepperDefaultList,
    tenthCertificateFileTypeAlias,
    passportFileTypeAlias,
    handicapFileTypeAlias,
    trustEpfoFileTypeAlias,
    formSaveSuccess,
    formSubmitionSuccess,
    epfoPassbookFileTypeAlias,
    UANEmptyErrorMsg,
    aadharVerificationErrorMsg,
    PANVerifictionErrorMsg,
    passportFilePatternErrorMsg,
    imgAndPdfMaxSize,
    imgAndPdfMaxSizeValue,
    aaddharNumberverify,
    indianpassportFilePatternErrorMsg,
    passportNoEmptyMsg,
    epfoServiceHistoryFileTypeAlias,
    aadharFileTypeAlias,
} from "shared/constants/constants";
import {
    CardLayout,
    CreateStepSequience,
    DateFormatYYYYMMDD,
    getLocalStorageItem,
    hasValue,
    patternChecking,
    removeFile,
    setLocalStorageItem,
    StringToDate,
    trimmedDate,
    validationsCheck,
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
    passportSuccessMsg,
    passportVerifyFailedMsg,
    previousButton,
    registrationSuccessDialogContentText,
    saveAndNextbutton,
    saveButton,
    submitConfirmationMsg,
    toDashboard,
    uanVerifyFailedMsg,
    uanVerifySuccessMsg,
    uploadSizeErrorMsg,
    duplicateFiles,
    uploadFormatErrorMsg,
    passportExpireddMsg,
} from "shared/constants/constants";
import DatePicker from "shared/utils/date-picker/date-picker";
import dayjs from 'dayjs';
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
import UANPrerequisiteInformation from "./uan-prerequiestic-info";
import GenderSelection from "shared/utils/associate/gender-selection";
import getFileDetails from "shared/utils/associate/get-file-details";
import getFilenames from "shared/utils/associate/get-filenames";
import createFileUploadedData from "shared/utils/associate/create-file-uploaded-data";

const AppointeeRegisterForm = () => {
    const steps = ["Step 1", "Step 2", "Step 3"];
    //const today = dayjs(); 
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
    const [passportFileNumberError, setPassportFileNumberError] = useState(false);
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
    const [isPassportAvailableDisable, setIsPassportAvailableDisable] = useState(false);
    const [countryOfOrigin, setCountryOfOrigin] = useState("");
    const [passportNo, setPassportNo] = useState(null);
    const [passportNumberError, setPassportNumberError] = useState(false);
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
    const [passportNoMaxLength, setPassportNoMaxLength] = useState(null);

    const [uanNumberAvailable, setUanNumberAvailable] = useState("");
    const [isPreviousSectionDisabled, setIsPreviousSectionDisabled] =
        useState(false);
    const [showAdditionalSection, setShowAdditionalSection] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPANModalOpen, setIsPANModalOpen] = useState(false);
    // const [isUANModalOpen, setIsUANModalOpen] = useState(false);
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
        maxLength: passportNoMaxLength,
        ...inputFieldStyle2,
    };

    const [isPFVerificatoinReq, setIsPFVerificatoinReq] = useState(null);
    const [isAadhaarVarified, setisAadhaarVarified] = useState(false);
    const [isAadhaarXmlUploaded, setIsAadhaarXmlUploaded] = useState(false);
    const [isOfflineXmlDownloaded, setIsOfflineXmlDownloaded] = useState(false);
    const [isPanVarified, setIsPanVarified] = useState(null);
    const [isPassportVarified, setIsPassportVarified] = useState(false);
    // const [isEmployementDataVarified, setIsEmployementDataVarified] =
    //   useState(null);
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
    const [trustEpfoFileName, setTrustEpfoFileName] = useState([]);
    const [handicapFileName, setHandicapFileName] = useState();
    const [epfoPassBookFiles, setEpfoPassBookFiles] = useState([]);
    const [epfoServiceHistoryFile, setEpfoServiceHistoryFile] = useState();
    const [aadharXmlFileName, setAadharXmlFileName] = useState([]);
    const [passportFileName, setPassportFileName] = useState([]);
    const [tenthCertificateFileName, setTenthCertificateFileName] = useState([]);
    const [otherFileName, setOtherFileName] = useState([]);
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
    const [uanAadharLink, setUanAadharLink] = useState('');
    const [stepsList, setStepsList] = useState(
        stepperDefaultList
    );
    const [isUanVerificationProcessManual, setIsUanVerificationProcessManual] = useState('auto');
    const [panNumberError, setPanNumberError] = useState(false);

    const stepCounter = 4;


    const initialTimeOfOtpTimer = () => {
        setTimeoutTimer(10 * 60);
    };
    const clearFileVaribles = (fileTypeAlias, setFileName, fileNameList) => {


        if (!fileDetails?.length) return;

        // Filter out files matching the specified alias and having `uploadDetailsId === 0`
        const filesToRemove = uploadedFile.filter(
            ({ uploadTypeAlias, uploadDetailsId }) =>
                uploadTypeAlias === fileTypeAlias && uploadDetailsId === 0
        );

        // Remaining uploaded files
        const updatedUploadedFiles = uploadedFile.filter(
            ({ uploadTypeAlias, uploadDetailsId }) =>
                uploadTypeAlias !== fileTypeAlias || uploadDetailsId !== 0
        );

        // Files to remove from fileDetails
        const removeDetailsList = fileDetails.filter(({ name, size }) =>
            filesToRemove.some(
                ({ fileName, fileLength }) => fileName === name && fileLength === size
            )
        );

        // Remaining fileDetails
        const updatedFileDetails = fileDetails.filter(
            ({ name, size }) =>
                !removeDetailsList.some(
                    (removed) => removed.name === name && removed.size === size
                )
        );

        // Updated fileNameList
        const removedNames = removeDetailsList.map(({ name }) => name);
        const updatedFileNameList = fileNameList.filter(
            (name) => !removedNames.includes(name)
        );

        // Update state with the filtered results
        setUploadedFile(updatedUploadedFiles);
        setFileDetails(updatedFileDetails);
        setFileName(updatedFileNameList);

        console.log('Final State:', {
            updatedFileDetails,
            updatedUploadedFiles,
            updatedFileNameList,
        });
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
                //isEmployementVarified,
                isPanVarified,
                isPensionApplicable,
                saveStep,
                companyName,
                isSubmit,
                fileUploaded,
                isUanAvailable,
                isTrustPassbook,
                isManualPassbook,
                isUanLinkWithAadhar
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
            // (isPanVarified !== true) ?
            //   setPanNumberError(true) :
            //   setPanNumberError(false);
            hasValue(isManualPassbook)
                ? isManualPassbook === true ? setIsUanVerificationProcessManual('manual')
                    : setIsUanVerificationProcessManual('auto')
                : setIsUanVerificationProcessManual('auto');
            hasValue(isUanLinkWithAadhar)
                ? setUanAadharLink(isUanLinkWithAadhar)
                : setUanAadharLink('NA');
            // setIsEmployementDataVarified(isEmployementVarified);

            if (hasValue(uanNumber)
                //&& isEmployementVarified === null
            ) {
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
            setPassPortMaxLength(nationality);
            const { upDatedFileUploaded } = createFileUploadedData({ fileUploaded });
            setUploadedFile([...upDatedFileUploaded]);
            setFileUploaded(fileUploaded);
            setIsAppointeeUanAvailable(isUanAvailable);
            hasValue(isUanAvailable)
                ? setUanNumberAvailable(isUanAvailable ? "yes" : "no")
                : setUanNumberAvailable(null);
            // setUanNumberAvailable(isUanAvailable ? "yes" : "no");
            hasValue(isTrustPassbook)
                ? setIsTrustEpfoAvailable(isTrustPassbook)
                : setIsTrustEpfoAvailable(true);
            const {
                tenthCertificateFileName, otherFileName, passportFileName, handicapFileName,
                trustEpfoFileName, epfoPassBookFiles, epfoServiceHistoryFile
            } = getFilenames({ fileUploaded });
            setTenthCertificateFileName(tenthCertificateFileName);
            setOtherFileName(otherFileName);
            setPassportFileName(passportFileName);
            setHandicapFileName(handicapFileName);
            setTrustEpfoFileName(trustEpfoFileName);
            setEpfoPassBookFiles(epfoPassBookFiles);
            setEpfoServiceHistoryFile(epfoServiceHistoryFile);
            // setUploadedFile([...upDatedFileUploaded]);
            console.log("AAAAAA)", uanAadharLink)
            // fileUploaded.forEach(
            //   ({ uploadTypeAlias, mimeType, fileData, fileName }) => {
            //     const fileDetails = `data:${mimeType};base64,${fileData}`;
            //     const file = {
            //       fileDetails,
            //       fileName,
            //     };

            //     if (uploadTypeAlias === tenthCertificateFileTypeAlias) {
            //       console.log('file.fileName', file.fileName);

            //       setTenthCertificateFileName([file.fileName]);
            //     }
            //     if (uploadTypeAlias === otherFileTypeAlias) {
            //       setOtherFileName([file.fileName]);
            //     }

            //     if (uploadTypeAlias === passportFileTypeAlias) {
            //       setPassportFileName(file.fileName);
            //     }
            //     if (uploadTypeAlias === handicapFileTypeAlias) {
            //       setHandicapFileName(file.fileName);
            //     }
            //     if (uploadTypeAlias === trustEpfoFileTypeAlias) {
            //       console.log('file.fileName123', file.fileName);

            //       setTrustEpfoFileName([...trustEpfoFileName, file.fileName]);
            //     }
            //     if (uploadTypeAlias === epfoPassbookFileTypeAlias) {
            //       setEpfoPassBookFiles(file.fileName);
            //     }
            //     if (uploadTypeAlias === epfoServiceHistoryFileTypeAlias) {
            //       setEpfoServiceHistoryFile(file.fileName);
            //     }
            //   }
            // );
            updateStep(
                {
                    isHandicap: isHandicap,
                    isPassportAvailable: isPassportAvailable
                }
            );
        };


    }
    const updateStep = (param) => {
        const _steps = CreateStepSequience({ ...param, stepCounter })
        setStepsList({ ...stepsList, ..._steps })
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
        openConfirmationModel(submitconfModelContent, () => handleAppointeeFormPage2Save({ isUanManualUpload: true, status: "Submitted" }));
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
    const hasEPFOPassbookUpload = () => checkFileUpload(epfoPassbookFileTypeAlias);
    const hasEPFOServiceHistoryUpload = () => checkFileUpload(epfoServiceHistoryFile);


    const openUploadDocInfoModel = (dialogContentText) => {
        openInfoModel({ dialogContentText });
    };
    const openOfflineKycInfoModel = () => {
        const offlineKycContent = {
            dialogTitle: "Offline Aadhaar Kyc Steps Info",
            dialogContentText:
                "To complete the offline Aadhaar KYC process please follow the instructions given below :",
            dialogContentComponent: <VerficationAadharSteps />,
            fullWidth: true,
        };
        openInfoModel(offlineKycContent);
    };

    const submitDetails = (autoSubmit, isManual) => {
        if (autoSubmit) {
            handleAppointeeFormPage2Save({ isUanManualUpload: isManual, status: "Approved" });
        } else {
            handleAppointeeFormPage3Save();
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
            setEpfoButton("Auto UAN Verification");
        }
    }, [UAN]);
    useEffect(() => {
        if (genderDropdownList && gender !== undefined) {
            selectGender(gender);
        }
    }, [genderDropdownList, gender]);


    useEffect(() => {
        if (!isTrustEpfoAvailable) {


            clearFileVaribles(trustEpfoFileTypeAlias, setTrustEpfoFileName, trustEpfoFileName);
        }
    }, [isTrustEpfoAvailable]);

    useEffect(() => {
        if (
            isAadhaarVarified === true &&
            // isPanVarified === true &&
            isUanVarified !== null
            //&&      isEmployementDataVarified !== null
        ) {
            setIsSubmitDisabled(false);
        }
        if (isPanVarified) {
            setDisabledPanInput(true);
        }

        // if (isPanVarified !== null) {
        //     setIsEpfoSectionDisabled(false);
        // }
        if (isAadhaarVarified !== null && isAadhaarVarified === true) {
            setIsEpfoSectionDisabled(false);
        }
        if (isAadhaarVarified !== null) {
            // setIsPanSectionDisabled(false);
        }
        if (isAadhaarVarified) {
            setDisabledAadharInput(true);
        }
        if (
            //isEmployementDataVarified === null &&
            isSubmit === false) {
            if (
                isAadhaarVarified &&
                // isPanVarified &&
                isUanVarified
                //&& !hasValue(UAN)
            ) {
                submitDetails(true, false);
            }
        }

    }, [
        isAadhaarVarified,
        //   isPanVarified,
        isUanVarified,
    ]);

    // useEffect to check if UAN appointee is available on page load
    useEffect(() => {
        if (hasValue(isAppointeeUanAvailable)) {
            setIsPreviousSectionDisabled(true);
        }

    }, [isAppointeeUanAvailable]);

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
            setCountryOfOriginBasedOnNationality(nationalityLower);
        }

    }, [nationality, passportAvailable]);

    useEffect(() => {
        // updateStepCounter(isPhysicallyHandicap);
        if (isPhysicallyHandicap === 'N') {


            clearFileVaribles(handicapFileTypeAlias, setHandicapFileName, handicapFileName);
        }
    }, [isPhysicallyHandicap])

    // useEffect(() => {
    //   // updateStepCounter(passportAvailable);
    // }, [passportAvailable])

    useEffect(() => {
        if (isUanVerificationProcessManual === 'auto') {
            clearFileVaribles(epfoPassbookFileTypeAlias, setEpfoPassBookFiles, epfoPassBookFiles);
            clearFileVaribles(epfoServiceHistoryFileTypeAlias, setEpfoServiceHistoryFile, epfoServiceHistoryFile);
        }
        setUploadedFile([]);
        setFileDetails([]);
    }, [isUanVerificationProcessManual])


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

    // const uploadFile = ({ files }, uploadTypeAlias, setFileName, fileSize = null) => {
    //   const fileData = files[0];
    //   const { name, size, type } = fileData;

    //   const isFileExists = fileDetails.find((currentFileData) => {
    //     return (
    //       currentFileData.name === name &&
    //       currentFileData.size === size &&
    //       currentFileData.type === type
    //     );
    //   });

    //   if (isFileExists) {
    //     showErrorMessage(duplicateFiles);
    //   } else {
    //     if (size <= imgAndPdfMaxSizeValue) {
    //       setFileName(name);

    //       // Find the file type ID based on the uploadTypeAlias
    //       const { id } =
    //         fileTypeList &&
    //         fileTypeList.length > 0 &&
    //         fileTypeList.find(({ code }) => code === uploadTypeAlias);

    //       // Create new file object
    //       const file = {
    //         fileName: name,
    //         mimeType: type,
    //         fileLength: size,
    //         uploadTypeId: id,
    //         uploadTypeAlias: uploadTypeAlias,
    //         isFileUploaded: true,
    //       };

    //       // Check if there's already a file with the same uploadTypeAlias
    //       const existingFileIndex = uploadedFile.findIndex(
    //         (uploadedFile) => uploadedFile.uploadTypeAlias === uploadTypeAlias
    //       );

    //       let updatedUploadedFileList = [...uploadedFile];
    //       let updatedFileDetails = [...fileDetails];

    //       if (existingFileIndex !== -1) {
    //         // If a file with the same uploadTypeAlias exists, remove it
    //         updatedUploadedFileList.splice(existingFileIndex, 1);
    //         updatedFileDetails.splice(existingFileIndex, 1);
    //       }

    //       // Add the new file to the lists
    //       setUploadedFile([...updatedUploadedFileList, file]);
    //       setFileDetails([...updatedFileDetails, fileData]);
    //     } else {
    //       showErrorMessage(uploadSizeErrorMsg);
    //     }
    //   }
    // };



    const uploadFile = ({ files, uploadTypeAlias, setFileName, _filenameList = [], uploadType = 'single' }) => {
        const { error, updatedUploadedFileList, updatedFileDetails, fileNameList } = getFileDetails(
            { files, uploadTypeAlias, setFileName, _filenameList, uploadType, fileTypeList, uploadedFile, fileDetails }
        );
        if (hasValue(error)) {
            showErrorMessage(error);
        }
        // console.log('fileNameList files', files,);
        // console.log('fileNameList', uploadTypeAlias, setFileName, _filenameList = [], uploadType = 'single');
        // console.log('updatedUploadedFileList', [...updatedUploadedFileList], fileNameList);

        setUploadedFile([...updatedUploadedFileList]);
        setFileDetails([...updatedFileDetails]);
        setFileName([...fileNameList]);
    };

    const removeEPFOPassbookFile = (currentFileName) => {
        const {
            fileNameList: _fileNameList,
            updatedUploadedFileList: _updatedUploadedFileList,
            updatedFileDetails: _updatedFileDetails
        } = removeFile({
            uploadedFile: uploadedFile, fileDetails: fileDetails,
            uploadTypeAlias: epfoPassbookFileTypeAlias, fileNameList: epfoPassBookFiles,
            currentFileName: currentFileName, uploadType: 'multiple'
        });

        setEpfoPassBookFiles(_fileNameList);
        setUploadedFile(_updatedUploadedFileList);
        setFileDetails(_updatedFileDetails);
    }
    const removeEPFOFile = (currentFileName) => {
        const {
            fileNameList: _fileNameList,
            updatedUploadedFileList: _updatedUploadedFileList,
            updatedFileDetails: _updatedFileDetails
        } = removeFile({
            uploadedFile: uploadedFile, fileDetails: fileDetails,
            uploadTypeAlias: trustEpfoFileTypeAlias, fileNameList: trustEpfoFileName,
            currentFileName: currentFileName, uploadType: 'multiple'
        });


        setTrustEpfoFileName(_fileNameList);
        setUploadedFile(_updatedUploadedFileList);
        setFileDetails(_updatedFileDetails);
    }
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
            setAadharXmlFileName([name]);
            setXmlFileUploaded(fileData);
        }
        setIsAadhaarXmlUploaded(true);
    };

    const handleFileUpload = (fileTypeAlias, setFileName, fileNameList = [], uploadType) => ({ target }) => {
        uploadFile({
            files: target.files, uploadTypeAlias: fileTypeAlias, setFileName,
            _filenameList: fileNameList, uploadType
        });
    };
    const uploadTrustEPFOFile = handleFileUpload(trustEpfoFileTypeAlias, setTrustEpfoFileName, trustEpfoFileName, 'multiple');
    const uploadHandicapFile = handleFileUpload(handicapFileTypeAlias, setHandicapFileName);
    const uploadEpfoPassBookFile = handleFileUpload(epfoPassbookFileTypeAlias, setEpfoPassBookFiles, epfoPassBookFiles, 'multiple');
    const uploadEpfoServiceHistoryFile = handleFileUpload(epfoServiceHistoryFileTypeAlias, setEpfoServiceHistoryFile, epfoServiceHistoryFile, 'single');
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
        const isUploaded = hasTenthPassCertificateUpload() || hasValue(tenthCertificateFileName);
        if (!isUploaded) showUploadMessage("10th pass certificate");
        return isUploaded;
    };


    // Check if father's doc certificate is uploaded
    const checkFathersDocCertificateUpload = () => {

        const isUploaded = hasFathersDocCertificateUpload() || hasValue(otherFileName);
        if (!isUploaded) showUploadMessage("father's name attached certificate");
        return isUploaded;
    };
    const checkEPFOPassbookDocCertificateUpload = () => {

        const isUploaded = hasEPFOPassbookUpload() || hasValue(epfoPassBookFiles);
        if (!isUploaded) showUploadMessage("EPFO Passbook file");
        return isUploaded;
    };
    const checkEPFOServiceHistoryDocCertificateUpload = () => {

        const isUploaded = hasEPFOServiceHistoryUpload() || hasValue(epfoServiceHistoryFile);
        if (!isUploaded) showUploadMessage("EPFO Service History file");
        return isUploaded;
    };

    // Check if handicap certificate is uploaded (only if applicable)
    const checkHandicapCertificateUpload = () => {
        if (isPhysicallyHandicap != "Y") {
            return true;
        } else {
            const isUploaded = hasHandicapUpload() || hasValue(handicapFileName);
            if (!isUploaded) showUploadMessage("handicap certificate");
            return isUploaded;
        }
    };


    // Check if Trust EPFO is uploaded (only if applicable)
    const checkTrustEpfoUpload = () => {
        if (isTrustEpfoAvailable != true) {
            return true;
        } else {
            const isUploaded = hasTrustEpfoUpload() || hasValue(trustEpfoFileName);
            if (!isUploaded) showUploadMessage("trust EPFO passbook");
            return isUploaded;
        }
    };

    // Check if passport is uploaded for other countries
    const checkPassportUploadForOtherCountries = () => {
        if (
            hasValue(countryOfOrigin) &&
            (countryOfOrigin !== "India" && countryOfOrigin !== "Nepal" && countryOfOrigin !== "Bhutan")
        ) {

            if (passportAvailable != "Y") {
                return true;
            } else {
                const isUploaded = hasPassportUpload() || hasValue(passportFileName);
                if (!isUploaded) showUploadMessage("visa");
                return isUploaded;
            }
            // if (


            //   (passportAvailable === "Y" && !hasPassportUpload()) ||
            //   !hasValue(passportFileName)
            // ) {
            //   showUploadMessage("visa");
            //   return false;
            // }
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
    const checkUANVerificationRequiredDoc = () => {
        if (!hasValue(UAN)) {
            showErrorMessage(UANEmptyErrorMsg);
            return false;
        }
        if (!checkEPFOServiceHistoryDocCertificateUpload()) {
            return false
        }
        if (!checkEPFOPassbookDocCertificateUpload()) {
            return false
        }
        return true;
    }
    const checkAadharVerification = () => {
        if (!isAadhaarVarified === true) {
            showErrorMessage(aadharVerificationErrorMsg);
            return false;
        }
        return true;
    }
    const checkPANVerification = () => {
        if (!isPanVarified === true) {
            showErrorMessage(PANVerifictionErrorMsg);
            return false;
        }
        return true;
    }
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
        // if (!checkPassportUploadForSpecificCountries()) return;
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

    const DraftSave = async () => {
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
            IsFinalSubmit: false
        };
        // Use the buildFormData helper function to create the formData


        let formData = buildFormData(payLoad);

        // Make the API call
        const response = await PostUpdatePfUanDetails(formData, formSaveSuccess);
        // if (response) {
        //   clearFileVaribles(trustEpfoFileTypeAlias, setTrustEpfoFileName);
        //   clearFileVaribles(handicapFileTypeAlias, setHandicapFileName);
        //   clearFileVaribles(passportFileTypeAlias, setPassportFileName);
        // }
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
            IsFinalSubmit: true
        };
        // Use the buildFormData helper function to create the formData
        let formData = buildFormData(payLoad);

        // Make the API call
        const response = await PostUpdatePfUanDetails(formData, formSubmitionSuccess);
        if (response) {
            handleNext();
            setIsPreviousSectionDisabled(true);
            // setShowAdditionalSection(true);

            //setIsUANappointeeAvailable(true)
            clearFileVaribles(trustEpfoFileTypeAlias, setTrustEpfoFileName, trustEpfoFileName);
            clearFileVaribles(handicapFileTypeAlias, setHandicapFileName, handicapFileName);
            clearFileVaribles(passportFileTypeAlias, setPassportFileName, passportFileName);
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
                // setPanNumberError(false);
            } else {
                displayPanError(panVerifyFailedMsg);
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

    const displayPanError = (msg, isValid) => {
        showErrorMessage(msg);
        setPanNumberError(true);
    }
    const handlePanVerifiaction = () => {
        if (!isAadhaarVarified) {
            showErrorMessage(aaddharNumberverify);
            setPanNumberError(true);
            return;
        }
        if (pan === null || nameAsOnPan === null || nameAsOnPan === "") {
            showErrorMessage(emptyPanMsg);
            setPanNumberError(true);
        } else if (!patternChecking(pan, /^[A-Z]{5}[0-9]{4}[A-Z]{1}/)) {
            showErrorMessage(invalidPanMsg);
            setPanNumberError(true);
        } else {
            verifyPAN();
        }
    };

    const handleAppointeeFormPage1Save = async (formElement) => {

        formElement.preventDefault();
        if (passportAvailable === 'Y') {
            if (!hasValue(passportNo)) {
                setPassportNumberError(true);
                showErrorMessage(passportNoEmptyMsg);
                return;
            }
            if (nationality.toLowerCase() === 'indian' && passportNo.length !== 12) {
                setPassportNumberError(true);
                showErrorMessage(indianpassportFilePatternErrorMsg);
                return
            }

        }
        const loginUserData = getLocalStorageItem("pfc-user");
        const formPostSuccessMessage = clickedButton === "S" ? formSaveSuccess : formSubmitionSuccess;
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
        const response = await postAppointeeDetails(payLoad, formPostSuccessMessage);
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


    // const registrationSuccessContent = {
    //   dialogContentText: registrationSuccessDialogContentText,
    //   dialogTitle: congratulationDialogContentTitle,
    //   maxWidth: "sm",
    //   btnName: "Go to Dashboard",
    // };
    // openInfoModel(registrationSuccessContent, () => navigateTo(toDashboard));
    const handleAppointeeFormPage2Save = async ({ isUanManualUpload, status }) => {
        const loginUserData = getLocalStorageItem("pfc-user");
        let payLoad = {
            // appointeeDetailsId: appointeeDetailsId,
            appointeeId: appointeeId,
            appointeeCode: userCode,
            isSubmit: true,
            userId: userId,
            FileDetails: fileDetails,
            fileUploaded: uploadedFile,
            IsManualPassbookUploaded: isUanManualUpload
        };
        // Use the buildFormData helper function to create the formData
        let formData = buildFormData(payLoad);
        // console.log('formData123', formData, payLoad);

        const response = await postAppointeeFileDetails(formData);
        if (response) {
            setLocalStorageItem("pfc-user", {
                ...loginUserData,
                isSubmit: true,
                status: status,
            });
            dispatch(removeLoggedinData());
            dispatch(
                storeLoggedinData({
                    ...loginUserData,
                    isSubmit: true,
                    status: status,
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
    };

    const handleAppointeeFormPage3Save = () => {
        if (!checkAadharVerification()) {
            return
        }
        // if (!checkPANVerification()) {
        //     return
        // }
        if (!checkUANVerificationRequiredDoc()) {
            return
        }
        openSubmitConfirmationModel();
    }

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
            const { isUanAvailable, uanNumber, remarks } =
                response.responseInfo;
            if (uanNumber) {
                // setIsUANModalOpen(true); // Open the dialog when UAN is available
                setUAN(uanNumber); // Save the uanNumber to the existing state
                //setisUanVarified(true);
                generateUANOTPDialog(uanNumber);
            } else if (
                isUANAvailableState === false &&
                !isUanAvailable &&
                !hasValue(uanNumber)
            ) {
                setUAN(null);
                setisUanVarified(true);
                // setIsEmployementDataVarified(false);
            }
            else {
                //setisUanVarified(false);
                showErrorMessage(remarks);
            }

            setEpfostatusMessage(epfostatusMessage);
        }
    };


    const generateUANOTPDialog = (UAN) => {
        // Perform the below actions using the already existing 'uan' state
        setEpfoButton("Auto UAN Verification");
        // setDisabledPanInput(true);
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
        if (!validationsCheck(passportFileNumber, 'indPassport')) {
            showErrorMessage(passportFilePatternErrorMsg);
            setPassportFileNumberError(true);
            return;
        }

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
    const setPassPortMaxLength = (nationality) => {
        if (!hasValue(nationality)) {
            return
        }
        if (nationality.toLowerCase() === "indian") {
            setPassportNoMaxLength(12);
        } else {
            setPassportNoMaxLength(20);
        }
    }
    const handleNationalityChange = ({ target }) => {
        const value = target.value;
        setNationality(value);
        setPassportNo("");
        if (value.toLowerCase() !== "indian" && value.toLowerCase() !== "nepalese" && value.toLowerCase() !== "bhutanese") {
            setPassportAvailable('Y');
            setIsPassportAvailableDisable(true);
        } else {
            setIsPassportAvailableDisable(false);
            setPassportAvailable('');
        }
        setPassPortMaxLength(value);
    }

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
                //setIsEmployementDataVarified(true);
                setisUanVarified(true);
            } else {
                showErrorMessage(uanVerifyFailedMsg);
                if (hasValue(remarks)) {
                    const generatedRemarks = generateRemarks(remarks);
                    openRemarksModel(generatedRemarks);
                }
            }

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
        //setIsEmployementDataVarified(true);
    };

    const formElement = useRef(null);

    const handlePassFileNumberOnChange = (e) => {
        const { value } = e.target;
        setPassportFileNumber(value);
        setPassportFileNumberError(false);
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
    const PasswordExpiryValidity = (expiryDate) => {

        // const expiryDate = e.target.value;

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
        setPassportNumberError(false);

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

    const handleChangeUanVerification = ({ target }) => {
        const value = target.value;
        setIsUanVerificationProcessManual(value);
        if (value === 'manual') {

            const prerequisiteModelContent = {
                dialogTitle: (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography>Prerequisite Informatiton for mannual upload</Typography>
                    </div>
                ),
                dialogContentText: <><Typography sx={subHeadingContentTextStyle}>Before verification there are some prerequisites, thats needs to be done...</Typography>
                    <Typography> </Typography></>,
                dialogContentComponent: <UANPrerequisiteInformation />,
                fullWidth: false,
            };
            openInfoModel(prerequisiteModelContent);
        }
    }

    const handlePassportNoChange = ({ target }) => {
        setPassportNumberError(false);
        setPassportNo(target.value);
    }

    const handelPANNumberChange = ({ target }) => {

        const { value } = target;
        setPanNumberError(false);
        if (isAadhaarVarified) {
            setPan(value.toUpperCase());
        } else {
            showErrorMessage(aaddharNumberverify)
        }
    }
    return (
        <>
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
                            sx={candidateRegistrationFormContainerStyle}
                        >

                            {currentPageNo === 1 ? (
                                <>
                                    {/* <CandidateRegisterFirstPage
                  handleOnSubmit={handleAppointeeFormPage1Save}
                  stepsList={stepsList}
                  fathersOrHusbandName={fathersOrHusbandName}
                  setFathersOrHusbandName={setFathersOrHusbandName}
                  gender={gender}
                  setGender={setGender}
                  isAadhaarVarified={isAadhaarVarified}
                  dateOfBirth={dateOfBirth}
                  setDateOfBirth={setDateOfBirth}
                  relationshipWithMember={relationshipWithMember}
                  setRelationshipWithMember={setRelationshipWithMember}
                  mobileNo={mobileNo}
                  setMobileNo={setMobileNo}
                  email={email}
                  setEmail={setEmail}
                  nationality={nationality}
                  setNationality={setNationality}
                  setPassportNo={setPassportNo}
                  setPassportAvailable={setPassportAvailable}
                  setIsPassportAvailableDisable={setIsPassportAvailableDisable}
                  setPassPortMaxLength={setPassPortMaxLength}
                  qualification={qualification}
                  setQualification={setQualification}
                  maritalStatus={maritalStatus}
                  setMaritalStatus={setMaritalStatus}
                /> */}
                                    <Box sx={{ marginTop: "1.8rem" }}>
                                        <form onSubmit={handleAppointeeFormPage1Save}>
                                            <Grid
                                                sx={{ paddingLeft: "20px" }}
                                                container
                                                rowSpacing={1}
                                                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                                            >

                                                {/* ###### Personal Details Section Start ###### */}

                                                <Grid
                                                    container
                                                    rowSpacing={1}
                                                    columnSpacing={2.5}
                                                    item
                                                    xs={12}
                                                    sx={formHeadingGridContainerStyle}
                                                >
                                                    <Grid item xs={12} sx={formHeadingContainerStyle}>
                                                        <FormHeading
                                                            step={stepsList.PD.step}
                                                            heading={stepsList.PD.name}
                                                            info={
                                                                "Enter all your Personal Details like Gender, DOB to verify with Aadhaar, PAN, UAN."
                                                            }
                                                        />
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        container
                                                        sx={{ paddingLeft: '0px !important' }}
                                                        rowSpacing={{ xs: 1, md: 0 }}
                                                        columnSpacing={{ xs: 0, md: 2 }}
                                                        xs={12}
                                                    >
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
                                                                const { currentGenderSectionContainer } = GenderSelection(selected, isAadhaarVarified);
                                                                return (
                                                                    <Grid sx={{ padding: 0 }} key={index} item xs={12} md={4}>
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
                                                </Grid>
                                                <Grid
                                                    container
                                                    rowSpacing={1}
                                                    columnSpacing={2.5}
                                                    item
                                                    xs={12}
                                                    sx={formHeadingGridContainerStyle}
                                                >
                                                    <Grid sx={{ paddingLeft: '0px !important' }} item xs={12} md={6}>
                                                        <Typography sx={lable1CopyStyle}>
                                                            Name
                                                            <span className="requiredField">*</span>
                                                        </Typography>
                                                        <TextField
                                                            onChange={(e) => {
                                                                setMemberName(e.target.value);
                                                            }}
                                                            error={false}
                                                            style={inputFieldStyle2}
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
                                                    <Grid item xs={12} md={6} sx={{ paddingLeft: { xs: '0px !important', md: '20px!important' } }}>
                                                        <FormControl sx={{ ...datePickerinputFieldStyle2 }} fullWidth>
                                                            <Typography sx={lable1CopyStyle}>
                                                                Date Of Birth
                                                                <span className="requiredField">*</span>
                                                            </Typography>

                                                            <DatePicker
                                                                disabled={isAadhaarVarified}
                                                                style={{ ...datePickerinputFieldStyle2 }}
                                                                //label="Date of Birth"
                                                                value={dateOfBirth ? dayjs(dateOfBirth) : null}
                                                                setValue={(newDate) => {
                                                                    if (newDate) {
                                                                        setDateOfBirth(newDate.format('YYYY-MM-DD'));
                                                                    }
                                                                }}
                                                                disableFuture={true}
                                                                maxDate={dayjs()}
                                                                minDate={null}
                                                            />
                                                        </FormControl>

                                                    </Grid>
                                                </Grid>
                                                <Grid
                                                    container
                                                    rowSpacing={1}
                                                    columnSpacing={2.5}
                                                    item
                                                    xs={12}
                                                    sx={formHeadingGridContainerStyle}
                                                >
                                                    <Grid item xs={12} md={6} sx={{ paddingLeft: '0px !important' }}>
                                                        <Typography sx={lable1CopyStyle}>
                                                            Father's/ Husband's Name
                                                            <span className="requiredField">*</span>
                                                        </Typography>

                                                        <TextField
                                                            error={false}
                                                            style={inputFieldStyle2}
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

                                                    <Grid item xs={12} md={6} sx={{ paddingLeft: { xs: '0px !important', md: '20px!important' } }}>
                                                        <FormControl fullWidth>
                                                            <Typography sx={lable1CopyStyle}>
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
                                                                    sx={inputFieldStyle2}
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
                                                </Grid>
                                                <Grid
                                                    container
                                                    rowSpacing={1}
                                                    columnSpacing={2.5}
                                                    item
                                                    xs={12}
                                                    sx={formHeadingGridContainerStyle}
                                                >
                                                    <Grid sx={{ paddingLeft: '0px !important' }} item xs={12} md={6}>
                                                        <Typography sx={lable1CopyStyle}>
                                                            Mobile No
                                                            <span className="requiredField">*</span>
                                                        </Typography>
                                                        <TextField
                                                            style={inputFieldStyle2}
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
                                                    <Grid item xs={12} md={6} sx={{ paddingLeft: { xs: '0px !important', md: '20px!important' } }}>
                                                        <Typography sx={lable1CopyStyle}>
                                                            Email
                                                            <span className="requiredField">*</span>
                                                        </Typography>
                                                        <TextField
                                                            style={inputFieldStyle2}
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
                                                </Grid>
                                                <Grid
                                                    container
                                                    rowSpacing={1}
                                                    columnSpacing={2.5}
                                                    item
                                                    xs={12}
                                                    sx={formHeadingGridContainerStyle}
                                                >
                                                    <Grid sx={{ paddingLeft: '0px !important' }} item xs={12} md={6}>
                                                        <FormControl fullWidth>
                                                            <Typography sx={lable1CopyStyle}>
                                                                Nationality
                                                                <span className="requiredField">*</span>
                                                            </Typography>
                                                            {nationality !== undefined && (
                                                                <Select
                                                                    error={false}
                                                                    labelId="demo-simple-select-label"
                                                                    id="demo-simple-select"
                                                                    sx={inputFieldStyle2}
                                                                    value={nationality}
                                                                    className="customeTextField"
                                                                    onChange={handleNationalityChange}
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
                                                    <Grid item xs={12} md={6} sx={{ paddingLeft: { xs: '0px !important', md: '20px!important' } }}>
                                                        <FormControl fullWidth>
                                                            <Typography sx={lable1CopyStyle}>
                                                                Qualification
                                                            </Typography>
                                                            {qualification !== undefined && (
                                                                <Select
                                                                    error={false}
                                                                    labelId="demo-simple-select-label"
                                                                    id="demo-simple-select"
                                                                    className="customeTextField"
                                                                    sx={inputFieldStyle2}
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
                                                </Grid>
                                                <Grid
                                                    container
                                                    rowSpacing={1}
                                                    columnSpacing={2.5}
                                                    item
                                                    xs={12}
                                                    sx={formHeadingGridContainerStyle}
                                                >
                                                    <Grid sx={{ paddingLeft: '0px !important' }} item xs={12} md={6}>
                                                        <FormControl fullWidth>
                                                            <Typography sx={lable1CopyStyle}>
                                                                Marital status
                                                                <span className="requiredField">*</span>
                                                            </Typography>
                                                            {maritalStatus !== undefined && (
                                                                <Select
                                                                    error={false}
                                                                    labelId="demo-simple-select-label"
                                                                    id="demo-simple-select"
                                                                    sx={inputFieldStyle2}
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
                                                </Grid>

                                                {/* ###### Personal Details Section End ###### */}


                                                {/* ###### Passport Details Section Start ###### */}

                                                <Grid
                                                    container
                                                    rowSpacing={1}
                                                    columnSpacing={2.5}
                                                    item
                                                    xs={12}
                                                    sx={formHeadingGridContainerStyle}
                                                >
                                                    <Grid item xs={12} sx={formHeadingContainerStyle}>
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
                                                </Grid>
                                                <Grid
                                                    container
                                                    rowSpacing={1}
                                                    columnSpacing={2.5}
                                                    item
                                                    xs={12}
                                                    sx={formHeadingGridContainerStyle}
                                                >
                                                    <Grid sx={{ paddingLeft: '0px !important' }} item xs={12} md={6}>
                                                        <FormControl fullWidth>
                                                            <Typography sx={lable1CopyStyle}>
                                                                Is Passport Available
                                                                <span className="requiredField">*</span>
                                                            </Typography>
                                                            {passportAvailable !== undefined && (
                                                                <Select
                                                                    error={false}
                                                                    className="customeTextField"
                                                                    labelId="demo-simple-select-label"
                                                                    id="demo-simple-select"
                                                                    sx={inputFieldStyle2}
                                                                    onChange={
                                                                        handleIsPassportAvailableOnChange
                                                                    }
                                                                    value={passportAvailable}
                                                                    disabled={isPassportAvailableDisable}
                                                                >
                                                                    <MenuItem value={"Y"}>Yes</MenuItem>
                                                                    <MenuItem value={"N"}>No</MenuItem>
                                                                </Select>
                                                            )}
                                                        </FormControl>
                                                    </Grid>
                                                    {passportAvailable === "Y" ? (
                                                        <Grid item xs={12} md={6} sx={{ paddingLeft: { xs: '0px !important', md: '20px!important' } }}>
                                                            <FormControl fullWidth>
                                                                <Typography sx={lable1CopyStyle}>
                                                                    Is International Worker
                                                                    <span className="requiredField">*</span>
                                                                </Typography>
                                                                {isInterNationalWorker !== undefined && (
                                                                    <Select
                                                                        error={false}
                                                                        className="customeTextField"
                                                                        labelId="demo-simple-select-label"
                                                                        id="demo-simple-select"
                                                                        sx={inputFieldStyle2}
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
                                                    ) : null}
                                                </Grid>

                                                {passportAvailable === "Y" ? (
                                                    <>
                                                        <Grid
                                                            container
                                                            rowSpacing={1}
                                                            columnSpacing={2.5}
                                                            item
                                                            xs={12}
                                                            sx={formHeadingGridContainerStyle}
                                                        >
                                                            <Grid sx={{ paddingLeft: '0px !important' }} item xs={12} md={6}>
                                                                <FormControl fullWidth>
                                                                    <Typography sx={lable1CopyStyle}>
                                                                        Country of origin
                                                                        <span className="requiredField">*</span>
                                                                    </Typography>

                                                                    <Select
                                                                        error={false}
                                                                        disabled={isInterNationalWorker === "N"}
                                                                        labelId="demo-simple-select-label"
                                                                        id="demo-simple-select"
                                                                        className="customeTextField"
                                                                        sx={inputFieldStyle2}
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
                                                            <Grid item xs={12} md={6} sx={{ paddingLeft: { xs: '0px !important', md: '20px!important' } }}>
                                                                <FormControl fullWidth>
                                                                    <Typography sx={lable1CopyStyle}>
                                                                        Passport Number
                                                                        <span className="requiredField">*</span>
                                                                    </Typography>
                                                                    <TextField
                                                                        error={passportNumberError}
                                                                        style={inputFieldStyle2}
                                                                        type="text"
                                                                        className="customeTextField"
                                                                        variant="outlined"
                                                                        onChange={handlePassportNoChange}
                                                                        value={passportNo}
                                                                        disabled={isPassportVarified}
                                                                        defaultValue={" "}
                                                                        inputProps={passportNumberInputProps}
                                                                    />
                                                                </FormControl>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid
                                                            container
                                                            rowSpacing={1}
                                                            columnSpacing={2.5}
                                                            item
                                                            xs={12}
                                                            sx={formHeadingGridContainerStyle}
                                                        >
                                                            <Grid item xs={12} md={6} sx={{ paddingLeft: '0px !important' }}>
                                                                <FormControl sx={{ ...datePickerinputFieldStyle2 }} fullWidth>
                                                                    <Typography sx={lable1CopyStyle}>
                                                                        Date of Issue
                                                                        <span className="requiredField">*</span>
                                                                    </Typography>


                                                                    <DatePicker
                                                                        disabled={isPassportVarified}
                                                                        style={{ ...datePickerinputFieldStyle2 }}
                                                                        value={passportValidForDate ? dayjs(passportValidForDate) : null}
                                                                        setValue={(newDate) => {
                                                                            if (newDate) {
                                                                                setPassportValidForDate(newDate.format('YYYY-MM-DD'));
                                                                                const expiryDate = newDate.add(10, 'year').subtract(1, 'day').format('YYYY-MM-DD');
                                                                                setPassportValidTillDate(expiryDate);
                                                                            }
                                                                        }}
                                                                        disableFuture={true}
                                                                        maxDate={dayjs()}
                                                                        minDate={null}
                                                                    />
                                                                </FormControl>
                                                            </Grid>

                                                            <Grid item xs={12} md={6} sx={{ paddingLeft: { xs: '0px !important', md: '20px!important' } }}>
                                                                <FormControl sx={{ ...datePickerinputFieldStyle2 }} fullWidth>
                                                                    <Typography sx={lable1CopyStyle}>
                                                                        Date of Expiry
                                                                        <span className="requiredField">*</span>
                                                                    </Typography>


                                                                    <DatePicker
                                                                        disabled={isPassportVarified}
                                                                        style={{ ...datePickerinputFieldStyle2 }}
                                                                        value={passportValidTillDate ? dayjs(passportValidTillDate) : null}
                                                                        setValue={(newDate) => {
                                                                            if (newDate) {
                                                                                PasswordExpiryValidity(newDate.format('YYYY-MM-DD'));
                                                                            }
                                                                        }}
                                                                        disableFuture={false}
                                                                        minDate={dayjs()}
                                                                    />
                                                                </FormControl>
                                                            </Grid>

                                                        </Grid>
                                                    </>
                                                ) : null}

                                                {/* ###### Passport Details Section End ###### */}
                                                {/* ###### Others Details Section Start ###### */}
                                                <Grid
                                                    container
                                                    rowSpacing={1}
                                                    columnSpacing={2.5}
                                                    item
                                                    xs={12}
                                                    sx={formHeadingGridContainerStyle}
                                                >
                                                    <Grid item xs={12} sx={formHeadingContainerStyle}>
                                                        <FormHeading
                                                            step={stepsList.OD.step}
                                                            heading={stepsList.OD.name}
                                                            info={
                                                                "Enter your other information like handicap details ."
                                                            }
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid
                                                    container
                                                    rowSpacing={1}
                                                    columnSpacing={2.5}
                                                    item
                                                    xs={12}
                                                    sx={formHeadingGridContainerStyle}
                                                >
                                                    <Grid sx={{ paddingLeft: '0px !important' }} item xs={12} md={6}>
                                                        <FormControl fullWidth>
                                                            <Typography sx={lable1CopyStyle}>
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
                                                                sx={inputFieldStyle2}
                                                                InputLabelProps={{
                                                                    shrink: true,
                                                                }}
                                                                InputProps={{
                                                                    readOnly: true,
                                                                }}
                                                            />
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={12} md={6} sx={{ paddingLeft: { xs: '0px !important', md: '20px!important' } }}>
                                                        <FormControl fullWidth>
                                                            <Typography sx={lable1CopyStyle}>
                                                                Is Physically Handicap
                                                                <span className="requiredField">*</span>
                                                            </Typography>
                                                            {isPhysicallyHandicap !== undefined && (
                                                                <Select
                                                                    error={false}
                                                                    className="customeTextField"
                                                                    labelId="demo-simple-select-label"
                                                                    id="demo-simple-select"
                                                                    sx={inputFieldStyle2}
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
                                                </Grid>
                                                {isPhysicallyHandicap === "Y" ? (
                                                    <Grid
                                                        container
                                                        rowSpacing={1}
                                                        columnSpacing={2.5}
                                                        item
                                                        xs={12}
                                                        sx={formHeadingGridContainerStyle}
                                                    >
                                                        <Grid sx={{ paddingLeft: '0px !important' }} item xs={12} md={6}>
                                                            <FormControl fullWidth>
                                                                <Typography sx={lable1CopyStyle}>
                                                                    Handicap type
                                                                    <span className="requiredField">*</span>
                                                                </Typography>
                                                                {handicapType !== undefined && (
                                                                    <Select
                                                                        error={false}
                                                                        className="customeTextField"
                                                                        labelId="demo-simple-select-label"
                                                                        id="demo-simple-select"
                                                                        sx={inputFieldStyle2}
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
                                                    </Grid>
                                                ) : null}
                                                {/* ###### Others Details Section End ###### */}
                                                <Grid
                                                    container
                                                    rowSpacing={1}
                                                    columnSpacing={2.5}
                                                    item
                                                    xs={12}
                                                    sx={formHeadingGridContainerStyle}
                                                >
                                                    <Grid sx={{ paddingLeft: '0px !important' }} item xs={12}>
                                                        <Stack sx={submitBtnContainerStyle}>
                                                            <Stack flexDirection={'row'} >
                                                                <Button
                                                                    xs={12}
                                                                    name="save"
                                                                    onClick={() => setClickedButton("S")}
                                                                    type="submit"
                                                                    sx={submitBtnStyle}
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
                                                                    sx={submitBtnStyle}
                                                                    variant="contained"
                                                                    color="primary"
                                                                >
                                                                    {saveAndNextbutton}
                                                                </Button>
                                                            </Stack>
                                                            <Button
                                                                onClick={handleSecondNext}
                                                                sx={submitBtnStyle}
                                                                variant="contained"
                                                                color="primary"
                                                                disabled={isDraft} // Show Next button only when clickedButton is "N"
                                                            >
                                                                Next
                                                            </Button>
                                                        </Stack>
                                                    </Grid>
                                                </Grid>
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
                                            {/* ######  Certificate Upload Section Start ###### */}
                                            <Grid
                                                container
                                                rowSpacing={1}
                                                columnSpacing={2.5}
                                                item
                                                xs={12}
                                                sx={formHeadingGridContainerStyle}
                                            >
                                                <Grid item xs={12} sx={formHeadingContainerStyle}>
                                                    <FormHeading
                                                        step={stepsList.CF.step}
                                                        heading={stepsList.CF.name}
                                                        info={"Upload file details ."}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid
                                                container
                                                rowSpacing={1}
                                                columnSpacing={2.5}
                                                item
                                                xs={12}
                                                sx={formHeadingGridContainerStyle}
                                            >
                                                <Grid sx={{ paddingLeft: '0px !important' }} item xs={12} md={6}>
                                                    <Stack
                                                        flexDirection={"row"}
                                                        justifyContent={"space-between"}
                                                        alignItems={"center"}
                                                    >
                                                        <Stack direction="row">
                                                            <Typography
                                                                sx={{
                                                                    ...lable1CopyStyle,
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                }}
                                                            >
                                                                {"10th pass Certificate"}
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
                                                    </Stack>
                                                </Grid>
                                                <Grid item xs={12} md={6} sx={{ paddingLeft: { xs: '0px !important', md: '20px!important' } }}>
                                                    <Typography
                                                        sx={{
                                                            ...lable1CopyStyle,
                                                            textAlign: "center",
                                                        }}
                                                    >
                                                        Please upload 10th pass certificate
                                                        <span className="requiredField">*</span>
                                                    </Typography>
                                                    <Box sx={fileUploadSectionContainerStyle}>
                                                        <FileUploadSection
                                                            chooseFile={upload10thCertificateFile}
                                                            // fileName={
                                                            //   fileUploaded.some(file => file.uploadTypeAlias === "10THCERT")
                                                            //     ? fileUploaded.find(file => file.uploadTypeAlias === "10THCERT").fileName
                                                            //     : tenthCertificateFileName
                                                            // }
                                                            fileName={tenthCertificateFileName}
                                                            accept={"image/png, image/jpeg"}
                                                            disabled={isPreviousSectionDisabled}
                                                            maxUploadSize={imgAndPdfMaxSize}
                                                            uploadTypeAlias={tenthCertificateFileTypeAlias}
                                                        // handleRemoveFile={remove10thPassCertificate}
                                                        />
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                            <Grid
                                                container
                                                rowSpacing={1}
                                                columnSpacing={2.5}
                                                item
                                                xs={12}
                                                sx={formHeadingGridContainerStyle}
                                            >
                                                <Grid sx={{ paddingLeft: '0px !important' }} item xs={12} md={6}>
                                                    <Stack direction="row">
                                                        <Typography
                                                            sx={{
                                                                ...lable1CopyStyle,
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
                                                </Grid>
                                                <Grid item xs={12} md={6} sx={{ paddingLeft: { xs: '0px !important', md: '20px!important' } }}>
                                                    <Typography
                                                        sx={{
                                                            ...lable1CopyStyle,
                                                            textAlign: "center",
                                                        }}
                                                    >
                                                        Please upload a document mentioning father's
                                                        name
                                                        <span className="requiredField">*</span>
                                                    </Typography>
                                                    <Box sx={fileUploadSectionContainerStyle}>
                                                        <FileUploadSection
                                                            chooseFile={uploadFathersDocFile}
                                                            // fileName={
                                                            //   fileUploaded.some(file => file.uploadTypeAlias === "OTHID")
                                                            //     ? fileUploaded.find(file => file.uploadTypeAlias === "OTHID").fileName
                                                            //     : otherFileName
                                                            // }
                                                            fileName={otherFileName}
                                                            accept={"image/png, image/jpeg"}
                                                            disabled={isPreviousSectionDisabled}
                                                            maxUploadSize={imgAndPdfMaxSize}
                                                            uploadTypeAlias={otherFileTypeAlias}
                                                        // handleRemoveFile={removeFathersDocCertificate}
                                                        />
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                            {/* ######  Certificate Upload Section End ###### */}

                                            {/* ######  Handicaped Section Start ###### */}
                                            {isPhysicallyHandicap === 'Y' &&
                                                <>
                                                    <Grid
                                                        container
                                                        rowSpacing={1}
                                                        columnSpacing={2.5}
                                                        item
                                                        xs={12}
                                                        sx={formHeadingGridContainerStyle}
                                                    >
                                                        <Grid item xs={12} sx={formHeadingContainerStyle}>
                                                            <FormHeading
                                                                step={stepsList?.HV?.step}
                                                                heading={stepsList?.HV?.name}
                                                                info={"Upload your handicap file details ."}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid
                                                        container
                                                        rowSpacing={1}
                                                        columnSpacing={2.5}
                                                        item
                                                        xs={12}
                                                        sx={formHeadingGridContainerStyle}
                                                    >
                                                        <Grid sx={{ paddingLeft: '0px !important' }} item xs={12} md={6}>
                                                            <Typography sx={lable1CopyStyle}>
                                                                Handicap Type
                                                            </Typography>

                                                            <TextField
                                                                style={inputFieldStyle2}
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
                                                        <Grid item xs={12} md={6} sx={{ paddingLeft: { xs: '0px !important', md: '20px!important' } }}>
                                                            <Typography
                                                                sx={{
                                                                    ...lable1CopyStyle,
                                                                    textAlign: "center",
                                                                }}
                                                            >
                                                                Please upload your Handicap Certificate
                                                                <span className="requiredField">*</span>
                                                            </Typography>
                                                            <Box sx={fileUploadSectionContainerStyle}>
                                                                <FileUploadSection
                                                                    chooseFile={uploadHandicapFile}
                                                                    // fileName={
                                                                    //   fileUploaded.some(file => file.uploadTypeAlias === "HANDCERT")
                                                                    //     ? fileUploaded.find(file => file.uploadTypeAlias === "HANDCERT").fileName
                                                                    //     : handicapFileName
                                                                    // }
                                                                    fileName={handicapFileName}
                                                                    accept={"image/png, image/jpeg"}
                                                                    disabled={isPreviousSectionDisabled}
                                                                    maxUploadSize={imgAndPdfMaxSize}
                                                                    uploadTypeAlias={handicapFileTypeAlias}
                                                                />
                                                            </Box>
                                                        </Grid>
                                                    </Grid>
                                                </>
                                            }
                                            {/* ######  Handicaped Section End ###### */}
                                            {/* ######  Passport upload Section Start ###### */}
                                            {passportAvailable === "Y" ? (
                                                <>
                                                    <Grid
                                                        container
                                                        rowSpacing={1}
                                                        columnSpacing={2.5}
                                                        item
                                                        xs={12}
                                                        sx={formHeadingGridContainerStyle}
                                                    >
                                                        <Grid item xs={12} sx={formHeadingContainerStyle}>
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
                                                    </Grid>
                                                    <Grid
                                                        container
                                                        rowSpacing={1}
                                                        columnSpacing={2.5}
                                                        item
                                                        xs={12}
                                                        sx={{ ...formHeadingGridContainerStyle, ...positionRelative }}
                                                    >
                                                        <Grid sx={{ ...positionRelative }} item xs={12} md={12}>
                                                            {!passportAvailable && <DisableSection />}
                                                        </Grid>

                                                        <Grid sx={{ paddingLeft: '0px !important' }} item xs={12} md={6}>
                                                            <FormControl fullWidth>
                                                                <Typography sx={lable1CopyStyle}>
                                                                    Passport Number
                                                                </Typography>

                                                                <TextField
                                                                    style={inputFieldStyle2}
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
                                                                            sx={{ ...submitBtnStyle, margin: "5px", width: "fit-content" }}
                                                                            variant="contained"
                                                                            color="primary"

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
                                                            </FormControl>
                                                        </Grid>

                                                        <Grid item xs={12} md={6} sx={{ paddingLeft: { xs: '0px !important', md: '20px!important' } }}>
                                                            {countryOfOrigin === "India" ? (
                                                                <>
                                                                    <Typography sx={lable1CopyStyle}>
                                                                        Passport File Number
                                                                    </Typography>
                                                                    <TextField
                                                                        style={inputFieldStyle2}
                                                                        type="text"
                                                                        variant="outlined"
                                                                        onChange={
                                                                            handlePassFileNumberOnChange
                                                                        }
                                                                        className="customeTextField"
                                                                        value={passportFileNumber}
                                                                        error={passportFileNumberError}
                                                                        defaultValue={""}
                                                                        disabled={isPassportVerifyBtnDisabled}
                                                                    />
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Typography
                                                                        sx={{
                                                                            ...lable1CopyStyle,
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
                                                                        // fileName={
                                                                        //   fileUploaded.some(file => file.uploadTypeAlias === "VISA")
                                                                        //     ? fileUploaded.find(file => file.uploadTypeAlias === "VISA").fileName
                                                                        //     : passportFileName
                                                                        // }
                                                                        fileName={passportFileName}
                                                                        disabled={isPreviousSectionDisabled}
                                                                        maxUploadSize={imgAndPdfMaxSize}
                                                                        uploadTypeAlias={passportFileTypeAlias}
                                                                    />
                                                                </>
                                                            )}
                                                        </Grid>
                                                    </Grid>
                                                </>
                                            )
                                                : null}
                                            {/* ######  Passport Section End ###### */}

                                            {/* ######  PF Verification Section Start ###### */}
                                            <Grid
                                                container
                                                rowSpacing={1}
                                                columnSpacing={2.5}
                                                item
                                                xs={12}
                                                sx={formHeadingGridContainerStyle}
                                            >
                                                <Grid item xs={12} sx={formHeadingContainerStyle}>
                                                    <FormHeading
                                                        step={stepsList.PFD.step}
                                                        heading={stepsList.PFD.name}
                                                        info={"Upload file details ."}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid
                                                container
                                                rowSpacing={1}
                                                columnSpacing={2.5}
                                                item
                                                xs={12}
                                                sx={formHeadingGridContainerStyle}
                                            >
                                                <Grid sx={{ paddingLeft: '0px !important' }} item xs={12} md={6}>
                                                    <Stack
                                                        flexDirection={"row"}
                                                        justifyContent={"space-between"}
                                                        alignItems={"center"}
                                                    >
                                                        <Box>
                                                            <Stack direction="row">
                                                                <Typography
                                                                    sx={{
                                                                        ...lable1CopyStyle,
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        marginRight: "-5px"
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
                                                                        sx={{
                                                                            marginLeft: '-5px', // Moves the icon a bit to the left
                                                                            marginTop: '-5px',  // Moves the icon a bit upwards
                                                                        }}
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

                                                <Grid item xs={12} md={6} sx={{ paddingLeft: { xs: '0px !important', md: '20px!important' } }}>
                                                    {isTrustEpfoAvailable && (
                                                        <Box>
                                                            <Typography
                                                                sx={{ ...lable1CopyStyle, textAlign: "center" }}
                                                            >
                                                                Please upload Trust PF Details
                                                                <span className="requiredField">*</span>
                                                            </Typography>
                                                            <Box sx={fileUploadSectionContainerStyle}>
                                                                <FileUploadSection
                                                                    chooseFile={uploadTrustEPFOFile}
                                                                    handleRemoveFile={removeEPFOFile}
                                                                    // fileName={
                                                                    //   fileUploaded.some(file => file.uploadTypeAlias === "EPFPSBKTRUST")
                                                                    //     ? fileUploaded.find(file => file.uploadTypeAlias === "EPFPSBKTRUST").fileName
                                                                    //     : trustEpfoFileName
                                                                    // }
                                                                    fileName={trustEpfoFileName}
                                                                    accept={"image/png, image/jpeg"}
                                                                    disabled={isPreviousSectionDisabled}
                                                                    maxUploadSize={imgAndPdfMaxSize}
                                                                    uploadTypeAlias={trustEpfoFileTypeAlias}
                                                                    multiple={true}
                                                                />
                                                            </Box>
                                                        </Box>
                                                    )}
                                                </Grid>
                                            </Grid>
                                            <Divider sx={{ ...divederStyle }} />
                                            {/* ######  PF Verification Section End ###### */}
                                            {/* ######  UAN number Section Start ###### */}
                                            <Grid
                                                container
                                                rowSpacing={1}
                                                columnSpacing={2.5}
                                                item
                                                xs={12}
                                                sx={formHeadingGridContainerStyle}
                                            >
                                                <Grid sx={{ paddingLeft: '0px !important' }} item xs={12} md={6}>
                                                    <Stack
                                                        flexDirection={"col"}
                                                        justifyContent={"space-between"}
                                                        alignItems={"start"}
                                                    >
                                                        <Typography sx={{ ...lable1CopyStyle }}>
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
                                            </Grid>
                                            {/* ######  UAN number Section End ###### */}
                                            <Grid
                                                container
                                                rowSpacing={1}
                                                columnSpacing={2.5}
                                                item
                                                xs={12}
                                                sx={formHeadingGridContainerStyle}
                                            >
                                                <Grid sx={{ paddingLeft: '0px !important' }} item xs={12}>
                                                    <Stack sx={submitBtnContainerStyle}>
                                                        <Stack flexDirection={'row'}>
                                                            <Button
                                                                //onClick={() => setCurrentPageNo(1)}
                                                                onClick={handleBack}
                                                                //sx={{ m: "15px 5px", ml: 3 }}
                                                                sx={submitBtnStyle}
                                                                variant="contained"
                                                                color="primary"
                                                            >
                                                                {previousButton}
                                                            </Button>
                                                            <Button
                                                                name="save"
                                                                // disabled={isSubmitDisabled}
                                                                onClick={DraftSave}
                                                                sx={submitBtnStyle}
                                                                variant="contained"
                                                                color="primary"
                                                                disabled={isPreviousSectionDisabled}
                                                            >
                                                                Save as Draft
                                                            </Button>
                                                        </Stack>
                                                        <Stack flexDirection={'row'}>
                                                            <Button
                                                                name="save"
                                                                // disabled={isSubmitDisabled}
                                                                onClick={handleSaveClick}
                                                                //sx={{ m: "15px 25px", ml: 3 }}
                                                                sx={submitBtnStyle}
                                                                variant="contained"
                                                                color="primary"
                                                                disabled={isPreviousSectionDisabled}
                                                            >
                                                                Save
                                                            </Button>
                                                            <Button
                                                                onClick={handleNext}
                                                                sx={submitBtnStyle}
                                                                variant="contained"
                                                                color="primary"
                                                                disabled={isthirdNextVisible === false}
                                                            >
                                                                Next
                                                            </Button>
                                                        </Stack>
                                                    </Stack>
                                                </Grid>
                                            </Grid>
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
                                                    variant="contained"
                                                    color="primary"
                                                    sx={submitBtnStyle}
                                                >
                                                    No
                                                </Button>
                                                <Button
                                                    onClick={handleConfirmSave}
                                                    variant="contained"
                                                    color="primary"
                                                    autoFocus
                                                    sx={submitBtnStyle}
                                                >
                                                    Yes
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
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
                                            {/* ######  Aadha Verification Section Start ###### */}

                                            <Grid
                                                container
                                                rowSpacing={1}
                                                columnSpacing={2.5}
                                                item
                                                xs={12}
                                                sx={formHeadingGridContainerStyle}
                                            >
                                                <Grid item xs={12} sx={formHeadingContainerStyle}>
                                                    <FormHeading
                                                        step={stepsList?.AV?.step}
                                                        heading={stepsList?.AV?.name}
                                                        info={
                                                            "Enter Aadhaar data to verify, see more info in the below link."
                                                        }
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid
                                                container
                                                rowSpacing={1}
                                                columnSpacing={2.5}
                                                item
                                                xs={12}
                                                sx={formHeadingGridContainerStyle}
                                            >
                                                <Typography
                                                    sx={headingType1}
                                                >
                                                    As part of onboarding process, Please generate
                                                    your offline KYC verification file and upload it
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
                                                <FormControl sx={{ flexDirection: 'row' }}>
                                                    {isAadhaarVarified ? (
                                                        <>
                                                            <FormControlLabel
                                                                sx={checkBoxLabelStyle}
                                                                control={
                                                                    <Checkbox
                                                                        disabled
                                                                        checked
                                                                        inputProps={{ "aria-label": "controlled" }}
                                                                        sx={checkBoxStyle}
                                                                    />
                                                                }>
                                                            </FormControlLabel>
                                                            <Typography
                                                                onClick={() => setIsOfflineXmlDownloaded(!isOfflineXmlDownloaded)}
                                                                sx={checkBoxLabelStyle}
                                                            >I have downloaded the Aadhar offline KYC file</Typography>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        checked={isOfflineXmlDownloaded}
                                                                        sx={{ paddingLeft: 0 }}
                                                                        onChange={
                                                                            handleIsOfflineXmlDownloadedOnChange
                                                                        }
                                                                        inputProps={{ "aria-label": "controlled" }}
                                                                    />
                                                                }
                                                            >
                                                            </FormControlLabel>
                                                            <Typography
                                                                onClick={() => setIsOfflineXmlDownloaded(!isOfflineXmlDownloaded)}
                                                                sx={checkBoxLabelStyle}
                                                            >I have downloaded the Aadhar offline KYC file</Typography>
                                                        </>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                            <Grid
                                                container
                                                rowSpacing={1}
                                                columnSpacing={2.5}
                                                item
                                                xs={12}
                                                sx={{ ...formHeadingGridContainerStyle, ...positionRelative }}
                                            >
                                                {!isOfflineXmlDownloaded && <DisableSection />}
                                                <Grid sx={{ paddingLeft: '0px !important' }} item xs={12} md={6}>
                                                    <Typography sx={lable1CopyStyle}>
                                                        Name On Aadhaar
                                                    </Typography>
                                                    <TextField
                                                        style={inputFieldStyle2}
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
                                                    <Typography sx={lable1CopyStyle}>
                                                        Share Code (to be provided after uploading)
                                                    </Typography>
                                                    <TextField
                                                        style={inputFieldStyle2}
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
                                                        sx={{ ...submitBtnStyle, margin: "5px 0" }}
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
                                                <Grid item xs={12} md={6} sx={{ paddingLeft: { xs: '0px !important', md: '20px!important' } }}>
                                                    <FileUploadSection
                                                        chooseFile={uploadAadharXmlFile}
                                                        fileName={aadharXmlFileName}
                                                        accept={".rar, .zip"}
                                                        disabled={isAadhaarVarified}
                                                        uploadTypeAlias={aadharFileTypeAlias}
                                                    />
                                                </Grid>
                                            </Grid>
                                            {/* ######  Aadhar Verification Section End ###### */}
                                            {/* ######  PAN Verification Section Start ###### */}
                                            <Grid
                                                container
                                                rowSpacing={2}
                                                columnSpacing={2.5}
                                                item
                                                xs={12}
                                                sx={formHeadingGridContainerStyle}
                                            >

                                                <Grid item xs={12} sx={formHeadingContainerStyle}>
                                                    <FormHeading
                                                        step={stepsList?.PAV?.step}
                                                        heading={stepsList?.PAV?.name}
                                                        info={"Enter your PAN Numebr to verify."}
                                                    />
                                                </Grid>{" "}
                                            </Grid>
                                            <Grid
                                                container
                                                rowSpacing={2}
                                                columnSpacing={2.5}
                                                item
                                                xs={12}
                                                sx={formHeadingGridContainerStyle}
                                            >

                                                <Grid sx={{ paddingLeft: '0px !important' }} item xs={12} md={6}>
                                                    <Typography sx={lable1CopyStyle}>
                                                        PAN Number
                                                        <span className="requiredField">*</span>
                                                    </Typography>
                                                    <TextField
                                                        style={inputFieldStyle2}
                                                        type="text"
                                                        variant="outlined"
                                                        className="customeTextField"
                                                        onChange={handelPANNumberChange}
                                                        value={pan}
                                                        defaultValue={" "}
                                                        inputProps={{ maxLength: 10 }}
                                                        disabled={disabledPanInput}
                                                        error={panNumberError}
                                                    />
                                                    <Button
                                                        sx={{ ...submitBtnStyle, margin: "5px 0" }}
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
                                                                variant="contained"
                                                                color="primary"
                                                                sx={submitBtnStyle}
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
                                                <Grid item xs={12} md={6} sx={{ paddingLeft: { xs: '0px !important', md: '20px!important' } }}>
                                                    <Typography sx={lable1CopyStyle}>
                                                        Name on PAN
                                                        <span className="requiredField">*</span>
                                                    </Typography>
                                                    <TextField
                                                        style={inputFieldStyle2}
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
                                            {/* ######  PAN Verification Section End ###### */}
                                            {/* ######  UAN Verification Section Start ###### */}
                                            <Grid
                                                container
                                                rowSpacing={2}
                                                columnSpacing={2.5}
                                                item
                                                xs={12}
                                                sx={formHeadingGridContainerStyle}
                                            >
                                                <Grid item xs={12} sx={formHeadingContainerStyle}>
                                                    <FormHeading
                                                        step={stepsList?.UAV?.step}
                                                        heading={stepsList?.UAV?.name}
                                                        info={
                                                            "Enter your Universal Account Number(UAN) to verify."
                                                        }
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid
                                                container
                                                rowSpacing={1}
                                                columnSpacing={2.5}
                                                item
                                                xs={12}
                                                sx={{ ...formHeadingGridContainerStyle, ...positionRelative }}
                                            >
                                                {isEpfoSectionDisabled && <DisableSection />}

                                                <Grid item xs={12} md={6} sx={{ paddingLeft: '0px !important' }}>
                                                    <Typography sx={lable1CopyStyle}>
                                                        Universal Account Number(UAN)
                                                    </Typography>
                                                    <TextField
                                                        onChange={(e) => {
                                                            setUAN(e.target.value);
                                                        }}
                                                        style={inputFieldStyle2}
                                                        type="text"
                                                        className="customeTextField"
                                                        variant="outlined"
                                                        defaultValue={" "}
                                                        value={UAN}
                                                    />
                                                    <Button
                                                        sx={verificationBtnStyle}
                                                        enabled={isUanVarified}
                                                        variant="contained"
                                                        onClick={handleEpfoButtonClick}
                                                        endIcon={<Autorenew />}
                                                        disabled={isUanVerificationProcessManual === 'manual'}
                                                    >
                                                        {epfoButton}
                                                    </Button>
                                                    <VerificationStatusSection
                                                        docType={epfostatusMessage}
                                                    />
                                                    <Stack direction={"row"} alignItems={"center"}>
                                                        <Typography sx={{ margin: "5px 0", color: "#000" }}>{"UAN Aadhar Link : "} </Typography>
                                                        <Typography>{uanAadharLink}</Typography>
                                                    </Stack>
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={12}
                                                    md={6}
                                                    sx={{ paddingLeft: { xs: '0px !important', md: '20px!important', ...positionRelative } }}
                                                >
                                                    <Grid item xs={12} sx={{ paddingLeft: '0px !important' }}>
                                                        <Stack flexDirection="column" justifyContent="space-between" alignItems="start">
                                                            <Typography sx={{ ...lable1CopyStyle }}>
                                                                {"UAN Verification"}
                                                            </Typography>
                                                            <RadioGroup
                                                                row
                                                                value={isUanVerificationProcessManual}
                                                                onChange={handleChangeUanVerification}
                                                            >
                                                                <FormControlLabel
                                                                    value="auto"
                                                                    control={<Radio />}
                                                                    label="Automatic"
                                                                    disabled={!hasValue(UAN)}
                                                                />
                                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                    <FormControlLabel
                                                                        value="manual"
                                                                        control={<Radio />}
                                                                        label="Manual"
                                                                        disabled={!hasValue(UAN)}
                                                                    />
                                                                    <Tooltip
                                                                        arrow
                                                                        title={
                                                                            <Box sx={{ ...statusBoxstyle }}>
                                                                                <Typography variant="body2" sx={{ ...statusstyle }}>
                                                                                It is mandatory for EPFO members to upload all PF passbooks 2005 onwards (if applicable).
                                                                                </Typography>

                                                                            </Box>
                                                                        }
                                                                    >
                                                                        <Fab
                                                                            variant="contained"
                                                                            size="small"
                                                                            sx={{ ...primaryFabStyle, ml: 1 }}
                                                                        >
                                                                            <Info width={18} sx={{ color: "#fff" }} />
                                                                        </Fab>
                                                                    </Tooltip>
                                                                </Box>
                                                            </RadioGroup>
                                                        </Stack>
                                                    </Grid>

                                                    {
                                                        isUanVerificationProcessManual === 'manual' &&
                                                        <Grid>
                                                            <Grid item xs={12} sx={{ paddingLeft: '0px !important' }}>
                                                                <Typography
                                                                    sx={{
                                                                        ...lable1CopyStyle,
                                                                        textAlign: "center",
                                                                    }}
                                                                >
                                                                    Please upload your EPFO Service History
                                                                    <span className="requiredField">*</span>
                                                                </Typography>
                                                                <Box sx={fileUploadSectionContainerStyle}>
                                                                    <FileUploadSection
                                                                        chooseFile={uploadEpfoServiceHistoryFile}
                                                                        // fileName={
                                                                        //   fileUploaded.some(file => file.uploadTypeAlias === "EPFPSSBKMNL")
                                                                        //     ? fileUploaded.find(file => file.uploadTypeAlias === "EPFPSSBKMNL").fileName
                                                                        //     : handicapFileName
                                                                        // }
                                                                        fileName={epfoServiceHistoryFile}
                                                                        accept={"image/png, image/jpeg"}
                                                                        maxUploadSize={imgAndPdfMaxSize}
                                                                        uploadTypeAlias={epfoServiceHistoryFileTypeAlias}
                                                                    // handleRemoveFile={removeEPFOServiceHistory}
                                                                    />
                                                                </Box>
                                                            </Grid>
                                                            <Grid item xs={12} sx={{ paddingLeft: '0px !important' }}>

                                                                <Typography
                                                                    sx={{
                                                                        ...lable1CopyStyle,
                                                                        textAlign: "center",
                                                                    }}
                                                                >
                                                                    Please upload your EPFO passbook
                                                                    <span className="requiredField">*</span>
                                                                </Typography>
                                                                <Box sx={fileUploadSectionContainerStyle}>
                                                                    <FileUploadSection
                                                                        chooseFile={uploadEpfoPassBookFile}
                                                                        handleRemoveFile={removeEPFOPassbookFile}
                                                                        // fileName={
                                                                        //   fileUploaded.some(file => file.uploadTypeAlias === "EPFPSSBKMNL")
                                                                        //     ? fileUploaded.find(file => file.uploadTypeAlias === "EPFPSSBKMNL").fileName
                                                                        //     : handicapFileName
                                                                        // }
                                                                        fileName={epfoPassBookFiles}
                                                                        accept={"image/png, image/jpeg"}
                                                                        maxUploadSize={imgAndPdfMaxSize}
                                                                        multiple={true}
                                                                        uploadTypeAlias={epfoPassbookFileTypeAlias}
                                                                    />
                                                                </Box>
                                                            </Grid>
                                                        </Grid>
                                                    }
                                                </Grid>
                                            </Grid>
                                            {/* ######  UAN Verification Section End ###### */}
                                            <Grid
                                                container
                                                rowSpacing={1}
                                                columnSpacing={2.5}
                                                item
                                                xs={12}
                                                sx={formHeadingGridContainerStyle}
                                            >
                                                <Grid sx={{ paddingLeft: '0px !important' }} item xs={12}>
                                                    <Stack flexDirection={'row'}>
                                                        <Button
                                                            //onClick={() => setCurrentPageNo(1)}
                                                            onClick={handleBack}
                                                            //sx={{ m: "15px 5px", ml: 3 }}
                                                            sx={submitBtnStyle}
                                                            variant="contained"
                                                            color="primary"
                                                        >
                                                            {previousButton}
                                                        </Button>

                                                        {(isUanVerificationProcessManual === 'manual') && (
                                                            <>
                                                                <Button
                                                                    //onClick={() => setCurrentPageNo(1)}
                                                                    onClick={() => submitDetails(false, true)}
                                                                    //sx={{ m: "15px 5px", ml: 3 }}
                                                                    sx={submitBtnStyle}
                                                                    variant="contained"
                                                                    color="primary"
                                                                >
                                                                    {'Submit'}
                                                                </Button>
                                                            </>
                                                        )}
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Box>
                            ) : null}
                        </Grid>
                    </Grid>
                </Box>
                <FormDialog
                    open={fetchUanConfirmation}
                    DialogTitle={
                        "Your Aadhaar verification has failed. If you continue you will not be able to change your Aadhaar. Do you want to continue?"
                    }
                    shouldTakeAction={fetchUanConfirmationSubmittion}
                />
            </Box>
        </>
    )
}

export default AppointeeRegisterForm