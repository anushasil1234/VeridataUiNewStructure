import { Download, Refresh, Search } from "@mui/icons-material";
import { Box, Fab, Stack } from "@mui/material";
import { primaryFabStyle } from "app";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActionPermission from "shared/components/action-permission/action-permission";
import {
  apiCountDetailsHeadCell,
  apiCountHeadCell,
  toApiCountReport,
} from "shared/constants/constants";
import {
  CardLayout,
  CreatePdfTableBody,
  DataTable,
  PageLayout,
  generateTableRowData,
} from "shared/utils";
import jsPDFInvoiceTemplate from "shared/utils/associate/js-pdf-invoice";
import DatePicker from "shared/utils/date-picker/date-picker";
import DarkTooltip from "shared/utils/tooltip/dark-tooltip";
import { removeActionRoute } from "store/slices/action-route-slice";

const UnwrappedReport = (props) => {
  const { hasPermission } = props;

  const apiSlice = useSelector(state => state.apiSlice); 
  const actionRouteSlice = useSelector(state => state.actionRouteSlice);
  const commonHooksFunctionSlice = useSelector(state => state.commonHooksFunctionSlice);

  const { getApiCounterReport } = apiSlice[0];
  const { navigateTo } = commonHooksFunctionSlice[0];

  const [toDate, setToDate] = useState();
  const [fromDate, setFromDate] = useState();
  const [rows, setRows] = useState([]);
  const [apiCountList, setApiCountList] = useState();

  const setTableRows = async (fromDate = null, toDate = null) => {

    const response = await getApiCounterReport(fromDate, toDate);

    if (response) {
      const { responseInfo } = response;
      const { apiCountList } = responseInfo;

      setApiCountList(apiCountList);
    
      let generatedCells = generateTableRowData(
        apiCountList,
        apiCountDetailsHeadCell,
        null,
        hasPermission
      );

      apiCountList.forEach(({ apiCountDetails }, index) => {
        const detailsCells = generateTableRowData(
          apiCountDetails,
          apiCountDetailsHeadCell,
          null
        );
        generatedCells[index].detailsCells = detailsCells;
      });
      setRows({
        tableHead: apiCountHeadCell,
        tableRows: generatedCells,
      });
    } 
  };

  const dispatch = useDispatch();

  var date = moment();
  var currentDate = date.format("DDMMYYYY");

  const handleApiCountDownload = () => {

    const tableHeadList = apiCountHeadCell.map(({ label }) => {
      return {
        title: label,
      };
    });

    const tableBodyList = apiCountList.map((apiTotalCount) => {

      return CreatePdfTableBody(apiTotalCount, apiCountHeadCell);
    });

    const tableObj = {
      headerList: tableHeadList,
      rows: tableBodyList,
      fileName: `_Api_Count_${currentDate}`,
      label: "Api Count",
      fromDate: fromDate,
      toDate: toDate,
    };
    jsPDFInvoiceTemplate(tableObj);
  };

  const handleSearch = () => {
    setTableRows(fromDate, toDate);
  };
  const clearSearch = () => {
    setFromDate(null);
    setToDate(null);
    setTableRows();
    navigateTo(toApiCountReport,{ state: false });
  };

  useEffect(() => {
    dispatch(removeActionRoute());
    if (actionRouteSlice.length === 0) {
      setTableRows(fromDate, toDate);
    }
  }, [actionRouteSlice]);
  return (
    <PageLayout pageName={"Api count report"}>
      <CardLayout>
        <Stack flexDirection={"row"}>
          <Box>
            <DatePicker
              label={"From Date"}
              value={fromDate}
              maxDate={toDate}
              setValue={setFromDate}
              disableFuture={true}
            />
          </Box>
          <Box mx={"0.5rem"}>
            <DatePicker
              label={"To Date"}
              clearable
              value={toDate}
              minDate={fromDate}
              setValue={setToDate}
              disableFuture={true}
            />
          </Box>
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
              onClick={handleApiCountDownload}
              sx={primaryFabStyle}
            >
              <Download width={18} />
            </Fab>
          </DarkTooltip>
        </Stack>
        <DataTable rows={rows} setRows={setRows} headCells={apiCountHeadCell} />
      </CardLayout>
    </PageLayout>
  );
};

//export default Report;
const Report = ActionPermission(UnwrappedReport);
export default Report;
