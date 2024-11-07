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
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/system";
import FullScreenModel from "shared/utils/models/fullscreen-modal";

import {
    cardStyle,
    gridContainerStyle,
    inputFieldStyleAdded,
    listHeadingConteinerStyle,
    listHeadingConteinerStylesx,
    listHeadingStyle,
} from "app";
import { NA, noPassBookMsg } from "shared/constants/constants";
import ActionPermission from "shared/components/action-permission/action-permission";
import { PersonalInformation } from "shared/components/display-information/personal-information";
import { FileViewComponent } from "./file-view-component";


let ManualverifiedViewDetails = (details) => {
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
        appointeeName,
        dateOfBirth,
        memberName,
        memberRelation,
        nationality,
        mobileNo,
        qualification,
        maratialStatus,
        isHandicap,
        handicapeType,
        fileUploaded,
        isPhysicallyHandicap,
    } = details;
    console.log("details", details)
    // useEffect(() => {
    //   //setTableRows(appointeeId);
    // }, []);
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
                                        <PersonalInformation fieldName={"Name"} fieldValue={"appointeeName"} />
                                        <PersonalInformation fieldName={"Date of Birth"} fieldValue={"dateOfBirth"} />
                                        <PersonalInformation fieldName={"Father's / Husband's Name"} fieldValue={"memberName"} />
                                    </Stack>

                                    <Stack direction="row" spacing={-8}>
                                        <PersonalInformation fieldName={"Relationship with Member"} fieldValue={"memberRelation"} />
                                        <PersonalInformation fieldName={"Nationality"} fieldValue={"nationality"} />
                                        <PersonalInformation fieldName={"Mobile"} fieldValue={"mobileNo"} />
                                    </Stack>

                                    <Stack direction="row" spacing={-8}>
                                        <PersonalInformation fieldName={"Qualification"} fieldValue={"qualification"} />
                                        <PersonalInformation fieldName={"Marital Status"} fieldValue={"maratialStatus"} />
                                        <PersonalInformation fieldName={"Physically Handicapped"} fieldValue={"isPhysicallyHandicap"} />
                                        {isPhysicallyHandicap === "Yes" && (
                                            <>
                                                <PersonalInformation
                                                // fieldName={"Handicap Type"}
                                                // fieldValue={handicapType ? handicapType : NA}
                                                />

                                                <PersonalInformation
                                                    fieldName={"Handicap Certificate"}
                                                // fieldValue={handicapFile ? 
                                                //     <FileViewComponent
                                                //         fileType={"Handicap Certificate"}
                                                //         file={handicapFile}
                                                //     />
                                                //     : NA}
                                                />
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
                            <Stack direction="row" sx={{ ...listHeadingConteinerStylesx, width: "100%" }}>
                                <Typography sx={{ ...listHeadingStyle, fontSize: '1rem', textAlign: "left" }}>
                                    Father Name Verification
                                </Typography>
                                <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ width: "100%" }}>
                                <FormControl sx={{ minWidth: 200,}} size="large">
                                    <InputLabel id="demo-simple-select-label">Picture</InputLabel>
                                    <Select
                                       labelId="demo-simple-select-label"
                                        sx={inputFieldStyleAdded}
                                         id="demo-simple-select"
                                        label="Choose photo"
                                         className="customeTextField"
                                    >
                                        <MenuItem value="All">Select all</MenuItem>
                                        <MenuItem value={"All"}>some</MenuItem>
                                        <MenuItem value={"false"}>some 2</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl sx={{ minWidth: 200, marginLeft: 2 }} size="large">
                                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                    <Select
                                        
                                        labelId="demo-simple-select-label"
                                        sx={inputFieldStyleAdded}
                                        id="demo-simple-select"
                                        label="Select status"
                                         className="customeTextField"
                                    >
                                        <MenuItem value="Verified">Verified</MenuItem>
                                        <MenuItem value="Pending">Pending</MenuItem>
                                        <MenuItem value="Not Verified">Not Verified</MenuItem>
                                    </Select>
                                </FormControl>
                                </Stack>
                            </Stack>

                            <Grid container spacing={1} >
                                <Grid item xs={12} md={12} letterSpacing={5}>
                                    <Stack direction="row" spacing={-8}>
                                        <PersonalInformation fieldName={"Name"} fieldValue={"appointeeName"} />
                                        <PersonalInformation fieldName={"Date of Birth"} fieldValue={"dateOfBirth"} />
                                        <PersonalInformation fieldName={"Father's / Husband's Name"} fieldValue={"memberName"} />
                                    </Stack>

                                    <Stack direction="row" spacing={-8}>
                                        <PersonalInformation fieldName={"Relationship with Member"} fieldValue={"memberRelation"} />
                                        <PersonalInformation fieldName={"Nationality"} fieldValue={"nationality"} />
                                        <PersonalInformation fieldName={"Mobile"} fieldValue={"mobileNo"} />
                                    </Stack>

                                    <Stack direction="row" spacing={-8}>
                                        <PersonalInformation fieldName={"Qualification"} fieldValue={"qualification"} />
                                        <PersonalInformation fieldName={"Marital Status"} fieldValue={"maratialStatus"} />
                                        <PersonalInformation fieldName={"Physically Handicapped"} fieldValue={"isPhysicallyHandicap"} />
                                        {isPhysicallyHandicap === "Yes" && (
                                            <>
                                                <PersonalInformation
                                                // fieldName={"Handicap Type"}
                                                // fieldValue={handicapType ? handicapType : NA}
                                                />

                                                <PersonalInformation
                                                    fieldName={"Handicap Certificate"}
                                                // fieldValue={handicapFile ? 
                                                //     <FileViewComponent
                                                //         fileType={"Handicap Certificate"}
                                                //         file={handicapFile}
                                                //     />
                                                //     : NA}
                                                />
                                            </>
                                        )}
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>



    );
};

const UnWrappedManualVerifiedView = (props) => {
    return (
        <FullScreenModel
            headerText={"manual verified Details"}
            open={props.openView}
            fullScreen={true}
            closeModel={props.closeViewModel}
            content={<ManualverifiedViewDetails details={props.details} />}
        />
    );
};

const ManualverifidView = ActionPermission(UnWrappedManualVerifiedView);

export default ManualverifidView;
