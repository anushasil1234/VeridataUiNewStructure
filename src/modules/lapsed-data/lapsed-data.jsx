import { Download, Refresh, Search } from "@mui/icons-material";
import {
  Fab,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  generateLapsedAppointeeReportDesc,
  lapsedListPdfTableHeadCell,
  lapsedListTableHeadCell,
  toLapseddata,
} from "shared/constants/constants";
import {
  CardLayout,
  CreatePdfTableBody,
  DataTable,
  DateFormatYYYYMMDD,
  PageLayout,
  generateTableRowData,
} from "shared/utils";
import DatePicker from "shared/utils/date-picker/date-picker";
import { removeActionRoute } from "store/slices/action-route-slice";
import dayjs from "dayjs";
import { inputFieldStyleAdded, primaryFabStyle } from "app";
import DarkTooltip from "shared/utils/tooltip/dark-tooltip";
import ActionPermission from "shared/components/action-permission/action-permission";
import jsPDFReportTemplate from "shared/utils/associate/js-pdf-invoice";
import moment from "moment";

const UnwrappedLapseddata = (props) => {
  const { hasPermission } = props;
  const { state } = useLocation();

  let noOfDays = 0;

  const apiSlice = useSelector((state) => state.apiSlice);
  const loggedInData = useSelector((state) => state.loggedInData);
  const actionRouteSlice = useSelector((state) => state.actionRouteSlice);
  const commonHooksFunctionSlice = useSelector(
    (state) => state.commonHooksFunctionSlice
  );

  const { navigateTo } = commonHooksFunctionSlice[0];
  const { getLapsedDataList } = apiSlice[0];
  const { companyId } = loggedInData[0];

  if (state) {
    if (state.dayRangePayLoad) {
      noOfDays = state.dayRangePayLoad;
    }
  }
  let _fromday;
  let _today;
  if (noOfDays > 0) {
    const now = new Date();
    _fromday = dayjs(new Date(now.setDate(now.getDate() - noOfDays)));
    _today = dayjs(new Date());
  }

  const [rows, setRows] = useState([]);
  const [pageName, setPageName] = useState(null);
  const [toDate, setToDate] = useState(_today);
  const [fromDate, setFromDate] = useState(_fromday);
  const [responseList, setResponseList] = useState();
  const [statusCode, setStatusCode] = useState("All");

  const payloadData = {
    isFiltered: state && state.dayRangePayLoad ? true : false,
    noOfDays: state && state.dayRangePayLoad ? state.dayRangePayLoad : 0,
    filterType: state && state.filterType,
    appointeeName: state && state.appointeeName,
    companyId: companyId,
    candidateId: state && state.candidateId,
    statusCode: statusCode,
    fromDate: fromDate && DateFormatYYYYMMDD(fromDate?.toString()),
    toDate: toDate && DateFormatYYYYMMDD(toDate?.toString()),
  };

  let [payLoad, setPayLoad] = useState(payloadData);
  var date = moment();
  var currentDate = date.format("DDMMYYYY");

  const setTableRows = async (payLoad) => {
    let noOfDays = 0;
    let isFiltered = false;

    if (state) {
      if (state.dayRangePayLoad) {
        noOfDays = state.dayRangePayLoad;
        isFiltered = true;
      }
    }
    setPageName(
      isFiltered === true && noOfDays > 0 ? `Lapsed List` : "Lapsed List"
    );
    const response = await getLapsedDataList(payLoad);
    if (response) {
      const { responseInfos } = response;
      setResponseList(responseInfos);
      let generatedCells = generateTableRowData(
        responseInfos,
        lapsedListTableHeadCell,
        null,
        hasPermission
      );
      responseInfos.forEach(({ Details }, index) => {
        const detailsCells = generateTableRowData(
          Details,
          lapsedListTableHeadCell,
          null
        );
        generatedCells[index].detailsCells = detailsCells;
      });
      setRows({
        tableHead: lapsedListTableHeadCell,
        tableRows: generatedCells,
      });
    }
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
    navigateTo(toLapseddata, { state: false });
  };

  const handleSearch = () => {
    setTableRows(payLoad);
  };

  const handleDownload = () => {
    const tableHeadList = lapsedListPdfTableHeadCell.map(({ label }) => {
      return {
        title: label,
      };
    });
    const tableBodyList = responseList && responseList.map(
      (tableRows) => {
        return CreatePdfTableBody(tableRows, lapsedListPdfTableHeadCell);
      }
    );
    const tableObj = {
      headerList: tableHeadList,
      rows: tableBodyList,
      fileName: `_Lapsed_List_${currentDate}`,
      label: "Lapsed List",
      fromDate: fromDate,
      toDate: toDate,
      tableName: "Appointee details",
      rptDesc: generateLapsedAppointeeReportDesc
    };

    jsPDFReportTemplate({ tableObj });
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(removeActionRoute());
    if (actionRouteSlice.length === 0 && hasPermission) {
      setTableRows(payLoad);
    }
  }, [actionRouteSlice, state, hasPermission]);
  useEffect(() => {
    payLoad.fromDate = DateFormatYYYYMMDD(fromDate?.toString());
    setPayLoad(payLoad);
  }, [fromDate]);
  useEffect(() => {
    payLoad.toDate = DateFormatYYYYMMDD(toDate?.toString());
    setPayLoad(payLoad);
  }, [toDate]);
  useEffect(() => {
    payLoad.statusCode = statusCode;
    setPayLoad(payLoad);
  }, [statusCode]);

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
          headCells={lapsedListTableHeadCell}
          checkboxEnable={true}
        />
      </CardLayout>
    </PageLayout>
  );
};

const LapsedData = ActionPermission(UnwrappedLapseddata);
export default LapsedData;
