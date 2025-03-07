

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
} from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import {
    dividerStyle,
    fileUploadSectionContainerStyle,
    inputFieldStyle,
    lable1Style,
    positionRelative,
} from "app";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getHandicapTypeDescription,
    NA,
    otherFileTypeAlias,
    tenthCertificateFileTypeAlias,
} from "shared/constants/constants";
import {
    CardLayout,
    DateFormatYYYYMMDD,
    getLocalStorageItem,
    hasValue,
    setLocalStorageItem,
    trimmedDate,
} from "shared/utils";
import FormHeading from "./form-heading";
import {
    congratulationDialogContentTitle,
    genders,
    passportFileTypeAlias,
    passportSuccessMsg,
    passportVerifyFailedMsg,
    previousButton,
    registrationSuccessDialogContentText,
    submitConfirmationMsg,
    toDashboard,
    trustEpfoFileTypeAlias,
    handicapFileTypeAlias,
    uploadSizeErrorMsg,
    duplicateFiles,
} from "shared/constants/constants";
import { DisableSection } from "shared/components/disble-section/disble-section";
import VerificationStatus from "../../../shared/components/verification/verification-status";
import { Autorenew, HelpOutline } from "@mui/icons-material";
import { VerificationStatusSection } from "../../../shared/components/verification/verification-status-section";
import FileUploadSection from "shared/components/file-upload-section/file-upload-section";
import uploadFileMessage from "shared/utils/associate/upload-file-message";
import selectUANmessage from "shared/utils/associate/select-uan-message";
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

import { FILE_SIZE_LIMIT } from "shared/constants/constants";
import { getAppointeeDetails } from "server/apis";
import showErrorMessage from "shared/utils/associate/show-error-message";

