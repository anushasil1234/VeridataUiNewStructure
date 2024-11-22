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
    cardStyle,
    cardStyle2,
    gridContainerStyle,
    inputFieldStyle2,
    lable1CopyStyle,
    listHeadingConteinerStyle,
    listHeadingStyle,
} from "app";
import { defaultVerificationUpdate, NA, defaultVerificationTypeList, fileVerificationEnums, fatherFileCategoryTypeAlias, epfoServiceHistoryFileTypeAlias, defaultFnameVerificationUpdate, defaultEpfoPassbookVerificationUpdate, epfFileTypeAlias, epfFileCategoryTypeAlias, EPFOVerificatypeSelectionMsg, epfoPassbookFileTypeAlias } from "shared/constants/constants";
import ActionPermission from "shared/components/action-permission/action-permission";
import { PersonalInformation } from "shared/components/display-information/personal-information";
import SelectInput from "shared/components/input-fields/select-input";
import FiledetailsSection from "./file-details-section";
import filterDocVerificationList from "shared/utils/associate/filter-doc-verification-list";
import { useSelector } from "react-redux";
import GetImageSrc from "shared/utils/associate/get-image-src";
import stringToBoolean from "shared/utils/associate/string-top-boolean";
import handleVerificationStatusChange from "shared/utils/associate/handle-verification-status-change";
import upDateQuestionSet from "shared/utils/associate/update-question-set";
import addNewQuestion from "shared/utils/associate/add-new-question";
import createVerificationTypeList from "shared/utils/associate/create-verification-type-list";
import getFileCategoryByFileType from "shared/utils/associate/get-file-category";
import isEPFOSelectionDisabled from "shared/utils/associate/is-epfo-disabled";

const ManualVerifiedPageSectionContainer = ({ children, sx }) => {
    return (
        <Box sx={{ ...gridContainerStyle, paddingTop: "-5px", paddingBottom: "0px", ...sx }}>
            <Grid container spacing={1}>
                <Grid item xs={12} md={12} letterSpacing={10}>
                    <Box sx={cardStyle2}>
                        {children}
                    </Box>
                </Grid>
            </Grid></Box>
    )
}

