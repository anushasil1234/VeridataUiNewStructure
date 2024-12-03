import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ActionPermission from "shared/components/action-permission/action-permission";
import DownloadPFReport from "shared/components/download-report/download-PF-report";
import { pfPensionReportDesc, pfPensionTableHeadCell, pfPensionTablereportHeadCell, reportGenarate, topfPension, uploadedFromDateEmptyMsg, verifiedReportInfo } from "shared/constants/constants";
import { CardLayout, CreatePdfTableBody, DataTable, DateFormatYYYYMMDD, PageLayout, generateTableRowData, hasValue } from "shared/utils";
import { removeActionRoute } from "store/slices/action-route-slice";
import downloadFile from "shared/utils/associate/download-file";
import generateBlobFromBase64 from "shared/utils/associate/generateBlob"
import jsPDFReportDataTemplate from "shared/utils/associate/js-pdf-report";
import moment from "moment";

const UnWrappedpf = (props) => {
  const { hasPermission } = props;

  const { state } = useLocation();
  let noOfDays = 0;
  let isFiltered = false;

  if (state) {
    if (state.dayRangePayLoad) {
      noOfDays = state.dayRangePayLoad;
      isFiltered = true;
    }
  }
  let _fromday = null;
  let _today = null;
  if (noOfDays > 0) {
    const now = new Date();
    _fromday = dayjs(new Date(now.setDate(now.getDate() - noOfDays)));
    _today = dayjs(new Date());
  }

  const [toDate, setToDate] = useState(_today);
  const [fromDate, setFromDate] = useState(_fromday);
  const [pensionStatus, setPensionStatus] = useState(null);
  const [isManual, setisManual] = useState(null);
  const [PfType, setPftype] = useState(null);
  const[EpsGap,setEpsgap]=useState(null);
  const [appointeeDetails, setappointeeDetails] = useState()
  const [fileData, setFileData] = useState(null);
  const popUpSlice = useSelector(state => state.popUpSlice);
  const { showErrorMessage } = popUpSlice[0]

  let payloadData = {
    fromDate: fromDate && DateFormatYYYYMMDD(fromDate?.toString()),
    toDate: toDate && DateFormatYYYYMMDD(toDate?.toString()),
    pensionStatus: null,
    PfType: null,
    isManual: null,
    EpsGap: null
  }
  let [payLoad, setPayLoad] = useState(payloadData);
  const [rows, setRows] = useState([]);
  const [cell,setcell]=useState([]);

  const handleProcessPansionChange = async (e) => {
    const { value } = e.target;
    setPensionStatus(value);
    const _pansionStatus = value === "NA" ? null : value;
    const _payLoad = { ...payLoad, pensionStatus: _pansionStatus }
    setPayLoad(_payLoad);
  };

  const handlePassbookStatusChange = async (e) => {
    const { value } = e.target;
    setisManual(value);
    const _passbookStatus = value;
    const _payLoad = { ...payLoad, isManual: _passbookStatus }
    setPayLoad(_payLoad);

  };

  const handelprocessPFchange = async (e) => {
    const { value } = e.target;
    setPftype(value);
    const _pfStatus = value;
    const _payLoad = { ...payLoad, PfType: _pfStatus }
    setPayLoad(_payLoad);
  }
  const handelprocessEPSgapchange = async (e) => {
    const { value } = e.target;
    setEpsgap(value);
    const _epsGap = value;
     const _payLoad = { ...payLoad, EpsGap:  _epsGap }
    setPayLoad(_payLoad);
  }

  const clearSearch = () => {
    setFromDate(null);
    setToDate(null);
    setPensionStatus();
    setisManual(null);
    setPftype(null);
    setEpsgap();
    const payLoad = {
      fromDate: null,
      toDate: null,
      pensionStatus: null,
      PfType: null,
      isManual: null,
      EpsGap:null
    }
    setPayLoad(payLoad);
    setTableRows(payLoad);
    navigateTo(topfPension, { state: false });
  }


  const apiSlice = useSelector(state => state.apiSlice);
  const actionRouteSlice = useSelector(state => state.actionRouteSlice);
  const commonHooksFunctionSlice = useSelector(state => state.commonHooksFunctionSlice);
  const { AppointeeDataPfFilteRList } = apiSlice[0];
  const { navigateTo } = commonHooksFunctionSlice[0];


  const setTableRows = async (payLoad) => {
    const response = await AppointeeDataPfFilteRList(payLoad);
    if (response) {
      const { responseInfo } = response;
      const { appointeeDetails, filedata } = responseInfo || {};
      setappointeeDetails(appointeeDetails)
      setFileData(filedata)
      let generatedCells = generateTableRowData(appointeeDetails, pfPensionTableHeadCell, null, hasPermission);
      
      setRows({
        tableHead: pfPensionTableHeadCell,
        tableRows: generatedCells
      });
      
    }
  }
 
  var date = moment();
  var currentDate = date.format("DD-MM-YYYY");
  
  const handlePdfDownload = () => {
    if (!appointeeDetails || appointeeDetails.length === 0) {
      showErrorMessage(reportGenarate);
      return;
    }
  
    const tableHeadList = pfPensionTablereportHeadCell.map(({ label }) => ({
      title: label,
    }));
  
    const tableBodyList = appointeeDetails .map((rowData) => {
      return CreatePdfTableBody(rowData, pfPensionTablereportHeadCell);
    });
  
  
  
    const tableObj = {
      headerList: tableHeadList,
      rows: tableBodyList,
      tableName: "PF-Pension List",
    };
  
    jsPDFReportDataTemplate({
      reportDetails: {
        fileName: `_PF/Pension_List_${currentDate}`,
        label: "PF-Pension List",
        fromDate: fromDate,
        toDate: toDate,
        rptDesc: pfPensionReportDesc,
        companyName: "PWC REPORT",
      },
      tables: [tableObj],
    });
  };
  
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
  const handleSearch = () => {
    if (!hasValue (fromDate)) {
      showErrorMessage(uploadedFromDateEmptyMsg);
      return;
    }
    setTableRows(payLoad);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(removeActionRoute());
    if (actionRouteSlice.length === 0 && hasPermission) {
      setTableRows(payloadData);
    }
  }, [actionRouteSlice, hasPermission]);


  useEffect(() => {
    payLoad.fromDate = DateFormatYYYYMMDD(fromDate?.toString());
    payLoad.toDate = DateFormatYYYYMMDD(toDate?.toString());
    setPayLoad(payLoad);
  }, [fromDate, toDate]);

  return (
    <PageLayout pageName={"PF-Pension Report"}>
      <CardLayout>
        <DownloadPFReport
          handleSearch={handleSearch}
          clearSearch={clearSearch}
          pensionStatus={pensionStatus}
          passbookStatus={isManual}
          EpsGap={EpsGap}
          PfType={PfType}
          toDate={toDate}
          handleDownload={handleDownload}
          handlePdfDownload={handlePdfDownload}
          setToDate={setToDate}
          fromDate={fromDate}
          setFromDate={setFromDate}
          handleProcessPansionChange={handleProcessPansionChange}
          handlePassbookStatusChange={handlePassbookStatusChange}
          handelprocessPFchange={handelprocessPFchange}
          handelprocessEPSgapchange={handelprocessEPSgapchange}
          ispassFilter={true}
          ispensionfilter={true}
          hasPermission={hasPermission}
          infoDetails={verifiedReportInfo}
        />
        <DataTable
          rows={rows}
          setRows={setRows}
          headCells={pfPensionTableHeadCell}
        />
      </CardLayout>
    </PageLayout>
  );
};

const PfPension = ActionPermission(UnWrappedpf);
export default PfPension;
