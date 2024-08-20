import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ActionPermission from "shared/components/action-permission/action-permission";
import DownloadReportFilter from "shared/components/download-report/download-report-filter";
import { appointeeListTableHeadCell, appointeeReportTableHeadCell,  toNationalityReport } from "shared/constants/constants";
import { CardLayout, CreatePdfTableBody, DataTable, DateFormatYYYYMMDD, PageLayout, generateTableRowData } from "shared/utils";
import jsPDFReportTemplate from "shared/utils/associate/js-pdf-invoice";


const AppointeeDataReportView = (props) => {
  const { hasPermission } = props;
  const { state } = useLocation();
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [statusCode, setStatusCode] = useState('All');
  const [appointeeDetails, setAppointeeDetails] = useState();
  const apiSlice = useSelector(state => state.apiSlice);
  // const popUpSlice = useSelector(state => state.popUpSlice);
  const actionRouteSlice = useSelector(state => state.actionRouteSlice);
  const commonHooksFunctionSlice = useSelector(state => state.commonHooksFunctionSlice);

  const { getAppointeeDataReport } = apiSlice[0];
  const { navigateTo } = commonHooksFunctionSlice[0];
  let payloadData = {
    fromDate: fromDate && DateFormatYYYYMMDD(fromDate?.toString()),
    toDate: toDate && DateFormatYYYYMMDD(toDate?.toString()),
    StatusCode: statusCode,
  }
  // const { showErrorMessage } = popUpSlice[0];

  let [payLoad, setPayLoad] = useState(payloadData);
  const [filterType, setFilterType] = useState(0);

  const [rows, setRows] = useState([]);

  const handleStatusChange = async (value) => {
    setStatusCode(value);
    // const _nationalityType = value === 0 ? null : value;
    const _payLoad = { ...payLoad, StatusCode: value }
    setPayLoad(_payLoad);
  };

  const clearSearch = () => {
    setFromDate(null);
    setStatusCode('All');
    setFilterType(0);
    const payLoad = {
      fromDate: null,
      toDate: null,
      StatusCode: 'All',

    }
    setPayLoad(payLoad);
    setTableRows(payLoad);
    navigateTo(toNationalityReport, { state: false });
  }
  var date = moment();
  var currentDate = date.format("DDMMYYYY");

  const setTableRows = async (payLoad) => {

    const response = await getAppointeeDataReport(payLoad);
    if (response) {
      const { responseInfos } = response;
      setAppointeeDetails(responseInfos);

      let generatedCells = generateTableRowData(
        responseInfos,
        appointeeListTableHeadCell,
        null,
        hasPermission
      );

      responseInfos && responseInfos?.forEach(({ appointee }, index) => {
        const detailsCells = generateTableRowData(
          appointee,
          appointeeListTableHeadCell,
          null
        );
        generatedCells[index].detailsCells = detailsCells;
      });

      setRows({
        tableHead: appointeeListTableHeadCell,
        tableRows: generatedCells,
      });
    }
  };
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(removeActionRoute());
    if (actionRouteSlice.length === 0 && hasPermission) {
      setTableRows(payLoad);
    }
  }, [state, actionRouteSlice, hasPermission]);

  useEffect(() => {
    const _payLoad = {
      ...payLoad,
      fromDate: DateFormatYYYYMMDD(fromDate?.toString()),
      toDate: DateFormatYYYYMMDD(toDate?.toString()),
    }
    setPayLoad(_payLoad);
  }, [fromDate, toDate]);



  const handleAppointeeListDownload = () => {
    const tableHeadList = appointeeReportTableHeadCell.map(({ label }) => {
      return {
        title: label,
      };
    });
    const tableBodyList = appointeeDetails && appointeeDetails.map(
      (tableRows) => {

        return CreatePdfTableBody(tableRows, appointeeReportTableHeadCell);
      }
    );
    const tableObj = {
      headerList: tableHeadList,
      rows: tableBodyList,
      fileName: `Appointee_Data_${currentDate}`,
      label: "Appointee Data",
      fromDate: fromDate,
      toDate: toDate,
      tableName: "Appointee Data",
      rptDesc: ""
    };

    jsPDFReportTemplate({ tableObj });
  };

  return (
    <PageLayout pageName={"Appointee Data"}>
      <CardLayout>
        <DownloadReportFilter
          filterType={filterType}
          setFilterType={setFilterType}
          filterCode={'APPNTE'}
          handleSearch={() => setTableRows(payLoad)}
          clearSearch={clearSearch}
          payLoad={payLoad}
          handleDownload={handleAppointeeListDownload}
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
          dropdownFilterType={statusCode}
          dropdownFilterTypeChange={handleStatusChange}
          hasPermission={hasPermission}
        />

        <DataTable
          rows={rows}
          setRows={setRows}
          headCells={appointeeListTableHeadCell}
        />
      </CardLayout>
    </PageLayout>
  );
};

const AppointeeReport = ActionPermission(AppointeeDataReportView);
export default AppointeeReport;
