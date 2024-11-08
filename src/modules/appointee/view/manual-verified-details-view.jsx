import {
    Grid,
    Typography,
    Accordion,
    Card,
    AccordionSummary,
    AccordionDetails,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    Divider,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/system";
import FullScreenModel from "shared/utils/models/fullscreen-modal";

import {
    candidatefileViewContainerStyle,
    cardStyle,
    formHeadingGridContainerStyle,
    gridContainerStyle,
    inputFieldStyle2,
    inputFieldStyleAdded,
    labelDividerStyle,
    lable1CopyStyle,
    listHeadingConteinerStyle,
    listHeadingConteinerStylesx,
    listHeadingStyle,
    rightMostBtnStyle,
    submitBtnStyle,
} from "app";
import { categoryTypeList, fileTypeList, NA, noPassBookMsg, verificationTypeList } from "shared/constants/constants";
import ActionPermission from "shared/components/action-permission/action-permission";
import { PersonalInformation } from "shared/components/display-information/personal-information";
import { FileViewComponent } from "./file-view-component";
import SelectInput from "shared/components/input-fields/select-input";
import { Category } from "@mui/icons-material";
import demoImg from 'assets/images/demo3.jpeg';
import FiledetailsSection from "./file-details-section";
import filterDocVerificationList from "shared/utils/associate/filter-doc-verification-list";
import { useSelector } from "react-redux";

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
    // const [appointeeName, setAppointeeName] = useState(null);
    // const [dateOfBirth, setDateOfBirth] = useState(null);
    // const [gender, setGender] = useState(null);
    // const [member, setMember] = useState(null);
    // const [relationshipWithMember, setRelationshipWithMember] = useState(null);
    // const [mobileNo, setMobileNo] = useState(null);
    // const [email, setEmail] = useState(null);
    // const [nationality, setNationality] = useState(null);
    // const [qualification, setQualification] = useState(null);
    // const [maritalStatus, setMaritalStatus] = useState(null);
    // const [handicapType, setHandicapType] = useState(null);
    // const [handicapFile, setHandicapFile] = useState();
    // const [isPhysicallyHandicap, setIsPhysicallyHandicap] = useState(null);

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

    const zoomIn = () => {
        setZoom((prevZoom) => Math.min(prevZoom + 0.1, 6)); // max zoom level 3x
    };

    const zoomOut = () => {
        setZoom((prevZoom) => Math.max(prevZoom - 0.1, 1)); // min zoom level 1x (original size)
    };

    const clearSubDropdownListofVerificationType = (currentValue) => {
        setFile("");
        setFiles([]);
        setFileSrc("");
        if (currentValue === 'none') {
            setFileTypeCategory("");
            setVerificationCategoryList([]);
        }
        // setFileTypeCategory("");
        // setUploadedFileData([]);
    }

    const handleChangeVerificationType = ({ target }) => {
        const { value: currentValue } = target;
        const selectedVerificationType = verificationTypeList.find(({ value }) => value === currentValue);
        setVerificationType(selectedVerificationType);
        clearSubDropdownListofVerificationType(currentValue);
        if (currentValue !== 'none') {
            const { verificationCategoryList } = filterDocVerificationList({ fileCategory: currentValue, uploadedFileData: uploadedFileData });
            setVerificationCategoryList(verificationCategoryList);
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
            const { mimeType, fileData } = response.responseInfo;
            const _fileSrc = `data:${mimeType};base64,${fileData}`;
            setFileSrc(_fileSrc);
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
                            {
                                fileSrc &&
                                <>
                                    <Divider />
                                    <FiledetailsSection
                                        verificationType={verificationType}
                                        fileSrc={fileSrc}
                                    />
                                </>
                            }
                            {/* 
                            <Grid
                                // sx={{ paddingLeft: "20px", width: "50%" }}
                                container
                                rowSpacing={1}
                                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                                sx={{ paddingX: "1rem", marginTop: "2px" }}
                            >
                                <Grid
                                    item
                                    xs={12}
                                    md={6}
                                >
                                    <Typography sx={{ ...listHeadingStyle, fontSize: '1rem', textAlign: "left" }}>
                                        Father's Name Verification
                                    </Typography>
                                </Grid>
                                <Grid
                                    // sx={{ paddingLeft: "20px" }}
                                    container
                                    rowSpacing={1}
                                    // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                                    item
                                    xs={12}
                                    md={6}
                                >

                                    <Grid item xs={12} md={6} >
                                        <SelectInput
                                            label={'Category'}
                                            itemList={categoryTypeList}
                                        // onChange={handleCategoryChange}
                                        // value={Category}
                                        />
                                    </Grid>

                                    <Grid sx={{ paddingLeft: { xs: 0, md: "20px" } }} item xs={12} md={6} >
                                        <SelectInput
                                            label={'File Type'}
                                            itemList={fileTypeList}
                                        // onChange={handleCategoryChange}
                                        // value={Category}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid> */}
                            {/* <Grid container >
                                <Grid item xs={12} md={8}>
                                    <Box sx={candidatefileViewContainerStyle}>
                                        <img style={{
                                            transform: `scale(${zoom})`,
                                            transition: 'transform 0.3s ease',
                                            transformOrigin: 'center',
                                            margin: 'auto',
                                        }} src={demoImg} />
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid container >
                                <Grid item xs={12}>
                                    <Stack sx={{ flexDirection: 'row', justifyContent: 'end' }}>
                                        <Button
                                            //onClick={() => setCurrentPageNo(1)}
                                            // onClick={() => submitDetails(false, true)}
                                            //sx={{ m: "15px 5px", ml: 3 }}
                                            sx={submitBtnStyle}
                                            variant="contained"
                                            color="primary"
                                        >
                                            {'Submit'}
                                        </Button>
                                        <Button
                                            //onClick={() => setCurrentPageNo(1)}
                                            // onClick={() => submitDetails(false, true)}
                                            //sx={{ m: "15px 5px", ml: 3 }}
                                            sx={rightMostBtnStyle}
                                            variant="contained"
                                            color="primary"
                                        >
                                            {'Close'}
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid> */}
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
