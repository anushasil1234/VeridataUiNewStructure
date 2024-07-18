import {
  Grid,
  Typography,
  Accordion,
  Card,
  AccordionSummary,
  AccordionDetails,
  Fab,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/system";
import FullScreenModel from "shared/utils/models/fullscreen-modal";
import DownloadIcon from '@mui/icons-material/Download';
import {
  _addFabStyle,
  actionIconStyle,
  cardStyle,
  floatingIconListStyle,
  gridContainerStyle,
  listHeadingConteinerStyle,
  listHeadingStyle,
} from "app";
import { NA, noPassBookMsg } from "shared/constants/constants";
import ActionPermission from "shared/components/action-permission/action-permission";
import { PersonalInformation } from "shared/components/display-information/personal-information";
import { useSelector } from "react-redux";
import FabIconPropsModel from "shared/utils/fab-icon/fab-icon-model";
import { FabIcon } from "shared/utils";
import moment from "moment";
import jsPDFEmploymentHistTemplate from "shared/utils/associate/js-pdf-employmenthist";

let EmploymentViewDetails = ({ appointeeId }) => {

  const apiSlice = useSelector((state) => state.apiSlice);
  const popUpSlice = useSelector((state) => state.popUpSlice);
  const functionSlice = useSelector((state) => state.functionSlice);

  const { getEmployementDetails } = apiSlice[0];
  const { closeEmploymentViewModel } = functionSlice[0];

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const columns = [
    {
      field: "approvedOn",
      headerName: "Approved On",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "description",
      headerName: "Description name",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "month",
      headerName: "Month",
      type: "number",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "year",
      headerName: "Year",
      type: "string",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
  ];

  const [expanded, setExpanded] = useState(false);
  const [dob, setDob] = useState();
  const [fatherName, setFatherName] = useState();
  const [fullName, setFullName] = useState();
  const [pfUan, setPfUan] = useState();
  const [companies, setCompanies] = useState();

  const { showErrorMessage } = popUpSlice[0];

  const setTableRows = async (appointeeId) => {
    const response = await getEmployementDetails(appointeeId);
    const { dob, fatherName, fullName, pfUan, companies } =
      response.responseInfo;
    if (pfUan && companies) {
      dob ? setDob(dob) : setDob(NA);
      fatherName ? setFatherName(fatherName) : setFatherName(NA);
      fullName ? setFullName(fullName) : setFullName(NA);
      pfUan ? setPfUan(pfUan) : setPfUan(NA);
      companies && companies[0] ? setCompanies(companies) : setCompanies(NA);
    } else {
      closeEmploymentViewModel();
      showErrorMessage(noPassBookMsg);
    }
  };
  const handleDownload = async () => {
    var date = moment();
    var currentDate = date.format("DDMMYYYY");
    const personalInfo = {
      name: fullName,
      fathersName: fatherName,
      dob: dob,
      uanNumber: pfUan,
      otherInfo:""
    }
    const tableObj = {
      companyData: companies,
      personalData: personalInfo,
      fileName: `_Employment_History_${currentDate}`,
      label: "Employment History",

    };
    jsPDFEmploymentHistTemplate({ tableObj });
  };
  const downloadFabProps = new FabIconPropsModel(
    _addFabStyle,
    handleDownload,
    "primary",
    "download",
    <DownloadIcon />,
    "Employement Report"
  );
  useEffect(() => {
    setTableRows(appointeeId);
  }, []);
  return (
    <Box bgcolor={"#E2E8F0"} sx={{ position: "relative", width: "100%", height: "100%" }}>
      <Box sx={gridContainerStyle}>
        <Stack sx={floatingIconListStyle}>
          <FabIcon
            props={{
              ...downloadFabProps,
              selectedIndex: 1,
              index: 1,
              placement: "left-end",
              size: "small",
            }}
          />
        </Stack>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12} letterSpacing={12}>
            <Box sx={cardStyle}>
              <Stack sx={listHeadingConteinerStyle}>
                <Typography sx={listHeadingStyle}>
                  Personal Information
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <PersonalInformation fieldName={"Name"} fieldValue={fullName} />

                <PersonalInformation
                  fieldName={"Date of Birth"}
                  fieldValue={dob}
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <PersonalInformation
                  fieldName={"Father's Name"}
                  fieldValue={fatherName}
                />
                <PersonalInformation
                  fieldName={"UAN Number"}
                  fieldValue={pfUan}
                />
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12} md={12} letterSpacing={12}>
            <Box sx={cardStyle}>
              <Stack sx={listHeadingConteinerStyle}>
                <Typography sx={listHeadingStyle}>
                  Company Information
                </Typography>
              </Stack>
              {companies &&
                companies.map((companyitem, index) => (
                  <Accordion
                    key={index}
                    expanded={expanded === "panel1"}
                    onChange={handleChange("panel1")}
                  >
                    <Card>

                      <Grid item xs={12} md={12} letterSpacing={12}>
                        <Box>
                          <>
                            <Stack direction="row" spacing={2}>
                              <PersonalInformation
                                fieldName={"Company Name"}
                                fieldValue={companyitem.companyName}
                              />
                              <PersonalInformation
                                fieldName={"Pf Account for"}
                                fieldValue={
                                  `${companyitem.workForYear} year ${companyitem.workForMonth} month `
                                }
                              />
                            </Stack>
                            <Stack direction="row" spacing={2}>
                              <PersonalInformation
                                fieldName={"First Transaction Year"}
                                fieldValue={companyitem.firstTransactionYear}
                              />
                              <PersonalInformation
                                fieldName={"First Transaction Month"}
                                fieldValue={companyitem.firstTransactionMonth}
                              />
                            </Stack>
                            <Stack direction="row" spacing={2}>
                              <PersonalInformation
                                fieldName={"Last Transaction Year"}
                                fieldValue={companyitem.lastTransactionYear}
                              />
                              <PersonalInformation
                                fieldName={"Last Transaction Month"}
                                fieldValue={companyitem.lastTransactionMonth}
                              />
                            </Stack>
                            <Stack direction="row" spacing={2}>
                              <PersonalInformation
                                fieldName={"First Transaction Approved at"}
                                fieldValue={companyitem.firstTransactionApprovedOn}
                              />
                              <PersonalInformation
                                fieldName={"Last Transaction Approved at"}
                                fieldValue={
                                  companyitem.lastTransactionApprovedOn
                                }
                              />
                            </Stack>
                          </>
                        </Box>
                      </Grid>
                    </Card>
                  </Accordion>
                ))}

            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const UnWrappedEmploymentView = (props) => {
  return (
    <FullScreenModel
      open={props.openView}
      fullScreen={true}
      closeModel={props.closeViewModel}
      content={<EmploymentViewDetails {...props} />}
    />
  );
};

const EmploymentView = ActionPermission(UnWrappedEmploymentView);

export default EmploymentView;
