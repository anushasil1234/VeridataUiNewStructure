import {
  Assessment,
  Download,
  Refresh,
  Search,
  Summarize,
} from "@mui/icons-material";
import {
  Fab,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItemButton,
  MenuItem,
  Select,
  TextField,
  Box
} from "@mui/material";
import {
  backgroundOverLay,
  downLoadListSx,
  inputFieldStyleAdded,
  inputPropsStyle,
  primaryFabStyle,
  ResponsiveFab,
  datePickerstyle
} from "app";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  appointeeCountDetailsHeadCell,
  appointeeCountHeadCell,
  generateAppointeeCountReportDesc,
  toAppointeecount,
} from "shared/constants/constants";
import {
  CardLayout,
  CreatePdfTableBody,
  DateFormatYYYYMMDD,
  PageLayout,
  generateTableRowData,
  hasValue,
} from "shared/utils";
import { CollapsibleDataTable } from "shared/utils/dataTable/collapsable-datatable";
import DatePicker from "shared/utils/date-picker/date-picker";
import DarkTooltip from "shared/utils/tooltip/dark-tooltip";
import jsPDFReportTemplate from "shared/utils/associate/js-pdf-invoice";
import moment from "moment";

const AppointeeCount = () => {

  const apiSlice = useSelector((state) => state.apiSlice);
  const dropdownList = useSelector((state) => state.dropdownList);
  const commonHooksFunctionSlice = useSelector((state) => state.commonHooksFunctionSlice);

  const { navigateTo } = commonHooksFunctionSlice[0];

  const { getAppointeeCounterReport } = apiSlice[0];
  const { reportFilterStatusList, entityList } = dropdownList && dropdownList.length > 0 && dropdownList[0];
  const [toDate, setToDate] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [rows, setRows] = useState();
  const [appointeeCountDateWises, setAppointeeCountDateWises] = useState();
  const [appointeeCountListDetails, setAppointeeCountListDetails] = useState();
  const [isDownloadListOpened, setIsDownloadListOpened] = useState(false);

  const [appointeeName, setAppointeeName] = useState(null);
  const [statusCode, setStatusCode] = useState(null);
  const [entityId, setEntityId] = useState([]);



  const payLoadData = {
    appointeeName: appointeeName,
    statusCode: statusCode ? statusCode.toString() : statusCode,
    fromDate: fromDate ? DateFormatYYYYMMDD(fromDate?.toString()) : fromDate,
    toDate: toDate ? DateFormatYYYYMMDD(toDate?.toString()) : toDate,
    entityId :entityId

  };
  let [payLoad, setPayLoad] = useState(payLoadData);

  const fetchTableRows = async ({ appointeeName, statusCode, fromDate, toDate,entityId }) => {
    payLoad = {
      appointeeName: appointeeName,
      statusCode: hasValue(statusCode) ? statusCode.toString() : null,
      fromDate: hasValue(fromDate) ? DateFormatYYYYMMDD(fromDate?.toString()) : null,
      toDate: hasValue(toDate) ? DateFormatYYYYMMDD(toDate?.toString()) : null,
      entityId : entityId.length ? entityId : [],
    };
    const response = await getAppointeeCounterReport(payLoad);

    if (response) {
      const { responseInfo } = response;
      const { appointeeCountDateWises, appointeeCountListDetails } =
        responseInfo;
      setAppointeeCountDateWises(appointeeCountDateWises);
      setAppointeeCountListDetails(appointeeCountListDetails);
      let generatedCells = generateTableRowData(
        appointeeCountDateWises,
        appointeeCountHeadCell,
        null,
        null,
        null,
        "appointeeTotalCount"
      );
      appointeeCountDateWises && appointeeCountDateWises.forEach(({ appointeeCountDetails }, index) => {
        const detailsCells = generateTableRowData(
          appointeeCountDetails,
          appointeeCountDetailsHeadCell,
          null
        );
        generatedCells[index].detailsCells = detailsCells;
      });
      setRows({
        tableHead: appointeeCountHeadCell,
        tableRows: generatedCells,
      });
    }
  };


  useEffect(() => {
    setAppointeeName(appointeeName);
    setStatusCode(statusCode);
    setFromDate(fromDate);
    setToDate(toDate);
    setEntityId(entityId);

  }, [appointeeName, statusCode, fromDate, toDate, entityId]);

  const handleClickOnDownload = () => {
    setIsDownloadListOpened(!isDownloadListOpened);
  };
  var date = moment();
  var currentDate = date.format("DDMMYYYY");

  const handleAppointeeCountDownload = () => {

    const tableHeadList = appointeeCountHeadCell.map(({ label }) => {
      return {
        title: label,
      };
    });
    const tableBodyList = appointeeCountDateWises && appointeeCountDateWises.map(
      ({ appointeeTotalCount }) => {
        return CreatePdfTableBody(appointeeTotalCount, appointeeCountHeadCell);
      }
    );
    const tableObj = {
      headerList: tableHeadList,
      rows: tableBodyList,
      fileName: `_Appointee_Count_${currentDate}`,
      label: "Appointee Count",
      tableName: "Count Details",
      fromDate: fromDate,
      toDate: toDate,
      rptDesc: generateAppointeeCountReportDesc
    };

    jsPDFReportTemplate({ tableObj });
  };

  const handleAppointeeDetailsDownload = () => {
    const tableHeadList = appointeeCountDetailsHeadCell.map(({ label }) => {
      return {
        title: label,
      };
    });
    const tableBodyList = appointeeCountListDetails.map((appointeeCount) => {
      return CreatePdfTableBody(appointeeCount, appointeeCountDetailsHeadCell);
    });

    const tableObj = {
      headerList: tableHeadList,
      rows: tableBodyList,
      fileName: `_Appointee_Details_Count_${currentDate}`,
      label: "Appointee Details Count",
      tableName: "Appointee Details",
      fromDate: fromDate,
      toDate: toDate,
      rptDesc: generateAppointeeCountReportDesc
    };

    jsPDFReportTemplate({ tableObj });
  };

  const handleSearch = () => {

    const payLoad = {
      appointeeName: appointeeName?appointeeName.trim() : "",
      statusCode: statusCode ? statusCode.toString() : "",
      fromDate: fromDate ? DateFormatYYYYMMDD(fromDate) : null,
      toDate: toDate ? DateFormatYYYYMMDD(toDate) : null,
      entityId: entityId || null,
    };
    fetchTableRows(payLoad);
  };
  const clearSearch = () => {
    setFromDate(null);
    setToDate(null);
    setStatusCode(null);
    setEntityId([]);
    const clearPayLoad = {
      appointeeName:null,
      fromDate: null,
      toDate: null,
      statusCode: null,
      entityId:[],
    };
    fetchTableRows(clearPayLoad);

    navigateTo(toAppointeecount, { state: false });
  };


  useEffect(() => {
    handleSearch()
  }, []);
  return (
    <PageLayout pageName={"Appointee count"}>
      <CardLayout sx={{ width: "100%" }}>
        <Grid container spacing={2}>
          <Grid item xs={4} >
            <Box sx={{...datePickerstyle}}>
              <DatePicker
                label={"From Date"}
                value={fromDate}
                maxDate={toDate}
                setValue={setFromDate}
                disableFuture={true}
              />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{...datePickerstyle}}>
              <DatePicker
                label={"To Date"}
                clearable
                value={toDate}
                minDate={fromDate}
                setValue={setToDate}
                disableFuture={true}
              />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <FormControl sx={{ width: "100%" }} size="large">
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              {statusCode !== undefined &&
                <Select
                  error={false}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  className="customeTextField"
                  sx={inputFieldStyleAdded}
                  value={statusCode}
                  label="Status"
                  inputProps={{
                    style: inputPropsStyle
                  }}
                  defaultValue={""}
                  onChange={(e) => { setStatusCode(e.target.value) }}
                >
                  {reportFilterStatusList &&
                    reportFilterStatusList.map((element, index) => {
                      return (
                        <MenuItem
                          key={index}
                          value={element.code}
                        >{`${element.value}`}</MenuItem>
                      );
                    })}
                </Select>}
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl sx={{ width: "100%" }} size="large">

              <InputLabel id="demo-simple-select-label">Entity</InputLabel>
              {statusCode !== undefined &&
                <Select
                  error={false}
                   labelId="demo-multiple-select-label"
                  id="demo-multiple-select"
                  className="customeTextField"
                  sx={inputFieldStyleAdded}
                    multiple
                  value={entityId}
                  label="entityId"
                  inputProps={{
                    style: inputPropsStyle
                  }}
                  defaultValue={[]}
                  onChange={(e) => {
                    setEntityId(e.target.value)
                  }}
                >
                  {entityList &&
                    entityList.map((element, index) => {
                      return (
                        <MenuItem
                          key={index}
                          value={element.id}
                        >{`${element.value}`}</MenuItem>
                      );
                    })}
                </Select>}
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <TextField
              error={/[^\w\s]/.test(appointeeName)}
              style={inputFieldStyleAdded}
              type="text"
              className="customeTextField"
              variant="outlined"
              onChange={(e) => {
                const value = e.target.value;
                const isValid = /^[a-zA-Z\s]*$/.test(value);
                if (isValid) {
                  setAppointeeName(value);
                }
              }}
              value={appointeeName || ""}
              inputStyle={{ padding: 0 }}
              inputProps={{
                style: inputPropsStyle,
              }}
              label={"Appointee Name"}
              defaultValue={""}
              multiline

            />
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
              <DarkTooltip placement="top" title={"Search"} arrow>
                <ResponsiveFab
                  variant="contained"
                  size="small"
                  button={"N"}
                  onClick={handleSearch}
                  sx={primaryFabStyle}
                >
                  <Search width={18} sx={{ color: "#fff" }} />
                </ResponsiveFab>
              </DarkTooltip>
              <DarkTooltip placement="top" title={"Clear Search"} arrow>
                <ResponsiveFab
                  variant="contained"
                  size="small"
                  button={"N"}
                  onClick={clearSearch}
                  sx={primaryFabStyle}
                >
                  <Refresh width={18} sx={{ color: "#fff" }} />
                </ResponsiveFab>
              </DarkTooltip>
              <Box sx={{ position: 'relative' }}>
                <DarkTooltip placement="top" title={"Download Report"} arrow>
                  <ResponsiveFab
                    variant="contained"
                    size="small"
                    button={"N"}
                    onClick={handleClickOnDownload}
                    sx={primaryFabStyle}
                  >
                    <Download width={18} />
                  </ResponsiveFab>
                </DarkTooltip>
                {isDownloadListOpened && (
                  <List sx={downLoadListSx}>
                    <ListItemButton component="a">
                      <DarkTooltip
                        placement="top"
                        title={"Download AppointeeCount"}
                        arrow
                      >
                        <ResponsiveFab
                          variant="contained"
                          size="small"
                          button={"N"}
                          onClick={handleAppointeeCountDownload}
                          sx={primaryFabStyle}
                        >
                          <Summarize width={18} />
                        </ResponsiveFab>
                      </DarkTooltip>
                    </ListItemButton>
                    <ListItemButton component="a">
                      <DarkTooltip
                        placement="top"
                        title={"Download Appointee Details Count"}
                        arrow
                      >
                        <ResponsiveFab
                          variant="contained"
                          size="small"
                          button={"N"}
                          onClick={handleAppointeeDetailsDownload}
                          sx={primaryFabStyle}
                        >
                          <Assessment width={18} />
                        </ResponsiveFab>
                      </DarkTooltip>
                    </ListItemButton>
                  </List>
                )}
              </Box>
            </Box>
          </Grid>

        </Grid>
        <CollapsibleDataTable
          headCells={appointeeCountHeadCell}
          rows={rows}
          detailsHeadCells={appointeeCountDetailsHeadCell}
          detailsTableName={"Details"}
        />
      </CardLayout>
    </PageLayout>
  );

};

export default AppointeeCount;
