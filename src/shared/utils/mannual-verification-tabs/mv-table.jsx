import {
  companyName,
  docReuploadListTableHeadCell,
  generatDocUploadReportDesc,
  generateManualAppointeeReportDesc,
  generateProcessingAppointeeReportDesc,
  generatReverificationReportDesc,
  mannualReverificationListTableHeadCell,
  mannualVerificationListTableHeadCell,
  MRVListPdfTableHeadCell,
  MVListPdfTableHeadCell,
  RDListPdfTableHeadCell,
  reportGenarate,
} from 'shared/constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { CreatePdfTableBody, DataTable, generateTableRowData } from 'shared/utils';
import { removeActionRoute } from 'store/slices/action-route-slice';
import { useEffect, useState } from 'react';
import jsPDFReportDataTemplate from '../associate/js-pdf-report';
import moment from 'moment';
import generateBlobFromBase64 from '../associate/generateBlob';
import downloadFile from '../associate/download-file';
import {
  removeManualValidationResponseStatusSlice,
  storeManualValidationResponseStatusSlice,
} from 'store/slices/manual-validation-response-status-slice';
import { getMannualVerificationDataList,getMannualVerificationReportDataList } from 'server/apis';
import showErrorMessage from '../associate/show-error-message';
export const MVTable = (filters) => {
  const {
    props,
    payload,
    setIsDownload,
    isDownload,
    setIsDownloadExcel,
    isDownloadExcel,
    hasPermission,
  } = filters;
  const manualValidationResponseStatusSlice = useSelector(
    (state) => state.manualValidationResponseStatusSlice,
  );
  const manualValidationResponseStatus =
    manualValidationResponseStatusSlice[manualValidationResponseStatusSlice.length - 1];
  var date = moment();
  var currentDate = date.format('DDMMYYYY');
  const [rows, setRows] = useState([]);
  const [responseList, setResponseList] = useState();
  const [responseListLength, setResponseListLength] = useState(0);
  const [responseFileDetails, setResponseFileDetails] = useState(null);
  const actionRouteSlice = useSelector((state) => state.actionRouteSlice);
  const apiSlice = useSelector((state) => state.apiSlice);
  const dispatch = useDispatch();
  const payload_MV = {
    filterType: props,
    ...payload,
  };
  // const handleDownloade = (rf) => {
  //     if (rf.fileData && typeof rf.fileData === 'string') {
  //       const base64String = rf.fileData;
  //       const fileName = rf.fileName || 'appointee_data.xlsx';
  //       const blob = generateBlobFromBase64(base64String);
  //       const blobUrl = window.URL.createObjectURL(blob);
  //       downloadFile(blobUrl, fileName);
  //       window.URL.revokeObjectURL(blobUrl);
  //     }
  //   };
  const handleClick = async () => {
      const response = await getMannualVerificationReportDataList(payload_MV);
      if (response) {
        const { responseInfo } = response;
        handleDownloadExcel(responseInfo);
      }
    };
  const setTableRows = async (payload_MV) => {
    const response = await getMannualVerificationDataList(payload_MV);
    if (response) {
      dispatch(removeManualValidationResponseStatusSlice());
      dispatch(storeManualValidationResponseStatusSlice({ isdataSubmited: false }));
      const { responseInfos } = response;
      setResponseList(responseInfos);
      responseInfos?.length > 0 && setResponseListLength(responseInfos?.length);
      let generatedCells = generateTableRowData(
        responseInfos,
        props === 'MV'
          ? mannualVerificationListTableHeadCell
          : props === 'RD'
            ? docReuploadListTableHeadCell
            : mannualReverificationListTableHeadCell,
        null,
        hasPermission,
      );
      setRows({
        tableHead:
          props === 'MV'
            ? mannualVerificationListTableHeadCell
            : props === 'RD'
              ? docReuploadListTableHeadCell
              : mannualReverificationListTableHeadCell,
        tableRows: generatedCells,
      });
    }
  };
  const handleDownload = () => {
    if (responseList && responseList.length > 0) {
      const tableHeadList = (() => {
        let sourceList = [];
        switch (props) {
          case 'MV':
            sourceList = MVListPdfTableHeadCell;
            break;
          case 'RD':
            sourceList = RDListPdfTableHeadCell;
            break;
          case 'MRV':
            sourceList = MRVListPdfTableHeadCell;
            break;
          default:
            sourceList = [];
        }
        return sourceList.map(({ label }) => ({ title: label }));
      })();
      let selectedTableHeadCell = null;
      switch (props) {
        case 'MV':
          selectedTableHeadCell = MVListPdfTableHeadCell;
          break;
        case 'RD':
          selectedTableHeadCell = RDListPdfTableHeadCell;
          break;
        case 'MRV':
          selectedTableHeadCell = MRVListPdfTableHeadCell;
          break;
        default:
          selectedTableHeadCell = null;
      }
      const tableBodyList = responseList
        ? responseList.map((tableRows) =>
            selectedTableHeadCell ? CreatePdfTableBody(tableRows, selectedTableHeadCell) : null,
          )
        : [];
      const tableObj = {
        headerList: tableHeadList,
        rows: tableBodyList,
      };
      jsPDFReportDataTemplate({
        reportDetails: {
          fileName:
            props === 'MV'
              ? `_Manual_Verification_Required_List_${currentDate}`
              : props === 'RD'
                ? `_Document_Reupload_Request_List_${currentDate}`
                : `_Manual_Reverification_Required_List_${currentDate}`,
          label:
            props === 'MV'
              ? 'Manual Verification Required List'
              : props === 'RD'
                ? 'Document Reupload Request List'
                : 'Manual Reverification Required List',
          rptDesc:
            props === 'MV'
              ? generateManualAppointeeReportDesc
              : props === 'RD'
                ? generatDocUploadReportDesc
                : generatReverificationReportDesc,
          companyName: `${companyName} REPORT`,
        },
        tables: [tableObj],
        countFlag: responseListLength,
      });
    } else {
      showErrorMessage(reportGenarate);
      return;
    }
  };
  const handleDownloadExcel = (responseFileDetails) => {
    if (responseFileDetails && responseFileDetails?.fileData.length > 0) {
      if (responseFileDetails?.fileData && typeof responseFileDetails?.fileData === 'string') {
        const base64String = responseFileDetails?.fileData;
        const fileName =
          props === 'MV'
            ? `_Manual_Verification_Required_List_${currentDate}`
            : props === 'RD'
              ? `_Document_Reupload_Request_List_${currentDate}`
              : `_Manual_Reverification_Required_List_${currentDate}`;
        const blob = generateBlobFromBase64(base64String);
        const blobUrl = window.URL.createObjectURL(blob);
        downloadFile(blobUrl, fileName);
        window.URL.revokeObjectURL(blobUrl);
      }
    } else {
      showErrorMessage(reportGenarate);
      return;
    }
  };
  useEffect(() => {
    if (isDownloadExcel === true) {
      handleClick();
      setIsDownloadExcel(false);
    }
    if (isDownload === true) {
      handleDownload();
      setIsDownload(false);
    }
  }, [isDownloadExcel, isDownload]);
  useEffect(() => {
    dispatch(removeActionRoute());
    if (actionRouteSlice.length === 0 && hasPermission) {
      setTableRows(payload_MV);
    }
  }, [actionRouteSlice, props, payload, hasPermission]);
  useEffect(() => {
    if (manualValidationResponseStatus?.isdataSubmited) {
      setTableRows(payload_MV);
    }
  }, [manualValidationResponseStatus?.isdataSubmited]);
  return (
    <DataTable
      rows={rows}
      setRows={setRows}
      headCells={
        props === 'MV'
          ? mannualVerificationListTableHeadCell
          : props === 'RD'
            ? docReuploadListTableHeadCell
            : mannualReverificationListTableHeadCell
      }
    />
  );
};
