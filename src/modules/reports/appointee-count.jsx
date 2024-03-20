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
} from "@mui/material";
import {
  downLoadListSx,
  inputFieldStyleAdded,
  inputPropsStyle,
  primaryFabStyle,
} from "app";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  appointeeCountDetailsHeadCell,
  appointeeCountHeadCell,
  toAppointeecount,
} from "shared/constants/constants";
import {
  CardLayout,
  CreatePdfTableBody,
  DateFormatYYYYMMDD,
  PageLayout,
  generateTableRowData,
} from "shared/utils";
import { CollapsibleDataTable } from "shared/utils/dataTable/collapsable-datatable";
import DatePicker from "shared/utils/date-picker/date-picker";
import DarkTooltip from "shared/utils/tooltip/dark-tooltip";
import jsPDFInvoiceTemplate from "shared/utils/associate/js-pdf-invoice";
import moment from "moment";

const AppointeeCount = () => {

  const apiSlice = useSelector((state) => state.apiSlice);
  const dropdownList = useSelector((state) => state.dropdownList);
  const commonHooksFunctionSlice = useSelector((state) => state.commonHooksFunctionSlice);
 
  const { navigateTo } = commonHooksFunctionSlice[0];

  const { getAppointeeCounterReport } = apiSlice[0];
  const { reportFilterStatusList } =
    dropdownList && dropdownList.length > 0 && dropdownList[0];

  const [toDate, setToDate] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [rows, setRows] = useState();
  const [appointeeCountDateWises, setAppointeeCountDateWises] = useState();
  const [appointeeCountListDetails, setAppointeeCountListDetails] = useState();
  const [isDownloadListOpened, setIsDownloadListOpened] = useState(false);

  const [appointeeName, setAppointeeName] = useState();
  const [statusCode, setStatusCode] = useState(null);

  const payLoadData = {
    appointeeName: appointeeName,
    statusCode: statusCode && statusCode.toString(),
    fromDate: fromDate && DateFormatYYYYMMDD(fromDate?.toString()),
    toDate: toDate && DateFormatYYYYMMDD(toDate?.toString())
  };
  let [payLoad, setPayLoad] = useState(payLoadData);

  const setTableRows = async (payLoad) => {
    payLoad = {
      appointeeName: payLoad.appointeeName && payLoad.appointeeName,
      statusCode: payLoad.statusCode && payLoad.statusCode.toString(),
      fromDate: payLoad.fromDate && DateFormatYYYYMMDD(payLoad.fromDate?.toString()),
      toDate: payLoad.toDate && DateFormatYYYYMMDD(payLoad.toDate?.toString()),
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
    setTableRows(payLoad);
  }, []);
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
    setStatusCode(statusCode);
  }, [statusCode]);

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
      fromDate: fromDate,
      toDate: toDate,
    };
    jsPDFInvoiceTemplate(tableObj);
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
      fromDate: fromDate,
      toDate: toDate,
    };

    jsPDFInvoiceTemplate(tableObj);
  };
  const handleSearch = () => {
    setTableRows(payLoad);
  };
  const clearSearch = () => {
    setFromDate(null);
    setToDate(null);
    setStatusCode(null);
    const payLoad = {
      fromDate : null,
      toDate : null,
      statusCode :null
    };
    setTableRows(payLoad);

   navigateTo(toAppointeecount, { state: false });
  };


  return (
    <PageLayout pageName={"Appointee count"}>
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
              clearable
              value={toDate}
              minDate={fromDate}
              setValue={setToDate}
              disableFuture={true}
            />
          </Grid>
          <Grid item xs={2}>
          <FormControl sx={{width: "100%" }} size="large"> 

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
          <Grid item xs={2}>
            <TextField
              error={false}
              style={inputFieldStyleAdded}
              type="text"
              className="customeTextField"
              variant="outlined"
                onChange={(e) => {
                  setAppointeeName(e.target.value);
                }}
              value={appointeeName}
              inputStyle={{ padding: 0 }}
              inputProps={{
                style: inputPropsStyle,
              }}
              label={"Appointee Name"}
              defaultValue={" "}
              multiline
             
            />
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

            <DarkTooltip placement="top" title={"Download Report"} arrow>
              <Fab
                variant="contained"
                size="small"
                button={"N"}
                onClick={handleClickOnDownload}
                sx={primaryFabStyle}
              >
                <Download width={18} />
              </Fab>
            </DarkTooltip>
            {isDownloadListOpened && (
              <List sx={downLoadListSx}>
                <ListItemButton component="a">
                  <DarkTooltip
                    placement="top"
                    title={"Download AppointeeCount"}
                    arrow
                  >
                    <Fab
                      variant="contained"
                      size="small"
                      button={"N"}
                      onClick={handleAppointeeCountDownload}
                      sx={primaryFabStyle}
                    >
                      <Summarize width={18} />
                    </Fab>
                  </DarkTooltip>
                </ListItemButton>
                <ListItemButton component="a">
                  <DarkTooltip
                    placement="top"
                    title={"Download Appointee Details Count"}
                    arrow
                  >
                    <Fab
                      variant="contained"
                      size="small"
                      button={"N"}
                      onClick={handleAppointeeDetailsDownload}
                      sx={primaryFabStyle}
                    >
                      <Assessment width={18} />
                    </Fab>
                  </DarkTooltip>
                </ListItemButton>
              </List>
            )}
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
