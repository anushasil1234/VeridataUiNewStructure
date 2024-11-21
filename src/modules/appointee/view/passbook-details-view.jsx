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
import { Box, padding, Stack } from "@mui/system";
import FullScreenModel from "shared/utils/models/fullscreen-modal";
import DownloadIcon from "@mui/icons-material/Download";

import {
  _addFabStyle,
  cardStyle,
  floatingIconListStyle,
  gridContainerStyle,
  listHeadingConteinerStyle,
  listHeadingStyle,
  primaryFabStyle,
} from "app";
import {
  generateEmploymentHistoryReportDesc,
  generatePassbookDetailsReportDesc,
  NA,
  noPassBookMsg,
} from "shared/constants/constants";
import ActionPermission from "shared/components/action-permission/action-permission";
import { PersonalInformation } from "shared/components/display-information/personal-information";
import { useSelector } from "react-redux";
import { DateFormatYYYYMMDD, FabIcon } from "shared/utils";
import jsPDFEmploymentHistTemplate from "shared/utils/associate/js-pdf-employmenthist";
import FabIconPropsModel from "shared/utils/fab-icon/fab-icon-model";
import moment from "moment";
import jsPDFReportDataTemplate from "shared/utils/associate/js-pdf-report";
import DarkTooltip from "shared/utils/tooltip/dark-tooltip";

let PassbookViewDetails = ({ appointeeId }) => {
  const apiSlice = useSelector((state) => state.apiSlice);
  const popUpSlice = useSelector((state) => state.popUpSlice);
  const functionSlice = useSelector((state) => state.functionSlice);

  const { getPassbookDetails } = apiSlice[0];
  const { closePassbookViewModel } = functionSlice[0];

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
    {
      field: "ispensionContributed",
      headerName: "Pension Contributed",
      type: "string",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
  ];
  // const passbookTableHeadCell = [
  //   {
  //     type: "string",
  //     label: "Approved On",
  //     enums: ["approvedOn"],
  //   },
  //   {
  //     type: "string",
  //     label: "Description name",
  //     enums: ["description"],
  //   },
  //   {
  //     type: "string",
  //     label: "Month",
  //     enums: ["month"],
  //   },
  //   {
  //     type: "string",
  //     label: "Year",
  //     enums: ["year"],
  //   },
  //   {
  //     type: "string",
  //     label: "Pension Contributed",
  //     enums: ["ispensionContributed"],
  //   },
  // ];

  const [expanded, setExpanded] = useState(false);
  const [dob, setDob] = useState();
  const [fatherName, setFatherName] = useState();
  const [fullName, setFullName] = useState();
  const [pfUan, setPfUan] = useState();
  const [companies, setCompanies] = useState();
  const [responseInfo, setResponseInfo] = useState([]);

  const { showErrorMessage } = popUpSlice[0];

  const setTableRows = async (appointeeId) => {
    const response = await getPassbookDetails(appointeeId);
    console.log("passbookDetails", response);

    const { dob, fatherName, fullName, pfUan, companies } =
      response?.responseInfo || {};
    setResponseInfo(response?.responseInfo);
    if (pfUan && companies.length > 0) {
      dob ? setDob(dob) : setDob(NA);
      fatherName ? setFatherName(fatherName) : setFatherName(NA);
      fullName ? setFullName(fullName) : setFullName(NA);
      pfUan ? setPfUan(pfUan) : setPfUan(NA);
      companies && companies[0] ? setCompanies(companies) : setCompanies(NA);
    } else {
      closePassbookViewModel();
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
      otherInfo: "",
    };
    const tableObj = {
      companyData: companies,
      personalData: personalInfo,
      fileName: `_Employment_History_${currentDate}`,
      label: "Employment History",
    };
    // jsPDFEmploymentHistTemplate({ tableObj });
    console.log("resposneInfo1111", responseInfo);
    jsPDFReportDataTemplate({
      reportDetails: {
        fileName: `_Passbook_Details_${currentDate}`,
        label: "Passbook Details",
        // fromDate: '',
        //toDate: "",
        rptDesc: generatePassbookDetailsReportDesc,
      },
      responseInfo: responseInfo,
      empFlag : false,
      clientDetailsFlag: true
    });
  };

  const downloadFabProps = new FabIconPropsModel(
    _addFabStyle,
    handleDownload,
    "primary",
    "download",
    <DownloadIcon />,
    "Passbook Report"
  );
  //console.log('envvar',process.env.REACT_APP_COMPANY_NAME)
  useEffect(() => {
    setTableRows(appointeeId);
  }, []);
  return (
    <Box bgcolor={"#E2E8F0"} sx={{ position: "relative", width: "100%" }}>
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
                companies?.map((companyitem, index) => (
                  <Accordion
                    key={index}
                    expanded={expanded === index}
                    onChange={handleChange(index)}
                  >
                    <Card>
                      <AccordionSummary
                        // expandIcon={<ExpandMoreIcon />}
                        expandIcon={
                          <DarkTooltip placement="top" title={expanded === index ? "Hide Details" : "Expand to View Details"} arrow>
                            <Fab
                              variant="contained"
                              size="small"
                              // onClick={handleOpenModal} // Open modal on click
                              //sx={primaryFabStyle}
                              sx={{ ...primaryFabStyle}}
                            >
                              <ExpandMoreIcon />
                            </Fab>
                          </DarkTooltip>
                        }
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <Grid item xs={12} md={12} letterSpacing={12}>
                          <Box
                            sx={{
                              mb: 1,
                              mt: 1,
                              p: 2,
                              border: "1px solid #ddd",
                              borderRadius: "8px",
                              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Adds a subtle shadow
                            }}
                          >
                            <>
                              <Stack direction="row" spacing={2}>
                                <PersonalInformation
                                  fieldName={`Company ${index+1} Name`}
                                  fieldValue={companyitem.companyName}
                                />
                                <PersonalInformation
                                  fieldName={"Last Transaction Approved at"}
                                  fieldValue={
                                    companyitem.lastTransactionApprovedOn
                                  }
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
                                  fieldName={"Is Pension Applicable"}
                                  fieldValue={companyitem.isPensionApplicable}
                                />
                                <PersonalInformation
                                  fieldName={"Last Pension Date"}
                                  fieldValue={companyitem.lastPensionDate}
                                />
                              </Stack>
                              <Stack
                                direction="row"
                                spacing={2}
                                style={{ width: "50%" }}
                              >
                                <PersonalInformation
                                  fieldName={"Pension Gap Identified"}
                                  fieldValue={companyitem.isPensionGap}
                                />
                              </Stack>
                            </>
                          </Box>
                        </Grid>
                      </AccordionSummary>
                    </Card>
                    <AccordionDetails>
                      <Box sx={{ height: 400, width: "100%", mt: "20px" }}>
                        <Stack>
                          <DataGrid
                            rows={companyitem.passbook}
                            columns={columns}
                            initialState={{
                              pagination: {
                                paginationModel: {
                                  pageSize: 5,
                                },
                              },
                            }}
                            pageSizeOptions={[5]}
                            disableRowSelectionOnClick
                          />
                        </Stack>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const UnWrappedPassbookView = (props) => {
  return (
    <FullScreenModel
      headerText={"EPFO Passbook Details"}
      open={props.openView}
      fullScreen={true}
      closeModel={props.closeViewModel}
      content={<PassbookViewDetails {...props} />}
    />
  );
};

const PassbookView = ActionPermission(UnWrappedPassbookView);

export default PassbookView;
