import {
  Grid,
  Typography,
  Accordion,
  Card,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/system";
import FullScreenModel from "shared/utils/models/fullscreen-modal";

import {
  cardStyle,
  gridContainerStyle,
  listHeadingConteinerStyle,
  listHeadingStyle,
} from "app";
import { NA, noPassBookMsg } from "shared/constants/constants";
import ActionPermission from "shared/components/action-permission/action-permission";
import { PersonalInformation } from "shared/components/display-information/personal-information";
import { useSelector } from "react-redux";
import { DateFormatYYYYMMDD } from "shared/utils";

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
      headerName: "Pension",
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
    const response = await getPassbookDetails(appointeeId);
    const { dob, fatherName, fullName, pfUan, companies } =
      response.responseInfo;

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
  useEffect(() => {
    setTableRows(appointeeId);
  }, []);
  return (
    <Box bgcolor={"#E2E8F0"} sx={{ position: "relative", width: "100%" }}>
      <Box sx={gridContainerStyle}>
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
                    expanded={expanded === "panel1"}
                    onChange={handleChange("panel1")}
                  >
                    <Card>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <Grid item xs={12} md={12} letterSpacing={12}>
                          <Box>
                            <>
                              <Stack direction="row" spacing={2}>
                                <PersonalInformation
                                  fieldName={"Company Name"}
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
                              </Stack><Stack direction="row" spacing={2}>
                                <PersonalInformation
                                  fieldName={"Pension Gap Identified"}
                                  fieldValue={companyitem.isPensionGap}
                                />
                                {/* <PersonalInformation
                                  fieldName={"Last Pension Date"}
                                  fieldValue={companyitem.lastPensionDate}
                                /> */}
                              </Stack>
                            </>
                          </Box>
                        </Grid>
                      </AccordionSummary>
                    </Card>
                    <AccordionDetails>
                      <Box sx={{ height: 400, width: "100%" }}>
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
