import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ActionPermission from "shared/components/action-permission/action-permission";
import DownloadAgingReport from "shared/components/download-report/download-aging-report";
import { generateNoMovementReportDesc, noResponseListTableHeadCell, noResponseReportTableHeadCell, reportGenarate, toNoResponseAgingReport } from "shared/constants/constants";
import { CardLayout, CreatePdfTableBody, DataTable, DateFormatYYYYMMDD, PageLayout, generateTableRowData, hasValue } from "shared/utils";
import jsPDFReportDataTemplate from "shared/utils/associate/js-pdf-report";
import downloadFile from "shared/utils/associate/download-file";
import generateBlobFromBase64 from "shared/utils/associate/generateBlob"

const NoResponseAgingReportView = (props) => {
  const { hasPermission } = props;
  const { state } = useLocation();
  const popUpSlice = useSelector(state => state.popUpSlice);
  const [fromDate, setFromDate] = useState(null);
  const [noOfDays, setNoOfDays] = useState(null);
  const [appointeeDetails, setAppointeeDetails] = useState();
  const apiSlice = useSelector(state => state.apiSlice);
  const actionRouteSlice = useSelector(state => state.actionRouteSlice);
  const commonHooksFunctionSlice = useSelector(state => state.commonHooksFunctionSlice);
  const [fileData, setFileData] = useState(null);
  const { getAppointeeAgingFilterReport } = apiSlice[0];
  const { navigateTo } = commonHooksFunctionSlice[0];
  let payloadData = {
    startDate: fromDate && DateFormatYYYYMMDD(fromDate?.toString()),
    reportType: 'PINORS',
    noOfDays: noOfDays ?? 0,
  }
  const { showErrorMessage } = popUpSlice[0];

  let [payLoad, setPayLoad] = useState(payloadData);
  const [filterType, setFilterType] = useState(0);

  const [rows, setRows] = useState([]);

  const handleNoOfDaysChange = async (value) => {
    setNoOfDays(value);
    const _noOfDays = value === 0 ? null : value;
    const _payLoad = { ...payLoad, noOfDays: _noOfDays }
    setPayLoad(_payLoad);
  };

  const clearSearch = () => {
    setFromDate(null);
    setNoOfDays(null);
    setFilterType(0);
    const payLoad = {
      startDate: null,
      noOfDays: noOfDays ?? 0,
      reportType: 'PINORS',

    }
    setPayLoad(payLoad);
    setTableRows(payLoad);
    navigateTo(toNoResponseAgingReport, { state: false });
  }
  var date = moment();
  var currentDate = date.format("DDMMYYYY");

  const setTableRows = async (payLoad) => {

    const response = await getAppointeeAgingFilterReport(payLoad);
    if (response) {
      const { responseInfo } = response;
      const { filedata } = responseInfo || {}
      setAppointeeDetails(responseInfo?.appointeeDetails);
      setFileData(filedata)
      let generatedCells = generateTableRowData(
        responseInfo?.appointeeDetails,
        noResponseListTableHeadCell,
        null,
        hasPermission
      );

      responseInfo?.appointeeDetails && responseInfo?.appointeeDetails.forEach(({ appointee }, index) => {
        const detailsCells = generateTableRowData(
          appointee,
          noResponseListTableHeadCell,
          null
        );
        generatedCells[index].detailsCells = detailsCells;
      });

      setRows({
        tableHead: noResponseListTableHeadCell,
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
      startDate: DateFormatYYYYMMDD(fromDate?.toString()),
    }
    setPayLoad(_payLoad);
  }, [fromDate]);


  const handleDownload = () => {
    if (!fileData || fileData.length === 0) {
      showErrorMessage(reportGenarate);
      return;
    }
    if (fileData && typeof fileData === 'object') {
      const base64String = fileData.fileData;
      const fileName = fileData.fileName || "appointee_data.xlsx";
      const blob = generateBlobFromBase64(base64String);
      const blobUrl = window.URL.createObjectURL(blob);
      downloadFile(blobUrl, fileName);
      window.URL.revokeObjectURL(blobUrl);
    }
  };
  const handleAppointeeCountDownload = () => {
    if (!appointeeDetails || appointeeDetails.length === 0) {
      showErrorMessage(reportGenarate)
      return;
    }
    const tableHeadList = noResponseReportTableHeadCell.map(({ label }) => {
      return {
        title: label,
      };
    });
    const tableBodyList = appointeeDetails && appointeeDetails.map(
      (tableRows) => {

        return CreatePdfTableBody(tableRows, noResponseReportTableHeadCell);
      }
    );
    const tableObj = {
      headerList: tableHeadList,
      rows: tableBodyList,
      tableName: "Appointee details",
      rptDesc: generateNoMovementReportDesc(noOfDays ?? 0),
    };
    jsPDFReportDataTemplate({
      reportDetails: {
        fileName: `NoResponse_Appointee_${currentDate}`,
        label: "No Response Appointee",
        fromDate: fromDate,
        toDate: "",
        rptDesc: generateNoMovementReportDesc(noOfDays ?? 0),
      },
      tables: [tableObj]
    });
  };

  // const handleAppointeeCountDownload = () => {
  //   const tableHeadList = noResponseReportTableHeadCell.map(({ label }) => {
  //     return {
  //       title: label,
  //     };
  //   });
  //   const tableBodyList = appointeeDetails && appointeeDetails.map(
  //     (tableRows) => {

  //       return CreatePdfTableBody(tableRows, noResponseReportTableHeadCell);
  //     }
  //   );
  //   const tableObj = {
  //     headerList: tableHeadList,
  //     rows: tableBodyList,
  //     fileName: `NoResponse_Appointee_${currentDate}`,
  //     label: "No Response Appointee",
  //     fromDate: fromDate,
  //     toDate: "",
  //     tableName: "Appointee details",
  //     rptDesc: generateNoMovementReportDesc(noOfDays)
  //   };

  //   jsPDFReportTemplate({ tableObj });
  // };
  const handleReportSearch = () => {
    if (filterType === 0) {
      setFromDate(null);
      const _payLoad = {
        ...payLoad,
        startDate: null
      }
      setTableRows(_payLoad);
    }
    else if (hasValue(fromDate)) {
      setTableRows(payLoad)
    }
  };
  return (
    <PageLayout pageName={"No Response"}>
      <CardLayout>
        <DownloadAgingReport
          filterType={filterType}
          setFilterType={setFilterType}
          handleSearch={handleReportSearch}
          clearSearch={clearSearch}
          payLoad={payLoad}
          setPayLoad = {setPayLoad}
          handleDownload={handleAppointeeCountDownload}
          handelxlsxDownload={handleDownload}
          fromDate={fromDate}
          setFromDate={setFromDate}
          noOfDays={noOfDays}
          setNoOfDays={setNoOfDays}
          handleNoOfDaysChange={handleNoOfDaysChange}
          hasPermission={hasPermission}
          reportType = {"NORESPNSE"}
        />

        <DataTable
          rows={rows}
          setRows={setRows}
          headCells={noResponseListTableHeadCell}
        />
      </CardLayout>
    </PageLayout>
  );
};

const NoResponseAgingReport = ActionPermission(NoResponseAgingReportView);
export default NoResponseAgingReport;
