import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  generateProcessingAppointeeReportDesc,
  processingListPdfTableHeadCell,
  processingListTableHeadCell,
  toProcessing,
  reportGenarate
} from "shared/constants/constants";
import {
  CardLayout,
  CreatePdfTableBody,
  DataTable,
  DateFormatYYYYMMDD,
  PageLayout,
  generateTableRowData,
} from "shared/utils";
import { removeActionRoute } from "store/slices/action-route-slice";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { inputFieldStyleAdded, primaryFabStyle,ResponsiveFab } from "app";
import { Download, Refresh, Search } from "@mui/icons-material";
import DatePicker from "shared/utils/date-picker/date-picker";
import DarkTooltip from "shared/utils/tooltip/dark-tooltip";
import ActionPermission from "shared/components/action-permission/action-permission";
import moment from "moment";
import jsPDFReportDataTemplate from "shared/utils/associate/js-pdf-report";

const UnWrappedProcessing = (props) => {
  const { hasPermission } = props;
  const { state } = useLocation();
  const popUpSlice = useSelector((state) => state.popUpSlice);
  const {showErrorMessage} =popUpSlice[0]
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

  const [responseList, setResponseList] = useState();

  let [payLoad, setPayLoad] = useState({
    isFiltered: state && state.dayRangePayLoad ? true : false,
    noOfDays: state && state.dayRangePayLoad ? state.dayRangePayLoad : 0,
    filterType: state && state.filterType,
    appointeeName: state && state.appointeeName,
    companyId: companyId,
    candidateId: state && state.candidateId,
    statusCode: statusCode,
    fromDate: fromDate && DateFormatYYYYMMDD(fromDate?.toString()),
    toDate: toDate && DateFormatYYYYMMDD(toDate?.toString()),
  });

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

  // const handleDownload = () => {
  //   const tableHeadList = processingListPdfTableHeadCell.map(({ label }) => {
  //     return {
  //       title: label,
  //     };
  //   });
  //   const tableBodyList = responseList && responseList.map(
  //     (tableRows) => {
  //       return CreatePdfTableBody(tableRows, processingListPdfTableHeadCell);
  //     }
  //   );

  //   const tableObj = {
  //     headerList: tableHeadList,
  //     rows: tableBodyList,
  //     fileName: `_Processing_List_${currentDate}`,
  //     label: "Processing List",
  //     fromDate: fromDate,
  //     toDate: toDate,
  //     tableName: "Appointee details",
  //     rptDesc: generateProcessingAppointeeReportDesc
  //   };

  //   jsPDFReportTemplate({ tableObj });
  // };
  const handleDownload = () => {
    if(!responseList || responseList.length === 0){
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
    });
  };
  const clearSearch = () => {
    setFromDate(null);
    setToDate(null);
    setStatusCode("All");
    const payLoad = {
      isFiltered: false,
      noOfDays: 0,
      filterType: null,
      appointeeName: null,
      candidateId: null,
      companyId: companyId,
      isPfRequired: null
    };
    setTableRows(payLoad);
    navigateTo(toProcessing, { state: false });
  };

  const handleSearch = () => {
    setTableRows(payLoad);
  };
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(removeActionRoute());
    if (actionRouteSlice.length === 0 && hasPermission) {
      setTableRows(payLoad);
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

  return (
    <PageLayout pageName={pageName}>
      <CardLayout>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <DatePicker
              label={"From Date"}
              value={fromDate}
              maxDate={toDate}
              setValue={setFromDate}
              disableFuture={true}
            />
          </Grid>
          <Grid item xs={3}>
            <DatePicker
              label={"To Date"}
              value={toDate}
              minDate={fromDate}
              setValue={setToDate}
              disableFuture={true}
            />
          </Grid>
          <Grid item xs={2}>
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

          <Grid item xs={4}>
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
            {hasPermission && hasPermission["A008"] && (
              <DarkTooltip placement="top" title={"Download"} arrow>
                <ResponsiveFab List
                  variant="contained"
                  size="small"
                  button={"N"}
                  onClick={handleDownload}
                  sx={primaryFabStyle}
                >
                  <Download width={18} sx={{ color: "#fff" }} />
                </ResponsiveFab>
              </DarkTooltip>
            )}
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