const FileUpload = ({ stepsList, mode }) => {

    // Function to retrieve saved step from localStorage
    const [activeStep, setActiveStep] = useState(0);
    const dropdownList = useSelector((state) => state.dropdownList);
    const apiSlice = useSelector((state) => state.apiSlice);
    const loggedInData = useSelector((state) => state.loggedInData);
    const commonHooksFunctionSlice = useSelector(
        (state) => state.commonHooksFunctionSlice
    );
    const functionSlice = useSelector((state) => state.functionSlice);
    // const popUpSlice = useSelector((state) => state.popUpSlice);
    const {
        openRemarksModel,
        openInfoModel,
    } = functionSlice[0];
    // const { showErrorMessage, showSuccessMessage } = popUpSlice[0];
    const {
        countryList,
        nationalityList,
        fileTypeList,
    } = dropdownList && dropdownList.length > 0 && dropdownList[0];
    const genderDropdownList =
        dropdownList &&
        dropdownList.length > 0 &&
        dropdownList[0] &&
        dropdownList[0].genderList;
    const {
        // getAppointeeDetails,
        getPassportDetails,
        // postAppointeeFileDetails,
        PostUpdatePfUanDetails,
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
                epfostatusMessage.message =NA;
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

        };


    }


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
        if (genderDropdownList && gender !== undefined) {
            selectGender(gender);
        }
    }, [genderDropdownList, gender]);

    useEffect(() => {
        if (!isTrustEpfoAvailable) {
            clearFileVaribles(trustEpfoFileTypeAlias, setTrustEpfoFileName);
        }
    }, [isTrustEpfoAvailable]);


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
            // determineIsInternationalWorker(nationalityLower, defaultCountry);
            setCountryOfOriginBasedOnNationality(nationalityLower);
        }
    }, [nationality, passportAvailable]);


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
            showErrorMessage(`${name} ${duplicateFiles}`);
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



    const handleFileUpload = (fileTypeAlias, setFileName) => ({ target }) => {
        uploadFile(target, fileTypeAlias, setFileName);
    };

    const uploadTrustEPFOFile = handleFileUpload(trustEpfoFileTypeAlias, setTrustEpfoFileName);
    const uploadHandicapFile = handleFileUpload(handicapFileTypeAlias, setHandicapFileName);
    const uploadPassportFile = handleFileUpload(passportFileTypeAlias, setPassportFileName);
    const upload10thCertificateFile = handleFileUpload(tenthCertificateFileTypeAlias, setTenthCertificateFileName);
    const uploadFathersDocFile = handleFileUpload(otherFileTypeAlias, setOtherFileName);



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
            showUploadMessage("trust EPFO passbook");
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

        // Determine the value of IsDocReuploaded based on the mode
        let isDocReuploaded = mode === 'R' ? true : false;

        // Proceed with the rest of the logic if verification passes
        let payLoad = {
            appointeeId: appointeeId,
            userId: userId,
            appointeeCode: userCode,
            trustPassbookAvailable: isTrustEpfoAvailable,
            IsUanAvailable: isUANAvailable,
            FileDetails: fileDetails,
            fileUploaded: uploadedFile,
            IsDocReuploaded: isDocReuploaded,
        };
        // Use the buildFormData helper function to create the formData
        let formData = buildFormData(payLoad);



        // Make the API call
        const response = await PostUpdatePfUanDetails(formData);
        if (response) {
            handleNext();
            setIsPreviousSectionDisabled(true);
            clearFileVaribles(trustEpfoFileTypeAlias, setTrustEpfoFileName);
            clearFileVaribles(handicapFileTypeAlias, setHandicapFileName);
            clearFileVaribles(passportFileTypeAlias, setPassportFileName);
        }
    };




    const dispatch = useDispatch();


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setCurrentPageNo(3);
    };


    const handleChange = (event) => {
        const value = event.target.value;
        setUanNumberAvailable(value);
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

    const formElement = useRef(null);

    const handlePassFileNumberOnChange = (e) => {
        const { value } = e.target;
        setPassportFileNumber(value);
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
                                        />
                                    </Grid>
                                    <Grid sx={positionRelative} item xs={12}>
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
                                                                {"10th Pass Certificate"}
                                                            </Typography>
                                                            {mode !== 'R' && (
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
                                                            )}
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
                                                            disabled={mode !== 'R' ? isPreviousSectionDisabled : false}
                                                            uploadTypeAlias={tenthCertificateFileTypeAlias}
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
                                                            {mode !== 'R' && (
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
                                                            )}
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
                                                        Please upload a document mentioning father's
                                                        name
                                                        <span className="requiredField">*</span>
                                                    </Typography>
                                                    <Box sx={fileUploadSectionContainerStyle}>
                                                        <FileUploadSection
                                                            chooseFile={uploadFathersDocFile}
                                                            fileName={otherFileName}
                                                            accept={"image/png, image/jpeg,application/pdf"}
                                                            disabled={mode !== 'R' ? isPreviousSectionDisabled : false}
                                                            uploadTypeAlias={otherFileTypeAlias}
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
                                                            disabled={mode !== 'R' ? isPreviousSectionDisabled : false}
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
                                                                accept={"image/png, image/jpeg,application/pdf"}
                                                                disabled={mode !== 'R' ? isPreviousSectionDisabled : false}
                                                                uploadTypeAlias={handicapFileTypeAlias}
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
                                                        disabled={mode !== 'R' ? isPreviousSectionDisabled : false}
                                                    />
                                                    {countryOfOrigin === "India" && (
                                                        <>
                                                            <Button
                                                                sx={{ margin: "5px" }}
                                                                variant="contained"
                                                                disabled={mode !== 'R' ? isPreviousSectionDisabled : false}
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
                                                                disabled={mode !== 'R' ? isPreviousSectionDisabled : false}
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
                                                                disabled={mode !== 'R' ? isPreviousSectionDisabled : false}
                                                                uploadTypeAlias={passportFileTypeAlias}
                                                            />
                                                        </>
                                                    )}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                ) : null}
                                {mode === 'F' && (
                                <Grid item xs={12}>
                                    <FormHeading
                                        step={stepsList.PFD.step}
                                        heading={stepsList.PFD.name}
                                        info={"Upload file details ."}
                                    />
                                </Grid>
                                )}
                                {mode === 'F' && (
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
                                                            "Do you have PF under any Trust/Private, i.e non-EPFO PF, in the past or present"
                                                        }
                                                    </Typography>
                                                    {mode !== 'R' && (
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
                                                    )}
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
                                                            disabled={mode !== 'R' ? isPreviousSectionDisabled : false}
                                                            sx={{ borderColor: "2px" }}
                                                        />
                                                        <Typography>Yes</Typography>
                                                    </Stack>
                                                </FormControl>
                                            </Box>
                                        </Stack>
                                    </Grid>
                                )}
                                {mode === 'F' && (
                                    <Grid item xs={12} md={6}>
                                        {isTrustEpfoAvailable && (
                                            <Box>
                                                <Typography
                                                    sx={{ ...lable1Style, textAlign: "center" }}
                                                >
                                                    Please upload Trust/Private, i.e non-EPFO PF Details
                                                    <span className="requiredField">*</span>
                                                </Typography>
                                                <Box sx={fileUploadSectionContainerStyle}>
                                                    <FileUploadSection
                                                        chooseFile={uploadTrustEPFOFile}
                                                        fileName={trustEpfoFileName}
                                                        accept={"image/png, image/jpeg,application/pdf"}
                                                        disabled={mode !== 'R' ? isPreviousSectionDisabled : false}
                                                        uploadTypeAlias={trustEpfoFileTypeAlias}
                                                    />
                                                </Box>
                                            </Box>
                                        )}
                                    </Grid>
                                )}
                                {mode === 'F' && (
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
                                                    disabled={mode !== 'R' ? isPreviousSectionDisabled : false}
                                                />
                                                <FormControlLabel
                                                    value="yes"
                                                    control={<Radio />}
                                                    label="Yes"
                                                    disabled={mode !== 'R' ? isPreviousSectionDisabled : false}
                                                />
                                            </RadioGroup>
                                        </Stack>
                                    </Grid>
                                )}
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

                            <>
                                <Button
                                    onClick={handleBack}
                                    sx={{ m: { xs: "10px 0", sm: "15px 0" } }}
                                    variant="contained"
                                    color="primary"
                                >
                                    {previousButton}
                                </Button>




                                <Button
                                    name="save"
                                    onClick={handleSaveClick}
                                    sx={{ m: { xs: '10px 8px', sm: '15px 8px' }, ml: { sm: 3 } }}
                                    variant="contained"
                                    color="primary"
                                    disabled={mode !== 'R' ? isPreviousSectionDisabled : false}
                                >
                                    Save
                                </Button>
                                <Button
                                    onClick={handleNext}
                                    sx={{ m: { xs: '10px 8px', sm: '15px 8px' }, ml: { sm: 3 } }}
                                    variant="contained"
                                    color="primary"
                                    disabled={isthirdNextVisible === false}
                                >
                                    Next
                                </Button>
                            </>

                        </Box>
                    </Grid>
                </Grid>
            </form>
        </CardLayout>
    );
};

export default FileUpload;
