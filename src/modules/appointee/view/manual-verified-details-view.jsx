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
    gridContainerStyle,
    inputFieldStyle2,
    lable1CopyStyle,
    listHeadingConteinerStyle,
    listHeadingStyle,
} from "app";
import { defaultVerificationQuestionSet, defaultVerificationUpdate, NA, verificationTypeList } from "shared/constants/constants";
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

const customeSelectInput = ({ itemList, label, onChange, value }) => {
    <FormControl fullWidth>
        <Typography sx={lable1CopyStyle}>
            Relationship{" "}
            <span className="requiredField">*</span>
        </Typography>
        <Select
            error={false}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            className="customeTextField"
            // disabled={isRelationShipWithMemberDisabled}
            sx={inputFieldStyle2}
            // onChange={(e) => {
            //     setRelationshipWithMember(e.target.value);
            // }}
            value={'All'}
        >
            <MenuItem value="All">Select all</MenuItem>
            <MenuItem value={"All"}>some</MenuItem>
            <MenuItem value={"false"}>some 2</MenuItem>
        </Select>
    </FormControl>
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
        nationality
    } = details;

    const apiSlice = useSelector((state) => state.apiSlice);
    const {
        getUploadFileData,
        GetUploadedFileDetailsById
    } = apiSlice[0];
    console.log("details", details)
    // useEffect(() => {
    //   //setTableRows(appointeeId);
    // }, []);
    const [zoom, setZoom] = useState(1);
    const [verificationType, setVerificationType] = useState(verificationTypeList[0]);
    const [uploadedFileData, setUploadedFileData] = useState([]);
    const [verificationCategoryList, setVerificationCategoryList] = useState([]);
    const [fileTypeCategory, setFileTypeCategory] = useState("");
    const [files, setFiles] = useState([]);
    const [file, setFile] = useState("");
    const [fileSrc, setFileSrc] = useState("");
    const [verificationQuestionSet, setVerificationQuestionSet] = useState(defaultVerificationQuestionSet);
    const [verificationUpdate, setVerificationUpdate] = useState(defaultVerificationUpdate);
    console.log("verificationUpdate", verificationUpdate);

    const zoomIn = () => {
        setZoom((prevZoom) => Math.min(prevZoom + 0.1, 6)); // max zoom level 3x
    };

    const zoomOut = () => {
        setZoom((prevZoom) => Math.max(prevZoom - 0.1, 1)); // min zoom level 1x (original size)
    };

    const clearSubDropdownListofVerificationType = (currentValue) => {
        clearCategoryRelatedVariables();
        setFiles([]);
        if (currentValue === 'none') {
            setFileTypeCategory("");
            setVerificationCategoryList([]);
        }
    }

    const handleChangeVerificationType = ({ target }) => {
        const { value: currentValue } = target;
        const selectedVerificationType = verificationTypeList.find(({ value }) => value === currentValue);
        setVerificationType(selectedVerificationType);
        clearSubDropdownListofVerificationType(currentValue);
        if (currentValue !== 'none') {
            const { verificationCategoryList } = filterDocVerificationList({ fileCategory: currentValue, uploadedFileData: uploadedFileData });
            setVerificationCategoryList(verificationCategoryList);
            const { updatedQuestionSet } = addNewQuestion({ verificationType: target, verificationQuestionSet: defaultVerificationQuestionSet });
            const { updatedQuestionSet: _updatedQuestionSet } = upDateQuestionSet({ verificationQuestionSet: updatedQuestionSet, verificationUpdate: defaultVerificationUpdate, verificationType: target });
            setVerificationQuestionSet(_updatedQuestionSet);
            setVerificationUpdate(defaultVerificationUpdate);
        }
    }
    const clearCategoryRelatedVariables = () => {
        setFileSrc("");
        setFile("");
    }
    const handleCategoryChange = ({ target }) => {
        const { value } = target;
        setFileTypeCategory(value);
        const { files } = filterDocVerificationList({ fileCategory: verificationType.value, uploadedFileData, fileType: value });
        setFiles(files);
        clearCategoryRelatedVariables();
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
            setFileSrc(fileSrc);
        }
    }
    const handleFileChange = async ({ target }) => {
        const { value } = target;
        setFile(value);
        await setFileImage(value);
    }
    const setUploadedFileDataResponse = async () => {
        const response = await getUploadFileData(appointeeId);
        if (response) {
            setUploadedFileData(response.responseInfo);
        }
    }
    const verificationOnChange = ({ target }, index) => {
        const { name, value } = target;
        setVerificationUpdate({ ...verificationUpdate, [name]: stringToBoolean(value) });
    }

    useEffect(() => {
        if (verificationType.value !== 'none') {
            const { updatedQuestionSet, updatedVerification } = handleVerificationStatusChange({
                verificationQuestionSet,
                verificationUpdate, verificationType
            });
            setVerificationQuestionSet(updatedQuestionSet);
            setVerificationUpdate(updatedVerification);
        }

    }, [verificationUpdate.isDocComplete, verificationUpdate.isDocValid])

    useEffect(() => {
        setUploadedFileDataResponse();
    }, [])

    return (
        <Box bgcolor={"#E2E8F0"} sx={{ position: "relative", width: "100%", height: "100%", paddingTop: "-5px" }}>
            <Box sx={{ ...gridContainerStyle, paddingTop: "-5px", paddingBottom: "0px" }}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={12} letterSpacing={10}>
                        <Box sx={cardStyle}>
                            <Stack sx={listHeadingConteinerStyle}>
                                <Typography sx={{ ...listHeadingStyle, fontSize: '1rem' }}>
                                    Personal Information
                                </Typography>
                            </Stack>

                            <Grid container spacing={1}>
                                <Grid item xs={12} md={12} letterSpacing={5}>
                                    <Stack direction="row" spacing={-8}>
                                        <PersonalInformation fieldName={"Name"} fieldValue={appointeeName} />
                                        <PersonalInformation fieldName={"Date of Birth"} fieldValue={dateOfBirth} />
                                        <PersonalInformation fieldName={"Father's / Husband's Name"} fieldValue={member} />
                                    </Stack>

                                    <Stack direction="row" spacing={-8}>
                                        <PersonalInformation fieldName={"Relationship with Member"} fieldValue={relationshipWithMember} />
                                        <PersonalInformation fieldName={"Nationality"} fieldValue={nationality} />
                                        <PersonalInformation fieldName={"Mobile"} fieldValue={mobileNo} />
                                    </Stack>

                                    <Stack direction="row" spacing={-8}>
                                        <PersonalInformation fieldName={"Qualification"} fieldValue={qualification} />
                                        <PersonalInformation fieldName={"Marital Status"} fieldValue={maritalStatus} />
                                        <PersonalInformation fieldName={"Physically Handicapped"} fieldValue={isPhysicallyHandicap} />
                                        {isPhysicallyHandicap === "Yes" && (
                                            <>
                                                <PersonalInformation
                                                    fieldName={"Handicap Type"}
                                                    fieldValue={handicapType ? handicapType : NA}
                                                />

                                                {/* <PersonalInformation
                                                    fieldName={"Handicap Certificate"}
                                                // fieldValue={handicapFile ? 
                                                //     <FileViewComponent
                                                //         fileType={"Handicap Certificate"}
                                                //         file={handicapFile}
                                                //     />
                                                //     : NA}
                                                /> */}
                                            </>
                                        )}
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ ...gridContainerStyle, paddingTop: "-5px", marginTop: 0 }}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={12} letterSpacing={10}>
                        <Box sx={cardStyle}>
                            <Grid
                                // sx={{ paddingLeft: "20px", width: "50%" }}
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
                                        label={'Verification type'}
                                        itemList={verificationTypeList}
                                        onChange={handleChangeVerificationType}
                                        value={verificationType.value}
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
                                    verificationOnChange={verificationOnChange}
                                    verificationUpdate={verificationUpdate}
                                    verificationQuestionSet={verificationQuestionSet}
                                />
                            }
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

const UnWrappedManualVerifiedView = (props) => {
    console.log("UnWrappedManualVerifiedView", props);

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
