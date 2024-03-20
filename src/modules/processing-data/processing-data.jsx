import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  processingListPdfTableHeadCell,
  processingListTableHeadCell,
  toProcessing,
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
  Fab,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { inputFieldStyleAdded, primaryFabStyle } from "app";
import { Download, Refresh, Search } from "@mui/icons-material";
import DatePicker from "shared/utils/date-picker/date-picker";
import DarkTooltip from "shared/utils/tooltip/dark-tooltip";
import ActionPermission from "shared/components/action-permission/action-permission";
import moment from "moment";
import jsPDFInvoiceTemplate from "shared/utils/associate/js-pdf-invoice";

const UnWrappedProcessing = (props) => {
  const { hasPermission } = props;
  const { state } = useLocation();

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
    statusCode:  statusCode,
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

  useEffect(() => {
    dispatch(removeActionRoute());
    if (actionRouteSlice.length === 0 && hasPermission) {
      setTableRows(payLoad);
    }
  }, [actionRouteSlice, state, hasPermission]);

  var date = moment();
  var currentDate = date.format("DDMMYYYY");

  const handleDownload = () => {
    const tableHeadList = processingListPdfTableHeadCell.map(({ label }) => {
      return {
        title: label,
      };
    });
    let resultKeysArr = [];
    let resultValuesArr = [];
    let tableBodyList = [];

    tableBodyList = responseList.map((elem) => {
      resultKeysArr = Object.keys(elem);
      resultValuesArr = Object.values(elem);
      let targetHeaderCell1 = {};
      resultKeysArr.forEach((element, index) => {
        processingListPdfTableHeadCell.forEach((res) => {
          if (res["id"] === element) {
            targetHeaderCell1 = {
              ...targetHeaderCell1,
              [element]: resultValuesArr[index],
            };
          }
        });
      });
      return CreatePdfTableBody(
        targetHeaderCell1,
        processingListPdfTableHeadCell
      );
    });

    const tableObj = {
      headerList: tableHeadList,
      rows: tableBodyList,
      fileName: `_Processing_List_${currentDate}`,
      label: "Processing List",
      fromDate: fromDate,
      toDate: toDate,
    };

    jsPDFInvoiceTemplate(tableObj);
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
    if (actionRouteSlice.length === 0) {
      setTableRows(payLoad);
    }
  }, [actionRouteSlice]);

  useEffect(() => {
    payLoad.statusCode = statusCode;
    setPayLoad(payLoad);
  }, [statusCode]);

  useEffect(() => {
    payLoad.fromDate = DateFormatYYYYMMDD(fromDate?.toString());
    setPayLoad(payLoad);
  }, [fromDate]);

  useEffect(() => {
    payLoad.toDate = DateFormatYYYYMMDD(toDate?.toString());
    setPayLoad(payLoad);
  }, [toDate]);

  return (
    <PageLayout pageName={pageName}>
      <CardLayout>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <DatePicker
              label={"From Date"}
              value={fromDate}
              maxDate={toDate}
              setValue={setFromDate}
              disableFuture={true}
            />
          </Grid>
          <Grid item xs={2}>
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
              <Fab
                variant="contained"
                size="small"
                button={"N"}
                onClick={handleSearch}
                sx={primaryFabStyle}
              >
                <Search width={18} sx={{ color: "#fff" }} />
              </Fab>
            </DarkTooltip>
            <DarkTooltip placement="top" title={"Clear Search"} arrow>
              <Fab
                variant="contained"
                size="small"
                button={"N"}
                onClick={clearSearch}
                sx={primaryFabStyle}
              >
                <Refresh width={18} sx={{ color: "#fff" }} />
              </Fab>
            </DarkTooltip>
            {hasPermission && hasPermission["A008"] && (
              <DarkTooltip placement="top" title={"Download"} arrow>
                <Fab
                  variant="contained"
                  size="small"
                  button={"N"}
                  onClick={handleDownload}
                  sx={primaryFabStyle}
                >
                  <Download width={18} sx={{ color: "#fff" }} />
                </Fab>
              </DarkTooltip>
            )}
          </Grid>
        </Grid>

        <DataTable
          rows={rows}
          setRows={setRows}
          headCells={processingListTableHeadCell}
          checkboxEnable={true}
        />
      </CardLayout>
    </PageLayout>
  );
};
const ProcessingData = ActionPermission(UnWrappedProcessing);
export default ProcessingData;
