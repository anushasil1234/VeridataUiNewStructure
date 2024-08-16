import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ActionPermission from "shared/components/action-permission/action-permission";
import DownloadReportFilter from "shared/components/download-report/download-report-filter";
import { nationalityListTableHeadCell, nationalityReportTableHeadCell, toNationalityReport } from "shared/constants/constants";
import { CardLayout, CreatePdfTableBody, DataTable, DateFormatYYYYMMDD, PageLayout, generateTableRowData } from "shared/utils";
import jsPDFReportTemplate from "shared/utils/associate/js-pdf-invoice";


const NationalityReportView = (props) => {
  const { hasPermission } = props;
  const { state } = useLocation();
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [nationalityType, setNationalityType] = useState(null);
  const [appointeeDetails, setAppointeeDetails] = useState();
  const apiSlice = useSelector(state => state.apiSlice);
  // const popUpSlice = useSelector(state => state.popUpSlice);
  const actionRouteSlice = useSelector(state => state.actionRouteSlice);
  const commonHooksFunctionSlice = useSelector(state => state.commonHooksFunctionSlice);

  const { getAppointeeNationalityReport } = apiSlice[0];
  const { navigateTo } = commonHooksFunctionSlice[0];
  let payloadData = {
    fromDate: fromDate && DateFormatYYYYMMDD(fromDate?.toString()),
    toDate: toDate && DateFormatYYYYMMDD(toDate?.toString()),
    nationalityType: nationalityType,
  }
  // const { showErrorMessage } = popUpSlice[0];

  let [payLoad, setPayLoad] = useState(payloadData);
  const [filterType, setFilterType] = useState(0);

  const [rows, setRows] = useState([]);

  const handleNationalityChange = async (value) => {
    setNationalityType(value);
    const _nationalityType = value === 0 ? null : value;
    const _payLoad = { ...payLoad, nationalityType: _nationalityType }
    setPayLoad(_payLoad);
  };

  const clearSearch = () => {
    setFromDate(null);
    setNationalityType(null);
    setFilterType(0);
    const payLoad = {
      fromDate: null,
      toDate: null,
      nationalityType: null,

    }
    setPayLoad(payLoad);
    setTableRows(payLoad);
    navigateTo(toNationalityReport, { state: false });
  }
  var date = moment();
  var currentDate = date.format("DDMMYYYY");

  const setTableRows = async (payLoad) => {

    const response = await getAppointeeNationalityReport(payLoad);
    if (response) {
      const { responseInfos } = response;
      setAppointeeDetails(responseInfos);

      let generatedCells = generateTableRowData(
        responseInfos,
        nationalityListTableHeadCell,
        null,
        hasPermission
      );

      responseInfos && responseInfos?.forEach(({ appointee }, index) => {
        const detailsCells = generateTableRowData(
          appointee,
          nationalityListTableHeadCell,
          null
        );
        generatedCells[index].detailsCells = detailsCells;
      });

      setRows({
        tableHead: nationalityListTableHeadCell,
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



  const handleNaltionalityListDownload = () => {
    const tableHeadList = nationalityReportTableHeadCell.map(({ label }) => {
      return {
        title: label,
      };
    });
    const tableBodyList = appointeeDetails && appointeeDetails.map(
      (tableRows) => {

        return CreatePdfTableBody(tableRows, nationalityReportTableHeadCell);
      }
    );
    const tableObj = {
      headerList: tableHeadList,
      rows: tableBodyList,
      fileName: `Nationality_Appointee_${currentDate}`,
      label: "Appointee Nationality",
      fromDate: fromDate,
      toDate: toDate,
      tableName: "Appointee Nationality",
      rptDesc: ""
    };

    jsPDFReportTemplate({ tableObj });
  };

  return (
    <PageLayout pageName={"Nationality"}>
      <CardLayout>
        <DownloadReportFilter
          filterType={filterType}
          setFilterType={setFilterType}
          handleSearch={() => setTableRows(payLoad)}
          clearSearch={clearSearch}
          payLoad={payLoad}
          handleDownload={handleNaltionalityListDownload}
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
          nationalityType={nationalityType}
          handleNationalityChange={handleNationalityChange}
          hasPermission={hasPermission}
        />

        <DataTable
          rows={rows}
          setRows={setRows}
          headCells={nationalityListTableHeadCell}
        />
      </CardLayout>
    </PageLayout>
  );
};

const NationalityReport = ActionPermission(NationalityReportView);
export default NationalityReport;
