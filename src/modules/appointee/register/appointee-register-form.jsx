

import {
    Box, Typography
} from "@mui/material";
import {
    heading2,
    inputFieldStyle2,
    subHeadingContentTextStyle
} from "app";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
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
    aaddharNumberverify,
    indianpassportFilePatternErrorMsg,
    passportNoEmptyMsg,
    epfoServiceHistoryFileTypeAlias,
    aadharFileTypeAlias,
    toHelp,
} from "shared/constants/constants";
import {
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
    registrationSuccessDialogContentText,
    submitConfirmationMsg,
    toDashboard,
    uanVerifyFailedMsg,
    uanVerifySuccessMsg,
    uploadSizeErrorMsg,
    uploadFormatErrorMsg,
    passportExpireddMsg,
} from "shared/constants/constants";

import VerificationStatus from "../../../shared/components/verification/verification-status";
import FormDialog from "shared/utils/models/form-dialog";
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


import { FILE_SIZE_LIMIT, validFileTypes } from "shared/constants/constants";
import UANPrerequisiteInformation from "./uan-prerequiestic-info";
import getFileDetails from "shared/utils/associate/get-file-details";
import getFilenames from "shared/utils/associate/get-filenames";
import createFileUploadedData from "shared/utils/associate/create-file-uploaded-data";
import LinearStepper from "shared/components/Stepper/linear-stepper";
import FormContainer from "shared/components/grid-container/form-container";
import FirstForm from "./first-form";
import SecondForm from "./second-form";
import ThirdForm from "./third-form";

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
    const [updatedRealtionList, setUpdatedRealtionList] = useState([]);
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
        if (value !== 'none') {
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
    }
    const handleQualificationChange = ({ target }) => {
        const value = target.value;
        value !== 'none' && setQualification(value);
    }
    const handleMaritalStatusChange = ({ target }) => {
        const value = target.value;
        value !== 'none' && setMaritalStatus(value);
    }
    console.log('maritalStatus', maritalStatus);


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

    const handlePassFileNumberOnChange = (value) => {
        setPassportFileNumber(value);
        setPassportFileNumberError(false);
    };
    const handleIsOfflineXmlDownloadedOnChange = (e) => {
        setIsOfflineXmlDownloaded(e.target.checked);
    };
    const handleInternationalWorkerOnChange = ({ target }) => {
        const { value } = target;
        if (value !== 'none') {
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
        }
    };
    const handleIsPhysicallyHandicapOnChange = ({ target }) => {
        const { value } = target;
        if (value !== 'none') {
            setIsPhysicallyHandicap(value);
        }
    }
    const handleHandicapTypeOnChange = ({ target }) => {
        const { value } = target;
        if (value !== 'none') {
            setHandicapType(value);
        }
    }
    const handleChangeCountryOfOrigin = ({ target }) => {
        const { value } = target;
        value !== 'none' && setCountryOfOrigin(value);
    }
    console.log('isPhysicallyHandicap', isPhysicallyHandicap);

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

    const handleIsPassportAvailableOnChange = ({ target }) => {
        const { value } = target;
        if (value !== 'none') {
            setPassportAvailable(value);
            setPassportNumberError(false);

            if (value === "Y") {
                const nationalityLower = nationality?.toLowerCase();

                // determineIsInternationalWorker(nationalityLower, defaultCountry);
                setCountryOfOriginBasedOnNationality(nationalityLower);
            }
            if (value === "N") {
                resetPassportDetails();
            }
        }
    };
    console.log('isPassportAvailable', passportAvailable);


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

    const handlePassportNoChange = (value) => {
        setPassportNumberError(false);
        setPassportNo(value);
    }

    const handelPANNumberChange = (value) => {

        if (value !== 'none') {
            setPanNumberError(false);
            if (isAadhaarVarified) {
                setPan(value.toUpperCase());
            } else {
                showErrorMessage(aaddharNumberverify)
            }
        }

    }
    const handleChangeNameOnAadhar = (value) => {
        setNameAsOnAadhar(value.toUpperCase());
    }
    const handleChangeRelationship = ({ target }) => {
        target.value !== 'none' && setRelationshipWithMember(target.value);
    }
    useEffect(() => {
        if (relationList) {
            const _updatedRelationList = relationList.map(({ code, id, value }) => {
                return (
                    {
                        value: code,
                        label: value
                    }
                )
            })
            setUpdatedRealtionList(_updatedRelationList);
        }
    }, [relationList])
    return (
        <>
            {currentPageNo === 2 && (
                <Typography sx={{ ...heading2, mb: 3 }}>
                    Your personal details must match with your Aadhaar details
                </Typography>
            )}
            <Box sx={{ width: "100%" }}>
                <LinearStepper steps={steps} activeStep={activeStep} />
                <Box my={"20px"}>
                    <FormContainer>
                        {currentPageNo === 1 ? (
                            <>
                                <FirstForm
                                    stepsList={stepsList}
                                    setGender={setGender}
                                    memberName={memberName}
                                    dateOfBirth={dateOfBirth}
                                    setDateOfBirth={setDateOfBirth}
                                    fathersOrHusbandName={fathersOrHusbandName}
                                    relationshipWithMember={relationshipWithMember}
                                    handleChangeRelationship={handleChangeRelationship}
                                    isRelationShipWithMemberDisabled={isRelationShipWithMemberDisabled}
                                    mobileNo={mobileNo}
                                    email={email}
                                    nationality={nationality}
                                    handleNationalityChange={handleNationalityChange}
                                    qualification={qualification}
                                    maritalStatus={maritalStatus}
                                    handleMaritalStatusChange={handleMaritalStatusChange}
                                    passportAvailable={passportAvailable}
                                    passportNo={passportNo}
                                    handleAppointeeFormPage1Save={handleAppointeeFormPage1Save}
                                    isAadhaarVarified={isAadhaarVarified}
                                    setFathersOrHusbandName={setFathersOrHusbandName}
                                    handleQualificationChange={handleQualificationChange}
                                    handleIsPassportAvailableOnChange={handleIsPassportAvailableOnChange}
                                    isInterNationalWorker={isInterNationalWorker}
                                    handleInternationalWorkerOnChange={handleInternationalWorkerOnChange}
                                    isPassportVarified={isPassportVarified}
                                    countryOfOrigin={countryOfOrigin}
                                    disabledIsInterNationalWorker={disabledIsInterNationalWorker}
                                    handleChangeCountryOfOrigin={handleChangeCountryOfOrigin}
                                    handlePassportNoChange={handlePassportNoChange}
                                    passportNumberError={passportNumberError}
                                    passportNoMaxLength={passportNoMaxLength}
                                    passportValidForDate={passportValidForDate}
                                    setPassportValidForDate={setPassportValidForDate}
                                    setPassportValidTillDate={setPassportValidTillDate}
                                    passportValidTillDate={passportValidTillDate}
                                    PasswordExpiryValidity={PasswordExpiryValidity}
                                    dateOfJoining={dateOfJoining}
                                    isPhysicallyHandicap={isPhysicallyHandicap}
                                    handleIsPhysicallyHandicapOnChange={handleIsPhysicallyHandicapOnChange}
                                    handicapType={handicapType}
                                    handleHandicapTypeOnChange={handleHandicapTypeOnChange}
                                    isDraft={isDraft}
                                    handleSecondNext={handleSecondNext}
                                    setClickedButton={setClickedButton}
                                    genderList={genderList}
                                />
                            </>
                        ) : null}
                        {currentPageNo === 2 ? (
                            <>
                                <SecondForm
                                    formElement={formElement}
                                    stepsList={stepsList}
                                    isPreviousSectionDisabled={isPreviousSectionDisabled}
                                    upload10thCertificateFile={upload10thCertificateFile}
                                    tenthCertificateFileName={tenthCertificateFileName}
                                    uploadFathersDocFile={uploadFathersDocFile}
                                    otherFileName={otherFileName}
                                    isPhysicallyHandicap={isPhysicallyHandicap}
                                    handicapType={handicapType}
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
                                    DraftSave={DraftSave}
                                    handleSaveClick={handleSaveClick}
                                    handleNext={handleNext}
                                    isthirdNextVisible={isthirdNextVisible}
                                    isModalOpen={isModalOpen}
                                    handleCloseModal={handleCloseModal}
                                    handleConfirmSave={handleConfirmSave}
                                    passportFileNumber={passportFileNumber}
                                    setIsTrustEpfoAvailable={setIsTrustEpfoAvailable}
                                />
                            </>
                        ) : null}


                        {currentPageNo === 3 ? (
                            <>
                                <ThirdForm
                                    formElement={formElement}
                                    stepsList={stepsList}
                                    isAadhaarVarified={isAadhaarVarified}
                                    isOfflineXmlDownloaded={isOfflineXmlDownloaded}
                                    setIsOfflineXmlDownloaded={setIsOfflineXmlDownloaded}
                                    handleIsOfflineXmlDownloadedOnChange={handleIsOfflineXmlDownloadedOnChange}
                                    nameAsOnAadhar={nameAsOnAadhar}
                                    handleChangeNameOnAadhar={handleChangeNameOnAadhar}
                                    aadharShareCode={aadharShareCode}
                                    setAadharShareCode={setAadharShareCode}
                                    disabledAadharInput={disabledAadharInput}
                                    isAadhaarXmlUploaded={isAadhaarXmlUploaded}
                                    handleAadharVerifiaction={handleAadharVerifiaction}
                                    aadharstatusMessage={aadharstatusMessage}
                                    uploadAadharXmlFile={uploadAadharXmlFile}
                                    aadharXmlFileName={aadharXmlFileName}
                                    pan={pan}
                                    handelPANNumberChange={handelPANNumberChange}
                                    disabledPanInput={disabledPanInput}
                                    panNumberError={panNumberError}
                                    isPanVarified={isPanVarified}
                                    handlePanVerifiaction={handlePanVerifiaction}
                                    isPANModalOpen={isPANModalOpen}
                                    handleDialogCancel={handleDialogCancel}
                                    handleDialogConfirm={handleDialogConfirm}
                                    panstatusMessage={panstatusMessage}
                                    nameAsOnPan={nameAsOnPan}
                                    isEpfoSectionDisabled={isEpfoSectionDisabled}
                                    setUAN={setUAN}
                                    UAN={UAN}
                                    isUanVarified={isUanVarified}
                                    handleEpfoButtonClick={handleEpfoButtonClick}
                                    isUanVerificationProcessManual={isUanVerificationProcessManual}
                                    epfoButton={epfoButton}
                                    epfostatusMessage={epfostatusMessage}
                                    uanAadharLink={uanAadharLink}
                                    handleChangeUanVerification={handleChangeUanVerification}
                                    uploadEpfoServiceHistoryFile={uploadEpfoServiceHistoryFile}
                                    epfoServiceHistoryFile={epfoServiceHistoryFile}
                                    uploadEpfoPassBookFile={uploadEpfoPassBookFile}
                                    removeEPFOPassbookFile={removeEPFOPassbookFile}
                                    epfoPassBookFiles={epfoPassBookFiles}
                                    handleBack={handleBack}
                                    submitDetails={submitDetails}
                                />
                            </>
                        ) : null}
                    </FormContainer>
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