let ManualverifiedViewDetails = ({ details }) => {

    const {
        appointeeId,
        appointeeName,
        dateOfBirth,
        gender,
        relationshipWithMember,
        member,
        handicapType,
        isPhysicallyHandicap,
        maritalStatus,
        qualification,
        email,
        mobileNo,
        nationality,
        isFnameVarified,
        isUanVerified
    } = details;

    const verificationFieldSet = {
        none: false,
        isFnameVarified: isFnameVarified,
        isUanVerified: isUanVerified
    }

    const apiSlice = useSelector((state) => state.apiSlice);
    const {
        getUploadFileData,
        GetUploadedFileDetailsById
    } = apiSlice[0];
    const popUpSlice = useSelector(state => state.popUpSlice);
    const showErrorMessage = popUpSlice && popUpSlice[0] && popUpSlice[0].showErrorMessage;


    // useEffect(() => {
    //   //setTableRows(appointeeId);
    // }, []);
    const [zoom, setZoom] = useState(1);
    const [verificationType, setVerificationType] = useState(defaultVerificationTypeList[0]);
    const [verificationTypeList, setVerificationTypeList] = useState([]);
    const [uploadedFileData, setUploadedFileData] = useState([]);
    const [verificationCategoryList, setVerificationCategoryList] = useState([]);
    const [fileTypeCategory, setFileTypeCategory] = useState("");
    const [files, setFiles] = useState([]);
    const [file, setFile] = useState("");
    const [fileSrc, setFileSrc] = useState("");
    const [fileName, setFilename] = useState("");
    const [verificationQuestionSet, setVerificationQuestionSet] = useState([]);
    const [verificationUpdate, setVerificationUpdate] = useState({});
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedMandatoryCategoryList, setSelectedMandatoryCategoryList] = useState([]);
    const [categorySelected, setCategorySelected] = useState(false);

    const clearSubDropdownListofVerificationType = (currentValue) => {
        clearCategoryRelatedVariables();
        setFiles([]);
        if (currentValue === 'none') {
            setFileTypeCategory("");
            setVerificationCategoryList([]);
        }
    }
    const selectDefaultVerificationType = (value, _uploadedFileData) => {
        const target = { value };
        handleChangeVerificationType({ target }, _uploadedFileData);
    }

    const handleChangeVerificationType = ({ target }, _uploadedFileData) => {
        const { value: currentValue } = target;
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
    }
    const clearCategoryRelatedVariables = () => {
        setFileSrc("");
        setFile("");
    }
    const _setFile = async (value) => {
        setFile(value);
        await setFileImage(value);
    }
    const handleCategoryChange = async ({ target }) => {
        const { value } = target;
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
        console.log('verificationType', verificationType);

        if (verificationType.verificationFieldName === fileVerificationEnums.docEPFO) {
            setSelectedMandatoryCategoryList([...selectedMandatoryCategoryList, value]);
        }
    }
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
        console.log('updatedFiles', fileTypeToUpdate);
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

        if (value === epfFileCategoryTypeAlias &&
            isEPFOSelectionDisabled({
                verificationFieldName: fileVerificationEnums.docEPFO,
                verificationFieldSet
            })
        ) {
            showErrorMessage(EPFOVerificatypeSelectionMsg);
        }
    }

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
        verificationUpdate?.[`${fileVerificationEnums.docComplete}_${epfoPassbookFileTypeAlias}`],
        verificationUpdate?.[`${fileVerificationEnums.docValid}_${epfoPassbookFileTypeAlias}`],
    ])
    useEffect(() => {
        if (verificationType) {
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
            setVerificationUpdate({});
            setSelectedMandatoryCategoryList([]);
        }
    }, [verificationType]);

    useEffect(() => {
        const { verificationTypeList } = createVerificationTypeList(defaultVerificationTypeList, verificationFieldSet);
        setUploadedFileDataResponse(verificationTypeList[0]?.value);
        setVerificationTypeList(verificationTypeList);
    }, [])
    useEffect(() => {
        const { updatedQuestionSet: _updatedQuestionSet } = upDateQuestionSet({
            verificationQuestionSet: verificationQuestionSet,
            verificationType: verificationType,
            fileSrc
        });
    }, [fileSrc])
    return (
        <Box bgcolor={"#E2E8F0"} sx={{ position: "relative", width: "100%", height: "100%", padding: "1rem 0" }}>
            <ManualVerifiedPageSectionContainer>
                <Stack sx={listHeadingConteinerStyle}>
                    <Typography sx={{ ...listHeadingStyle, fontSize: '1rem' }}>
                        Personal Information
                    </Typography>
                </Stack>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={12} lg={12} letterSpacing={2}>
                        <Grid item xs={12}>
                            <Stack direction={{ xs: "column", sm: "row" }} >
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
                <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    sx={{ paddingX: "1rem" }}
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
                    verificationCategoryList && verificationCategoryList.length > 0 &&
                    <FiledetailsSection
                        appointeeId={appointeeId}
                        verificationType={verificationType}
                        fileSrc={fileSrc}
                        fileName={fileName}
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
                        selectedMandatoryCategoryList={selectedMandatoryCategoryList}
                        setSelectedMandatoryCategoryList={setSelectedMandatoryCategoryList}
                    />
                }
            </ManualVerifiedPageSectionContainer>
        </Box>
    );
};

const UnWrappedManualVerifiedView = (props) => {
    return (
        <FullScreenModel
            headerText={"Manual verified Details"}
            open={props.openView}
            fullScreen={true}
            closeModel={props.closeViewModel}
            content={<ManualverifiedViewDetails details={props.appointeePersonalDetails} />}
        />
    );
};

const ManualverifidView = ActionPermission(UnWrappedManualVerifiedView);

export default ManualverifidView;
