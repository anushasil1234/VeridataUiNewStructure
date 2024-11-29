import {
  docReuploadListTableHeadCell,
  generateProcessingAppointeeReportDesc,
  mannualReverificationListTableHeadCell,
  mannualVerificationListTableHeadCell,
  MRVListPdfTableHeadCell,
  MVListPdfTableHeadCell,
  RDListPdfTableHeadCell,
  reportGenarate,
} from "shared/constants/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  CreatePdfTableBody,
  DataTable,
  generateTableRowData,
} from "shared/utils";
import { removeActionRoute } from "store/slices/action-route-slice";
import { useEffect, useState } from "react";
import jsPDFReportDataTemplate from "../associate/js-pdf-report";
import moment from "moment";
import generateBlobFromBase64 from "../associate/generateBlob";
import downloadFile from "../associate/download-file";

export const MVTable = (filters) => {
  console.log("columnlist", mannualVerificationListTableHeadCell);
  const { props, payload, isDownload, isDownloadExcel ,hasPermission} = filters;

  const popUpSlice = useSelector((state) => state.popUpSlice);
  var date = moment();
  var currentDate = date.format("DDMMYYYY");
  console.log("filterType", filters);
  const [rows, setRows] = useState([]);
  const [responseList, setResponseList] = useState();
  const [responseListLength, setResponseListLength] = useState(0);
  
  const actionRouteSlice = useSelector((state) => state.actionRouteSlice);
  const apiSlice = useSelector((state) => state.apiSlice);
  const { getMannualVerificationDataList } = apiSlice[0];
  const dispatch = useDispatch();
  const { showErrorMessage } = popUpSlice[0];
  const payload_MV = {
    filterType: props,
    ...payload,
  };
  console.log("actions", payload_MV);
  const setTableRows = async (payload_MV) => {
    const response = await getMannualVerificationDataList(payload_MV);
    if (response) {
      const { responseInfo } = response;
      const { manualVerificationList } = responseInfo;
      setResponseList(manualVerificationList);
      manualVerificationList.length>0 && setResponseListLength(manualVerificationList.length)
      console.log();
      let generatedCells = generateTableRowData(
        manualVerificationList,
        props === "MV"
          ? mannualVerificationListTableHeadCell
          : props === "RD"
          ? docReuploadListTableHeadCell
          : mannualReverificationListTableHeadCell,
        null,
       hasPermission
      );
      setRows({
        tableHead:
          props === "MV"
            ? mannualVerificationListTableHeadCell
            : props === "RD"
            ? docReuploadListTableHeadCell
            : mannualReverificationListTableHeadCell,
        tableRows: generatedCells,
      });
    }
  };
console.log('responselistlegth',responseListLength)
  const handleDownload = () => {
    if (!responseList || responseList.length === 0) {
      showErrorMessage(reportGenarate);
      return;
    }
    // const tableHeadList = props === 'MV' && mannualVerificationListTableHeadCell.map(({ label }) => {
    //   return {
    //     title: label,
    //   };
    // });

    const tableHeadList = (() => {
      let sourceList = [];
      switch (props) {
        case "MV":
          sourceList = MVListPdfTableHeadCell;
          break;
        case "RD":
          sourceList = RDListPdfTableHeadCell;
          break;
        case "MRV":
          sourceList = MRVListPdfTableHeadCell;
          break;
        default:
          sourceList = [];
      }
      return sourceList.map(({ label }) => ({ title: label }));
    })();
    let selectedTableHeadCell = null;

    switch (props) {
      case "MV":
        selectedTableHeadCell = MVListPdfTableHeadCell;
        break;
      case "RD":
        selectedTableHeadCell = RDListPdfTableHeadCell;
        break;
      case "MRV":
        selectedTableHeadCell = MRVListPdfTableHeadCell;
        break;
      default:
        selectedTableHeadCell = null;
    }

    const tableBodyList = responseList
      ? responseList.map((tableRows) =>
          selectedTableHeadCell
            ? CreatePdfTableBody(tableRows, selectedTableHeadCell)
            : null
        )
      : [];
    // const tableBodyList = props === 'MV' && responseList && responseList.map((tableRows) => {
    //   return CreatePdfTableBody(tableRows, mannualVerificationListTableHeadCell);
    // });

    const tableObj = {
      headerList: tableHeadList,
      rows: tableBodyList,
    };

    // Call jsPDFReportTemplate with tableObj
    jsPDFReportDataTemplate({
      reportDetails: {
        fileName:
          props === "MV"
            ? `_Manual_Verification_Required_List_${currentDate}`
            : props === "RD"
            ? `_Document_Reupload_Request_List_${currentDate}`
            : `_Manual_Reverification_Required_List_${currentDate}`,
        label:
          props === "MV"
            ? "Manual Verification Required List"
            : props === "RD"
            ? "Document Reupload Request List"
            : "Manual Reverification Required List",
        //  fromDate: fromDate,
        //  toDate: toDate,
        rptDesc: generateProcessingAppointeeReportDesc,
        companyName: "PWC REPORT", // or use a dynamic company name
      },
      tables: [tableObj],
      countFlag : responseListLength
      //clientDetailsFlag : false
    });
  };
  const handleDownloade = (response) => {
    const { filedata } = response;
    if (filedata?.fileData && typeof filedata?.fileData === "string") {
      const base64String = filedata?.fileData;
      const fileName =
        props === "MV"
          ? `_Manual_Verification_Required_List_${currentDate}`
          : props === "RD"
          ? `_Document_Reupload_Request_List_${currentDate}`
          : `_Manual_Reverification_Required_List_${currentDate}`;
      const blob = generateBlobFromBase64(base64String);
      const blobUrl = window.URL.createObjectURL(blob);
      downloadFile(blobUrl, fileName);
      window.URL.revokeObjectURL(blobUrl);
    }
  };
  const handleDwnldExcel = async () => {
    const response = await getMannualVerificationDataList(payload_MV);
    if (!response || response.length === 0) {
      showErrorMessage(reportGenarate)
      return;
    }
    if (response) {
      const { responseInfo } = response;
      //   const { manualVerificationList } = responseInfo;
      handleDownloade(responseInfo);
    }
  };
  useEffect(() => {
    if (isDownloadExcel) {
      handleDwnldExcel();
    }
  }, [props, isDownloadExcel]);
  useEffect(() => {
    if (isDownload) {
      handleDownload();
    }
  }, [props, isDownload]);
  useEffect(() => {
    dispatch(removeActionRoute());
    if (actionRouteSlice.length === 0) {
      setTableRows(payload_MV);
    }
  }, [actionRouteSlice, props, payload,hasPermission]);
  return (
    <DataTable
      rows={rows}
      setRows={setRows}
      headCells={
        props === "MV"
          ? mannualVerificationListTableHeadCell
          : props === "RD"
          ? docReuploadListTableHeadCell
          : mannualReverificationListTableHeadCell
      }
    />
  );
};
