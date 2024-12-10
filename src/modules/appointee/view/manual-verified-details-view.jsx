import {
    Grid,
    Typography,
    Select,
    MenuItem,
    FormControl,
    Divider,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/system";
import FullScreenModel from "shared/utils/models/fullscreen-modal";
import {
    Comment,
    ThumbDown,
    Add,
    ThumbUp
} from "@mui/icons-material";
import {
    _addFabStyle,
    actionIconListStyle,
    actionIconListStylesx,
    actionIconStyle,
    actionstyle,
    cardStyle,
    cardStyle2,
    floatingIconListStyle,
    gridContainerStyle,
    infoDialogTitleStyle,
    inputFieldStyle2,
    lable1CopyStyle,
    listHeadingConteinerStyle,
    listHeadingStyle,
    rightMostBtnStyle,
    subHeadingContentTextStyle,
} from "app";
import { defaultVerificationUpdate, NA, defaultVerificationTypeList, fileVerificationEnums, fatherFileCategoryTypeAlias, epfoServiceHistoryFileTypeAlias, defaultFnameVerificationUpdate, defaultEpfoPassbookVerificationUpdate, epfFileTypeAlias, epfFileCategoryTypeAlias, EPFOVerificatypeSelectionMsg, epfoPassbookFileTypeAlias, appointeerejetionConfirmationMsg, remarksEmptyMsg, defaultDropdownValue, remarksissuemessage, approveConfirmation, manuallyVerificationInfo } from "shared/constants/constants";
import ActionPermission from "shared/components/action-permission/action-permission";
import { PersonalInformation } from "shared/components/display-information/personal-information";
import SelectInput from "shared/components/input-fields/select-input";
import FiledetailsSection from "./file-details-section";
import filterDocVerificationList from "shared/utils/associate/filter-doc-verification-list";
import { useDispatch, useSelector } from "react-redux";
import GetImageSrc from "shared/utils/associate/get-image-src";
import stringToBoolean from "shared/utils/associate/string-top-boolean";
import handleVerificationStatusChange from "shared/utils/associate/handle-verification-status-change";
import upDateQuestionSet from "shared/utils/associate/update-question-set";
import addNewQuestion from "shared/utils/associate/add-new-question";
import createVerificationTypeList from "shared/utils/associate/create-verification-type-list";
import getFileCategoryByFileType from "shared/utils/associate/get-file-category";
import isEPFOSelectionDisabled from "shared/utils/associate/is-epfo-disabled";
import { DATEDIFF, DateFormatYYYYMMDD, FabIcon, toggleActionMenu, hasValue, DDMMYYYY, filteredObjectProperty } from "shared/utils";
import FabIconPropsModel from "shared/utils/fab-icon/fab-icon-model";
import RemarksInputModel from "shared/utils/models/remarks-modal";
import { storeActionRoute } from "store/slices/action-route-slice";
import GridContainer from "shared/components/grid-container/grid-container";
import Button1 from "shared/utils/button/button1";

const ManualVerifiedPageSectionContainer = ({ children, sx }) => {
    return (
        <Box sx={{ ...gridContainerStyle, paddingTop: "-5px", paddingBottom: "0px", ...sx }}>
            <Grid container spacing={1}>
                <Grid item xs={12} md={12} letterSpacing={10}>
                    <Box sx={cardStyle2}>
                        {children}
                    </Box>
                </Grid>
            </Grid>

        </Box>
    )
}

let ManualverifiedViewDetails = ({ details, closeModel }) => {

    const {
        appointeeId,
        // appointeeName,
        // dateOfBirth,
        // gender,
        // relationshipWithMember,
        // member,
        // handicapType,
        // isPhysicallyHandicap,
        // maritalStatus,
        // qualification,
        // email,
        // mobileNo,
        // nationality,
        // isFnameVarified,
        // isUanVerified,
        // dateOfJoining,
        // userId
    } = details;
    const loggedInData = useSelector((state) => state.loggedInData);
    const apiSlice = useSelector((state) => state.apiSlice);
    const dropdownList = useSelector((state) => state.dropdownList);
    const { userTypeId, userId } = (loggedInData && loggedInData[0]) || {
        userTypeId: null,
        userId: null,
    };
    const {
        relationList,
        qualificationList,
        disabilityList,
        maritalStatusList,
        genderList,
    } = dropdownList.length > 0 && dropdownList[0];
    const functionSlice = useSelector((state) => state.functionSlice);
    const {
        getUploadFileData,
        GetUploadedFileDetailsById,
        getRemarks,
        postAppointeeRejected,
        getAppointeeDetails, postAppointeeApproved
    } = apiSlice[0];
    const {
        openRemarksModel,
        openRemarksInputModel,
        closeRemarksInputModel,
        openConfirmationYesNoModal
    } = functionSlice[0];
    const popUpSlice = useSelector(state => state.popUpSlice);
    const showErrorMessage = popUpSlice && popUpSlice[0] && popUpSlice[0].showErrorMessage;


    // useEffect(() => {
    //   //setTableRows(appointeeId);
    // }, []);

    const [verificationType, setVerificationType] = useState(defaultVerificationTypeList[0]);
    const [verificationTypeList, setVerificationTypeList] = useState([]);
    const [uploadedFileData, setUploadedFileData] = useState([]);
    const [verificationCategoryList, setVerificationCategoryList] = useState([]);
    const [fileTypeCategory, setFileTypeCategory] = useState(defaultDropdownValue);
    const [files, setFiles] = useState([]);
    const [file, setFile] = useState(defaultDropdownValue);
    const [fileSrc, setFileSrc] = useState("");
    const [fileName, setFilename] = useState("");
    const [verificationQuestionSet, setVerificationQuestionSet] = useState([]);
    const [verificationUpdate, setVerificationUpdate] = useState({});
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedMandatoryCategoryList, setSelectedMandatoryCategoryList] = useState([]);
    const [categorySelected, setCategorySelected] = useState(false);
    const [degreeOfRotation, setDegreeOfRotation] = useState(0);
    const [actionIconListDisplay, setActionIconListDisplay] = useState(false);
    const [appointeeName, setAppointeeName] = useState();
    const [dateOfBirth, setDateOfBirth] = useState();
    const [gender, setGender] = useState();
    const [relationshipWithMember, setRelationshipWithMember] = useState(null);
    const [member, setMember] = useState(null);
    const [handicapType, setHandicapType] = useState(null);
    const [isPhysicallyHandicap, setIsPhysicallyHandicap] = useState(false);
    const [maritalStatus, setMaritalStatus] = useState(null);
    const [qualification, setQualification] = useState(null);
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [nationality, setNationality] = useState(null);
    const [isFnameVarified, setIsFnameVarified] = useState(false);
    const [isUanVerified, setIsUanVerified] = useState(false);
    const [dateOfJoining, setDateOfJoining] = useState(null);
    // const [userId, setUserId] = useState(null);
    const [isVarified, setIsVarified] = useState();
    const dispatch = useDispatch();
    const clearSubDropdownListofVerificationType = (currentValue) => {
        clearCategoryRelatedVariables();
        setFiles([]);
        if (currentValue === 'none') {
            setFileTypeCategory(defaultDropdownValue);
            setVerificationCategoryList([]);
        }
    }
    const actionsAfterProcess = (actionRoute) => {
        //    closeViewModel ();
        dispatch(storeActionRoute({ actionRoute }));
    };
    const selectDefaultVerificationType = (value, _uploadedFileData) => {
        const target = { value };
        handleChangeVerificationType({ target }, _uploadedFileData);
    }

    const handleChangeVerificationType = ({ target }, _uploadedFileData) => {
        const { value: currentValue } = target;
        if (currentValue !== 'none') {
            const isSelectedItemDisabled = verificationTypeList.find(({ isDisabled, value }) =>
                value === currentValue && isDisabled === true);
            if (isSelectedItemDisabled) {
                return
            }
            const selectedVerificationType = defaultVerificationTypeList.find(({ value }) => value === currentValue);
            setVerificationType(selectedVerificationType);
            clearSubDropdownListofVerificationType(currentValue);
            setCategorySelected(false);
            const { verificationCategoryList } = filterDocVerificationList({
                fileCategory: currentValue,
                uploadedFileData: _uploadedFileData ? _uploadedFileData : uploadedFileData
            });
            setVerificationCategoryList(verificationCategoryList);
            // setFileTypeCategory(verificationCategoryList[0].value);
            const { updatedQuestionSet } = addNewQuestion({ verificationType: target, verificationQuestionSet: [] });

            let currentDefaultVerificationUpdate;
            if (currentValue === fatherFileCategoryTypeAlias) {
                currentDefaultVerificationUpdate = defaultFnameVerificationUpdate
            }
            if (currentValue === epfFileTypeAlias) {
                currentDefaultVerificationUpdate = defaultEpfoPassbookVerificationUpdate
            }
            const { updatedQuestionSet: _updatedQuestionSet } = upDateQuestionSet({
                verificationQuestionSet: updatedQuestionSet,
                verificationUpdate: currentDefaultVerificationUpdate,
                verificationType: target,
                fileSrc
            });


            setVerificationQuestionSet(_updatedQuestionSet);

            setVerificationUpdate({});
            setFileTypeCategory(defaultDropdownValue);
        }
    }
    const clearCategoryRelatedVariables = () => {
        setFileSrc("");
        setFile(defaultDropdownValue);
    }
    const _setFile = async (value) => {
        setFile(value);
        await setFileImage(value);
    }
    const handleCategoryChange = async ({ target }) => {

        const { value } = target;
        if (value !== defaultDropdownValue) {
            setFileTypeCategory(value);
            setCategorySelected(true);
            setSelectedFiles([]);
            const { files } = filterDocVerificationList({ fileCategory: verificationType.value, uploadedFileData, fileType: value });
            setFiles(files);

            if (files.length === 1) {
                await _setFile(files[0].value);
            } else {
                clearCategoryRelatedVariables();
            }

            setSelectedMandatoryCategoryList([...selectedMandatoryCategoryList, value]);
        }

        // if (verificationType.verificationFieldName === fileVerificationEnums.docEPFO) {
        //     setSelectedMandatoryCategoryList([...selectedMandatoryCategoryList, value]);
        // }
    }
    const approve = async (remarks) => {
        showErrorMessage();
        if (hasValue(remarks)) {
            const payLoad = {
                appointeeId,
                userId: userId,
                remarks: remarks,
            };
            const response = await postAppointeeApproved(payLoad);
            if (response) {
                actionsAfterProcess("approve");
            }
            closeRemarksInputModel();
        } else {
            showErrorMessage(remarksEmptyMsg);
        }
    };

    const reject = async (remarks) => {
        showErrorMessage();
        if (hasValue(remarks)) {
            const payLoad = {
                appointeeId,
                remarks: remarks,
                userId: userId
            };
            const response = await postAppointeeRejected(payLoad);
            if (response) {
                actionsAfterProcess("reject");
            }
            closeRemarksInputModel();
        } else {
            showErrorMessage(remarksEmptyMsg);
        }
    };
    const setFileImage = async (file) => {
        const payload = {
            appointeeId: appointeeId,
            fileCategory: fileTypeCategory,
            fileId: file
        };
        const response = await GetUploadedFileDetailsById(payload);
        if (response && response.responseInfo) {
            const { fileSrc } = GetImageSrc(response.responseInfo);
            const { fileName } = response.responseInfo
            setFilename(fileName);
            setFileSrc(fileSrc);
        }
    }
    const handleFileChange = async ({ target }) => {
        const { value } = target;

        if (files.length === 1 && selectedFiles.length === 0) {
            setSelectedFiles([value]);
        } else {

            setSelectedFiles((prev) => {
                if (!prev.includes(value)) {
                    return [...prev, value];
                } else {
                    return prev.filter((file) => file !== value);
                }
            });

        }
        await markFileAsRead(value);
        await _setFile(value);
    };

    const markFileAsRead = (fileTypeToUpdate) => {
        // Update the isRead property for the selected file
        const updatedFiles = files.map((file) =>
            file.value === fileTypeToUpdate ? { ...file, isRead: true } : file
        );

        setFiles(updatedFiles);
    };
    const setUploadedFileDataResponse = async (defaultVerificationType) => {
        const response = await getUploadFileData(appointeeId);
        if (response) {
            const _uploadedFileData = response.responseInfo;
            setUploadedFileData(response.responseInfo);
            selectDefaultVerificationType(defaultVerificationType, _uploadedFileData);
        }
    }
    const verificationOnChange = ({ target }, index) => {
        const { name, value } = target;
        setVerificationUpdate({ ...verificationUpdate, [name]: stringToBoolean(value) });
    }

    const handleClickOnMenuItem = (value) => {
        if (value === epfFileCategoryTypeAlias) {
        }
    };
    const initializeVerificationData = async () => {
        const response = await getAppointeeDetails(appointeeId);

        if (response) {
            const { appointeeName, dateOfBirth, gender, memberName, memberRelation, isHandicap, handicapeType, maratialStatus, qualification,
                appointeeEmailId, mobileNo, dateOfJoining, isUanVarified, isFnameVarified ,nationality} = response.responseInfo;
            appointeeName ? setAppointeeName(appointeeName) : setAppointeeName(NA);
            dateOfBirth ? setDateOfBirth(DDMMYYYY(dateOfBirth)) : setDateOfBirth(NA);
            gender
                ? setGender(filteredObjectProperty(genderList, gender))
                : setGender(NA);
            memberName ? setMember(memberName) : setMember(NA);
            memberRelation
                ? setRelationshipWithMember(
                    filteredObjectProperty(relationList, memberRelation)
                )
                : setRelationshipWithMember(NA);
            hasValue(isHandicap)
                ? isHandicap === "Y"
                    ? setIsPhysicallyHandicap("Yes")
                    : setIsPhysicallyHandicap("No")
                : setIsPhysicallyHandicap(NA);
            isHandicap === "N" || !isHandicap
                ? setHandicapType(NA)
                : setHandicapType(
                    filteredObjectProperty(disabilityList, handicapeType)
                );
            qualification
                ? setQualification(
                    filteredObjectProperty(qualificationList, qualification)
                )
                : setQualification(NA);
            maratialStatus
                ? setMaritalStatus(
                    filteredObjectProperty(maritalStatusList, maratialStatus)
                )
                : setMaritalStatus(NA);
            appointeeEmailId ? setEmail(appointeeEmailId) : setEmail(NA);
            mobileNo ? setMobileNo(mobileNo) : setMobileNo(NA);
            nationality ? setNationality(nationality) : setNationality(NA);
            dateOfJoining
                ? setDateOfJoining(DDMMYYYY(dateOfJoining))
                : setDateOfJoining(NA);
            // mobileNo: mobileNo ? mobileNo : NA,
            // nationality: nationality ? nationality : NA,
            // isFnameVarified: isFnameVarified ? isFnameVarified : NA,
            // isUanVerified: isUanVarified
            //   ? isUanVarified
            //   : isUanVarified === false
            //   ? isUanVarified
            //   : NA,
            //   dateOfJoining:dateOfJoining,
            //   userId:userId
            const verificationFieldSet = {
                none: false,
                isFnameVarified: isFnameVarified,
                isUanVerified: isUanVarified
            }
            const { verificationTypeList } = createVerificationTypeList(defaultVerificationTypeList, verificationFieldSet);
            setUploadedFileDataResponse(verificationTypeList[0]?.value);
            setVerificationTypeList(verificationTypeList);
        }
    };
    useEffect(() => {
        if (files.length === 1 && selectedFiles.length === 0) {
            setSelectedFiles([files[0].value]);
        }
    }, [files]);

    useEffect(() => {
        const { subCategoryList } = getFileCategoryByFileType(verificationCategoryList);
        const { updatedQuestionSet, updatedVerification } = handleVerificationStatusChange({
            verificationQuestionSet,
            subCategoryList,
            verificationUpdate,
            verificationType,
            fileSrc
        });
        setVerificationQuestionSet(updatedQuestionSet);
        setVerificationUpdate(updatedVerification);

    }, [
        verificationUpdate?.[`${fileVerificationEnums.docComplete}_${fatherFileCategoryTypeAlias}`],
        verificationUpdate?.[`${fileVerificationEnums.docValid}_${fatherFileCategoryTypeAlias}`],
        verificationUpdate?.[`${fileVerificationEnums.docComplete}_${epfoServiceHistoryFileTypeAlias}`],
        verificationUpdate?.[`${fileVerificationEnums.docValid}_${epfoServiceHistoryFileTypeAlias}`],
        verificationUpdate?.[`${fileVerificationEnums.pensionApplicable}_${epfoServiceHistoryFileTypeAlias}`],
        verificationUpdate?.[`${fileVerificationEnums.pensionApplicable}_${epfoPassbookFileTypeAlias}`],
        verificationUpdate?.[`${fileVerificationEnums.docComplete}_${epfoPassbookFileTypeAlias}`],
        verificationUpdate?.[`${fileVerificationEnums.docValid}_${epfoPassbookFileTypeAlias}`],
    ])

    useEffect(() => {
        if (verificationType) {
            let newFileSrc = '';
            let _verificationUpdate = {};
            if (verificationType.value === fatherFileCategoryTypeAlias) {
                newFileSrc = '';
                _verificationUpdate = {
                    "isDocComplete_FTHR": undefined,
                    "isDocValid_FTHR": undefined,
                    "isFnameVarified_FTHR": undefined,
                }
            } else if (verificationType.value === epfFileTypeAlias) {
                newFileSrc = '';
                _verificationUpdate = {
                    "isDocComplete_EPFPSHF": undefined,
                    "isDocValid_EPFPSHF": undefined,
                    "isDocComplete_EPFPSSBKMNL": undefined,
                    "isDocValid_EPFPSSBKMNL": undefined,
                    "isPensionApplicable_EPFPSSBKMNL": undefined,
                    "isPensionGapFound_EPFPSSBKMNL": undefined
                }
            }
            setFileSrc(newFileSrc);
            const { verificationCategoryList } = filterDocVerificationList({
                fileCategory: verificationType.value,
                uploadedFileData,
            });
            setVerificationCategoryList(verificationCategoryList);
            const { updatedQuestionSet } = addNewQuestion({
                verificationType,
                verificationQuestionSet: [],
            });
            let currentDefaultVerificationUpdate = {};
            if (verificationType.value === fatherFileCategoryTypeAlias) {
                currentDefaultVerificationUpdate = defaultFnameVerificationUpdate;
            } else if (verificationType.value === epfFileTypeAlias) {
                currentDefaultVerificationUpdate = defaultEpfoPassbookVerificationUpdate;
            }
            const { updatedQuestionSet: finalQuestionSet } = upDateQuestionSet({
                verificationQuestionSet: updatedQuestionSet,
                verificationUpdate: currentDefaultVerificationUpdate,
                verificationType,
                fileSrc,
            });
            setVerificationQuestionSet(finalQuestionSet);
            setVerificationUpdate(_verificationUpdate);
            setSelectedMandatoryCategoryList([]);
        }
    }, [verificationType]);

    useEffect(() => {
        initializeVerificationData();
    }, [])
    useEffect(() => {
        const { updatedQuestionSet: _updatedQuestionSet } = upDateQuestionSet({
            verificationQuestionSet: verificationQuestionSet,
            verificationType: verificationType,
            fileSrc
        });
    }, [fileSrc])
    let addFabStyle = {
        ..._addFabStyle,
        transform: `rotate(${degreeOfRotation}deg)`,
    };

    const handleToggleActionList = () => {
        const value = toggleActionMenu(degreeOfRotation, actionIconListDisplay);
        setDegreeOfRotation(value.degreeOfRotation);
        setActionIconListDisplay(value.actionIconListDisplay);
    };

    const handleClickOnReview = async () => {
        const response = await getRemarks(appointeeId);
        if (response && response.responseInfo && response.responseInfo.length > 0) {
            const remarks = response.responseInfo;
            openRemarksModel(remarks);
        } else {
            showErrorMessage(remarksissuemessage);
        }
    };

    const handleApproveModal = async () => {
        const confirmationModelContent = {
            dialogContentText: approveConfirmation,
            dialogComponent: <RemarksInputModel />,
            dialogFunction: (remarks) => {
                approve(remarks);
            },
        };
        openRemarksInputModel(confirmationModelContent);
    };
    const handleReject = () => {
        const currDate = DateFormatYYYYMMDD(new Date());
        const joinDate = DateFormatYYYYMMDD(dateOfJoining);
        const datetojoin = DATEDIFF(currDate, joinDate);
        const confirmationModelContent = {
            dialogContentText: `Candidate still has ${datetojoin} days left to complete verification process. ${appointeerejetionConfirmationMsg}`,
            dialogComponent: <RemarksInputModel />,
            dialogFunction: (remarks) => {
                reject(remarks);
            },
        };
        openRemarksInputModel(confirmationModelContent);
    };
    const addFabProps = new FabIconPropsModel(
        addFabStyle,
        handleToggleActionList,
        "primary",
        "add",
        <Add />,
        "Open action"
    );
    const remarksFabProps = new FabIconPropsModel(
        actionIconStyle,
        handleClickOnReview,
        "info",
        "remarks",
        <Comment />,
        "Remarks/Issues"
    );
    const approveFabProps = new FabIconPropsModel(
        actionIconStyle,
        handleApproveModal,
        "success",
        "thumsup",
        <ThumbUp />,
        "Manual Override"
    );
    const rejectFabProps = new FabIconPropsModel(
        actionIconStyle,
        handleReject,
        "error",
        "thumsdown",
        <ThumbDown />,
        "Cancel"
    );
    const handleYes = () => closeModel();
    const handleNo = () => { };
    const handleClose = async () => {

        let _contetntText
        if (isVarified === false) {
            _contetntText = (
                <>
                    <Typography sx={subHeadingContentTextStyle}>
                        {'Candidate has failed verification in the previously checked segment.'}
                    </Typography>
                    <Typography sx={subHeadingContentTextStyle}>
                        {'If you Close now, you will not be able to complete the remaining verification segments.'}
                    </Typography>
                    <Typography sx={subHeadingContentTextStyle}>
                        {'Candidate will be moved to "Document Reupload Requested" tab, requesting Candidate to reupload relevant documents against the failed verification issues. After candidate completes the reupload, Candidate will be moved to Manual Re-Verification tab, from where you will again be able to reverify candidate.'}
                    </Typography>
                    <Typography sx={{ ...subHeadingContentTextStyle, marginTop: '20px' }}> {'Do you still want to "Close"?'}</Typography>
                </>
            )
        } else {
            _contetntText = (
                <>
                    <Typography sx={subHeadingContentTextStyle}>
                        {'If you have selected any answers / written "Remarks", please click on "Submit" to register your responses - you will lose them otherwise.'}
                    </Typography>
                    <Typography sx={{ ...subHeadingContentTextStyle, marginTop: '20px' }}> {'Do you still want to "Close"?'}</Typography>
                </>
            )
        }
        const closeConfirmationModelContent = {

            dialogContentText: _contetntText,
            fullWidth: true,
            mxWidth: "md",
        };
        openConfirmationYesNoModal(
            closeConfirmationModelContent,
            handleYes,
            handleNo
        );

    };
    return (
        <Box bgcolor={"#E2E8F0"} sx={{ position: "relative", width: "100%", height: "100%", padding: "1rem 0", marginRight: '10px' }}>
            <Stack sx={floatingIconListStyle}>
                <>
                    <FabIcon props={{ ...addFabProps, selectedIndex: 1, index: 1 }} />
                    {actionIconListDisplay ? (
                        <Stack sx={{ ...actionIconListStylesx }}>
                            {/* {isSaveStep && isSaveStep > 0
                        ? hasPermission &&
                        hasPermission["A002"] && ( */}
                            <FabIcon
                                props={{
                                    ...approveFabProps,
                                    selectedIndex: 1,
                                    index: 1,
                                    placement: "left-end",
                                    size: "small",
                                }}
                            />
                            {/* )
                        : null} */}
                            <FabIcon
                                props={{
                                    ...rejectFabProps,
                                    selectedIndex: 1,
                                    index: 1,
                                    placement: "left-end",
                                    size: "small",
                                }}
                            />
                            <FabIcon
                                props={{
                                    ...remarksFabProps,
                                    selectedIndex: 1,
                                    index: 1,
                                    placement: "left-end",
                                    size: "small",
                                }}
                            />
                        </Stack>
                    ) : null}
                </>
            </Stack>

            <ManualVerifiedPageSectionContainer>


                <Stack sx={listHeadingConteinerStyle}>
                    <Typography sx={{ ...listHeadingStyle, fontSize: '1rem' }}>
                        Personal Information
                    </Typography>
                </Stack>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={12} lg={12} letterSpacing={2}>
                        <Grid item xs={12}>
                            <Stack direction={{ xs: "column", sm: "row" }}  >
                                <PersonalInformation fieldName={"Name"} fieldValue={appointeeName} />
                                <PersonalInformation fieldName={"Date of Birth"} fieldValue={dateOfBirth} />
                                <PersonalInformation fieldName={"Father's/Husband's Name"} fieldValue={member} />
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack direction={{ xs: "column", sm: "row" }} >
                                <PersonalInformation fieldName={"Relationship with Member"} fieldValue={relationshipWithMember} />
                                <PersonalInformation fieldName={"Nationality"} fieldValue={nationality} />
                                <PersonalInformation fieldName={"Mobile"} fieldValue={mobileNo} />
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack direction={{ xs: "column", sm: "row" }} >
                                <PersonalInformation fieldName={"Qualification"} fieldValue={qualification} />
                                <PersonalInformation fieldName={"Marital Status"} fieldValue={maritalStatus} />
                                <PersonalInformation fieldName={"Physically Handicapped"} fieldValue={isPhysicallyHandicap} />
                                {isPhysicallyHandicap === "Yes" && (
                                    <>
                                        <PersonalInformation
                                            fieldName={"Handicap Type"}
                                            fieldValue={handicapType ? handicapType : NA}
                                        />
                                    </>
                                )}
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
            </ManualVerifiedPageSectionContainer>
            <ManualVerifiedPageSectionContainer sx={{ marginTop: '1rem' }}>
                <Stack sx={listHeadingConteinerStyle}>
                    <Typography sx={{ ...listHeadingStyle, fontSize: '1rem' }}>
                        Verification Section
                    </Typography>
                </Stack>
                <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    sx={{ paddingX: "1rem", paddingLeft: "10px", mt: '5px', mb: '5px' }}
                >
                    <Grid
                        item
                        xs={12}
                        md={3}
                    >
                        <SelectInput
                            label={'Verification Type'}
                            itemList={verificationTypeList}
                            onChange={handleChangeVerificationType}
                            value={verificationType.value}
                            handleClickOnMenuItem={handleClickOnMenuItem}
                        />
                    </Grid>
                    <Grid item xs={12} md={3} >
                        <SelectInput
                            label={'Category'}
                            itemList={verificationCategoryList}
                            onChange={handleCategoryChange}
                            value={fileTypeCategory}
                        />
                    </Grid>
                    <Grid sx={{ paddingLeft: { xs: 0, md: "20px" } }} item xs={12} md={3} >
                        <SelectInput
                            label={'Files'}
                            itemList={files}
                            onChange={handleFileChange}
                            value={file}
                        />
                    </Grid>
                </Grid>
                <Divider />
                {
                    verificationCategoryList && verificationCategoryList.length > 0 ? (
                        <FiledetailsSection
                            appointeeId={appointeeId}
                            verificationType={verificationType}
                            fileSrc={fileSrc}
                            fileName={fileName}
                            fileTypeCategory={fileTypeCategory}
                            setFileTypeCategory={setFileTypeCategory}
                            verificationOnChange={verificationOnChange}
                            verificationUpdate={verificationUpdate}
                            verificationQuestionSet={verificationQuestionSet}
                            categorySelected={categorySelected}
                            setVerificationTypeList={setVerificationTypeList}
                            setVerificationType={setVerificationType}
                            setVerificationCategoryList={setVerificationCategoryList}
                            uploadedFileData={uploadedFileData}
                            verificationTypeList={verificationTypeList}
                            verificationCategoryList={verificationCategoryList}
                            selectedFiles={selectedFiles}
                            files={files}
                            setFiles={setFiles}
                            setFile={setFile}
                            selectedMandatoryCategoryList={selectedMandatoryCategoryList}
                            setSelectedMandatoryCategoryList={setSelectedMandatoryCategoryList}
                            closeModel={handleClose}
                            setIsVarified={setIsVarified}
                            isVarified={isVarified}

                        />
                    ) : (
                        <Grid item xs={12}>
                            <Stack sx={{ flexDirection: 'row', justifyContent: 'end' }}>

                                <Button1
                                    onClick={closeModel}
                                    sx={rightMostBtnStyle}
                                    variant="contained"
                                    color="primary"
                                >
                                    {'Close'}
                                </Button1>
                            </Stack>
                        </Grid>
                    )
                }
                {/* <GridContainer> */}

                {/* </GridContainer> */}
            </ManualVerifiedPageSectionContainer>
        </Box>
    );
};

const UnWrappedManualVerifiedView = (props) => {
    return (
        <FullScreenModel
            headerText={"Manual Verification"}
            headerInfo={manuallyVerificationInfo}
            open={props.openView}
            fullScreen={true}
            // closeModel={props.closeViewModel}
            content={<ManualverifiedViewDetails details={props.appointeePersonalDetails} closeModel={props.closeViewModel} />}
        />
    );
};

const ManualverifidView = ActionPermission(UnWrappedManualVerifiedView);

export default ManualverifidView;
