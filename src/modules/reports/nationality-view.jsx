import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ActionPermission from "shared/components/action-permission/action-permission";
import DownloadReportFilter from "shared/components/download-report/download-report-filter";
import { nationalityListTableHeadCell, nationalityReportTableHeadCell, toNationalityReport ,reportGenarate, uploadedFromDateEmptyMsg, FromDateEmptyMsg} from "shared/constants/constants";
import { CardLayout, CreatePdfTableBody, DataTable, DateFormatYYYYMMDD, PageLayout, generateTableRowData, hasValue } from "shared/utils";
import jsPDFReportDataTemplate from "shared/utils/associate/js-pdf-report";
import { removeActionRoute } from "store/slices/action-route-slice";

import {generatenationlityReportDesc } from "shared/constants/constants"
import generateBlobFromBase64 from "shared/utils/associate/generateBlob";
import downloadFile from "shared/utils/associate/download-file";
import { getAppointeeNationalityReport } from "server/apis";
import showErrorMessage from "shared/utils/associate/show-error-message";
const NationalityReportView = (props) => {
  const { hasPermission } = props;
  const { state } = useLocation();
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [nationalityType, setNationalityType] = useState(null);
  const [nationalityDetails, setNationalityDetails] = useState();
  const[fileData,setFiledata]=useState(null)
  const apiSlice = useSelector(state => state.apiSlice);
  //  const popUpSlice = useSelector(state => state.popUpSlice);
   
  const actionRouteSlice = useSelector(state => state.actionRouteSlice);
  const commonHooksFunctionSlice = useSelector(state => state.commonHooksFunctionSlice);

  // const { getAppointeeNationalityReport } = apiSlice[0];
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
    setToDate(null);
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
      const { appointeeDetails,filedata } = response?.responseInfo;
      setNationalityDetails(appointeeDetails);
      setFiledata(filedata)
   

      let generatedCells = generateTableRowData(
        appointeeDetails,
        nationalityListTableHeadCell,
        null,
        hasPermission
      );

      appointeeDetails && appointeeDetails?.forEach(({ appointee }, index) => {
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
     dispatch(removeActionRoute());
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
  }, [fromDate, toDate,]);

  const handleNaltionalityListDownload = () => {

    if (!nationalityDetails || nationalityDetails.length === 0) {
      showErrorMessage(reportGenarate)
      return; 
    }
    const tableHeadList = nationalityReportTableHeadCell.map(({ label }) => {
      return {
        title: label,
      };
    });
   
 
    const tableBodyList = nationalityDetails && nationalityDetails.map((tableRows) => {
      return CreatePdfTableBody(tableRows, nationalityReportTableHeadCell);
    });
 
    const tableObj = {
      headerList: tableHeadList,
      rows: tableBodyList,
      tableName: "Appointee Nationality", 
     rptDesc:generatenationlityReportDesc(nationalityType?.toString()),                          
    };
  
    jsPDFReportDataTemplate({
      reportDetails: {
        fileName: `Nationality_Appointee_${currentDate}`, 
        label: "Appointee Nationality",                  
        fromDate: fromDate,                               
        toDate: toDate,                                   
       rptDesc:generatenationlityReportDesc(nationalityType?.toString()),                                      
      },
      tables: [tableObj],                               
    });
  };
  const handleDownloadxlsx = () => {
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
  // const handleNaltionalityListDownload = () => {
  //   const tableHeadList = nationalityReportTableHeadCell.map(({ label }) => {
  //     return {
  //       title: label,
  //     };
  //   });
  //   const tableBodyList = appointeeDetails && appointeeDetails.map(
  //     (tableRows) => {

  //       return CreatePdfTableBody(tableRows, nationalityReportTableHeadCell);
  //     }
  //   );
  //   const tableObj = {
  //     headerList: tableHeadList,
  //     rows: tableBodyList,
  //     fileName: `Nationality_Appointee_${currentDate}`,
  //     label: "Appointee Nationality",
  //     fromDate: fromDate,
  //     toDate: toDate,
  //     tableName: "Appointee Nationality",
  //     rptDesc: ""
  //   };

  //   jsPDFReportTemplate({ tableObj });
  // };
  const handleReportSearch = () => {
    // if (filterType !== 0) {
    //   if (!hasValue (fromDate)) {
    //     showErrorMessage(FromDateEmptyMsg);
    //     return;
    //   }
    // }
  
    const _payLoad = filterType === 0 
      ? { ...payLoad, fromDate: null, toDate: null, nationalityType: null } 
      : payLoad;
  
    setTableRows(_payLoad);
  };
  
  return (
    <PageLayout pageName={"Nationality"}>
      <CardLayout>
        <DownloadReportFilter
          filterType={filterType}
          filterCode={'NATNLTY'}
          setFilterType={setFilterType}
          handleSearch={handleReportSearch}
          clearSearch={clearSearch}
          payLoad={payLoad}
          handleDownload={handleNaltionalityListDownload}
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
          dropdownFilterType={nationalityType}
          dropdownFilterTypeChange={handleNationalityChange}
          hasPermission={hasPermission}
          handleDownloadxlsx={handleDownloadxlsx}
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
