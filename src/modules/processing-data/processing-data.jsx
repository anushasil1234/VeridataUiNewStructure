import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  generateProcessingAppointeeReportDesc,
  processingListPdfTableHeadCell,
  processingListTableHeadCell,
  toProcessing,
  reportGenarate,
  issueFilterList,
  uploadedFromDateEmptyMsg,
  FromDateEmptyMsg
} from "shared/constants/constants";
import {
  CardLayout,
  CreatePdfTableBody,
  DataTable,
  DateFormatYYYYMMDD,
  PageLayout,
  generateTableRowData,
  hasValue,
} from "shared/utils";
import { removeActionRoute } from "store/slices/action-route-slice";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItemButton,
  MenuItem,
  Select,
} from "@mui/material";
import { inputFieldStyleAdded, primaryFabStyle, ResponsiveFab, downLoadListSx, datePickerstyle } from "app";
import { Assessment, Download, Info, Refresh, Search, Summarize } from "@mui/icons-material";
import DatePicker from "shared/utils/date-picker/date-picker";
import DarkTooltip from "shared/utils/tooltip/dark-tooltip";
import ActionPermission from "shared/components/action-permission/action-permission";
import moment from "moment";
import jsPDFReportDataTemplate from "shared/utils/associate/js-pdf-report";
import ArticleIcon from '@mui/icons-material/Article';
import Button from '@mui/material/Button';
import downloadFile from "shared/utils/associate/download-file";
import generateBlobFromBase64 from "shared/utils/associate/generateBlob";
const UnWrappedProcessing = (props) => {
  const { hasPermission } = props;
 
  const { state } = useLocation();
 
  const popUpSlice = useSelector((state) => state.popUpSlice);
  const { showErrorMessage } = popUpSlice[0]
  let noOfDays = 0;
  let isFiltered = false;

  const apiSlice = useSelector((state) => state.apiSlice);
  const actionRouteSlice = useSelector((state) => state.actionRouteSlice);
  const loggedInData = useSelector((state) => state.loggedInData);
  const commonHooksFunctionSlice = useSelector(
    (state) => state.commonHooksFunctionSlice
  );

  const { companyId } = loggedInData[0];
  const { getProessingDataList } = apiSlice[0];
  const { GetUnderProcessReport } = apiSlice[0];
  const { navigateTo } = commonHooksFunctionSlice[0];

  if (state) {
    if (state.dayRangePayLoad) {
      noOfDays = state.dayRangePayLoad;
      isFiltered = true;
    }
  }
  let _fromday;
  let _today;
  if (noOfDays > 0) {
    const now = new Date();
    _fromday = dayjs(new Date(now.setDate(now.getDate() - noOfDays)));
    _today = dayjs(new Date());
  }

  const [pageName, setPageName] = useState(null);
  const [rows, setRows] = useState([]);
  const [toDate, setToDate] = useState(_today);
  const [fromDate, setFromDate] = useState(_fromday);
  const [statusCode, setStatusCode] = useState("All");
  const [passbookStatus, setPassbookStatus] = useState('All');
  const [responseList, setResponseList] = useState();
  const [isDownloadListOpened, setIsDownloadListOpened] = useState(false);
  const [issueFilter, setIssueFilter] = useState("All");

  let defaultPayload = {
    isFiltered: state && state.dayRangePayLoad ? true : false,
    noOfDays: state && state.dayRangePayLoad ? state.dayRangePayLoad : 0,
    filterType: state && state.filterType,
    appointeeName: state && state.appointeeName,
    companyId: companyId,
    candidateId: state && state.candidateId,
    statusCode: statusCode,
    fromDate: fromDate && DateFormatYYYYMMDD(fromDate?.toString()),
    toDate: toDate && DateFormatYYYYMMDD(toDate?.toString()),
    IsManualPassbook: null,
  };
  const [payLoad, setPayLoad] = useState(defaultPayload)
  const handleDownloade = (rf) => {
    if (rf.fileData && typeof rf.fileData === 'string') {
      const base64String = rf.fileData;
      const fileName = rf.fileName || "appointee_data.xlsx";
      const blob = generateBlobFromBase64(base64String);
      const blobUrl = window.URL.createObjectURL(blob);
      downloadFile(blobUrl, fileName);
      window.URL.revokeObjectURL(blobUrl);
    }
  };
  const handleClick = async () => {
    const response = await GetUnderProcessReport(payLoad);
    if (response) {
      const { responseInfo } = response;
      handleDownloade(responseInfo);
    }
  };

  const setTableRows = async (payLoad) => {
    let currPageName = "Processing List";
    currPageName =
      state && state.filterType === "NORES" ? "No Response List" : currPageName;
    setPageName(
      isFiltered === true && noOfDays > 0
        ? `${currPageName}`
        : `${currPageName}`
    );
    const response = await getProessingDataList(payLoad);
    if (response) {
      const { responseInfos } = response;
      setResponseList(responseInfos);
      let generatedCells = generateTableRowData(
        responseInfos,
        processingListTableHeadCell,
        null,
        hasPermission
      );
      setRows({
        tableHead: processingListTableHeadCell,
        tableRows: generatedCells,
      });

    }
  };


  var date = moment();
  var currentDate = date.format("DDMMYYYY");

  const handleDownload = () => {
    if (!responseList || responseList.length === 0) {
      showErrorMessage(reportGenarate)
      return;
    }
    const tableHeadList = processingListPdfTableHeadCell.map(({ label }) => {
      return {
        title: label,
      };
    });

    const tableBodyList = responseList && responseList.map((tableRows) => {
      return CreatePdfTableBody(tableRows, processingListPdfTableHeadCell);
    });

    const tableObj = {
      headerList: tableHeadList,
      rows: tableBodyList,
    };

    // Call jsPDFReportTemplate with tableObj
    jsPDFReportDataTemplate({
      reportDetails: {
        fileName: `_Processing_List_${currentDate}`,
        label: "Processing List",
        fromDate: fromDate,
        toDate: toDate,
        rptDesc: generateProcessingAppointeeReportDesc,
        companyName: "PWC REPORT", // or use a dynamic company name
      },
      tables: [tableObj],
      //clientDetailsFlag : false
    });
  };
  const clearSearch = () => {
    setFromDate(null);
    setToDate(null);
    setStatusCode("All");
    setPassbookStatus("All");
    setIssueFilter("All");
    
    const resetPayLoad = {
      isFiltered: false,
      noOfDays: 0,
      filterType: null,
      appointeeName: null,
      candidateId: null,
      companyId: companyId,
      isPfRequired: null,
      IsManualPassbook: null,
      IssueFilter: null,
    };
    
    setPayLoad(resetPayLoad);
    setTableRows(resetPayLoad);
    navigateTo(toProcessing, { state: false });
  };
  
  const handleExalListDownload = () => {
    setIsDownloadListOpened(!isDownloadListOpened)
  }
  const handleSearch = () => {
    // if (!hasValue (fromDate)) {
    //   showErrorMessage(FromDateEmptyMsg);
    //   return;
    // }
    setTableRows(payLoad);
  };
  

  const handleIssueChange = ({ target }) => {
    const { value } = target;
    setIssueFilter(value);
    const _issueFilter = value === "All" ? null : value;
    const _payload = { ...payLoad, IssueFilter: _issueFilter };
    setPayLoad(_payload);
  }
  const dispatch = useDispatch();
  const handlePassbookStatusChange = async (e) => {
    const { value } = e.target;  
    const parsedValue = value === "All" 
      ? null 
      : value === "true" 
        ? true 
        : value === "false" 
          ? false 
          : null;
  
    setPassbookStatus(value);
  
    const updatedPayLoad = {
      ...payLoad,
      IsManualPassbook: parsedValue,
    };
  
    setPayLoad(updatedPayLoad);
  };
  
  

  useEffect(() => {
    dispatch(removeActionRoute());
    if (actionRouteSlice.length === 0 && hasPermission) {
      setTableRows(defaultPayload);
    }
  }, [state, actionRouteSlice, hasPermission]);



  useEffect(() => {
    const _payLoad = {
      ...payLoad,
      statusCode: statusCode,
      fromDate: DateFormatYYYYMMDD(fromDate?.toString()),
      toDate: DateFormatYYYYMMDD(toDate?.toString()),
    }
    setPayLoad(_payLoad);
  }, [statusCode, fromDate, toDate]);

  // useEffect(() => {
  //   payLoad.fromDate = DateFormatYYYYMMDD(fromDate?.toString());
  //   setPayLoad(payLoad);
  // }, [fromDate]);

  // useEffect(() => {
  //   payLoad.toDate = DateFormatYYYYMMDD(toDate?.toString());
  //   setPayLoad(payLoad);
  // }, [toDate]);
  const handelsearch=()=>{
    if (hasValue(toDate) && !hasValue(fromDate)) {
      showErrorMessage("From Date can not be empty");
    }else {
      handleSearch();
    }
  }
  return (
    <PageLayout pageName={pageName}>
      <CardLayout>
        <Grid container spacing={1} alignItems="center">

          <Grid item xs={12} sm={6} md={3} lg={3} spacing={1}>
            <Box sx={{ ...datePickerstyle }}>
              <DatePicker
                label={"From Date"}
                value={fromDate}
                maxDate={toDate}
                setValue={setFromDate}
                disableFuture={true}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3} spacing={1}>
            <Box sx={{ ...datePickerstyle }}>
              <DatePicker
                label={"To Date"}
                value={toDate}
                minDate={fromDate}
                setValue={setToDate}
                disableFuture={true}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3} lg={3} spacing={1}>
            <FormControl sx={{ width: "100%" }} size="large">
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              {statusCode !== undefined && (
                <Select
                  error={false}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  className="customeTextField"
                  sx={inputFieldStyleAdded}
                  defaultValue={"All"}
                  value={statusCode}
                  label="Status"
                  onChange={(e) => {
                    setStatusCode(e.target.value);
                  }}
                >
                  <MenuItem value={"All"}>Select All</MenuItem>
                  <MenuItem value={"0"}>No Response</MenuItem>
                  <MenuItem value={"1"}>Ongoing</MenuItem>
                  <MenuItem value={"2"}>Submitted</MenuItem>
                </Select>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3} spacing={1}>
            <FormControl sx={{ width: "100%" }} size="large">
              <InputLabel id="demo-select-small" >Verification Type</InputLabel>
              {passbookStatus !== undefined && (
                <Select
                  sx={{ height: '57px' }}
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={passbookStatus}
                  label="Passbook Status"
                  onChange={handlePassbookStatusChange}
                >
                  <MenuItem value={'All'}>Select All</MenuItem>
                  <MenuItem value="true">Manual</MenuItem>
                  <MenuItem value="false">Auto</MenuItem>
                </Select>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3} spacing={1}>
            <FormControl sx={{ width: "100%" }} size="large">
              <InputLabel id="demo-select-small" >Issue</InputLabel>
              <Select
                sx={{ height: '57px' }}
                labelId="demo-select-small"
                id="demo-select-small"
                value={issueFilter}
                label="Issue"
                onChange={handleIssueChange}
              >
                {/* <MenuItem value={'All'}>Select all</MenuItem> */}
                {issueFilterList.map(({ value, label }, index) => {
                  return (
                    <MenuItem key={index} value={value}>{label}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3} container alignItems="center" spacing={1}>
            <Grid item>
              <DarkTooltip placement="top" title={"Search"} arrow>
                <ResponsiveFab
                  variant="contained"
                  size="small"
                  button={"N"}
                  onClick={handelsearch}
                  sx={primaryFabStyle}
                >
                  <Search width={18} sx={{ color: "#fff" }} />
                </ResponsiveFab>
              </DarkTooltip>
            </Grid>
            <Grid item>
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
            </Grid>
            {hasPermission && hasPermission["A008"] && (
              <Grid item sx={{ position: 'relative' }}>
                <DarkTooltip placement="top" title={"Download Report"} arrow>
                  <ResponsiveFab
                    variant="contained"
                    size="small"
                    button={"N"}
                    onClick={handleExalListDownload}
                    sx={primaryFabStyle}
                  >
                    <Download width={18} sx={{ color: "#fff" }} />
                  </ResponsiveFab>
                </DarkTooltip>
                {isDownloadListOpened && (
                  <List
                    sx={{
                      ...downLoadListSx,
                      zIndex: 1000,
                    }}
                  >
                    <ListItemButton component="a" >
                      <DarkTooltip placement="top" title={"Download PDF Report"} arrow>
                        {/* <ResponsiveFab
                          variant="contained"
                          size="small"
                          button={"N"}
                          sx={primaryFabStyle}
                          onClick={handleDownload}
                        >
                          <Summarize width={18} sx={{ color: "#fff" }} />
                        </ResponsiveFab> */}
                        <Button variant="contained" onClick={handleDownload}>PDF</Button>
                      </DarkTooltip>
                    </ListItemButton>
                    <ListItemButton component="a">
                      <DarkTooltip placement="top" title={"Download XLSX Report"} arrow>
                        {/* <ResponsiveFab
                          variant="contained"
                          size="small"
                          button={"N"}
                          sx={primaryFabStyle}
                        >
                          <ArticleIcon width={18} sx={{ color: "#fff" }} />
                        </ResponsiveFab> */}
                        <Button variant="contained" onClick={handleClick}>XLSX</Button>
                      </DarkTooltip>
                    </ListItemButton>
                  </List>
                )}
              </Grid>
            )}
            <Grid item>
              <DarkTooltip placement="top" title={generateProcessingAppointeeReportDesc} arrow>
                <ResponsiveFab
                  variant="contained"
                  size="small"
                  button={"N"}
                //  onClick={clearSearch}
                  sx={primaryFabStyle}
                >
                  <Info width={18} sx={{ color: "#fff" }} />
                </ResponsiveFab>
              </DarkTooltip>
            </Grid>
          </Grid>
        </Grid>
        <DataTable
          rows={rows}
          setRows={setRows}
          headCells={processingListTableHeadCell}
        />
      </CardLayout>
    </PageLayout>
  );
};
const ProcessingData = ActionPermission(UnWrappedProcessing);
export default ProcessingData;
